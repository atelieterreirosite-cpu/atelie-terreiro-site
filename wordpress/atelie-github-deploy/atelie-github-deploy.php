<?php
/**
 * Plugin Name: Ateliê Terreiro — Deploy GitHub
 * Description: Dispara o GitHub Actions quando o conteúdo headless do Ateliê Terreiro muda.
 * Version: 1.0.0
 * Author: Ateliê Terreiro
 */

if (!defined('ABSPATH')) {
    exit;
}

const ATELIE_DEPLOY_PLUGIN_VERSION = '1.0.0';
const ATELIE_DEPLOY_LAST_RESULT_OPTION = 'atelie_github_deploy_last_result';

function atelie_deploy_repository() {
    return defined('ATELIE_GITHUB_REPOSITORY')
        ? trim((string) ATELIE_GITHUB_REPOSITORY)
        : '';
}

function atelie_deploy_token() {
    return defined('ATELIE_GITHUB_TOKEN')
        ? trim((string) ATELIE_GITHUB_TOKEN)
        : '';
}

function atelie_deploy_event_type() {
    $event = defined('ATELIE_GITHUB_EVENT')
        ? trim((string) ATELIE_GITHUB_EVENT)
        : 'wordpress-content-updated';

    return $event !== '' ? $event : 'wordpress-content-updated';
}

function atelie_deploy_post_types() {
    $defaults = array(
        'projeto',
        'evento',
        'curso',
        'obra',
        'publicacao',
        'exposicao',
        'video',
    );

    if (defined('ATELIE_GITHUB_POST_TYPES') && is_array(ATELIE_GITHUB_POST_TYPES)) {
        $configured = array_values(array_filter(array_map('sanitize_key', ATELIE_GITHUB_POST_TYPES)));
        if (!empty($configured)) {
            return $configured;
        }
    }

    return $defaults;
}

function atelie_deploy_include_media() {
    if (defined('ATELIE_GITHUB_INCLUDE_MEDIA')) {
        return (bool) ATELIE_GITHUB_INCLUDE_MEDIA;
    }

    // O frontend resolve imagem/anexo/vídeo via /wp-json/wp/v2/media/{id} no build.
    // Assim, alterações relevantes na Biblioteca de Mídia também devem poder gerar rebuild.
    return true;
}

function atelie_deploy_is_relevant_post($post_id) {
    $post_id = (int) $post_id;
    if ($post_id <= 0 || wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
        return false;
    }

    $post = get_post($post_id);
    if (!$post) {
        return false;
    }

    if ($post->post_type === 'attachment') {
        return atelie_deploy_include_media();
    }

    return in_array($post->post_type, atelie_deploy_post_types(), true);
}

function atelie_deploy_queue($reason, $post_id = 0) {
    static $shutdown_registered = false;

    if (!isset($GLOBALS['atelie_deploy_queue']) || !is_array($GLOBALS['atelie_deploy_queue'])) {
        $GLOBALS['atelie_deploy_queue'] = array(
            'reasons' => array(),
            'post_ids' => array(),
        );
    }

    $reason = sanitize_key((string) $reason);
    if ($reason !== '') {
        $GLOBALS['atelie_deploy_queue']['reasons'][$reason] = true;
    }

    $post_id = (int) $post_id;
    if ($post_id > 0) {
        $GLOBALS['atelie_deploy_queue']['post_ids'][$post_id] = true;
    }

    // Envia apenas uma chamada por request e somente depois que WordPress/ACF terminaram de salvar.
    if (!$shutdown_registered) {
        $shutdown_registered = true;
        add_action('shutdown', 'atelie_deploy_flush_queue', 1000);
    }
}

function atelie_deploy_flush_queue() {
    $queue = isset($GLOBALS['atelie_deploy_queue']) && is_array($GLOBALS['atelie_deploy_queue'])
        ? $GLOBALS['atelie_deploy_queue']
        : array();

    if (empty($queue)) {
        return;
    }

    $reasons = isset($queue['reasons']) ? array_keys($queue['reasons']) : array();
    $post_ids = isset($queue['post_ids']) ? array_map('intval', array_keys($queue['post_ids'])) : array();

    atelie_deploy_dispatch(array(
        'reason' => !empty($reasons) ? implode(',', $reasons) : 'wordpress_update',
        'post_ids' => $post_ids,
    ));

    $GLOBALS['atelie_deploy_queue'] = array();
}

function atelie_deploy_on_save($post_id, $post, $update) {
    if (!$post || !atelie_deploy_is_relevant_post($post_id)) {
        return;
    }

    // Ignora revisões/autosaves; para CPTs reais, qualquer mudança pode alterar o snapshot estático.
    atelie_deploy_queue($update ? 'post_updated' : 'post_created', $post_id);
}
add_action('save_post', 'atelie_deploy_on_save', 100, 3);

function atelie_deploy_on_acf_save($post_id) {
    if (!is_numeric($post_id)) {
        return;
    }

    $post_id = (int) $post_id;
    if (atelie_deploy_is_relevant_post($post_id)) {
        atelie_deploy_queue('acf_saved', $post_id);
    }
}
add_action('acf/save_post', 'atelie_deploy_on_acf_save', 20);

function atelie_deploy_on_trash($post_id) {
    if (atelie_deploy_is_relevant_post($post_id)) {
        atelie_deploy_queue('post_trashed', $post_id);
    }
}
add_action('trashed_post', 'atelie_deploy_on_trash', 20);

function atelie_deploy_on_untrash($post_id) {
    if (atelie_deploy_is_relevant_post($post_id)) {
        atelie_deploy_queue('post_restored', $post_id);
    }
}
add_action('untrashed_post', 'atelie_deploy_on_untrash', 20);

function atelie_deploy_on_before_delete($post_id, $post = null) {
    if ($post && ($post->post_type === 'attachment' ? atelie_deploy_include_media() : in_array($post->post_type, atelie_deploy_post_types(), true))) {
        atelie_deploy_queue('post_deleted', $post_id);
    }
}
add_action('before_delete_post', 'atelie_deploy_on_before_delete', 20, 2);

function atelie_deploy_dispatch($payload = array()) {
    $token = atelie_deploy_token();
    $repository = atelie_deploy_repository();
    $event_type = atelie_deploy_event_type();

    if ($token === '') {
        return atelie_deploy_store_result(array(
            'ok' => false,
            'http' => 0,
            'message' => 'ATELIE_GITHUB_TOKEN não está definido no wp-config.php.',
            'response' => '',
            'url' => '',
            'reason' => isset($payload['reason']) ? $payload['reason'] : 'unknown',
        ));
    }

    if (!preg_match('~^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$~', $repository)) {
        return atelie_deploy_store_result(array(
            'ok' => false,
            'http' => 0,
            'message' => 'ATELIE_GITHUB_REPOSITORY está ausente ou inválido. Use owner/repositorio.',
            'response' => '',
            'url' => '',
            'reason' => isset($payload['reason']) ? $payload['reason'] : 'unknown',
        ));
    }

    $url = 'https://api.github.com/repos/' . $repository . '/dispatches';
    $client_payload = array(
        'source' => 'wordpress',
        'site_url' => home_url('/'),
        'reason' => isset($payload['reason']) ? sanitize_text_field((string) $payload['reason']) : 'wordpress_update',
        'post_ids' => isset($payload['post_ids']) && is_array($payload['post_ids'])
            ? array_values(array_map('intval', $payload['post_ids']))
            : array(),
        'sent_at' => gmdate('c'),
    );

    $response = wp_remote_post($url, array(
        'timeout' => 20,
        'redirection' => 2,
        'sslverify' => true,
        'headers' => array(
            'Authorization' => 'Bearer ' . $token,
            'Accept' => 'application/vnd.github+json',
            'X-GitHub-Api-Version' => '2022-11-28',
            'Content-Type' => 'application/json',
            'User-Agent' => 'atelie-terreiro-wordpress-deploy',
        ),
        'body' => wp_json_encode(array(
            'event_type' => $event_type,
            'client_payload' => $client_payload,
        )),
    ));

    if (is_wp_error($response)) {
        return atelie_deploy_store_result(array(
            'ok' => false,
            'http' => 0,
            'message' => $response->get_error_message(),
            'response' => '',
            'url' => $url,
            'reason' => $client_payload['reason'],
        ));
    }

    $status = (int) wp_remote_retrieve_response_code($response);
    $body = (string) wp_remote_retrieve_body($response);

    return atelie_deploy_store_result(array(
        'ok' => $status === 204,
        'http' => $status,
        'message' => $status === 204
            ? 'GitHub aceitou o repository_dispatch.'
            : 'GitHub recusou a requisição.',
        'response' => $body,
        'url' => $url,
        'reason' => $client_payload['reason'],
    ));
}

function atelie_deploy_store_result($result) {
    $result['date'] = current_time('mysql');
    update_option(ATELIE_DEPLOY_LAST_RESULT_OPTION, $result, false);
    return $result;
}

function atelie_deploy_admin_menu() {
    add_options_page(
        'Ateliê Terreiro — Deploy GitHub',
        'Ateliê Deploy',
        'manage_options',
        'atelie-github-deploy',
        'atelie_deploy_admin_page'
    );
}
add_action('admin_menu', 'atelie_deploy_admin_menu');

function atelie_deploy_admin_test() {
    if (!current_user_can('manage_options')) {
        wp_die('Sem permissão.');
    }

    check_admin_referer('atelie_deploy_test');
    atelie_deploy_dispatch(array('reason' => 'manual_test'));

    wp_safe_redirect(add_query_arg(
        array('page' => 'atelie-github-deploy', 'atelie_tested' => '1'),
        admin_url('options-general.php')
    ));
    exit;
}
add_action('admin_post_atelie_deploy_test', 'atelie_deploy_admin_test');

function atelie_deploy_detected_post_types() {
    $objects = get_post_types(array('show_ui' => true), 'objects');
    $rows = array();

    foreach ($objects as $slug => $object) {
        $rows[$slug] = isset($object->labels->singular_name) ? $object->labels->singular_name : $slug;
    }

    return $rows;
}

function atelie_deploy_admin_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $last = get_option(ATELIE_DEPLOY_LAST_RESULT_OPTION, array());
    $post_types = atelie_deploy_post_types();
    $detected = atelie_deploy_detected_post_types();
    ?>
    <div class="wrap">
        <h1>Ateliê Terreiro — Deploy GitHub</h1>
        <p>O plugin dispara o build estático quando os CPTs do site ou a mídia relacionada são alterados.</p>

        <table class="widefat striped" style="max-width: 980px; margin: 16px 0;">
            <tbody>
                <tr><td><strong>Plugin</strong></td><td>Versão <?php echo esc_html(ATELIE_DEPLOY_PLUGIN_VERSION); ?> ativa</td></tr>
                <tr><td><strong>Token no wp-config.php</strong></td><td><?php echo atelie_deploy_token() !== '' ? '<span style="color:#008a20;font-weight:600">Definido</span>' : '<span style="color:#b32d2e;font-weight:600">Não definido</span>'; ?></td></tr>
                <tr><td><strong>Repositório</strong></td><td><code><?php echo esc_html(atelie_deploy_repository() ?: 'não definido'); ?></code></td></tr>
                <tr><td><strong>Evento enviado</strong></td><td><code><?php echo esc_html(atelie_deploy_event_type()); ?></code></td></tr>
                <tr><td><strong>CPTs monitorados</strong></td><td><code><?php echo esc_html(implode(', ', $post_types)); ?></code></td></tr>
                <tr><td><strong>Biblioteca de mídia</strong></td><td><?php echo atelie_deploy_include_media() ? 'Monitorada' : 'Ignorada'; ?></td></tr>
                <tr>
                    <td><strong>CPTs detectados</strong></td>
                    <td>
                        <?php foreach ($detected as $slug => $label) : ?>
                            <?php $match = in_array($slug, $post_types, true); ?>
                            <div><?php echo esc_html($label); ?> = <code><?php echo esc_html($slug); ?></code><?php echo $match ? ' ✓' : ''; ?></div>
                        <?php endforeach; ?>
                    </td>
                </tr>
            </tbody>
        </table>

        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
            <input type="hidden" name="action" value="atelie_deploy_test">
            <?php wp_nonce_field('atelie_deploy_test'); ?>
            <?php submit_button('Testar chamada ao GitHub', 'primary', 'submit', false); ?>
        </form>

        <h2>Último resultado</h2>
        <table class="widefat striped" style="max-width: 980px;">
            <tbody>
                <tr><td><strong>Data</strong></td><td><?php echo esc_html(isset($last['date']) ? $last['date'] : '—'); ?></td></tr>
                <tr><td><strong>Motivo</strong></td><td><code><?php echo esc_html(isset($last['reason']) ? $last['reason'] : '—'); ?></code></td></tr>
                <tr><td><strong>HTTP</strong></td><td><?php echo esc_html(isset($last['http']) ? (string) $last['http'] : '—'); ?></td></tr>
                <tr><td><strong>Mensagem</strong></td><td><?php echo esc_html(isset($last['message']) ? $last['message'] : '—'); ?></td></tr>
                <tr><td><strong>Resposta</strong></td><td><pre style="white-space:pre-wrap;margin:0"><?php echo esc_html(isset($last['response']) ? $last['response'] : ''); ?></pre></td></tr>
                <tr><td><strong>URL</strong></td><td><code><?php echo esc_html(isset($last['url']) ? $last['url'] : '—'); ?></code></td></tr>
            </tbody>
        </table>

        <p style="margin-top:16px"><strong>Leitura:</strong> HTTP 204 = GitHub aceitou o disparo. 401 = token inválido. 403 = falta <code>Contents: Read and write</code>. 404 = repositório incorreto ou token sem acesso.</p>
    </div>
    <?php
}

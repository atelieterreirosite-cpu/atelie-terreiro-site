Ateliê Terreiro — Deploy GitHub

1. Compacte esta pasta como atelie-github-deploy.zip e instale em WordPress > Plugins > Adicionar plugin > Enviar plugin.
2. Antes de ativar, adicione no wp-config.php, antes de "That's all, stop editing":

   define('ATELIE_GITHUB_TOKEN', 'github_pat_SEU_TOKEN');
   define('ATELIE_GITHUB_REPOSITORY', 'atelieterreirosite-cpu/atelie-terreiro-site');
   define('ATELIE_GITHUB_EVENT', 'wordpress-content-updated');

3. O token Fine-grained deve ter acesso somente ao repositório acima e Repository permissions > Contents > Read and write.
4. O plugin monitora: projeto, evento, curso, obra, publicacao, exposicao, video e Biblioteca de Mídia.
5. Após ativar, abra Configurações > Ateliê Deploy e clique em "Testar chamada ao GitHub". O resultado correto é HTTP 204.

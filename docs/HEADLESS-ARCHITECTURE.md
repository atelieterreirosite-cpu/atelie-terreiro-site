# Ateliê Terreiro — Arquitetura Headless

## Visão geral

```text
WordPress → CPT UI → ACF → REST API → Next.js → Static Export → Firebase Hosting
```

O WordPress é a única fonte de conteúdo. O frontend não possui banco próprio, API intermediária, autenticação, Firestore, Firebase Storage ou Firebase JavaScript SDK. O Firebase serve somente os arquivos estáticos gerados em `out/`.

O endereço do CMS é lido de `NEXT_PUBLIC_WORDPRESS_URL` e normalizado em `src/lib/cms/config.ts`. Como o domínio atual é temporário, componentes nunca devem guardar essa URL.

## WordPress

Os Custom Post Types (CPTs) públicos são:

| CPT | Endpoint | Função |
| --- | --- | --- |
| `projeto` | `/wp-json/wp/v2/projeto` | Projetos e ações continuadas |
| `evento` | `/wp-json/wp/v2/evento` | Encontros, apresentações e atividades pontuais |
| `curso` | `/wp-json/wp/v2/curso` | Cursos, oficinas e formações |
| `obra` | `/wp-json/wp/v2/obra` | Obras e registros artísticos |
| `publicacao` | `/wp-json/wp/v2/publicacao` | Catálogos, livros e materiais editoriais |
| `exposicao` | `/wp-json/wp/v2/exposicao` | Exposições e mostras |
| `video` | `/wp-json/wp/v2/video` | Arquivos de vídeo e vídeos externos |

O client consulta `?per_page=100&orderby=date&order=desc`. Se uma coleção ultrapassar 100 registros, será necessário implementar paginação no build.

### Auditoria do contrato real

Teste executado em 12 de agosto de 2026 contra a URL fornecida:

| CPT | HTTP | JSON | Registros | Objeto `acf` |
| --- | ---: | --- | ---: | --- |
| `projeto` | 200 | Sim | 1 | Sim |
| `evento` | 200 | Sim | 1 | Sim |
| `curso` | 200 | Sim | 1 | Sim |
| `obra` | 200 | Sim | 1 | Sim |
| `publicacao` | 200 | Sim | 1 | Sim |
| `exposicao` | 200 | Sim | 1 | Sim |
| `video` (`per_page=100`) | 200 | Sim | 1 | Sim |

Todos os grupos retornaram as chaves ACF esperadas. Os campos de mídia estão configurados no ACF para retornar **ID numérico**, não objeto:

- `imagem`: ID `124`, resolvido por `/wp-json/wp/v2/media/124` como JPEG 2000 × 1335;
- `anexo`: ID `121`, resolvido como `video/mp4`, cerca de 20,5 MB;
- `arquivo_video`: ID `121`, o mesmo MP4 enviado à Biblioteca de Mídia;
- `projeto_relacionado`: ID `125` nos CPTs relacionados;
- `evento_relacionado`: ID `126` no vídeo.

Os tipos aceitam tanto ID quanto objeto ACF. Isso evita quebra se a configuração “Return Format” do ACF mudar no futuro.

## Campos ACF

Valores vazios podem chegar como `false`, `null`, `undefined` ou string vazia. A tabela descreve o valor bruto esperado na REST API; os mappers entregam valores normalizados aos componentes.

### Campos base

Aplicam-se a `projeto`, `evento`, `curso`, `obra`, `publicacao` e `exposicao`. `video` usa os mesmos campos, exceto `anexo`.

| CPT | Campo | Tipo esperado | Uso |
| --- | --- | --- | --- |
| Todos | `titulo` | `string \| vazio` | Título visual principal |
| Todos | `resumo` | `string \| vazio` | Texto curto do card |
| Todos | `descricao` | `string HTML \| vazio` | Conteúdo WYSIWYG |
| Todos | `imagem` | `number \| ACFImage \| vazio` | Imagem destacada; ID é resolvido pela API de mídia |
| Todos, exceto vídeo | `anexo` | `number \| ACFFile \| vazio` | Arquivo aberto em nova aba |
| Todos | `link_externo` | `string URL \| vazio` | Destino externo opcional |

### Projeto

| CPT | Campo | Tipo esperado | Uso |
| --- | --- | --- | --- |
| Projeto | `ano_inicio` | `string \| number \| vazio` | Início do período |
| Projeto | `ano_fim` | `string \| number \| vazio` | Fim do período |
| Projeto | `em_andamento` | `boolean \| vazio` | Estado atual |
| Projeto | `local` | `string \| vazio` | Localização |
| Projeto | `participantes` | `string \| vazio` | Créditos de participação |
| Projeto | `curadoria_coordenacao` | `string \| vazio` | Curadoria ou coordenação |
| Projeto | `video_url` | `string URL \| vazio` | Vídeo externo associado |

### Evento

| CPT | Campo | Tipo esperado | Uso |
| --- | --- | --- | --- |
| Evento | `data_inicio` | `string YYYYMMDD \| vazio` | Data inicial |
| Evento | `data_fim` | `string YYYYMMDD \| vazio` | Data final |
| Evento | `horario` | `string \| vazio` | Horário livre |
| Evento | `local` | `string \| vazio` | Local |
| Evento | `cidade` | `string \| vazio` | Cidade |
| Evento | `evento_online` | `boolean \| vazio` | Modalidade online |
| Evento | `link_evento` | `string URL \| vazio` | Página ou transmissão |
| Evento | `projeto_relacionado` | `number \| objeto com ID \| vazio` | ID do projeto |
| Evento | `participantes` | `string \| vazio` | Participantes |
| Evento | `inscricoes_abertas` | `boolean \| vazio` | Estado de inscrição |
| Evento | `link_inscricao` | `string URL \| vazio` | Formulário de inscrição |

### Curso

| CPT | Campo | Tipo esperado | Uso |
| --- | --- | --- | --- |
| Curso | `carga_horaria` | `string \| vazio` | Duração total |
| Curso | `modalidade` | `presencial \| online \| hibrido \| vazio` | Modalidade controlada |
| Curso | `data_inicio` | `string YYYYMMDD \| vazio` | Data inicial |
| Curso | `data_fim` | `string YYYYMMDD \| vazio` | Data final |
| Curso | `horario` | `string \| vazio` | Horário livre |
| Curso | `local` | `string \| vazio` | Local |
| Curso | `ministrantes` | `string \| vazio` | Responsáveis pela formação |
| Curso | `publico_alvo` | `string \| vazio` | Público esperado |
| Curso | `inscricoes_abertas` | `boolean \| vazio` | Estado de inscrição |
| Curso | `link_inscricao` | `string URL \| vazio` | Formulário de inscrição |
| Curso | `valor` | `string \| vazio` | Valor em formato editorial |

### Obra

| CPT | Campo | Tipo esperado | Uso |
| --- | --- | --- | --- |
| Obra | `artista` | `string \| vazio` | Autoria |
| Obra | `ano` | `string \| number \| vazio` | Ano da obra |
| Obra | `tecnica` | `string \| vazio` | Técnica |
| Obra | `dimensoes` | `string \| vazio` | Dimensões livres |
| Obra | `projeto_relacionado` | `number \| objeto com ID \| vazio` | ID do projeto |
| Obra | `video_url` | `string URL \| vazio` | Vídeo externo associado |
| Obra | `creditos` | `string \| vazio` | Créditos |

### Publicação

| CPT | Campo | Tipo esperado | Uso |
| --- | --- | --- | --- |
| Publicação | `tipo_publicacao` | `string \| vazio` | Categoria editorial |
| Publicação | `autores` | `string \| vazio` | Autoria |
| Publicação | `ano` | `string \| number \| vazio` | Ano |
| Publicação | `projeto_relacionado` | `number \| objeto com ID \| vazio` | ID do projeto |
| Publicação | `creditos` | `string \| vazio` | Créditos editoriais |

### Exposição

| CPT | Campo | Tipo esperado | Uso |
| --- | --- | --- | --- |
| Exposição | `data_inicio` | `string YYYYMMDD \| vazio` | Data inicial |
| Exposição | `data_fim` | `string YYYYMMDD \| vazio` | Data final |
| Exposição | `em_cartaz` | `boolean \| vazio` | Estado atual |
| Exposição | `local` | `string \| vazio` | Local |
| Exposição | `cidade` | `string \| vazio` | Cidade |
| Exposição | `curadoria` | `string \| vazio` | Curadoria |
| Exposição | `artistas` | `string \| vazio` | Artistas participantes |
| Exposição | `projeto_relacionado` | `number \| objeto com ID \| vazio` | ID do projeto |

### Vídeo

| CPT | Campo | Tipo esperado | Uso |
| --- | --- | --- | --- |
| Vídeo | `video_url` | `string URL \| vazio` | YouTube, Vimeo, Instagram ou outro endereço |
| Vídeo | `arquivo_video` | `number \| ACFFile \| vazio` | Arquivo da Biblioteca de Mídia, sempre prioritário |
| Vídeo | `plataforma` | `youtube \| vimeo \| instagram \| wordpress \| outro \| vazio` | Classificação editorial |
| Vídeo | `data_publicacao` | `string YYYYMMDD \| vazio` | Data de publicação |
| Vídeo | `duracao` | `string \| vazio` | Duração editorial |
| Vídeo | `participantes` | `string \| vazio` | Participantes |
| Vídeo | `projeto_relacionado` | `number \| objeto com ID \| vazio` | ID do projeto |
| Vídeo | `evento_relacionado` | `number \| objeto com ID \| vazio` | ID do evento |
| Vídeo | `creditos` | `string \| vazio` | Créditos |

## Models

`src/lib/cms/models.ts` separa três níveis:

1. **Contrato bruto ACF**: `ProjectACF`, `EventACF`, `CourseACF`, `WorkACF`, `PublicationACF`, `ExhibitionACF` e `VideoACF` refletem a resposta da REST API, incluindo valores vazios e mídia por ID.
2. **Envelope WordPress**: `WordPressPost<TACF>` guarda metadados (`id`, datas, slug, status e link) e torna `acf` genérico.
3. **Contrato normalizado da UI**: `CMSItem<TDetails>` e os aliases `ProjectContent`, `EventContent`, etc. contêm strings limpas, relações como `number | null` e mídia já resolvida.

O título visual usa primeiro `post.acf.titulo`. `title.rendered` é apenas fallback de compatibilidade.

## Imagem

`ACFImage` aceita `ID` ou `id`, URL, texto alternativo, título, dimensões e tamanhos. O fluxo é:

```text
acf.imagem
  → objeto: normalizeImage()
  → ID: GET /wp-json/wp/v2/media/{id}
  → imageFromWordPressMedia()
  → ImagePreview
```

`ImagePreview` usa `<img>` nativo. O `alt` usa o texto alternativo do WordPress e cai para `acf.titulo`. Isso evita configuração de domínio temporário em `next/image`.

## Arquivo

`ACFFile` aceita IDs alternativos, URL, nome, tamanho, MIME type e título. `AttachmentPreview` informa o tipo e o tamanho quando disponíveis e abre o arquivo em nova aba. Ele não tenta embutir formatos arbitrários.

No conteúdo real de teste, `anexo` aponta para um MP4, não para PDF. O componente o identifica como vídeo e mantém o comportamento genérico de “Abrir anexo”.

## Vídeo

A prioridade é deliberada:

1. `arquivo_video` enviado ao WordPress;
2. `video_url`.

Para arquivo, `VideoPlayer` produz `<video controls preload="metadata">`, usa a imagem como `poster` e não faz autoplay. Para URL:

- YouTube: reconhece `watch?v=`, `youtu.be/`, `/embed/` e `/shorts/`, extrai o ID e cria URL segura de embed;
- Vimeo: extrai o primeiro segmento numérico e usa `player.vimeo.com`;
- Instagram e outros: mostra link “Abrir vídeo”;
- sem arquivo e sem URL: mostra “Vídeo não informado”.

## Relacionamentos

`normalizeRelationId()` aceita número, string numérica ou objeto com `ID`/`id` e sempre entrega `number | null`. A demonstração exibe o ID recebido.

No layout final, relacionamentos podem ser resolvidos sem requisições repetidas por um mapa de entidades construído no build (`Map<id, CMSItem>`) ou, em páginas isoladas, por consulta REST por ID. Evite fazer consultas por ID dentro de componentes.

## HTML do ACF

`descricao` vem do WYSIWYG. O único ponto de `dangerouslySetInnerHTML` é `src/components/cms/RichText.tsx`. O modelo de confiança atual pressupõe usuários administrativos confiáveis no WordPress. Se autores não confiáveis forem admitidos, sanitizar no WordPress e adicionar uma política explícita de sanitização no build.

## Comunicação e tratamento de falhas

`src/lib/cms/client.ts` é o único módulo que chama `fetch`. Cada coleção possui seu próprio `safeCollection()`. Assim, falha em Eventos não impede Projetos, Cursos ou outros CPTs de serem exportados. Durante o build, o endpoint e o erro são impressos claramente no console.

Falha ao resolver uma mídia afeta apenas aquela imagem ou arquivo: o conteúdo permanece visível com fallback.

## Atualização do conteúdo

O frontend usa **static export**. Depois que os arquivos estão no Firebase, editar o WordPress não muda automaticamente o HTML já publicado.

```text
CMS alterado
  → plugin agenda dispatch com debounce
  → repository_dispatch: wordpress-content-updated
  → GitHub Actions
  → npm run build
  → nova consulta à REST API
  → novo conteúdo em out/
  → Firebase Hosting deploy
```

Não usar ISR, `revalidate`, SSR, Server Actions ou `cache: "no-store"`. A atualização acontece por um novo build completo.

## Firebase e GitHub Actions

`firebase.json` publica `out/`; `.firebaserc` seleciona `atelie-terreiro`. O workflow usa a integração oficial com service account por `FirebaseExtended/action-hosting-deploy` e o secret `FIREBASE_SERVICE_ACCOUNT_ATELIE_TERREIRO`. Não usar `FIREBASE_TOKEN` de `firebase login:ci`.

A URL do WordPress fica na variável de repositório `NEXT_PUBLIC_WORDPRESS_URL`. A service account deve ser criada/configurada manualmente pelo fluxo oficial `firebase init hosting:github`.

## Para o designer/desenvolvedor futuro

Os componentes em `src/components/cms` e toda a composição visual de `src/app/page.tsx` podem ser substituídos. Eles existem para homologar o contrato e os tipos de mídia.

Não alterar `src/lib/cms/models.ts` ou `src/lib/cms/client.ts` sem entender o contrato do CMS. O novo layout deve consumir `getProjects()`, `getEvents()`, `getCourses()`, `getWorks()`, `getPublications()`, `getExhibitions()`, `getVideos()` ou `getAllContent()`. Não chamar o WordPress diretamente em componentes.

Antes de mudar um parser, capture uma resposta real da API. Mudanças de “Return Format” no ACF, nomes de campo e visibilidade REST devem ser tratadas como alterações de contrato.

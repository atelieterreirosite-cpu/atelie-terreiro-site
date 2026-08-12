# Ateliê Terreiro

Prova técnica em Next.js para validar a arquitetura WordPress Headless + ACF + static export + Firebase Hosting. A interface atual é demonstrativa; a camada em `src/lib/cms` é o contrato reutilizável para o futuro layout.

## Desenvolvimento

Requer Node.js 22 ou versão compatível com a versão do Next.js declarada no projeto.

```bash
npm install
cp .env.example .env.local
npm run dev
```

No Windows PowerShell, use `Copy-Item .env.example .env.local` no lugar de `cp`.

## Environment

```dotenv
NEXT_PUBLIC_WORDPRESS_URL=https://endereco-do-wordpress.example
```

A URL é normalizada em `src/lib/cms/config.ts`. Não inclua barra final. O `.env.local` não é versionado; `.env.example` é o modelo público.

No GitHub, crie também a variável de repositório `NEXT_PUBLIC_WORDPRESS_URL` em **Settings → Secrets and variables → Actions → Variables**. A URL atual é temporária e pode ser trocada sem editar componentes.

## Build

```bash
npm run typecheck
npm run lint
npm run build
```

O `next.config.ts` usa `output: "export"`. Ao final, confirme a existência da pasta `out/`. Cada build consulta o WordPress e gera uma fotografia estática do conteúdo publicado naquele momento.

## Deploy manual

Instale o Firebase CLI e execute:

```bash
firebase login
firebase use atelie-terreiro
firebase deploy --only hosting
```

Configuração inicial, se ainda não tiver sido feita na máquina:

```bash
npm install
firebase login
firebase use atelie-terreiro
firebase init hosting
firebase init hosting:github
```

Ao responder ao `firebase init hosting`, mantenha o diretório público como `out`. Não adicione rewrite de SPA para `/index.html`: o Next.js já exporta as rotas estáticas.

Depois de `firebase init hosting:github`, confirme no GitHub que o secret oficial da service account se chama `FIREBASE_SERVICE_ACCOUNT_ATELIE_TERREIRO`. Se o assistente gerar outro nome, atualize apenas a referência em `.github/workflows/deploy.yml`.

## Deploy automático

```text
WordPress
  → GitHub repository_dispatch
  → GitHub Actions
  → npm run build
  → Firebase Hosting
```

O workflow roda em `push` na branch `main`, manualmente via `workflow_dispatch` e quando recebe `repository_dispatch` com o tipo `wordpress-content-updated`.

## CMS

Base configurada por `NEXT_PUBLIC_WORDPRESS_URL`; coleções consultadas com `per_page=100`, ordenadas por data decrescente:

- `/wp-json/wp/v2/projeto`
- `/wp-json/wp/v2/evento`
- `/wp-json/wp/v2/curso`
- `/wp-json/wp/v2/obra`
- `/wp-json/wp/v2/publicacao`
- `/wp-json/wp/v2/exposicao`
- `/wp-json/wp/v2/video`

Na validação inicial, o WordPress retornou os campos `imagem`, `anexo` e `arquivo_video` como IDs de anexos. O client resolve esses IDs por `/wp-json/wp/v2/media/{id}` antes de entregar o conteúdo aos componentes.

## Documentação

Consulte `docs/HEADLESS-ARCHITECTURE.md` para o contrato completo dos campos ACF, estratégia de mídia, relacionamentos, tratamento de falhas e fluxo de atualização.

O plugin de disparo fica em `wordpress/atelie-github-deploy/` e possui instruções próprias de instalação e segurança.

# Migração Ateliê Terreiro — Especificação técnica

Documento de especificação para migrar o layout visual de `atelie_terreiro` para a base CMS `atelie-terreiro-site`.

**Status:** especificação (sem implementação de layout nesta etapa).  
**Data de referência:** 2026-08-12  
**Base do projeto final:** `atelie-terreiro-site`  
**Referência visual:** `atelie_terreiro`

---

## A. Decisões de produto confirmadas

1. O projeto final é `atelie-terreiro-site`. O `atelie_terreiro` é referência visual e fonte de componentes/layout — não deve ser copiado cegamente.
2. `/arquivo` na v1 lista apenas o CPT `projeto`. Não há interface unificada com obra, exposição, publicação ou vídeo.
3. `/arquivo/[slug]` é o detalhe de um projeto.
4. No detalhe do projeto, a **primeira** peça visual é um slider/carrossel de imagens (`galeria`; se vazia, `imagem`; se ambas vazias, fallback).
5. Não manter o fluxo atual do protótipo “imagem principal → texto → gallery depois”.
6. CPT `projeto` receberá campo ACF `galeria` (Gallery). Documentar primeiro; implementar no código CMS só quando autorizado.
7. Home permanece como no protótipo: vídeo fullscreen + Header overlay; sem seções novas.
8. Vídeo da Home virá do WordPress (`home_video_url`, `home_video_start`). Homologação pode usar temporariamente o YouTube `F3NquSxjLRE` a partir de ~130s, via fallback — não como hardcode definitivo.
9. `/sobre` e `/contato` vêm de páginas WordPress + ACF (sem CPT novo).
10. Dados compartilhados (nome, endereço, e-mail, WhatsApp, redes) ficam em Options Page / global settings.
11. Projetos usam um único WYSIWYG `descricao`. Não criar presentation/context/description separados nesta etapa.
12. CPTs `obra`, `publicacao`, `exposicao`, `video` permanecem no CMS/client; **sem** novas telas no frontend nesta etapa.
13. Relacionamentos por ID preservados; resolução via mapa no build (ou solução centralizada). Sem fetch por ID dentro de componentes.
14. Contrato CMS (`config`, `client`, `models`, `mappers`, `video`) não deve ser quebrado. Alterações só quando houver necessidade real, justificadas.
15. Componentes não fazem fetch WordPress direto; consomem getters/repositórios CMS.
16. Imagens em `public/images/exemplos` são temporárias para homologação.
17. Preservar `output: "export"` e `trailingSlash: true`; dinâmicas com `generateStaticParams()`.
18. Migrar Tailwind v4 e fontes Cormorant Garamond + DM Sans (`next/font`) para o site final.

---

## B. Arquitetura final desejada

```text
WordPress (CPT UI + ACF + Options + Pages)
        ↓ REST API
src/lib/cms/*  (contrato preservado; extensões mínimas e justificadas)
        ↓ getters / adapters de view-model
src/app/*      (rotas App Router + static export)
src/components/* (layout visual migrado do protótipo)
        ↓ next build → out/
Firebase Hosting
        ↑ redeploy via GitHub Actions + plugin atelie-github-deploy
```

### Papéis

| Camada | Responsabilidade |
|--------|------------------|
| WordPress | Fonte única de conteúdo editorial e mídia |
| `src/lib/cms` | Fetch, normalização, resolução de mídia, contrato tipado |
| Adapters (novos, fora do core se possível) | `CMSItem` / Options / Pages → props dos componentes visuais |
| Componentes visuais | Apresentação; recebem props tipadas; sem `fetch` WP |
| Build estático | `getAllContent()` / getters + `generateStaticParams` → HTML em `out/` |

### Regras estruturais

- App Router em `src/app/` (já usado pelo site).
- Design system do protótipo (Tailwind v4, tokens, tipografia) substitui o CSS de homologação atual.
- Componentes em `src/components/cms/*` (demo técnica) podem ser removidos após o layout final consumir o CMS.
- Mocks de `atelie_terreiro/src/data/*` não entram como fonte de verdade; no máximo como fallback de homologação explícito e removível.

---

## C. Rotas do frontend

| Rota | Tipo | Fonte de dados (alvo) | Observação |
|------|------|------------------------|------------|
| `/` | estática | Options (`home_video_*`) + site settings | Visual = Home do protótipo |
| `/sobre/` | estática | Página WP “Sobre” + ACF | trailing slash |
| `/arquivo/` | estática | Página WP “Arquivo” (intro/slider) + `getProjects()` | listagem só de projetos |
| `/arquivo/[slug]/` | dinâmica SSG | `getProjects()` + item por slug | `generateStaticParams` |
| `/eventos/` | estática | Página WP “Eventos” (intro) + `getEvents()` | |
| `/eventos/[slug]/` | dinâmica SSG | `getEvents()` | `generateStaticParams` |
| `/cursos/` | estática | Página WP “Cursos” (intro) + `getCourses()` | |
| `/cursos/[slug]/` | dinâmica SSG | `getCourses()` | `generateStaticParams` |
| `/contato/` | estática | Página WP “Contato” + Options (canais) | |

**Fora do escopo desta etapa (sem rotas novas):**

- `/obras`, `/publicacoes`, `/exposicoes`, `/videos` e detalhes desses CPTs.

**Compatibilidade static export:**

- Todas as dinâmicas listam slugs em `generateStaticParams()`.
- Links internos devem respeitar `trailingSlash: true`.
- Sem SSR/ISR/`revalidate`/`cache: "no-store"` no runtime pós-deploy.

---

## D. Mapeamento de páginas: `atelie_terreiro` → `atelie-terreiro-site`

| Protótipo | Destino no site | Adaptação |
|-----------|-----------------|-----------|
| `app/page.tsx` | `src/app/page.tsx` | Substituir demo CMS pela Home visual; dados de Options |
| `app/sobre/page.tsx` | `src/app/sobre/page.tsx` | Conteúdo da página WP Sobre |
| `app/arquivo/page.tsx` | `src/app/arquivo/page.tsx` | Intro/slider da página Arquivo + lista `projeto` |
| `app/arquivo/[slug]/page.tsx` | `src/app/arquivo/[slug]/page.tsx` | Detalhe com slider primeiro; `generateStaticParams` |
| `app/eventos/page.tsx` | `src/app/eventos/page.tsx` | Lista via `getEvents()` |
| `app/eventos/[slug]/page.tsx` | `src/app/eventos/[slug]/page.tsx` | Detalhe + params estáticos |
| `app/cursos/page.tsx` | `src/app/cursos/page.tsx` | Lista via `getCourses()` |
| `app/cursos/[slug]/page.tsx` | `src/app/cursos/[slug]/page.tsx` | Detalhe + params estáticos |
| `app/contato/page.tsx` | `src/app/contato/page.tsx` | Página Contato + Options |
| `app/layout.tsx` | `src/app/layout.tsx` | Fontes, metadata, globals Tailwind do protótipo |

Metadata e viewport do protótipo devem ser portados; título/description institucionais podem depois vir de Options (opcional na v1).

---

## E. Mapeamento de componentes a migrar

### Migrar (com adaptação de paths/props)

| Origem (`atelie_terreiro`) | Destino sugerido | Notas |
|----------------------------|------------------|-------|
| `src/components/layout/Header.tsx` | `src/components/layout/Header.tsx` | Dados de nav + Options (nome) |
| `src/components/layout/Footer.tsx` | `src/components/layout/Footer.tsx` | Remover copy de “protótipo”; dados Options |
| `src/components/layout/SiteShell.tsx` | idem | |
| `src/components/layout/PageEnter.tsx` | idem | |
| `src/components/home/HomeHero.tsx` | idem | Recebe vídeo já adaptado |
| `src/components/ui/YouTubeBackgroundPlayer.tsx` | idem | Continua esperando `videoId` / start |
| `src/components/ui/VideoEmbed.tsx` | idem | Detalhe de projeto / fallback |
| `src/components/ui/ImageSlider.tsx` | idem | Arquivo listagem **e** detalhe do projeto |
| `src/components/ui/Gallery.tsx` | avaliar | Pode não ser necessário no detalhe se o slider substituir a galeria inferior |
| `src/components/ui/PageHero.tsx` | idem | |
| `src/components/arquivo/*` | idem | `ProjectDetail` deve priorizar slider |
| `src/components/eventos/*` | idem | |
| `src/components/cursos/*` | idem | |
| `src/components/sobre/*` | idem | Props a partir da página WP |
| `src/components/contato/*` | idem | Form pode permanecer desativado |
| `src/hooks/usePrefersReducedMotion.ts` | idem | |
| `app/globals.css` (tokens Tailwind) | `src/app/globals.css` | Substitui CSS da demo |
| Tipografia (`layout.tsx`) | `src/app/layout.tsx` | Cormorant + DM Sans |

### Não migrar como fonte de verdade

| Item | Motivo |
|------|--------|
| `src/data/*` do protótipo | Mocks; só fallback temporário se necessário |
| `src/types/content.ts` | Pode inspirar view-models; não substituir `models.ts` do CMS |
| Assets SVG default do create-next-app | Irrelevantes |

### Permanecer / preservar no site

| Item | Motivo |
|------|--------|
| `src/lib/cms/*` | Contrato WordPress |
| Firebase + GitHub Actions + plugin WP | Pipeline de publicação |
| `src/components/cms/*` | Até o layout final estar ligado; depois remover |

### Criar (novos, fora do core CMS quando possível)

| Peça | Função |
|------|--------|
| Adapters `CMSItem` → props de cards/detalhes | Mapear campos normalizados → UI |
| Adapter Options / Pages → site/home/sobre/contato | Quando o client passar a expor esses dados |
| Mapa de relações no build | `Map<id, CMSItem>` / índices por slug |
| Fallback de imagens locais | Homologação apenas |

---

## F. Mapeamento Mock → CMS

### Site global (`site.ts` / `navigation.ts`)

| Mock atual | Campo / origem CMS | Observação |
|------------|--------------------|------------|
| `siteInfo.name` | Options `site_name` | |
| `siteInfo.tagline` | Options `site_tagline` | |
| `siteInfo.address.*` | Options `address_*` | |
| `siteInfo.contact.email` | Options `email` | |
| `siteInfo.contact.whatsapp` | Options `whatsapp_display`, `whatsapp_url` | |
| `siteInfo.social[]` | Options `social_links` (repeater) | |
| `mainNavigation` | **Código** na v1 | Menu WP opcional no futuro |

### Home (`home.ts`)

| Mock | CMS | Observação |
|------|-----|------------|
| `homeVideo.provider` / `videoId` | derivados de Options `home_video_url` | Parser URL → YouTube/Vimeo |
| `homeVideo.startSeconds` | Options `home_video_start` | Default editorial ~130 na homologação via WP ou fallback |
| `homeVideo.title` / `description` | Options `home_video_title`, `home_video_description` | A11y |

### Arquivo listagem (`archive.ts` + `projects.ts`)

| Mock | CMS |
|------|-----|
| `archivePageContent.title` | Título da página WP “Arquivo” (ou ACF) |
| `archivePageContent.intro` | ACF página `intro` |
| `archivePageContent.sliderImages` | ACF página `slider_imagens` (Gallery) |
| `Project.slug` | `post.slug` |
| `Project.title` | `content.title` ← `acf.titulo` |
| `Project.excerpt` | `content.summary` ← `acf.resumo` |
| `Project.period` | formatado de `details.startYear` / `endYear` |
| `Project.status` | derivado de `details.ongoing` |
| `Project.featuredImage` | `content.image` ← `acf.imagem` |
| `Project.type` | **não existe no CMS** — ver seção H (campo novo opcional `tipo`) ou omitir/ocultar até existir |
| `Project.sortYear` | derivado de `ano_inicio` / data WP |

### Projeto detalhe (`projects.ts`)

| Mock | CMS |
|------|-----|
| `presentation` / `context` / `description` | único `content.descriptionHtml` ← `acf.descricao` |
| `featuredImage` + `gallery` | `galeria` (novo) para slider; fallback `imagem` |
| `videos[]` | `details.videoUrl` (único) na v1; CPT `video` relacionado fica para etapa futura |
| `credits` estruturados | `details.participants` / `details.curation` (strings) — UI adapta |
| `relatedEvents` / `relatedProjects` | IDs em outros CPTs + mapa no build (eventos com `relatedProjectId`) |

### Eventos / Cursos

| Mock | CMS |
|------|-----|
| textos de página | Páginas WP “Eventos” / “Cursos” (`intro`) |
| campos de item | Já cobertos em grande parte por `EventDetails` / `CourseDetails` |
| `modality` (evento) | Hoje só `evento_online`; ver campo novo `modalidade` se o layout exigir os 3 estados |
| `gallery` / `accessibility` / `type` | Gaps; só criar se o layout migrado ainda depender deles |

### Sobre (`about.ts`)

| Mock | CMS |
|------|-----|
| `AboutPageContent` completo | Página WP “Sobre” + grupo ACF espelhando a estrutura visual |

### Contato (`contact.ts` + `site.ts`)

| Mock | CMS |
|------|-----|
| `title` / `intro` / notas | Página WP “Contato” |
| canais | Options (compartilhados) |

### Imagens locais

| Mock | CMS |
|------|-----|
| `public/images/exemplos/*` via `prototypeImage()` | Media Library → ACF image/gallery → mapper → URL |

---

## G. Campos WordPress que já existem e serão reutilizados

Contrato atual em `src/lib/cms/models.ts` / documentação headless. **Reutilizar sem renomear.**

### Base (projeto, evento, curso, obra, publicacao, exposicao; vídeo sem `anexo`)

| Campo ACF | Uso no frontend v1 |
|-----------|-------------------|
| `titulo` | Títulos |
| `resumo` | Cards / excerpts |
| `descricao` | Corpo WYSIWYG (projeto: único bloco editorial) |
| `imagem` | Cards; fallback do slider do projeto |
| `anexo` | Link de anexo quando a UI exibir |
| `link_externo` | CTA externo quando houver |

### Projeto (`projeto`)

| Campo ACF | Uso |
|-----------|-----|
| `ano_inicio`, `ano_fim` | Período |
| `em_andamento` | Status continuo/encerrado |
| `local` | Meta (se exibido) |
| `participantes` | Créditos / participantes (texto) |
| `curadoria_coordenacao` | Créditos / curadoria (texto) |
| `video_url` | Vídeo associado ao projeto (v1: um vídeo) |

### Evento (`evento`)

| Campo ACF | Uso |
|-----------|-----|
| `data_inicio`, `data_fim`, `horario` | Agenda |
| `local`, `cidade` | Localização |
| `evento_online` | Indício de modalidade online |
| `link_evento` | Link do evento |
| `projeto_relacionado` | Relação → projeto (ID) |
| `participantes` | Participantes |
| `inscricoes_abertas`, `link_inscricao` | Inscrição |

### Curso (`curso`)

| Campo ACF | Uso |
|-----------|-----|
| `carga_horaria`, `modalidade` | Meta |
| `data_inicio`, `data_fim`, `horario`, `local` | Agenda / local |
| `ministrantes`, `publico_alvo` | Meta |
| `inscricoes_abertas`, `link_inscricao`, `valor` | Inscrição / valor |

### Demais CPTs (preservar no client; sem UI nova)

Campos de `obra`, `publicacao`, `exposicao`, `video` conforme contrato atual — **não remover** do CMS.

### Infraestrutura já existente (não é ACF de conteúdo, mas reutilizar)

- Endpoints REST dos 7 CPTs  
- Resolução de mídia por ID  
- `getProjects`, `getEvents`, `getCourses`, `getWorks`, `getPublications`, `getExhibitions`, `getVideos`, `getAllContent`  
- Static export + Firebase + Actions + plugin de dispatch  

---

## H. Campos que ainda precisam ser criados no WordPress

### Obrigatórios para fechar o layout v1

1. Options Page — settings globais + Home  
2. Página WP **Sobre** + campos ACF da estrutura visual  
3. Página WP **Contato** + campos ACF de copy  
4. Página WP **Arquivo** — `intro` + `slider_imagens`  
5. Páginas WP **Eventos** e **Cursos** — ao menos `intro` (título pode ser o título da página)  
6. CPT `projeto` — campo **`galeria`** (Gallery)

### Fortemente recomendados (layout do protótipo usa hoje)

7. CPT `projeto` — `tipo` (texto ou select), se o card/detalhe continuar exibindo “tipo”  
8. CPT `evento` — `modalidade` (`presencial` \| `online` \| `hibrido`), se o layout exigir além de `evento_online`

### Opcionais (só se a UI migrada ainda precisar)

9. CPT `evento` — `galeria`, `acessibilidade`, `tipo`  
10. CPT `curso` — `tipo`, `projeto_relacionado`  
11. Relação projeto ↔ vídeos (relationship) — se um único `video_url` for insuficiente  

### Não criar nesta etapa

- CPT para Sobre / Contato / Home  
- CPT unificado de “portfólio”  
- Três campos separados presentation/context/description  
- Telas para obra / publicação / exposição / vídeo  

---

## I. Especificação EXATA dos campos novos

### I.1 Options Page — “Configurações do Site”

**Local:** ACF Options Page (ex.: slug admin `atelie-settings`, menu “Ateliê”).  
**Exposição REST:** via endpoint de options ACF ou página/options plugin já usado no WP — a implementação do client será etapa futura; aqui só o contrato editorial.

| Nome técnico | Label | Tipo ACF | Obrig.? | Formato esperado | Uso no frontend |
|--------------|-------|----------|---------|------------------|-----------------|
| `site_name` | Nome do site | Text | Sim | string | Header, Footer, metadata |
| `site_tagline` | Tagline | Text | Não | string | Footer |
| `address_street` | Endereço — rua | Text | Não | string | Footer, Contato |
| `address_neighborhood` | Bairro | Text | Não | string | Footer, Contato |
| `address_city` | Cidade | Text | Não | string | Footer, Contato |
| `address_region` | Região / território | Text | Não | ex.: “Pequena África” | Footer, Contato |
| `email` | E-mail | Email | Não | e-mail válido | Contato, Footer |
| `whatsapp_display` | WhatsApp (texto) | Text | Não | texto exibido | Contato |
| `whatsapp_url` | WhatsApp (URL) | URL | Não | `https://wa.me/...` | Contato |
| `social_links` | Redes sociais | Repeater | Não | linhas abaixo | Footer, Contato |
| `social_links.label` | Nome da rede | Text | Sim (na linha) | “Instagram”, etc. | UI |
| `social_links.url` | URL | URL | Sim (na linha) | https | link |
| `home_video_url` | Vídeo da Home (URL) | URL | Sim (p/ Home) | YouTube ou Vimeo | Home hero |
| `home_video_start` | Início do vídeo (segundos) | Number | Não | inteiro ≥ 0 (ex.: 130) | `startSeconds` |
| `home_video_title` | Título do vídeo (a11y) | Text | Sim se houver vídeo | string | player / reduced motion |
| `home_video_description` | Descrição do vídeo (a11y) | Textarea | Sim se houver vídeo | string | a11y / fallback |

**Valor de homologação sugerido (preencher no WP, não no código como definitivo):**

- `home_video_url`: `https://www.youtube.com/watch?v=F3NquSxjLRE`  
- `home_video_start`: `130`

---

### I.2 Página WordPress — “Arquivo”

| Nome técnico | Label | Tipo ACF | Obrig.? | Formato | Uso |
|--------------|-------|----------|---------|---------|-----|
| `intro` | Introdução | Textarea | Não | texto curto | `PageHero` / intro |
| `slider_imagens` | Imagens do slider | Gallery | Não | IDs de mídia (Return Format: Image ID ou Array — o client deverá aceitar o mesmo padrão flexível da `imagem`) | `ImageSlider` na listagem `/arquivo/` |

Location rule: Page == Arquivo.

---

### I.3 Página WordPress — “Sobre”

Estrutura alinhada ao `AboutPageContent` do protótipo. Location: Page == Sobre.

| Nome técnico | Label | Tipo ACF | Obrig.? | Formato | Uso |
|--------------|-------|----------|---------|---------|-----|
| `intro` | Introdução | Textarea | Não | texto | PageHero |
| `identity_title` | Identidade — título | Text | Não | | seção |
| `identity_paragraphs` | Identidade — parágrafos | Repeater → Textarea `texto` **ou** WYSIWYG único | Não | | bloco identidade |
| `origin_title` | Origem — título | Text | Não | | |
| `origin_paragraphs` | Origem — parágrafos | Repeater textarea / WYSIWYG | Não | | |
| `letter_quote` | Carta — citação | Textarea | Não | | `AboutLetterBlock` |
| `letter_attribution` | Carta — atribuição | Text | Não | | |
| `letter_note` | Carta — nota | Text | Não | | |
| `practices_title` | Práticas — título | Text | Não | | |
| `practices_intro` | Práticas — intro | Textarea | Não | | |
| `practices_items` | Práticas — itens | Repeater Text **ou** Textarea (1 por linha) | Não | | lista |
| `practices_note` | Práticas — nota | Textarea | Não | | |
| `territory_title` | Território — título | Text | Não | | |
| `territory_paragraphs` | Território — parágrafos | Repeater / WYSIWYG | Não | | |
| `territory_image` | Território — imagem | Image | Não | ID ou objeto | |
| `luanda_title` | Luanda — título | Text | Não | | |
| `luanda_paragraphs` | Luanda — parágrafos | Repeater / WYSIWYG | Não | | |
| `luanda_image` | Luanda — imagem | Image | Não | ID ou objeto | |
| `complementary_title` | Currículo — título | Text | Não | | accordion |
| `complementary_sections` | Currículo — seções | Repeater | Não | `title` (Text) + `items` (Repeater Text ou textarea) | |
| `page_links` | Links “Explorar o site” | Repeater | Não | `label` + `url` | `AboutLinks` |

*Nota de implementação:* se o ACF ficar verboso, aceita-se agrupar em Field Groups (`identity`, `origin`, etc.) mantendo os nomes técnicos acima.

---

### I.4 Página WordPress — “Contato”

| Nome técnico | Label | Tipo ACF | Obrig.? | Formato | Uso |
|--------------|-------|----------|---------|---------|-----|
| `intro` | Introdução | Textarea | Não | | PageHero |
| `form_note` | Nota do formulário | Textarea | Não | | se o form voltar |
| `whatsapp_note` | Nota do WhatsApp | Textarea | Não | | `ContactChannels` |

Canais (endereço, e-mail, WhatsApp, redes) vêm das **Options**, não duplicar nesta página.

---

### I.5 Páginas “Eventos” e “Cursos”

| Nome técnico | Label | Tipo ACF | Obrig.? | Uso |
|--------------|-------|----------|---------|-----|
| `intro` | Introdução | Textarea | Não | PageHero de `/eventos/` e `/cursos/` |

---

### I.6 CPT `projeto` — campo obrigatório novo

| Nome técnico | Label | Tipo ACF | Obrig.? | Formato esperado | Uso no frontend |
|--------------|-------|----------|---------|-----------------|-----------------|
| `galeria` | Galeria | **Gallery** | Não | Lista de imagens; Return Format preferencial: **Image ID** (mesmo padrão de `imagem`). Aceitar Array/Object no mapper futuro. | Slider do detalhe `/arquivo/[slug]/` |

**Regras de consumo no frontend (produto):**

1. Se `galeria` tiver ≥ 1 imagem → slider com todas.  
2. Senão, se `imagem` existir → slider com 1 slide.  
3. Senão → fallback visual (placeholder / bloco vazio tipográfico sem quebrar layout).

**Configuração ACF sugerida (para quem for criar no WP):**

- Field Type: Gallery  
- Return Format: Image ID  
- Library: All  
- Mínimo / máximo: sem mínimo; máximo conforme necessidade editorial  
- Preview size: medium  
- Inserir no Field Group do CPT `projeto`, junto dos demais campos do projeto  

---

### I.7 CPT `projeto` — campo recomendado

| Nome técnico | Label | Tipo ACF | Obrig.? | Formato | Uso |
|--------------|-------|----------|---------|---------|-----|
| `tipo` | Tipo | Text ou Select | Não | ex.: “Intervenção urbana”, “Mostra / performance” | Card e meta do detalhe |

---

### I.8 CPT `evento` — campo recomendado

| Nome técnico | Label | Tipo ACF | Obrig.? | Formato | Uso |
|--------------|-------|----------|---------|---------|-----|
| `modalidade` | Modalidade | Select | Não | `presencial` \| `online` \| `hibrido` | Badges / detalhe (além de `evento_online`) |

---

## J. Estratégias específicas

### J.1 Galeria (projeto)

- Campo ACF `galeria` no CPT `projeto`.  
- Frontend: `ImageSlider` como **primeiro** bloco visual do detalhe (após back-link / meta / título — a ordem visual prioritária do slider em relação ao texto principal está definida; o título pode permanecer acima do slider se o design do protótipo adaptar, mas **não** haver imagem única destacada + gallery no fim).  
- **Definição desta spec:** título/meta podem ficar acima; o **primeiro bloco de mídia** é o slider; não renderizar gallery grid inferior com as mesmas imagens.  
- Extensão futura de `models`/`mappers`/`client` para resolver IDs da gallery — **somente quando autorizado**, espelhando `resolveImage`.

### J.2 Imagens

- Produção: Media Library → ACF → REST → resolver URL no build.  
- Homologação: fallback para `/images/exemplos/...` se CMS sem mídia.  
- Preferência alinhada ao CMS atual: URLs absolutas do WP; avaliar `next/image` + `images.unoptimized` no export **ou** `<img>` como na demo — decidir na implementação sem quebrar static export.

### J.3 Vídeo da Home

- Options: `home_video_url` + `home_video_start` (+ title/description).  
- Adapter: URL → `videoId` / provider para `YouTubeBackgroundPlayer`.  
- Respeitar `startSeconds` (~130).  
- Sem hardcode definitivo no frontend; fallback de homologação isolado e removível.

### J.4 Vídeos dos projetos

- V1: usar `video_url` do projeto (já existe).  
- Player visual: `VideoEmbed` / integração com `getVideoSource` via adapter.  
- CPT `video` permanece no client para uso futuro (relação / listagens).  
- Não criar UI de arquivo de vídeos agora.

### J.5 Relacionamentos

- Preservar IDs normalizados (`relatedProjectId`, etc.).  
- No build: a partir de `getAllContent()` (ou getters necessários), montar `Map<number, CMSItem>` e índices `slug → item`.  
- Componentes recebem `RelatedLink[]` já resolvidos (label + href).  
- Proibido: `fetch` por ID dentro de componentes cliente/servidor de UI.

### J.6 Conteúdo global

- Options Page como fonte de Header/Footer/Contato compartilhados.  
- Nav principal permanece no código na v1.

### J.7 Sobre / Contato

- Páginas WP + ACF (sem CPT).  
- Contato usa Options para canais + ACF da página para copy.

### J.8 Descrição do projeto

- Um campo `descricao` (WYSIWYG).  
- UI adapta (uma ou mais seções visuais a partir do HTML), sem exigir três campos ACF.

---

## K. Estratégia de fallback na homologação

| Situação | Fallback |
|----------|----------|
| Options Home vazias | Constante temporária de dev (YouTube `F3NquSxjLRE`, start `130`), marcada como `HOMOLOGATION_FALLBACK`, fácil de remover |
| Projeto sem `galeria` nem `imagem` | Placeholder visual neutro (sem inventar foto editorial) |
| Projeto sem mídia WP ainda | Opcional: cycle de `public/images/exemplos` **só em ambiente de homologação** |
| Página Sobre/Contato/Arquivo ainda vazia | Copy mínima ou estrutura vazia com shell visual; não republicar textos PROTO como se fossem finais |
| Relação ID sem item no mapa | Omitir o link (não quebrar página) |
| Coleção CMS com `status: "error"` | Comportamento já previsto em `safeCollection`; seção vazia + log no build |

Imagens locais **nunca** devem ser tratadas como conteúdo definitivo na documentação editorial ou no CMS.

---

## L. Estratégia de remoção dos mocks

1. Ligar cada rota ao CMS/Options/Pages.  
2. Remover imports de `src/data/*` (se tiverem sido copiados) e o diretório de mocks no site.  
3. Remover `HOMOLOGATION_FALLBACK` de vídeo quando Options estiverem preenchidas.  
4. Remover `public/images/exemplos` após mídia WP populada e QA visual.  
5. Remover `src/components/cms/*` e a página demo antiga.  
6. Remover textos “[Texto de protótipo…]” do WP se tiverem sido colados por engano.  
7. Atualizar `docs/HEADLESS-ARCHITECTURE.md` quando Options/Pages/`galeria` entrarem no contrato de código.

---

## M. Ordem de implementação recomendada

1. **WordPress (editorial):** criar Options, páginas ACF, campo `galeria` no `projeto` — conforme seções H/I (fora do repo Next, se aplicável).  
2. **Fundação visual no site:** Tailwind v4, `globals.css`, fontes, layout shell — **sem** trocar contrato CMS.  
3. **Rotas e shells** com dados ainda via fallback/homologação.  
4. **Home** visual + adapter de vídeo (fallback → depois Options).  
5. **Arquivo listagem** com `getProjects()` + intro/slider (página Arquivo quando disponível).  
6. **Arquivo detalhe:** `generateStaticParams` + slider (`galeria`/`imagem`) antes do texto; `descricao` HTML.  
7. **Eventos e Cursos** listagem + detalhe.  
8. **Sobre e Contato** após client/options/pages estarem acessíveis (extensão CMS **mínima e justificada**).  
9. **Mapa de relacionamentos** no build.  
10. **Limpeza** de demo CMS, mocks e imagens exemplo.  
11. **QA** static export + Firebase pipeline.

Cada etapa deve ser autorizável isoladamente. **Não** alterar `client.ts` / `models.ts` / `mappers.ts` / `video.ts` / `config.ts` até a etapa que realmente precise (ex.: ler `galeria` ou Options).

---

## N. O que NÃO deve ser alterado no CMS (nesta fase / por padrão)

Não alterar sem necessidade real documentada:

- `src/lib/cms/config.ts`  
- `src/lib/cms/client.ts`  
- `src/lib/cms/models.ts`  
- `src/lib/cms/mappers.ts`  
- `src/lib/cms/video.ts`  

Também preservar por padrão:

- Endpoints e nomes dos 7 CPTs  
- Semântica dos campos ACF já existentes  
- `safeCollection` / isolamento de falha por CPT  
- Resolução de mídia por ID  
- Prioridade de vídeo do CPT `video` (`arquivo_video` > `video_url`)  
- Static export + Firebase + GitHub Actions + plugin `atelie-github-deploy`  
- Ausência de fetch WordPress dentro de componentes de UI  

Quando uma alteração for necessária (ex.: `galeria`, Options):

1. Justificar no PR / na tarefa.  
2. Preferir extensão compatível (campos opcionais; parsers que aceitam ID ou objeto).  
3. Atualizar a documentação headless na mesma entrega.  
4. Não remover suporte aos CPTs sem UI.

---

## O. Riscos técnicos

| Risco | Mitigação |
|-------|-----------|
| `app/` (protótipo) vs `src/app/` (site) | Migrar sempre para `src/app/` |
| Tailwind v4 ausente no site | Instalar e substituir CSS da demo com cuidado para não conflitar com build |
| `next/image` + domínios WP + `output: "export"` | `unoptimized` e/ou `<img>`; não assumir optimizer em hosting estático |
| `trailingSlash: true` | Revisar todos os `href` e CTAs |
| Campo `galeria` ainda não no mapper | Não fingir suporte no client até a etapa autorizada; UI pode usar só `imagem` + fallback |
| Options/Pages sem client hoje | Planejar extensão mínima; não fetch ad hoc em componentes |
| `startSeconds` vs `getVideoSource` | Adapter da Home / extensão futura de `video.ts` se necessário |
| Um `descricao` HTML vs seções do protótipo | Renderizar com `RichText` / tipografia editorial; evitar inventar campos |
| Relacionamentos só unidirecionais | Mapa no build: eventos→projeto; listar relacionados no detalhe do projeto por filtro |
| Limite `per_page=100` | Monitorar crescimento do acervo |
| Conteúdo PROTO publicado por engano | Checklist editorial antes do go-live |
| Duas bases de tipagem (`content.ts` vs `models.ts`) | View-models/adapters; CMS models continuam sendo a fonte do contrato |
| Remoção precoce de imagens locais | Só após QA com mídia WP |

---

## Apêndice — Checklist rápido para o WordPress

- [ ] Options Page com settings + Home video  
- [ ] Página Sobre + ACF  
- [ ] Página Contato + ACF  
- [ ] Página Arquivo + `intro` + `slider_imagens`  
- [ ] Páginas Eventos/Cursos + `intro`  
- [ ] CPT `projeto`: campo Gallery `galeria` (Return Format: Image ID)  
- [ ] (Recomendado) `tipo` no projeto  
- [ ] (Recomendado) `modalidade` no evento  
- [ ] Preencher vídeo Home de homologação (URL + start 130)  
- [ ] Não apagar CPTs obra/publicacao/exposicao/video  

---

## Apêndice — Escopo explícito fora desta migração visual v1

- Interface unificada de portfólio multi-CPT  
- Listagens/detalhes de obra, publicação, exposição, vídeo  
- Formulário de contato funcional (envio real)  
- Menu WordPress dinâmico  
- Separação ACF presentation/context/description  
- Paginação além de 100 itens por CPT  
- Alterações não justificadas no core `src/lib/cms/*`  

---

*Fim da especificação. Próximo passo após aprovação: implementação por etapas (começando por fundação visual e/ou campos ACF no WordPress), sem copiar o protótipo de forma cega.*

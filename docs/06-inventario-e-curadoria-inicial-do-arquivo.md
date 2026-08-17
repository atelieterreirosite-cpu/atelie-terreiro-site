# Inventário e Curadoria Inicial do Arquivo — Ateliê Terreiro

Documento de inventário real e curadoria preliminar da área **Arquivo / Portfólio**, com base nos materiais analisados em agosto de 2026.

Complementa e aplica os critérios editoriais de:

- `/docs/01-visao-do-projeto.md`
- `/docs/02-arquitetura-do-site.md`
- `/docs/03-conteudo-da-pagina-sobre.md`
- `/docs/04-conteudo-arquivo-portfolio.md`
- `/docs/05-conteudo-de-eventos.md`

Este documento **não** redige textos finais de páginas, **não** define layout e **não** define implementação técnica ou CMS. Também **não** substitui um inventário dedicado da área Eventos — registra, quando pertinente, a **fronteira** entre Arquivo e Eventos conforme o doc 05.

---

## 1. Objetivo

Registrar, a partir de **evidências localizáveis**, quais iniciativas do Ateliê Terreiro podem alimentar o Arquivo; qual documentação existe ou falta; e propor uma curadoria inicial para a primeira versão do site.

Função de ponte entre:

1. a estratégia editorial do documento 04;
2. a distinção Arquivo × Eventos do documento 05;
3. o acervo/conteúdo real disponível (ou ausente);
4. a futura redação das páginas individuais;
5. a futura definição do CMS e desenvolvimento.

**Regra aplicada em todo o documento:** não inventar. Onde não houver evidência, consta como **não localizado**, **a confirmar** ou **parcial**.

---

## 2. Metodologia e fontes analisadas

### 2.1 Busca no repositório

Varredura completa em `d:\documents_d\programs_flutter\freelas\Atelie\atelie_terreiro` e pasta pai `d:\documents_d\programs_flutter\freelas\Atelie\`, incluindo arquivos ocultos e ignorados pelo Git (exceto `node_modules` e `.next`).

**Resultado:** o repositório contém essencialmente o esqueleto Next.js e documentação estratégica. **Não foram localizados** no repositório:

- PDFs, DOCX ou textos institucionais do briefing;
- listas de projetos, exposições ou filmografia em arquivos dedicados;
- pastas de imagens, vídeos ou acervo fotográfico;
- JSON ou dados estruturados de conteúdo;
- protótipos de páginas com conteúdo do Arquivo;
- materiais por projeto (pastas, fichas, galerias).

**Arquivos encontrados com potencial relação ao Ateliê (fora de `/docs`):**

| Arquivo | Local | Observação |
|---------|--------|------------|
| `atelie-terreiro-logo-edited.png` | pasta pai `Atelie/` | Logo institucional; **não** vinculado a projeto específico |
| `app/page.tsx`, `app/layout.tsx`, `public/*.svg` | repositório | Boilerplate Next.js; sem conteúdo editorial |
| `README.md` | repositório | Documentação técnica padrão |

### 2.2 Documentos em `/docs` analisados

| Arquivo | Uso neste inventário |
|---------|----------------------|
| `01-visao-do-projeto.md` | Contexto institucional; lista de atividades; menção a materiais “fornecidos”; links externos |
| `02-arquitetura-do-site.md` | Nomes e períodos de projetos exemplo; estrutura de URLs |
| `03-conteudo-da-pagina-sobre.md` | Distinção Sobre × Arquivo; menções a projetos |
| `04-conteudo-arquivo-portfolio.md` | Critérios editoriais para página de projeto; relação conceitual com Eventos |
| `05-conteudo-de-eventos.md` | Definição de evento; temporalidade; vínculo projeto ↔ evento; fronteiras Eventos × Cursos; princípio de não duplicar acervo |

### 2.3 Materiais citados como “fornecidos” — status no repositório

O documento 01 registra que já foram fornecidos: documentos institucionais, apresentação, história, carta, biografia, currículo, **lista de projetos**, lista de exposições, filmografia, bibliografia, informações de **cursos e eventos**, fotografias etc.

O documento 05 orienta a área Eventos, mas **não contém inventário de ocorrências** — apenas critérios editoriais. As menções a eventos neste doc 06 derivam dos mesmos materiais analisados para o Arquivo.

**Status:** **não localizados como arquivos no repositório analisado.** Este inventário não pode detalhar esses materiais até que sejam integrados ao projeto (pasta de acervo, CMS ou anexo versionado).

### 2.4 Consulta complementar a presenças digitais (fonte externa)

Os links abaixo constam em `docs/01-visao-do-projeto.md` (seção 12). Foram consultados **apenas** para complementar lacunas do repositório. **Toda informação derivada deles está marcada como origem externa** — não conta como “encontrada no repositório”.

| URL | Resultado da consulta |
|-----|------------------------|
| https://atelieterreiro.wordpress.com/ | Página mínima: identificação da plataforma, e-mail `atelieterreiro@gmail.com`. **Sem** fichas de projetos, galerias ou cronologia. |
| https://luanda.art.br/atelie-terreiro/ | Texto extenso: cronologia, descrições de projetos coletivos, participantes (Grupo 1), convidados (Convida), créditos parciais. **Site pessoal de Luanda**, não repositório do projeto. |
| https://luanda.art.br/biografia/ | CV com entradas de projetos do Ateliê, edições de Video Gira, Circuito Terreiro, ocupações 2021 etc. **Site pessoal de Luanda.** |
| https://www.youtube.com/@atelieterreiro5653 | Canal identificado; **listagem de vídeos não acessível** na consulta automatizada. |
| https://vimeo.com/user134238188 | Perfil identificado; **conteúdo não catalogado** na consulta automatizada. |

### 2.5 Critério de registro de origem

Neste documento, usamos:

- **Encontrado no repositório** — arquivo ou texto dentro do repo;
- **Mencionado em docs/** — nome/período citado nos documentos 01–05, sem acervo associado;
- **Fonte externa (link em docs/01)** — conteúdo público fora do repo; **a confirmar** para uso no site do Ateliê (autorização, fronteira com luanda.art.br);
- **Inferido** — evitado; quando inevitável, explicitado;
- **A confirmar** — depende da cliente.

---

## 3. Inventário geral

### 3.1 Tabela principal

| Item | Período | Tipo provável | Evidência encontrada | Documentação | Mídia | Participação/créditos | Relações | Classificação | Pendências |
|------|---------|---------------|----------------------|--------------|-------|----------------------|----------|---------------|------------|
| **7 Línguas – Lambe-lambe do Ateliê Terreiro para o Povo de Rua** | 2025 (mencionado) | Intervenção urbana / edital / lambe-lambe | **Mencionado em docs/** `02`, `04` (2025). **Fonte externa:** luanda.art.br/atelie-terreiro/ (texto: edital, equipe, local Império das Velas). luanda.art.br/biografia/ (curadoria Luanda, Daniel Franco, Sérgio Xavier). | Parcial (texto externo) | Não localizado no repo; imagens/vídeos **a confirmar** | Parcial: Luanda, Sérgio Xavier, Daniel Franco (curadores/produtores — fonte externa) | Pequena África; possível vínculo com celebração 7 anos | **B** — candidato a página, falta acervo no repo e confirmação de realização/publicação | Integrar acervo; confirmar status (realizado/em curso); créditos fotográficos; autorização |
| **Bandeiras e Estandartes do Ateliê Terreiro** | 2024– (mencionado) | Mostra + performance / edital | **Mencionado em docs/** `02`, `04`. **Fonte externa:** descrição completa em luanda.art.br/atelie-terreiro/ (37 artistas, edital, cortejo Pequena África, júri). | Parcial (texto externo rico) | Não localizado no repo | Parcial: júri nomeado (fonte externa); 37 artistas sem lista completa no repo | Mostra + performance; território (Pedra do Sal, Cais do Valongo) | **A** — forte candidato, **condicionado** à entrada do acervo | Lista completa dos 37 artistas; fotos/créditos; textos oficiais; autorização |
| **Mostra Onjila** | 2023– (mencionado) | Mostra / exposição | **Mencionado em docs/** `02`, `04`. **Fonte externa:** luanda.art.br/atelie-terreiro/ (objetos + performance, curadoria Luanda e Alexandre Sá). biografia: “Mostra Onjila & Video Gira” (2023). | Parcial | Não localizado no repo | Parcial: Luanda, Alexandre Sá (fonte externa); artistas participantes **a confirmar** | Video Gira (edições 2023); 5 anos do Ateliê | **A** — forte candidato | Artistas da mostra; registro fotográfico; relação exata com Video Gira na mesma edição |
| **Video Gira** | 2022– (mencionado); edições 2022–2024 (fonte externa) | Mostra de vídeos / projeto audiovisual contínuo | **Mencionado em docs/** `01`–`04`. **Fonte externa:** 8 edições (luanda.art.br/atelie-terreiro/); edições 1–3 (2022), 4–7 (2023), 8 (2024) na biografia. | Parcial | Vídeos: canal YouTube **mencionado** em docs/01, **não catalogados** no repo | Parcial: curadoria Luanda (fonte externa); artistas por edição **a confirmar** | Mostra Onjila (2023); YouTube/Vimeo | **A** — forte candidato; definir modelo de edições (doc 04 §5) | Inventário de vídeos por edição; embeds; créditos; obras/artistas |
| **Ateliê Terreiro Convida** | 2020–2021 (mencionado) | Programa público / lives | **Mencionado em docs/** `01`–`04`. **Fonte externa:** descrição e lista de convidados em luanda.art.br/atelie-terreiro/; biografia lista eventos 2021. | Parcial | Lives YouTube **a confirmar** (canal não catalogado) | Parcial: convidados nomeados (fonte externa); mediadores **a confirmar** | Grupo/Laboratório (mesmo período); Ocupações | **A** — forte candidato | Links das lives; créditos; autorização de uso; tratamento edição única vs. série |
| **Grupo Ateliê Terreiro – Laboratório de Estudos e Práticas Artísticas** (1.º grupo) | 2019–2022 (mencionado) | Grupo de estudos / laboratório | **Mencionado em docs/** `02`, `04`. **Fonte externa:** participantes por ciclo (2019–2022) em luanda.art.br/atelie-terreiro/; cronologia 2019–2021 em texto narrativo. | Parcial | Não localizado no repo | Parcial: listas por ciclo (fonte externa); coordenação Luanda | Convida; Ocupações; 2.º Grupo (2025–) | **A** — forte candidato | Confirmar nome oficial; material visual dos encontros; fronteira com Cursos |
| **Circuito Terreiro** | 2025 (fonte externa — ArtRio 15.ª edição); **não localizado** período nos docs/ | Programa público / participação em feira | **Mencionado em docs/** `01`, `03`, `04` (sem período). **Fonte externa:** biografia — “Circuito Terreiro”, Semana de Arte e Cultura, ArtRio 15.ª edição, com Grupo de Estudos e Plataforma Ateliê Terreiro. | Parcial | Não localizado no repo | Parcial: Grupo de Estudos + Plataforma (fonte externa) | ArtRio 2025; Grupo de Estudos | **D** — tendência a **Evento** ou registro dentro de participação institucional; **H** até confirmar natureza | Confirmar se é projeto autônomo ou ocorrência pontual; ano; material |
| **Ocupações indígena e afro-brasileira** | 2020–2021 (fonte externa) | Ação online / programação | **Não mencionado** nos docs/01–05. **Fonte externa:** luanda.art.br/atelie-terreiro/ (cronologia); biografia: “Ocupação Abril Indígena”, “Ocupação Maio Afro-brasileiro” (2021). | Parcial (só fonte externa) | Não localizado no repo | A confirmar | Grupo/Laboratório; Convida (mesmo período) | **C** — registro dentro de Grupo/Convida, salvo confirmação de identidade própria | Confirmar nomenclatura; material de redes; se merece menção ou subseção |
| **Grupo de Estudos do Ateliê Terreiro – 2.º Grupo** | jul 2025 – jun 2026 (fonte externa) | Grupo de estudos | **Não mencionado** nos docs/01–05 com este nome. **Fonte externa:** luanda.art.br/atelie-terreiro/ (participantes listados). | Parcial | Não localizado no repo | Parcial: 13 artistas listados (fonte externa) | Sucessor do 1.º Grupo | **E** — tendência a **Curso**/formação ou menção em Sobre; **B** se cliente quiser como projeto | Confirmar se entra no Arquivo ou Cursos; material didático/registros |
| **21 Dias de Ativismo Contra o Racismo** | 2021 (fonte externa) | Evento / programação | **Não mencionado** nos docs/01–05. **Fonte externa:** biografia (2021). | Não localizado no repo | Não localizado | A confirmar | — | **D** — Evento | Confirmar natureza e material |
| **Mostras anuais** (genérico) | — | Categoria de atuação | **Mencionado em docs/** `01`, `03` como tipo de atividade | Apenas menção | Não localizado | — | Mostra Onjila possivelmente integra essa linha | **F** / **H** — categoria, não projeto | Não criar página só pela categoria |
| **Performances / exposições / intervenções urbanas** (genérico) | — | Categorias de prática | **Mencionado em docs/** `01`, `03`, `04` | Apenas menção | Não localizado | — | — | **F** — síntese em Sobre | — |
| **Projetos curatoriais** (genérico) | — | Categoria | **Mencionado em docs/** `01`, `04` | Apenas menção | — | — | — | **F** | — |
| **Visitas guiadas / rodas de conversa** | — | Formato de programação | **Mencionado em docs/** `01`, `03` | Apenas menção | — | — | Área Eventos | **D** / **F** | — |

### 3.2 Síntese quantitativa do repositório

| Tipo de evidência | Quantidade |
|-------------------|------------|
| Projetos nomeados nos docs/ com período | 6 (+ Circuito Terreiro sem período) |
| Projetos com texto descritivo **no repositório** | 0 |
| Imagens de projetos **no repositório** | 0 |
| Vídeos/PDFs de projetos **no repositório** | 0 |
| Projetos com descrição apenas em **fonte externa** | 8+ (incl. ocupações, 2.º grupo, Circuito) |

---

## 4. Projetos já conhecidos

Verificação específica dos nomes citados nos documentos 01–05. **Menção em documento estratégico ≠ material de acervo localizado.**

### 4.1 7 Línguas – Lambe-lambe do Ateliê Terreiro para o Povo de Rua

| Campo | Status |
|-------|--------|
| Material localizado no repo | **Não** |
| Material em fonte externa | Texto descritivo (edital, local, equipe) em luanda.art.br/atelie-terreiro/ e entrada no CV |
| Período encontrado | **2025** — docs/02, docs/04; fonte externa alinhada |
| Imagens no repo | **Não localizado** |
| Texto no repo | **Não** (só menção nominal nos docs/) |
| Participantes/créditos | Parcial (fonte externa): Luanda, Sérgio Xavier, Daniel Franco |
| Suficiente para página? | **Não** sem acervo visual e confirmação de realização |
| Confirmar com cliente | Status do projeto; acervo; lista de artistas do edital; créditos; autorização; fronteira com luanda.art.br |

**Registro explícito:** nome e período **mencionados nos docs/**; acervo **não localizado nos materiais analisados do repositório**.

### 4.2 Bandeiras e Estandartes do Ateliê Terreiro

| Campo | Status |
|-------|--------|
| Material localizado no repo | **Não** |
| Material em fonte externa | Descrição extensa: edital, 37 artistas, mostra, cortejo, júri |
| Período | **2024–** — docs/02, docs/04; fonte externa: realização 2024 |
| Imagens | **Não localizado** no repo |
| Texto | Parcial (fonte externa) |
| Participantes | Parcial: júri nomeado; 37 artistas sem lista nominal no repo |
| Suficiente para página? | **Quase** em termos textuais (externos); **não** para publicação sem mídia |
| Confirmar | Lista completa de artistas; fotos do cortejo/mostra; créditos; textos oficiais |

### 4.3 Mostra Onjila

| Campo | Status |
|-------|--------|
| Material localizado no repo | **Não** |
| Material em fonte externa | Descrição + curadores; biografia cita edição conjunta com Video Gira (2023) |
| Período | **2023–** — docs/02, docs/04 |
| Imagens | **Não localizado** |
| Texto | Parcial (fonte externa) |
| Participantes | Curadoria Luanda e Alexandre Sá (fonte externa); artistas **a confirmar** |
| Suficiente para página? | **Não** sem registro visual e lista de obras/artistas |
| Confirmar | Artistas; continuidade (2024–?); relação com “Mostra Onjila & Video Gira” |

### 4.4 Video Gira

| Campo | Status |
|-------|--------|
| Material localizado no repo | **Não** |
| Material em fonte externa | Descrição; 8 edições; anos por edição na biografia |
| Período | **2022–** — docs/; edições 2022, 2023, 2024 (fonte externa) |
| Imagens | **Não localizado** |
| Vídeos | Canal YouTube citado em docs/01; **não catalogado** |
| Texto | Parcial (fonte externa) |
| Participantes | Curadoria Luanda; artistas por edição **a confirmar** |
| Suficiente para página? | **Potencial alto** se vídeos forem mapeados; **insuficiente** só com menções |
| Confirmar | Modelo editorial (1 página + edições vs. páginas por edição); links; créditos |

### 4.5 Ateliê Terreiro Convida

| Campo | Status |
|-------|--------|
| Material localizado no repo | **Não** |
| Material em fonte externa | Formato (live YouTube); lista de convidados |
| Período | **2020–2021** — docs/02, docs/04 |
| Imagens/vídeos | **Não localizado** no repo; lives **a confirmar** no YouTube |
| Texto | Parcial (fonte externa) |
| Participantes | Convidados nomeados na fonte externa (Jaider Esbell, Paula Berbert, Ayrson Heráclito, Ricardo Basbaum, Jorge Vasconcellos, Ana Paula Lopes, Joceval Santos, Pai Cléber/Mèjitó Cléber de Gbsèn) |
| Suficiente para página? | **Parcial** — boa base textual externa; falta acervo no repo |
| Confirmar | URLs das lives; se série encerrada; créditos de gravação |

### 4.6 Grupo Ateliê Terreiro – Laboratório de Estudos e Práticas Artísticas

| Campo | Status |
|-------|--------|
| Material localizado no repo | **Não** |
| Material em fonte externa | Narrativa 2019–2022; participantes por ciclo (2019–2022) |
| Período | **2019–2022** — docs/02, docs/04 |
| Imagens | **Não localizado** |
| Texto | Parcial (fonte externa) |
| Participantes | Listas por ciclo na fonte externa (nomes variam por ano) |
| Suficiente para página? | **Parcial** — identidade clara; falta registro visual/documental no repo |
| Confirmar | Nome oficial preferido; material de encontros; relação com Ocupações |

### 4.7 Circuito Terreiro

| Campo | Status |
|-------|--------|
| Material localizado no repo | **Não** |
| Material em fonte externa | Entrada na biografia: ArtRio 15.ª edição, Semana de Arte e Cultura |
| Período nos docs/ | **Não localizado** |
| Período em fonte externa | **2025** (seção [2025] do CV — **a confirmar** alinhamento com ArtRio 15.ª) |
| Imagens/texto no repo | **Não localizado** |
| Suficiente para página de projeto? | **Provavelmente não** — parece ocorrência/programação vinculada a feira |
| Confirmar | Natureza (projeto vs. evento); material; repetição em outras edições |

**Registro explícito:** **não localizado nos materiais do repositório** além de menções genéricas nos docs/01, 03, 04. Detalhe factual só em **fonte externa**.

---

## 5. Outros projetos/iniciativas encontrados

Itens **não** listados como exemplos nos docs/02–05, identificados na consulta complementar (fonte externa) ou como subcomponentes.

| Item | Natureza | Evidência | Classificação preliminar |
|------|----------|-----------|--------------------------|
| Ocupações indígena e afro-brasileira | Atividade online (2020–2021) | Fonte externa: luanda.art.br/atelie-terreiro/; biografia (Abril/Maio 2021) | **C** — dentro de Grupo/Convida |
| Grupo de Estudos – 2.º Grupo | Formação/grupo (jul 2025 – jun 2026) | Fonte externa: luanda.art.br/atelie-terreiro/ | **E** ou **B** — confirmar com cliente |
| 21 Dias de Ativismo Contra o Racismo | Evento (2021) | Fonte externa: biografia | **D** |
| “Rio é Poesia” / stand ArtRio (Secretaria de Cultura RJ) | Participação em feira | Fonte externa: biografia [2025] | **F** ou menção em Circuito/ArtRio — **a confirmar** |
| Logo `atelie-terreiro-logo-edited.png` | Identidade visual | Arquivo na pasta pai `Atelie/` | **F** — institucional, não Arquivo |

**Não inventados como projetos:** menções genéricas a “performances”, “exposições”, “laboratórios”, “grupos de estudos” sem nome próprio — permanecem como **categorias de atuação** (Sobre / taxonomia futura).

---

## 6. Níveis de documentação

Escala **apenas curatorial** (não mede qualidade artística):

| Nível | Significado |
|-------|-------------|
| **0** | Apenas menção (nome ou categoria) |
| **1** | Nome + alguma informação (ex.: período nos docs/) |
| **2** | Texto/contexto + algum material (texto externo ou link) |
| **3** | Texto/contexto + indício de mídia (ex.: descrição + canal YouTube, sem inventário) |
| **4** | Documentação rica: múltiplos materiais, créditos, contexto verificável **no acervo de trabalho** |

### 6.1 Nível por item (com base no **repositório**)

| Item | Nível no repo | Nível incluindo fonte externa (não integrada) |
|------|---------------|-----------------------------------------------|
| 7 Línguas | 1 | 2 |
| Bandeiras e Estandartes | 1 | 2–3 (texto rico; mídia a confirmar) |
| Mostra Onjila | 1 | 2 |
| Video Gira | 1 | 2–3 (vídeos presumidos no YouTube, não catalogados) |
| Ateliê Terreiro Convida | 1 | 2–3 |
| Grupo/Laboratório (1.º) | 1 | 2 |
| Circuito Terreiro | 0–1 | 2 |
| Ocupações | 0 | 2 |
| 2.º Grupo de Estudos | 0 | 2 |
| Categorias genéricas (performances etc.) | 0 | 0 |

**Conclusão:** nenhum item atinge **nível 4** no repositório. Nenhum atinge **nível 3** no repositório. A publicação de páginas completas depende de **integração do acervo** prometido no briefing (doc 01 §12).

---

## 7. Inventário de mídia

### 7.1 Por projeto (repositório + indícios externos)

| Projeto | Imagens (repo) | Vídeos (repo) | PDFs/docs (repo) | Links externos (docs/01) | Destaque possível | Créditos/legendas | Observações |
|---------|----------------|---------------|------------------|----------------------------|-------------------|-------------------|-------------|
| 7 Línguas | 0 | 0 | 0 | — | **A confirmar** | **A confirmar** | Local descrito só em fonte externa |
| Bandeiras e Estandartes | 0 | 0 | 0 | — | **A confirmar** | **A confirmar** | Cortejo/mostra exigem fotografia |
| Mostra Onjila | 0 | 0 | 0 | — | **A confirmar** | **A confirmar** | — |
| Video Gira | 0 | 0 | 0 | YouTube, Vimeo | **A confirmar** | **A confirmar** | Prioridade: mapear canal |
| Convida | 0 | 0 | 0 | YouTube | **A confirmar** | **A confirmar** | Lives como registro principal |
| Grupo/Laboratório | 0 | 0 | 0 | — | **A confirmar** | **A confirmar** | — |
| Circuito Terreiro | 0 | 0 | 0 | — | **A confirmar** | **A confirmar** | — |

### 7.2 Ativos institucionais localizados

| Arquivo | Tipo | Uso provável |
|---------|------|--------------|
| `../atelie-terreiro-logo-edited.png` | Imagem PNG (~483 KB) | Identidade / Sobre / Contato — **não** substitui mídia de projeto |

### 7.3 Resposta à pergunta curatorial

> “Temos material suficiente para construir uma página interessante?”

**No estado atual do repositório: não**, para nenhum projeto nomeado. Há base **textual** parcial em fonte externa (luanda.art.br) que pode orientar redação **após** confirmação da cliente e entrada de fotografias/vídeos/PDFs no acervo de trabalho.

---

## 8. Avaliação editorial por projeto

Critérios dos docs 04 §4 e 05 §§3, 9. Classificação **preliminar** — não é decisão da cliente. Ver também seção 9 (fronteira Arquivo × Eventos).

| Projeto | Class. | Motivo breve |
|---------|--------|--------------|
| Bandeiras e Estandartes | **A** | Identidade própria, edital, mostra + performance, período claro; texto externo substancial |
| Mostra Onjila | **A** | Iniciativa nomeada, curadoria, linha temporal; continuidade “2023–” |
| Video Gira | **A** | Projeto contínuo, múltiplas edições, eixo audiovisual alinhado ao site |
| Ateliê Terreiro Convida | **A** | Série reconhecível, convidados documentados (fonte externa). Lives individuais tendem a **Eventos** passados vinculados (doc 05 §9) |
| Grupo/Laboratório (1.º) | **A** | Trajetória 2019–2022, participantes por ciclo |
| 7 Línguas | **B** | Nome e equipe; acervo e status de realização indefinidos no repo |
| Circuito Terreiro | **D** / **H** | Parece ocorrência em feira; material insuficiente para projeto autônomo |
| Ocupações | **C** | Desdobramento do mesmo período do Grupo/Convida |
| 2.º Grupo de Estudos | **E** / **B** | Formação em curso; pode ser Cursos ou menção em Sobre |
| 21 Dias de Ativismo | **D** | Evento pontual |
| Performances / exposições (genérico) | **F** | Categoria de atuação |
| Produções só no CV de Luanda (obras individuais) | **G** | Verificar fronteira com luanda.art.br |
| Itens só mencionados sem nome | **H** | — |

---

## 9. Fronteira Arquivo × Eventos

Aplicação dos critérios dos docs **04** e **05** ao acervo analisado. Classificações **preliminares** — vínculos finais: **a definir** com a cliente (docs 04 §6, 05 §9).

### 9.1 Princípios aplicados (síntese do doc 05)

| Área | Pergunta que responde | Conteúdo prioritário |
|------|----------------------|----------------------|
| **Arquivo** (`/arquivo/[projeto]`) | “O que é / foi esta iniciativa?” | Trajetória, contexto, processo, acervo, créditos |
| **Eventos** (`/eventos/[evento]`) | “O que acontece / aconteceu e como participar?” | Data, horário, local, modalidade, inscrição/participação |

Regras relevantes para este inventário (doc 05 §§3, 8, 9):

1. **Não** criar projeto no Arquivo para cada evento.
2. **Não** criar evento para cada projeto — só quando houver ocorrência pública documentável.
3. **Não** duplicar galerias e textos curatoriais longos: acervo no Arquivo; ficha operacional no Evento.
4. Eventos **passados** podem permanecer de forma curada (doc 05 §4, §8) — distinto do papel do Arquivo.
5. Inscrição e datas: fonte da verdade em **Eventos**; narrativa duradoura em **Arquivo**.

### 9.2 Mapa preliminar por item

| Item | Tendência Arquivo | Tendência Eventos | Modelo editorial (doc 04 §5 / doc 05 §9) |
|------|-------------------|-------------------|-------------------------------------------|
| **7 Línguas** | Página de projeto (iniciativa/edital) | Ocorrência da intervenção (passado ou em andamento), se confirmada | **C** — projeto + evento(s) relacionado(s) |
| **Bandeiras e Estandartes** | Página de projeto (edital, mostra, memória) | Cortejo/performance coletiva como evento(s) passado(s) | **C** — projeto + evento(s) |
| **Mostra Onjila** | Página de projeto | Período de visitação/abertura como evento **em andamento** ou passado, se houver datas | **C** — projeto + evento(s) |
| **Video Gira** | Página de projeto (linha 2022–) | Cada **edição** ou sessão pode ser evento passado vinculado (doc 05 §3: sessão audiovisual) | **C** — projeto + eventos por edição |
| **Ateliê Terreiro Convida** | Página de projeto (série 2020–2021) | **Cada live** como evento passado; acervo extenso permanece no projeto | **C** — projeto + eventos |
| **Grupo/Laboratório (1.º)** | Página de projeto | Encontros quinzenais **não** precisam virar eventos independentes (formação contínua — doc 05 §10) | **A** ou **C** — projeto; Ocupações como eventos pontuais |
| **Ocupações indígena e afro-brasileira** | Menção/subseção em Grupo ou Convida | Cada ocupação (Abril/Maio 2021) como evento online **passado** | **C** — registro em Eventos + link ao projeto |
| **Circuito Terreiro** | **Não** recomendado como projeto autônomo | **Evento** ou programação na ArtRio (2025 — fonte externa) | **Só Eventos** (ou menção institucional) |
| **21 Dias de Ativismo** | Não | Evento pontual (2021 — fonte externa) | **Só Eventos** |
| **2.º Grupo de Estudos** | Improvável | Encontros mensais → **Cursos**, não série de eventos (doc 05 §10) | **Cursos** (doc 05 §10) |
| **Rodas / visitas guiadas** (genérico) | Não | Eventos quando houver programação futura | **Só Eventos** |
| **Performances / intervenções avulsas** | Só se identidade de projeto confirmada | Ocorrência pontual → Evento | **A confirmar** caso a caso |

### 9.3 Candidatos a Eventos identificados no mesmo acervo

Itens que **não** devem virar páginas de Arquivo, mas podem alimentar `/eventos` quando houver datas e material. **Nenhum evento individual foi localizado como arquivo no repositório** — lista derivada de menções + fonte externa.

| Candidato a evento | Período | Status provável | Projeto Arquivo relacionado | Evidência | Material no repo |
|--------------------|---------|-----------------|----------------------------|-----------|------------------|
| Circuito Terreiro (ArtRio) | 2025 (a confirmar) | Passado (se ocorreu) | Grupo de Estudos / plataforma — link **a definir** | Fonte externa: biografia | **Não localizado** |
| Lives Ateliê Terreiro Convida (várias) | 2020–2021 | Passado | Ateliê Terreiro Convida | Fonte externa: convidados nomeados | **Não localizado** (URLs YouTube a confirmar) |
| Ocupação Abril Indígena | 2021 | Passado | Grupo/Laboratório ou Convida | Fonte externa: biografia | **Não localizado** |
| Ocupação Maio Afro-brasileiro | 2021 | Passado | Grupo/Laboratório ou Convida | Fonte externa: biografia | **Não localizado** |
| 21 Dias de Ativismo Contra o Racismo | 2021 | Passado | — ou link genérico Ateliê | Fonte externa: biografia | **Não localizado** |
| Cortejo Bandeiras e Estandartes | 2024 (a confirmar data) | Passado | Bandeiras e Estandartes | Fonte externa: luanda.art.br/atelie-terreiro/ | **Não localizado** |
| Edições Video Gira (1–8) | 2022–2024 | Passado | Video Gira | Fonte externa: biografia | **Não localizado** |
| Intervenção 7 Línguas (lambe-lambe) | 2025 | A confirmar | 7 Línguas | Fonte externa | **Não localizado** |

**Observação (doc 05 §8):** eventos passados devem reter ficha **enxuta**; registros fotográficos extensos ficam no Arquivo quando existir página de projeto.

### 9.4 Riscos de duplicação a evitar

| Situação | Risco | Orientação (docs 04 + 05) |
|----------|-------|----------------------------|
| Publicar galeria completa do cortejo em Eventos **e** em Arquivo | Duplicação | Galeria no projeto Bandeiras; evento do cortejo com imagem-chave + link |
| Criar página de Arquivo para cada live Convida | Fragmentação | Projeto Convida + eventos individuais ou listagem interna — **a definir** |
| Tratar Video Gira só como Eventos | Perda de memória da linha | Projeto Video Gira + eventos por edição |
| Tratar Circuito Terreiro como projeto | Projeto artificial | Preferir Evento ou menção em ArtRio/programação |
| Repetir fichas de inscrição/data no Arquivo | Fonte da verdade errada | Datas e participação em Eventos |

---

## 10. Curadoria recomendada para a primeira versão

**Recomendação editorial** baseada nos materiais **encontrados**. Não substitui validação da cliente.

### Grupo 1 — Publicar na primeira versão

**Nenhum projeto** cumpre, hoje, documentação suficiente **no repositório** para publicação responsável (texto + mídia + créditos).

**Candidatos prioritários após integração do acervo** (ordem sugerida de preparação):

1. **Video Gira** — eixo audiovisual; canal já citado; múltiplas edições
2. **Bandeiras e Estandartes** — marco recente; narrativa e escala coletiva claras (fonte externa)
3. **Mostra Onjila** — mostra-âncora 2023+
4. **Ateliê Terreiro Convida** — memória do período pandêmico; registros em video prováveis
5. **Grupo/Laboratório (1.º)** — base histórica 2019–2022

### Grupo 2 — Publicar após confirmação/complementação

- **7 Línguas** — confirmar realização, acervo e relação com edital
- **2.º Grupo de Estudos** — definir se Arquivo, Cursos ou ambos
- **Circuito Terreiro** — definir Evento vs. menção em outro projeto
- **Ocupações** — material de redes e vínculo editorial
- Todos os itens do Grupo 1 **até** haver mídia e créditos no acervo de trabalho

### Grupo 3 — Não publicar inicialmente (como projeto no Arquivo)

- Categorias genéricas (performances, exposições, intervenções como rótulos soltos)
- **21 Dias de Ativismo**, **Circuito Terreiro**, **Ocupações** — preferir **Eventos** ou menção contextual (seção 9), não páginas de projeto
- Participações avulsas em feiras sem narrativa própria confirmada
- Obras/registros estritamente pessoais de Luanda sem vínculo documentado com a plataforma coletiva
- Qualquer item sem nome estável ou sem material mínimo

---

## 11. Organização e ordenação recomendadas

### 11.1 Modelo proposto

**Ordenação cronológica inversa** (início mais recente → mais antigo), com **destaque curatorial opcional** de 1–2 itens no topo quando houver acervo.

### 11.2 Justificativa

- O acervo nomeado concentra-se em **2019–2025**, com linhas contínuas (Video Gira, Mostra Onjila).
- Períodos já aparecem nos docs/02 e 04 — baixo risco de taxonomia artificial.
- Volume inicial pequeno (6–7 candidatos fortes): cronologia inversa é legível **sem filtros**.
- “Destaque + cronologia” só faz sentido **depois** de haver imagens adequadas; hoje não há imagem de destaque localizada no repo.

### 11.3 Ordem tentativa (quando publicável)

1. 7 Línguas (2025) — se confirmado  
2. Bandeiras e Estandartes (2024–)  
3. Mostra Onjila (2023–)  
4. Video Gira (2022–) — ou agrupar edições internamente  
5. Ateliê Terreiro Convida (2020–2021)  
6. Grupo/Laboratório (2019–2022)  

Circuito Terreiro e ocupações: **fora** desta ordem principal até classificação definitiva.

---

## 12. Taxonomia inicial

Com base no acervo **real encontrado** (poucos projetos nomeados, heterogeneidade moderada):

### Recomendação

**Não recomendamos filtros na primeira versão** do `/arquivo`.

### Metadados úteis (sem UI de filtro)

| Metadado | Utilidade | Status dos dados |
|----------|-----------|------------------|
| **Período / ano de início** | Alto | Parcial — presente nos docs/ para projetos principais |
| **Status** (contínuo / encerrado) | Médio | A confirmar por projeto (ex.: Convida encerrado? Onjila contínuo?) |
| **Tipo enxuto** | Médio | Possível vocabulário mínimo abaixo |

### Vocabulário enxuto (opcional, interno/CMS)

Apenas se a cliente validar — **3–5 tipos**, não filtros cruzados:

- Mostra / exposição  
- Mostra de vídeo / audiovisual  
- Programa público / conversa  
- Grupo de estudos / laboratório  
- Intervenção urbana / edital  

**Evitar** na v1: filtros por tema, “linguagem”, formato de registro ou eixo de pesquisa (doc 04 §8). Para Eventos, mesma orientação: sem filtros até haver volume (doc 05 §15).

---

## 13. Lacunas de informação

### 13.1 Lacuna estrutural (crítica)

| Lacuna | Impacto |
|--------|---------|
| Acervo fotográfico “grande quantidade” citado no doc 01 **não está no repositório** | Impossível curar imagens, destaques ou galerias |
| Listas de projetos/exposições do briefing **não estão como arquivos** | Inventário depende de menções + fonte externa |
| YouTube/Vimeo **não catalogados** | Video Gira e Convida sem inventário de obras |
| Textos institucionais/cartas **ausentes do repo** | Redação dependerá de nova entrega |
| Informações de **eventos** citadas no briefing (doc 01) **não estão como arquivos** | Impossível inventariar ocorrências para `/eventos` |
| Fronteira Ateliê × luanda.art.br **não fechada** | Risco de duplicação ou conflito de versões |
| Vínculos projeto ↔ evento **não fechados** (docs 04 §6, 05 §9) | Risco de duplicar ou fragmentar Convida, Video Gira, Bandeiras |
| Política de eventos passados em `/eventos` **a confirmar** (doc 05 §4) | Incerto o que permanece na listagem de Eventos |

### 13.2 Lacunas por tipo

- **Créditos fotográficos:** não localizados para nenhum projeto no repo  
- **Autorização de publicação:** não localizada  
- **Legendas e contexto de imagens:** não localizadas  
- **Participantes completos:** parcial só em fonte externa (Grupo, Convida, Bandeiras)  
- **Datas exatas** de edições Video Gira: parcial na biografia externa  
- **Circuito Terreiro:** natureza e material não claros no repo  
- **Datas/horários de ocorrências** para Eventos: não localizados (lives, cortejo, edições Video Gira, ArtRio)  
- **Política de retenção** de eventos passados (doc 05 §4): **a confirmar**

---

## 14. Perguntas para a cliente

Lista prática por projeto/initiativa. Omitidas perguntas cujas respostas já constam **nos docs/** (ex.: URL do YouTube).

### Integração do acervo (prioridade máxima)

- Onde estão os arquivos do briefing (PDFs, listas, fotografias)? Podem ser adicionados ao repositório ou pasta compartilhada versionada?
- Quais pastas/arquivos correspondem a cada projeto?
- Há planilha ou lista oficial de projetos além das menções nos docs/02–05?

### Fronteira Arquivo × Eventos (doc 05)

- Para **Convida**, **Video Gira**, **Bandeiras** e **Mostra Onjila**: confirmar modelo projeto + eventos vinculados (seção 9 deste doc).
- **Circuito Terreiro** deve existir só em Eventos?
- Quantos **eventos passados** devem permanecer publicados em `/eventos`?
- Cada **live Convida** e cada **edição Video Gira** terá página própria de evento ou listagem interna no projeto?
- **Ocupações** (2021) viram eventos individuais ou ficam só no projeto Grupo/Convida?

### Fronteira editorial (geral)

- O que permanece exclusivamente em [luanda.art.br](https://luanda.art.br/) vs. o que entra no site do Ateliê?
- Textos e listas de luanda.art.br/atelie-terreiro/ podem ser reutilizados/adaptados no novo site?

### 7 Línguas

- Confirmar status em 2025/2026 (realizado, em curso ou planejado).
- Enviar acervo da intervenção (lambe-lambe), artistas do edital, créditos e autorizações.
- Confirmar título oficial (“7 Línguas” vs. “7 Linguas”).

### Bandeiras e Estandartes

- Enviar lista completa dos 37 artistas e obras.
- Confirmar material fotográfico/vídeo do cortejo e da mostra + créditos.
- Confirmar textos oficiais do edital e release.

### Mostra Onjila

- Confirmar artistas e obras por edição/ano.
- A mostra continua ativa (2023–) ou encerrada?
- Esclarecer relação com “Mostra Onjila & Video Gira” (2023): uma página ou duas?

### Video Gira

- Confirmar modelo: **uma página** com 8 edições internas ou páginas separadas.
- Enviar lista de obras/artistas por edição + links YouTube/Vimeo.
- Confirmar créditos de curadoria e obras.

### Ateliê Terreiro Convida

- Confirmar URLs das lives no YouTube.
- Autorização para embeds.
- Série encerrada em 2021 ou houve continuidade?

### Grupo/Laboratório (1.º grupo, 2019–2022)

- Confirmar título preferido para o site.
- Material visual ou documental dos encontros?
- Ocupações indígena e afro-brasileira entram como subseção?

### Circuito Terreiro

- Confirmar ano e natureza (projeto, programação ArtRio, evento único).
- Existe material (fotos, vídeos, textos)?
- Deve ser página de Arquivo, registro em Eventos, ou menção em Sobre?

### 2.º Grupo de Estudos (2025–2026)

- Deve aparecer no Arquivo, em Cursos, ou ambos?
- Há registros públicos dos encontros?

### Mídia geral

- Inventário das fotografias por projeto/evento.
- Créditos e autorizações de uso.
- Quais imagens podem ser destaque no `/arquivo`?

### Publicação inicial

- Quantos projetos a cliente espera na v1 do site?
- Ordem ou destaque manual desejado?

---

## 15. Próximos passos

1. **Integrar acervo ao repositório** (ou definir pasta/CMS com origem rastreável) — bloqueante para redação e design.
2. **Validar com a cliente** este inventário e as classificações preliminares (seções 8–10).
3. **Catalogar YouTube/Vimeo** (Video Gira, Convida) com título, data, créditos — base para Arquivo **e** Eventos.
4. **Decidir fronteira** luanda.art.br × site Ateliê; fronteira Arquivo × Eventos (seção 9).
5. **Resolver por item:** página de projeto vs. evento(s) vs. Cursos vs. subseção.
6. **Atualizar este inventário** após entrada de materiais — nova versão com níveis de documentação reais.
7. **Etapa seguinte (fora deste doc):** redação/estruturação das páginas individuais de `/arquivo/[projeto]`.
8. **Etapa paralela recomendada:** produzir **inventário de Eventos** (`/eventos`) com a mesma metodologia de acervo — o doc 05 define a estratégia; falta o inventário real de ocorrências.

---

## Apêndice — Registro de busca (rastreabilidade)

| Busca | Escopo | Resultado |
|-------|--------|-----------|
| Glob `**/*` | repositório | 21 arquivos; sem acervo de conteúdo |
| Grep projetos nomeados | repositório | Ocorrências apenas em `/docs` |
| Extensões `.jpg/.pdf/.mp4/.json` | repositório | **0** arquivos de conteúdo |
| Pasta `freelas/Atelie` | pai | 1 PNG institucional + docs |
| Pasta `documents_d` (amostra) | ampliado | Sem PDFs/DOCX do Ateliê fora do repo |
| WordPress | URL docs/01 | Conteúdo mínimo |
| luanda.art.br/atelie-terreiro/ | URL docs/01 | Textos de projetos (externo) |
| luanda.art.br/biografia/ | URL docs/01 | CV com entradas (externo) |
| YouTube / Vimeo | URL docs/01 | Canais existentes; vídeos não catalogados |

---

## 16. Verificação de consistência com os docs 01–05

| Tema | Consistência |
|------|----------------|
| Arquivo = memória/produção; Eventos = ocorrência/programação | Alinhado aos docs 04 §6 e 05 §§1, 9 |
| Não duplicar galerias/textos entre Arquivo e Eventos | Reforçado na seção 9 deste doc |
| Convida / Video Gira / Bandeiras como projeto + eventos | Hipótese registrada; **a confirmar** (docs 04 §5, 05 §9) |
| Circuito Terreiro tende a Eventos, não a Arquivo | Alinhado ao doc 05 §3 (programa público) |
| 2.º Grupo tende a Cursos, não a eventos avulsos | Alinhado ao doc 05 §10 |
| Sem inventário fechado sem acervo | Alinhado à postura dos docs 04 §18 e 05 §19 |
| Inscrição externa; sem duplicar Contato | Doc 05 §§7, 12 — sem impacto neste inventário (sem eventos operacionais localizados) |

---

*Documento 06 — inventário e curadoria inicial do Arquivo. Produzido com base em materiais localizados, com distinção explícita entre repositório, documentos estratégicos (01–05) e fontes externas referenciadas. Revisão recomendada após integração do acervo prometido no briefing.*

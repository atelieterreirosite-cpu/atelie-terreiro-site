# Arquitetura do Site — Ateliê Terreiro

Documento de arquitetura de informação e navegação do novo site do Ateliê Terreiro. Complementa e mantém consistência com `/docs/01-visao-do-projeto.md`.

Este texto define áreas, páginas, relações entre conteúdos e princípios de navegação. Não define detalhes técnicos de implementação, componentes, estrutura de pastas ou layout visual detalhado.

A arquitetura deve permanecer flexível o suficiente para permitir ajustes durante o desenvolvimento.

---

## 1. Princípios da arquitetura

1. **Plataforma de arte, arquivo e experiência** — a estrutura serve à presença artística e à memória do Ateliê, não a um site institucional empresarial convencional.
2. **Áreas claras e separadas** — Sobre, Arquivo / Portfólio, Eventos e Cursos são áreas distintas; Eventos e Cursos não se agrupam dentro de Arquivo / Portfólio.
3. **Home como porta de entrada audiovisual** — minimalista; o vídeo é o elemento dominante; o acesso às demais áreas ocorre pelo menu.
4. **Flexibilidade editorial** — páginas individuais (projetos, eventos, cursos) podem variar em campos e densidade de conteúdo conforme o material disponível.
5. **Não inventar páginas sem justificativa** — só se registram páginas e subáreas coerentes com o conteúdo e o briefing.
6. **Decisões em aberto permanecem explícitas** — o que ainda não foi fechado deve constar como "a definir".
7. **Acessibilidade desde a arquitetura** — informações importantes não devem depender exclusivamente de vídeo; navegação deve ser compreensível.
8. **Ajustável ao longo do desenvolvimento** — a estrutura orienta, mas não engessa soluções editoriais ou de experiência que possam surgir com o acervo e a validação da cliente.

---

## 2. Mapa geral do site

Estrutura principal já definida:

```
HOME
├── SOBRE
├── ARQUIVO / PORTFÓLIO
│   └── [página individual de projeto]
├── EVENTOS
│   └── [página individual de evento]
├── CURSOS
│   └── [página individual de curso]
└── CONTATO
```

### Papéis das áreas

| Área | Papel |
|------|--------|
| **Home** | Experiência audiovisual e porta de entrada para o universo do Ateliê |
| **Sobre** | Identidade, história, contexto e pessoas |
| **Arquivo / Portfólio** | Memória, produção artística, projetos e registros |
| **Eventos** | Programação e atividades destinadas ao público |
| **Cursos** | Formação e atividades educacionais |
| **Contato** | Canais de comunicação e localização |

---

## 3. Home

### Função

A Home é a porta de entrada audiovisual do site. Sua proposta é diferente de um site institucional convencional: extremamente minimalista, centrada em um vídeo dominante.

### Estrutura conceitual

```
HOME
└── vídeo fullscreen / dominante
    └── menu de navegação sobreposto
```

### Conteúdo

- **Vídeo** — elemento principal e dominante da tela. A cliente pretende produzir um vídeo que apresente, de forma audiovisual, elementos como: o Ateliê, projetos, Luanda, atividades, espaço, identidade artística e outros conteúdos relevantes.
- **Menu** — sobreposto ao vídeo; permite acesso às demais áreas do site (Sobre, Arquivo / Portfólio, Eventos, Cursos, Contato).

### O que a Home não deve conter inicialmente

- Seção Sobre
- Projetos destacados
- Lista de eventos
- Lista de cursos
- Depoimentos
- Cards
- Múltiplos CTAs
- Blocos institucionais

Não se deve transformar a Home em página cheia de conteúdo apenas porque existem muitas informações disponíveis. O vídeo é a própria porta de entrada; o restante do site se acessa pelo menu.

### Observação

Essa diretriz poderá ser revisada durante o desenvolvimento caso surjam necessidades reais de conteúdo, usabilidade ou acessibilidade — sem abandonar a intenção inicial de Home minimalista. Detalhes de comportamento do vídeo: **a definir**.

---

## 4. Sobre

### Função

Apresentar a identidade, história e contexto do Ateliê Terreiro, bem como informações relevantes sobre Luanda e a trajetória institucional/artística.

### Natureza

Área predominantemente **institucional / editorial**, com conteúdo mais estável do que Eventos ou Cursos.

### Conteúdos previstos (possíveis)

- Apresentação do Ateliê
- História da criação
- Carta da artista Luanda sobre a criação do Ateliê
- Conceito do Ateliê
- Atuação e trajetória
- Relação com a Pequena África
- Luanda (apresentação)
- Biografia
- Trajetória artística
- Formação acadêmica
- Currículo
- Bibliografia
- Filmografia
- Outras informações institucionais relevantes

### Organização proposta

Não é necessário, neste momento, decidir se todos esses conteúdos serão páginas separadas.

**Organização coerente sugerida:**

- Uma **página principal "Sobre"** (`/sobre`) reunindo o núcleo institucional do Ateliê e de Luanda.
- **Subseções internas** (na mesma página ou em âncoras / blocos editoriais) para, por exemplo:
  - Ateliê Terreiro
  - Luanda
  - Trajetória
  - Bibliografia / CV (ou material equivalente)

### Possibilidade de páginas independentes

Caso determinado conteúdo justifique profundidade ou circulação própria (por exemplo, um currículo/bibliografia extensos, ou uma página dedicada a Luanda), isso pode ser registrado como **possibilidade** — decisão editorial e visual detalhada: **a definir**.

### O que ainda não está fechado

- Quantidade exata de páginas dentro de Sobre — **a definir**
- Se subseções serão âncoras na mesma página, abas, ou páginas filhas — **a definir**
- Estrutura visual e ordem editorial dos blocos — **a definir**

---

## 5. Arquivo / Portfólio

### Função

Funcionar como um **arquivo vivo** da produção do Ateliê: memória, projetos, mostras, registros e produções artísticas.

### Natureza

Área de **acervo / arquivo**, distinta de Eventos e de Cursos.

### O que pode reunir

- Projetos coletivos
- Mostras
- Exposições
- Performances
- Intervenções urbanas
- Video Gira
- Registros fotográficos
- Vídeos
- Produções artísticas
- Processos
- Outros projetos relevantes

### Exemplos de projetos já existentes

- 7 Línguas – Lambe-lambe do Ateliê Terreiro para o Povo de Rua (2025)
- Bandeiras e Estandartes do Ateliê Terreiro (2024–)
- Mostra Onjila (2023–)
- Video Gira (2022–)
- Ateliê Terreiro Convida (2020–2021)
- Grupo Ateliê Terreiro – Laboratório de Estudos e Práticas Artísticas (2019–2022)

Outros projetos e produções poderão integrar o arquivo conforme curadoria e organização do acervo — critérios e taxonomia: **a definir**.

### Estrutura de páginas

```
ARQUIVO / PORTFÓLIO
└── listagem / índice do arquivo
    └── página individual de projeto (quando relevante)
```

Cada **projeto relevante** pode possuir página própria.

### Campos possíveis em uma página individual de projeto

Conforme disponibilidade do material (não obrigatórios nem uniformes para todos):

- Título
- Ano / período
- Descrição
- Contexto
- Texto curatorial
- Artistas envolvidos
- Curadoria
- Imagens
- Vídeos
- Registros
- Links externos
- Informações complementares

O modelo editorial deve permitir **flexibilidade**: projetos diferentes podem ter densidades e campos distintos.

### Taxonomia e organização

Ainda **não** se define taxonomia definitiva (categorias, filtros, formas de organização visual). Esses pontos serão tratados posteriormente, após análise do acervo real — **a definir**.

### SEO e compartilhamento (conceitual)

Páginas individuais de projetos devem poder possuir título, descrição e imagem próprios para compartilhamento e mecanismos de busca. Implementação técnica: fora do escopo deste documento.

---

## 6. Eventos

### Função

Área **independente** de Arquivo / Portfólio. Apresentar atividades e eventos do Ateliê com caráter de **programação e informação para o público**.

### Natureza

Área **dinâmica** de divulgação.

### Exemplos de tipos de conteúdo

- Rodas
- Encontros
- Palestras
- Debates
- Mostras (quando divulgadas como programação / atividade aberta)
- Atividades especiais
- Eventos presenciais
- Eventos online
- Outras atividades abertas ao público

### Estrutura de páginas

```
EVENTOS
└── listagem de eventos
    └── página individual do evento
```

### Campos possíveis em uma página individual de evento

- Título
- Data
- Horário
- Local
- Descrição
- Imagem
- Galeria
- Vídeo
- Participantes
- Convidados
- Informações adicionais
- Link externo
- Informações de inscrição, quando aplicável

### Inscrições

Não haverá, inicialmente, sistema próprio de inscrição ou venda de ingressos no site.

Quando necessário, o visitante será direcionado para:

- WhatsApp
- Formulário externo
- Outra plataforma externa definida pela organização

### Diferença em relação a projeto

- **Projeto** — iniciativa artística ou trajetória do Ateliê; pertence ao Arquivo / Portfólio (memória e produção).
- **Evento** — atividade/programação a ser divulgada ao público; pertence à área Eventos.

A relação editorial entre um projeto e eventos associados a ele (por exemplo, uma edição pontual ligada a um projeto contínuo): **a definir**.

### SEO e compartilhamento (conceitual)

Páginas individuais de eventos devem poder possuir título, descrição e imagem próprios. Implementação técnica: fora do escopo deste documento.

---

## 7. Cursos

### Função

Área **independente** para apresentar cursos e atividades formativas oferecidas pelo Ateliê.

### Natureza

Área **dinâmica** de formação / educação.

### Estrutura de páginas

```
CURSOS
└── listagem de cursos
    └── página individual do curso
```

### Campos possíveis em uma página individual de curso

- Título
- Descrição
- Imagem
- Modalidade (presencial e/ou online)
- Período
- Carga horária, se disponível
- Público
- Informações sobre o conteúdo
- Informações de inscrição
- Outras informações relevantes

### Modalidades

A estrutura deve permitir cursos **presenciais** e **online**.

### Inscrições

Não haverá sistema próprio de inscrição no site.

Cada curso poderá possuir um botão ou chamada direcionando para:

- Formulário externo
- WhatsApp
- Outra plataforma externa

### SEO e compartilhamento (conceitual)

Páginas individuais de cursos devem poder possuir título, descrição e imagem próprios. Implementação técnica: fora do escopo deste documento.

---

## 8. Contato

### Função

Concentrar os principais canais oficiais e a localização do Ateliê.

### Natureza

Área **institucional** de comunicação e acesso.

### Informações previstas

- WhatsApp
- Instagram
- Facebook
- YouTube
- Vimeo
- Endereço (Rua Acre, nº 83, sala 505, bairro Saúde, Rio de Janeiro — região da Pequena África)
- Outras informações de contato relevantes

### Diretriz sobre WhatsApp

**Não** será utilizado botão flutuante de WhatsApp no site (inicialmente).

O WhatsApp deverá estar disponível:

- na página de Contato;
- em outros pontos específicos onde fizer sentido (por exemplo, chamadas de inscrição em eventos ou cursos, quando aplicável).

Não haverá botão flutuante global inicialmente.

### O que ainda não está fechado

- Quais exatamente serão os "outros pontos específicos" além de Contato, Eventos e Cursos — **a definir**
- Formato de apresentação dos canais (lista, ícones, etc.) — **a definir** (layout visual)

---

## 9. Relação entre tipos de conteúdo

### Distinção conceitual

| Tipo | Área | O que representa |
|------|------|------------------|
| **Home** | Home | Experiência audiovisual; porta de entrada |
| **Institucional / pessoas** | Sobre | Identidade, história, contexto, Luanda |
| **Projeto / produção** | Arquivo / Portfólio | Memória, produção artística, registros |
| **Evento** | Eventos | Programação e atividades para o público |
| **Curso** | Cursos | Formação e atividades educacionais |
| **Canais / local** | Contato | Comunicação e localização |

### Regras de separação

1. **Arquivo / Portfólio**, **Eventos** e **Cursos** são áreas separadas.
2. Eventos e cursos **não** são agrupados dentro de Portfólio.
3. Um mesmo fenômeno cultural pode atravessar categorias (ex.: uma mostra pode existir como projeto no arquivo e gerar eventos de programação) — o critério editorial de como vincular esses conteúdos: **a definir**.
4. Sobre e Contato concentram o eixo institucional; o arquivo concentra memória e produção; Eventos e Cursos concentram oferta atual ao público.

---

## 10. Conteúdos dinâmicos

### Provavelmente gerenciados via CMS

Inicialmente, considerar como conteúdos dinâmicos (atualização frequente / volume variável):

- **Projetos** (Arquivo / Portfólio)
- **Eventos**
- **Cursos**

### Conteúdos mais estáveis

- **Sobre** — estrutura editorial mais estável, mas também deve ser considerado no planejamento de CMS posteriormente.
- **Contato** — estrutura mais estável; canais e endereço podem mudar ocasionalmente; também a considerar no CMS posteriormente.
- **Home (vídeo)** — o vídeo pode ser atualizado; forma de gerenciamento: **a definir**.

### Observação

Estratégia definitiva do CMS e implementação técnica: **a definir** (fora do escopo deste documento).

---

## 11. Navegação

### Menu principal

O menu deve permitir acesso direto às áreas:

- Sobre
- Arquivo / Portfólio
- Eventos
- Cursos
- Contato

A Home permanece como porta de entrada audiovisual; o menu é o caminho para as demais áreas.

### Linguagem

O menu deve permanecer coerente com a linguagem minimalista da Home.

### O que não se define neste documento

- Posição exata do menu — **a definir**
- Tipografia — **a definir**
- Animações — **a definir**
- Comportamento visual — **a definir**
- Menu mobile — **a definir**
- Cores — **a definir**
- Rótulo exato exibido para "Arquivo / Portfólio" no menu (se "Arquivo", "Portfólio" ou composição) — **a definir**

### Fluxos de navegação esperados

- Visitante chega na Home → explora o vídeo → acessa áreas pelo menu.
- De listagens (arquivo, eventos, cursos) → páginas individuais.
- De páginas individuais de evento/curso → canais externos de inscrição (quando houver), sem sistema interno de inscrição.
- Contato como destino explícito para canais oficiais e endereço.

Sistema de busca no site: **a definir** (se haverá e como).

---

## 12. Estrutura inicial de URLs

Proposta inicial, coerente com a arquitetura e o posicionamento. Nomes em português, legíveis e alinhados às áreas.

| URL | Conteúdo |
|-----|----------|
| `/` | Home |
| `/sobre` | Sobre |
| `/arquivo` | Índice do Arquivo / Portfólio |
| `/arquivo/[projeto]` | Página individual de projeto |
| `/eventos` | Listagem de eventos |
| `/eventos/[evento]` | Página individual de evento |
| `/cursos` | Listagem de cursos |
| `/cursos/[curso]` | Página individual de curso |
| `/contato` | Contato |

### Notas sobre a nomenclatura

- Preferiu-se **`/arquivo`** (e não `/portfolio`) por alinhar-se à ideia de arquivo vivo / memória, sem soar como portfólio comercial genérico. O rótulo de menu pode permanecer "Arquivo / Portfólio" ou ser ajustado — **a definir**.
- Segmentos `[projeto]`, `[evento]` e `[curso]` representam identificadores amigáveis (slugs) — convenção exata: **a definir**.
- URLs adicionais (ex.: páginas filhas de Sobre) só devem ser criadas se justificadas editorialmente — **a definir**.
- Esta estrutura é proposta inicial e pode ser ajustada.

Não se inventam URLs adicionais sem necessidade neste documento.

---

## 13. Considerações de acessibilidade

A arquitetura deve considerar desde o início que o site precisa ser acessível. Princípios (ainda não especificação técnica):

1. **Navegação compreensível** — áreas e rótulos claros; hierarquia previsível.
2. **Conteúdo audiovisual com alternativas quando necessário** — especialmente relevante na Home baseada em vídeo.
3. **Imagens com textos alternativos**.
4. **Estrutura semântica** — páginas e conteúdos organizados de forma compreensível para tecnologias assistivas.
5. **Informações importantes não devem depender exclusivamente de vídeo** — o que for essencial (identidade, programação, inscrição, contato) deve existir também em áreas textuais/navegáveis (Sobre, Eventos, Cursos, Contato, Arquivo).
6. **Cuidado especial com a Home baseada em vídeo** — a diretriz minimalista permanece, mas usabilidade e acessibilidade podem motivar revisões pontuais (ex.: controles, legendas, alternativas) — soluções: **a definir**.

Implementação técnica de acessibilidade: fora do escopo deste documento.

---

## 14. Decisões ainda em aberto

Registros explícitos do que permanece indefinido e deve ser tratado em documentos ou etapas posteriores:

### Sobre

- Quantidade de páginas / subpáginas dentro de Sobre — **a definir**
- Organização editorial final (blocos, âncoras, páginas filhas) — **a definir**
- Se Luanda terá página independente — **a definir**

### Arquivo / Portfólio

- Taxonomia definitiva — **a definir**
- Categorias e filtros — **a definir**
- Forma de organização visual da listagem — **a definir**
- Critérios de inclusão e destaque de projetos — **a definir**
- Formato das galerias — **a definir**
- Relação editorial entre projetos e eventos associados — **a definir**

### Eventos e Cursos

- Critérios para destacar conteúdos na listagem — **a definir**
- Ordenação (cronológica, status passado/futuro, etc.) — **a definir**
- Paginação — **a definir**
- Quais pontos além de Contato exibirão WhatsApp / links de inscrição — **a definir**

### Home e navegação

- Comportamento do vídeo da Home (autoplay, som, legendas, fallback) — **a definir**
- Rótulo final de "Arquivo / Portfólio" no menu — **a definir**
- Posição, tipografia, animações, menu mobile e cores — **a definir**
- Sistema de busca — **a definir**
- Possível revisão da Home minimalista por usabilidade/acessibilidade — **a definir**, se e quando necessário

### Design e CMS

- Estrutura visual das páginas — **a definir**
- Design das páginas individuais — **a definir**
- Estratégia definitiva do CMS — **a definir**
- Detalhes técnicos de implementação — **a definir** (fora do escopo deste documento)

### URLs e SEO

- Convenção de slugs — **a definir**
- URLs adicionais justificadas por conteúdo — **a definir**
- Implementação técnica de SEO e compartilhamento — **a definir**

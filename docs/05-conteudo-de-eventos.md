# Conteúdo de Eventos — Ateliê Terreiro

Mapa editorial e estratégia de conteúdo da área **Eventos** (`/eventos` e `/eventos/[evento]`).

Complementa e mantém consistência com:

- `/docs/01-visao-do-projeto.md`
- `/docs/02-arquitetura-do-site.md`
- `/docs/03-conteudo-da-pagina-sobre.md`
- `/docs/04-conteudo-arquivo-portfolio.md`

Este documento **não** contém textos finais do site, layout definitivo, componentes ou implementação técnica. Orienta curadoria, design, CMS e desenvolvimento posteriores.

Onde a decisão depender dos materiais da cliente ou do volume real de programação, registra-se **a confirmar**, **a definir** ou equivalente.

Não inventar eventos, datas, nomes, valores, regras comerciais ou recursos de acessibilidade não documentados.

---

## 1. Função da área de Eventos

### Por que a área existe

Eventos existe para **divulgar e organizar a programação pública** do Ateliê Terreiro: atividades com data (ou período), local/modalidade e informações para o público participar ou acompanhar.

É área **independente** e **dinâmica**, distinta de Sobre (identidade), Arquivo (memória/produção) e Cursos (formação estruturada).

### Problema que resolve para o visitante

| Pergunta do visitante | O que Eventos responde |
|-----------------------|-------------------------|
| O que está acontecendo / vai acontecer? | Programação atual e futura |
| Quando, onde e como participar? | Data, horário, local, inscrição/participação |
| O que já aconteceu recentemente? | Eventos passados (se preservados no índice) — política **a confirmar** |
| Esta atividade faz parte de um projeto maior? | Link para Arquivo, quando houver relação |

### Relação com a programação atual

A área é o canal principal de **circulação pública** das atividades do Ateliê: rodas, encontros, mostras abertas, performances anunciadas, visitas, sessões audiovisuais, atividades no território etc. — conforme o que a organização publicar.

Não substitui redes sociais; concentra no site a informação estruturada e perene o bastante para consulta e compartilhamento.

### Diferença entre Evento, Projeto e Curso

| | **Evento** | **Projeto (Arquivo)** | **Curso** |
|--|------------|------------------------|-----------|
| Natureza | Ocorrência pública / programação | Iniciativa ou produção documentada | Formação estruturada |
| Tempo | Data, horário, período de realização | Trajetória, período, memória | Período letivo / carga / modalidade |
| Pergunta | “O que acontece e como participar?” | “O que é / foi esta iniciativa?” | “O que se aprende e como se inscrever na formação?” |
| URL | `/eventos` · `/eventos/[evento]` | `/arquivo` · `/arquivo/[projeto]` | `/cursos` · `/cursos/[curso]` |

### Temporalidade: futuro, em andamento, passado

| Estado | Significado editorial | Prioridade de informação |
|--------|----------------------|---------------------------|
| **Futuro** | Ainda vai ocorrer | Data/hora, local, como participar, contexto breve, inscrição se houver |
| **Em andamento** | Já começou e ainda ocorre (ex.: mostra com período aberto) | Status claro, datas de vigência, como visitar/participar agora |
| **Passado / encerrado** | Já ocorreu | Registro da ocorrência; opcionalmente apontar para Arquivo; sem CTA de inscrição ativa |

Critérios exatos de “em andamento” vs. “passado” e política de retenção: **a definir** / **a confirmar**.

### O que a área não deve parecer

- Agenda comercial genérica
- Calendário corporativo
- Página de notícias
- Extensão ou segunda versão do Arquivo
- Catálogo de cursos

### O que deve preservar

Identidade artística, cultural, coletiva e territorial do Ateliê — alinhada à visão do projeto: plataforma de arte coletiva, não espaço religioso, galeria comercial, escola ou centro cultural genérico.

---

## 2. Princípio editorial

### Princípios norteadores

1. **Programação pública** — Eventos serve à circulação e ao acesso às atividades.
2. **Acesso e participação** — informações práticas devem ser claras (quando, onde, como).
3. **Contexto** — cada evento pode ter breve enquadramento artístico/cultural, sem virar ensaio longo obrigatório.
4. **Temporalidade** — o visitante deve entender se o evento é futuro, vigente ou passado.
5. **Diversidade de formatos** — rodas, mostras, performances, visitas etc. podem coexistir sem molde único.
6. **Território** — quando pertinente, local e vínculo com a Pequena África / espaço do Ateliê podem aparecer (sem duplicar Contato inteiro).
7. **Produção coletiva** — créditos e participantes quando existirem; sem inventar nomes.
8. **Clareza prática** — data, horário, local, inscrição/participação têm prioridade alta em eventos futuros.
9. **Memória de ocorrências** — eventos passados podem permanecer, com papel distinto do Arquivo.
10. **Relações** — links eventuais para Arquivo e Cursos, sem fundir as áreas.

### Equilíbrio de tom

Não transformar todos os eventos em textos excessivamente acadêmicos.

Também não reduzir tudo a:

> “nome + data + botão inscreva-se”

O ideal: **informação prática legível** + **contexto suficiente** para situar a atividade no universo do Ateliê.

### O que evitar

- Tom de marketing de ingressos / “agenda cool” genérica
- Duplicar texto curatorial e galeria completa do projeto do Arquivo
- Cadastrar como evento o que é só linha de projeto sem ocorrência pública
- Cadastrar como evento o que é curso estruturado (ver seção 10)
- Múltiplos CTAs competindo; inscrição via sistemas externos (WhatsApp, formulário, outra plataforma), **sem** sistema próprio de inscrição/venda no site (conforme arquitetura)
- Botão flutuante global de WhatsApp (já definido: não haverá inicialmente; WhatsApp pode aparecer em pontos específicos, inclusive em eventos com inscrição)

---

## 3. O que é um evento

### Definição editorial

> **Evento** é uma ocorrência pública (ou aberta a um público definido) com **data ou período**, informações de **local/modalidade** e de **participação ou acompanhamento**, publicada para que o visitante saiba o que acontece e como se relacionar com a atividade.

Não é, por si só, a documentação duradoura de uma iniciativa (isso é **projeto** no Arquivo), nem uma formação estruturada com lógica de curso (isso é **Curso**).

### Possíveis formatos (mapa, não inventário obrigatório)

Podem ser tratados como eventos, **conforme curadoria**:

- Exposição (quando anunciada como programação / visitação com período)
- Mostra
- Performance
- Roda de conversa
- Palestra
- Encontro
- Oficina (pontual — ver fronteira com Cursos)
- Visita guiada
- Programa público
- Lançamento
- Sessão audiovisual
- Atividade no território
- Atividade formativa pontual
- Apresentação
- Intervenção
- Outros formatos que façam sentido — **a definir** com a cliente

Não assumir que todos esses formatos existirão no site.

### Quando relacionar a um projeto do Arquivo (sem duplicar)

Faz sentido o vínculo quando:

- o evento é ocorrência pública de uma iniciativa já documentada (ou a documentar) no Arquivo;
- o visitante ganha ao ir do “quando/onde” (Eventos) ao “o que é a iniciativa” (Arquivo).

Nesse caso:

- Eventos guarda a ficha da ocorrência;
- Arquivo guarda narrativa, processo e acervo;
- cada lado **aponta** para o outro; não copia galeria/texto completo sem necessidade.

Não transformar cada evento em projeto. Não transformar cada projeto em evento.

---

## 4. Eventos futuros, em andamento e passados

### Como o visitante deve entender a temporalidade

A listagem e a página individual devem tornar o **status** compreensível (rótulo, posição na página, ordenação — solução visual **a definir**).

### Prioridades por estado

| Estado | Prioritário | Secundário | Evitar |
|--------|-------------|------------|--------|
| **Futuro** | Data/hora, local, como participar, resumo | Contexto, participantes, acessibilidade | Tratar como arquivo documental |
| **Em andamento** | “Acontece agora” + vigência + como participar/visitar | Contexto, programação interna do período | CTA de inscrição já encerrada sem aviso |
| **Passado** | Que ocorreu + quando; link ao Arquivo se houver | Registros pontuais, créditos | Reabrir inscrição; virar segundo Arquivo com galerias extensas |

### Eventos passados permanecem no site?

**Hipótese editorial recomendada:** sim, de forma **curada e limitada**, para memória de programação — não espelho de tudo que já aconteceu.

Quantidade, tempo de retenção e se todos terão página individual: **a confirmar** com a cliente.

### Quando o passado aponta para o Arquivo

- A ocorrência era parte de projeto com página `/arquivo/[projeto]`
- O valor duradouro está na documentação da iniciativa, não na ficha de data

### Quando o passado pode ter registro próprio na página do evento

- Houve ocorrência relevante com informações práticas históricas úteis
- Há imagem-destaque ou nota breve de que ocorreu
- Ainda não existe (ou não fará sentido) página de projeto — **a confirmar**

Registros fotográficos/audiovisuais extensos: preferência alinhada ao doc. 04 — **ancorar no Arquivo** quando houver projeto; no evento, mídia enxuta ou link.

### Como evitar que Eventos vire segundo Arquivo

1. Priorizar ocorrência e participação, não acervo.
2. Galerias profundas e textos curatoriais longos → Arquivo.
3. Passados: retenção curada, não inventário total.
4. Critério de página própria para evento ≠ critério de projeto (doc. 04).

---

## 5. Estrutura da página `/eventos` (índice)

### Função do índice

Apresentar a programação de forma explorável: o que vem, o que está acontecendo e, se houver política de memória, o que já passou — sem parecer calendário corporativo.

### Elementos possíveis (avaliação)

| Elemento | Quando faz sentido | Quando é complexidade desnecessária |
|----------|--------------------|-------------------------------------|
| **Título da área** | Sempre | — |
| **Introdução curta** | Útil para situar a área (programação pública) | Texto longo institucional (isso é Sobre) |
| **Próximos eventos** | Sempre que houver futuros | — |
| **Em andamento** | Se houver períodos vigentes (mostras etc.) | Se quase nunca houver esse estado |
| **Passados** | Se a cliente quiser memória de programação | Se volume for alto e sem curadoria; ou se tudo for para o Arquivo |
| **Destaques** | Poucos itens prioritários | Lógica de “promoção” comercial; se a lista já for curta |
| **Filtro por período** | Muitos eventos ao longo do tempo | Poucos eventos |
| **Filtro por tipo** | Tipologias estáveis e volume alto | Vocabulário instável; lista pequena |
| **Busca** | Volume grande | Lista curta e escaneável |
| **Ordenação cronológica** | Quase sempre útil | — |

### Recomendação editorial inicial

Se o **volume for pequeno** (cenário provável no lançamento — **a confirmar**):

1. Título  
2. Introdução breve (opcional, curta)  
3. Lista de **próximos** (e **em andamento**, se houver)  
4. Seção de **passados** só se houver política clara e poucos itens  
5. Ordenação cronológica simples  
6. **Sem** filtros/busca até o volume justificar  

Não assumir filtros, busca ou destaques como obrigatórios.

Layout visual: etapa posterior.

---

## 6. Estrutura de `/eventos/[evento]`

Página individual prevista na arquitetura. Campos **opcionais** conforme disponibilidade. Modelo aceita eventos simples e complexos.

### Núcleo

- Título  
- Data (ou período)  
- Horário  
- Local / modalidade  
- Status (futuro / em andamento / encerrado)  
- Imagem principal (se houver)  
- Apresentação / resumo  

### Informações do evento (conforme existir)

- Descrição  
- Contexto  
- Programação (se houver grade interna)  
- Participantes / artistas / curadoria / mediação / convidados  
- Organização / produção  
- Instituições parceiras  
- Acessibilidade (apenas o que for informado pela organização)  
- Informações de inscrição ou participação  
- Valor (se existir e for relevante comunicar)  
- Classificação / faixa etária (se aplicável e informado)  
- Informações de chegada / localização (quando necessário; endereço completo também em Contato)  

### Mídia

- Imagens  
- Vídeo  
- Áudio  
- Documentos  
- Links externos  

### Relações

- Projeto do Arquivo relacionado  
- Curso relacionado  
- Outros eventos relacionados  

Campos definitivos do CMS: **a definir**. Campos vazios não devem gerar blocos vazios na interface (ver seção 11).

### Inscrição no site

Conforme arquitetura: **não** haverá, inicialmente, sistema próprio de inscrição ou venda de ingressos. Quando necessário, direcionar para WhatsApp, formulário externo ou outra plataforma definida pela organização.

---

## 7. Eventos com e sem inscrição

Não se inventam regras comerciais. Apenas **clareza de comunicação**, quando a informação existir.

| Situação | O que comunicar com clareza |
|----------|-----------------------------|
| Gratuito sem inscrição | Que é gratuito e aberto (ou condições de entrada), sem CTA falso de inscrição |
| Gratuito com inscrição | Que é gratuito + como se inscrever (link/WhatsApp externo) + se há prazo/vagas |
| Pago | Valor (se informado) + como pagar/inscrever-se externamente — sem checkout no site |
| Vagas limitadas | Indicar limitação e canal de inscrição; atualizar status se esgotado — **processo a confirmar** |
| Aberto | Condições de acesso sem barreira de inscrição, se for o caso |
| Online | Modalidade + link ou instrução de acesso (quando disponível) |
| Presencial | Local + orientações práticas relevantes |
| Híbrido | Deixar explícitas as duas formas de participação |

Status como “inscrições encerradas” / “esgotado”: **a definir** como prática editorial com a cliente.

---

## 8. Eventos passados e memória

### Papel

Preservar, de forma **leve**, que atividades públicas ocorreram — complementando, não competindo com o Arquivo.

| Pergunta | Orientação |
|----------|------------|
| Permanecem no índice? | Possível e desejável de forma curada — **a confirmar** |
| Podem ser “arquivados”? | Sim, no sentido de seção/passado ou retenção limitada — não confundir com área Arquivo |
| Quando apontar para `/arquivo/[projeto]`? | Quando a ocorrência integra iniciativa documentada |
| Quando basta página individual do evento? | Ocorrência com ficha histórica útil e pouca documentação de acervo |
| Quando o registro vive no Arquivo? | Galerias, processos, textos longos, memória da iniciativa |
| Como evitar duplicação? | Evento = ocorrência; Arquivo = documentação; links cruzados |

Alinhado ao doc. 04:

- **Arquivo** = memória/documentação da iniciativa  
- **Eventos** = programação/ocorrência pública  

---

## 9. Relação Evento ↔ Arquivo

### Fluxos conceituais

```
Projeto no Arquivo
        ↓
      gera
        ↓
  evento(s) público(s)
```

```
Evento
        ↓
   faz parte de
        ↓
projeto existente no Arquivo
```

Também é possível evento **sem** projeto correspondente (atividade pontual de programação).

### Princípios de vínculo

1. Link nomeado e opcional (“integra o projeto X” / “ocorrências deste projeto”).  
2. **Não** duplicar textos curatoriais completos.  
3. **Não** duplicar galerias sem necessidade (acervo preferencialmente no Arquivo).  
4. **Não** criar projeto automático para cada evento.  
5. **Não** criar evento automático para cada projeto.  
6. Fonte da verdade de data/inscrição → Eventos; de narrativa/acervo → Arquivo.  

Critérios finais projeto a evento: **a definir** com a cliente (já em aberto no doc. 04).

---

## 10. Relação Evento ↔ Cursos

| Situação | Tendência editorial |
|----------|---------------------|
| Oficina **pontual** de programação pública | Pode ser **Evento** |
| Formação **estruturada** (período, público, inscrição formativa) | Pertence a **Cursos** |
| Curso com vários encontros/aulas | Em geral **um curso**; encontros não precisam virar eventos independentes |
| Evento que divulga ou celebra uma formação | Pode existir em Eventos com link para Cursos |
| Aula/encontro interno de curso | Não deve, por padrão, virar evento público independente |

Fronteiras cinzentas (oficina longa, laboratório aberto etc.): **a confirmar** caso a caso com a cliente, sem fundir as áreas.

Detalhamento da área Cursos: documento posterior.

---

## 11. Modelo editorial flexível

### Níveis de profundidade

| Nível | Conteúdo típico |
|-------|-----------------|
| **Mínimo** | Título; data; local/modalidade; breve descrição; imagem se houver; status; link de participação se aplicável |
| **Médio** | Núcleo + descrição + participantes + informações práticas + imagem/mídia |
| **Amplo** | Núcleo + contexto + programação + participantes + acessibilidade + mídia + projeto/curso relacionado + documentação pontual |

### Flexibilidade

- Eventos simples e complexos no mesmo modelo  
- Sem exigir os mesmos campos para todos  
- **Campos vazios não produzem blocos vazios** na interface — tratamento de UI **a definir** no design/desenvolvimento  

---

## 12. Informações práticas e acessibilidade

### Informações práticas (quando existirem)

- Endereço / local (Ateliê: Rua Acre, nº 83, sala 505, bairro Saúde, Rio de Janeiro — região da Pequena África, quando for o caso; outros locais se informados)
- Horário e data/período  
- Inscrição / participação (canais externos)  
- Contato pontual do evento (se distinto; canais gerais em Contato)  
- Links externos  
- Valor, vagas, modalidade  

### Acessibilidade como informação editorial

Tratar como **relevante**, não rodapé irrelevante — **somente** com dados fornecidos pela organização.

Possíveis tipos de informação (sem afirmar o que o espaço possui):

- Acesso físico  
- Acessibilidade comunicacional (LIBRAS, legendas, etc.), **se houver**  
- Orientações para participação  

Inventário real de recursos: **a confirmar**. Não inventar.

Endereço operacional completo e canais oficiais permanecem concentrados em **Contato**; Eventos repete o necessário para a ocorrência.

---

## 13. Imagens e mídia

### Princípios

| Uso | Orientação |
|-----|------------|
| **Imagem de destaque (futuro)** | Comunicar a atividade; convite visual; não precisa ser “registro documental” completo |
| **Registros (passado)** | Podem existir de forma enxuta; acervo amplo → Arquivo se houver projeto |
| **Vídeo / áudio / documentos** | Conforme disponibilidade; embeds externos **a definir** |
| **Créditos** | Fotógrafos, videomakers etc., quando soubermos |
| **Legendas** | Desejáveis; padrão **a definir** |
| **Texto alternativo** | Necessário; informação essencial também em texto |
| **Embeds** | YouTube/Vimeo etc. possíveis; página deve permanecer compreensível |

Não publicar material sem autorização — créditos e liberação **a confirmar**.

---

## 14. Créditos e participação

Eventos podem envolver (quando a informação existir):

- Artistas  
- Curadores/as  
- Pesquisadores/as  
- Convidados/as  
- Mediadores/as  
- Educadores/as  
- Produtores/as  
- Instituições parceiras  
- Fotógrafos/as  
- Videomakers  

### Princípio

Preservar a **dimensão coletiva** com créditos proporcionais ao papel. Não transformar a página em currículo. **Não inventar nomes.** Lacunas: omitir ou marcar pendência com a cliente.

Formato de exibição: **a definir** no design.

---

## 15. Taxonomia e filtros

### Possíveis eixos

| Eixo | Utilidade provável | Risco | Status |
|------|-------------------|-------|--------|
| **Data / cronologia** | Alta | Baixo | Candidato forte para ordenação |
| **Mês / ano** | Média (se volume alto) | Baixo | Útil com muitos passados — **a definir** |
| **Tipo** | Média | Vocabulário instável | Só com tipologias claras — **a definir** |
| **Presencial / online / híbrido** | Média | Baixo | Útil se houver mistura frequente — **a confirmar** |
| **Local / território** | Baixa/média | Complexidade se poucos locais | Metadado; filtro só se necessário |
| **Status** | Alta | Baixo | Futuro / andamento / passado — **a definir** na UI |
| **Gratuito / pago** | Baixa/média | Pode soar comercial demais | Só se volume e mistura justificarem — **a definir** |

### Orientações

- **Não** decidir automaticamente que haverá filtros.  
- Volume pequeno → lista cronológica basta.  
- Evitar taxonomia excessiva e filtros cruzados cedo.  
- Busca: **a definir** conforme volume.  

---

## 16. SEO e compartilhamento (conceitual)

Cada `/eventos/[evento]` deve poder possuir:

- Título próprio  
- Descrição própria  
- Imagem de compartilhamento (quando houver)  
- Informações básicas coerentes (data, local/modalidade)  
- URL própria (já prevista na arquitetura)

A listagem `/eventos` também deve poder ter título e descrição de área.

Implementação técnica: fora do escopo.

---

## 17. Acessibilidade editorial

1. Hierarquia semântica clara (títulos, seções)  
2. Datas e horários legíveis e explícitos (não só em imagem)  
3. Textos alternativos em imagens  
4. Identificação de vídeos (título/contexto; legendas de fala se disponíveis — **a confirmar**)  
5. Status do evento compreensível  
6. Informações essenciais (quê, quando, onde, como participar) **não dependentes só de imagem**  
7. Navegação clara índice ↔ evento e links para Arquivo/Cursos/Contato  
8. Contraste e legibilidade: cuidado no design (etapa posterior)  

---

## 18. O que não deve entrar em Eventos

| Conteúdo | Onde pertence melhor |
|----------|----------------------|
| Identidade, história, carta, biografia | **Sobre** |
| Narrativa duradoura, processos, galerias de projeto, fichas de iniciativa | **Arquivo** |
| Formações estruturadas, carga horária, lógica de turma/curso | **Cursos** |
| Canais oficiais completos, WhatsApp institucional, redes, endereço geral | **Contato** |
| Currículo pessoal / filmografia de Luanda | Sobre complementar ou site pessoal — não como “lista de eventos” |

Permitir **menções e links**; evitar cópia integral entre áreas.

---

## 19. Decisões em aberto

A confirmar / a definir com a cliente e nas etapas seguintes:

1. Quais eventos serão cadastrados inicialmente  
2. Quantos eventos passados serão preservados e por quanto tempo  
3. Se todos os passados terão página própria ou só listagem  
4. Quais tipos/formatos de evento serão usados no vocabulário  
5. Se haverá filtros e quais  
6. Se haverá busca  
7. Regras de vínculo Evento ↔ Arquivo (por iniciativa)  
8. Fronteira Evento ↔ Curso em casos limítrofes  
9. Política e canais de inscrição (WhatsApp, formulário, outras plataformas)  
10. Política de documentação de passados (o que fica no evento vs. Arquivo)  
11. Imagens/vídeos autorizados e créditos  
12. Informações de acessibilidade disponíveis para publicar  
13. Uso de status “esgotado” / “encerrado” / “em andamento”  
14. Texto de introdução de `/eventos`  
15. Nomenclatura final da área no menu (“Eventos” ou variante)  
16. Destaques na listagem  
17. Campos definitivos do CMS  
18. Layout do índice e das páginas individuais  
19. Tratamento de eventos em locais externos ao Ateliê  
20. Relação com divulgação paralela (Instagram etc.) — apenas alinhamento editorial, se necessário  

Não transformar hipóteses deste documento em decisões definitivas.

---

## 20. Estrutura editorial recomendada (síntese)

### `/eventos`

1. Título da área  
2. Introdução breve (opcional)  
3. Próximos eventos (e em andamento, se houver)  
4. Eventos passados (se política de memória estiver confirmada)  
5. Ordenação cronológica; filtros/busca só se o volume justificar  
6. Acesso a `/eventos/[evento]`  

### `/eventos/[evento]`

1. Núcleo (título, data/hora, local, status, resumo, imagem)  
2. Descrição / contexto / programação (conforme existir)  
3. Informações práticas e de participação (canais externos)  
4. Acessibilidade (se informada)  
5. Participantes e créditos  
6. Mídia enxuta  
7. Relações (Arquivo, Cursos, outros eventos)  
8. Metadados conceituais para compartilhamento  

Profundidade variável (mínimo / médio / amplo).

---

## 21. Checklist editorial final

Antes de considerar a área Eventos “pronta” editorialmente, verificar:

- [ ] Eventos representam **programação pública**
- [ ] Eventos **não** substituem o Arquivo
- [ ] Eventos **não** substituem Cursos
- [ ] Eventos **não** duplicam Sobre
- [ ] Eventos futuros possuem **informações práticas claras**
- [ ] Eventos passados podem preservar memória **sem** virar segundo Arquivo
- [ ] Relação Evento ↔ Arquivo é clara (links, sem cópia desnecessária)
- [ ] Relação Evento ↔ Cursos é clara
- [ ] A estrutura aceita eventos **simples e complexos**
- [ ] Não há campos obrigatórios desnecessários
- [ ] A dimensão **coletiva** é preservada (créditos quando existirem)
- [ ] **Acessibilidade** é considerada como informação editorial (sem inventar recursos)
- [ ] Não há conteúdo inventado
- [ ] A taxonomia permanece **simples**
- [ ] Inscrições, quando houver, apontam para **canais externos** (sem sistema próprio no site, inicialmente)
- [ ] Não há botão flutuante global de WhatsApp
- [ ] O conteúdo continua coerente com a identidade artística, cultural, coletiva e territorial do Ateliê
- [ ] Não reduz o Ateliê a agenda comercial, espaço religioso, galeria, escola ou centro cultural genérico

---

## 22. Verificação de consistência com os docs 01–04

| Tema | Consistência |
|------|----------------|
| Área independente de Arquivo/Cursos/Sobre | Alinhado ao doc. 02 |
| Listagem + página individual `/eventos/[evento]` | Alinhado ao doc. 02 |
| Sem sistema próprio de inscrição; canais externos | Alinhado ao doc. 02 |
| WhatsApp sem botão flutuante global | Alinhado aos docs 01–02 |
| Arquivo = memória; Eventos = ocorrência | Alinhado ao doc. 04 |
| Links cruzados sem duplicar galerias/textos | Alinhado ao doc. 04 |
| Sobre não opera programação | Alinhado ao doc. 03 |
| Tom artístico, documental, não corporativo | Alinhado ao doc. 01 |
| Flexibilidade de campos e profundidade | Alinhado aos docs 03–04 |
| Decisões de volume, filtros e vínculos em aberto | Alinhado à postura dos docs anteriores |

---

*Próximo passo editorial sugerido (fora do escopo deste arquivo): inventário de eventos a publicar → distinção futuro/passado → vínculos com Arquivo → documento de Cursos.*

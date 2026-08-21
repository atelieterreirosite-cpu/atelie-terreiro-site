/**
 * Mock local da página Equipe.
 *
 * Isolado da integração CMS. Campos provisórios — não tratar
 * como contrato WordPress / ACF.
 *
 * Retratos: caminhos em `/images/exemplos/` são temporários
 * (homologação). Substituir pelas fotos finais das integrantes.
 */

export type TeamMemberLink = {
  label: string;
  href: string;
};

export type TeamMemberMock = {
  name: string;
  /** Função / atuação — linha curta sob o nome */
  role?: string;
  /** Bio editorial curta (exibida por padrão) */
  bio: string;
  /** Bio completa — opcional; acessível via “Ler mais” */
  bioFull?: string;
  /**
   * Retrato. Vazio/ausente → placeholder.
   * Imagens de exemplo no mock são temporárias.
   */
  image?: string;
  areas?: string[];
  links?: TeamMemberLink[];
};

export const teamPageIntro = {
  title: "Equipe",
  text: "Pessoas que fazem o Ateliê Terreiro\nacontecer, pensar e construir.",
};

/**
 * Fontes Luanda: docs/01-visao-do-projeto.md e docs/03-conteudo-da-pagina-sobre.md.
 * Sem biografia inventada; sem CV expandido.
 */
const luanda: TeamMemberMock = {
  name: "Luanda",
  role: "Artista visual, pesquisadora, fundadora e diretora",
  // TEMPORÁRIO — substituir pelo retrato final
  image: "/images/exemplos/DSC_1515.jpg",
  bio: "Luanda é artista visual e pesquisadora, fundadora e diretora do Ateliê Terreiro — plataforma de arte coletiva contemporânea fundada em 2018. Sua produção articula pintura, cerâmica, instalação, performance, fotografia e vídeo, e investiga relações entre ritualidade, ancestralidade, memória, história colonial e escravista brasileira, cosmologia de Terreiro e linguagens contemporâneas. Tem trajetória acadêmica em Artes Visuais pela UFRGS, USP e UFRJ, além de experiência profissional anterior no cinema.",
  areas: ["Artes Visuais", "Pesquisa"],
  links: [{ label: "luanda.art.br", href: "https://luanda.art.br/" }],
};

/**
 * Fontes Jane: mini bio e mini bio completa fornecidas pela colaboradora.
 * bio = mini bio (editorial); bioFull = mini bio completa (não exibida por padrão).
 */
const jane: TeamMemberMock = {
  name: "Jane Santos",
  role: "Bibliotecária, produtora cultural, arte educadora e biblioterapeuta",
  // TEMPORÁRIO — substituir pelo retrato final
  image: "/images/exemplos/DSC_1872.jpg",
  bio: "Jane Santos é bibliotecária, produtora, arte educadora e biblioterapeuta, criadora do projeto «Biblioterapia: a literatura como instrumento terapêutico», e ganhadora de editais como Prêmio Arte Escola e Cultura Presente no RJ. Com formação em Produção Cultural e especialização em Gestão Cultural pela PUC, já elaborou diversos projetos vencedores. Atuou na produção técnica e executiva de iniciativas premiadas, como «Mosaicando Histórias» e «Mundo do Faz de Conta». Atualmente, é coordenadora de produção no Instituto de Mulheres Negras Herderas de Candaces e em projetos de artistas como Lúcia Tucuju e Bruno Black. Como mulher preta, destaca a importância da representatividade e acredita na força da união entre mulheres. Com 15 anos de experiência na área da cultura, dedica-se exclusivamente à produção, buscando inovar e garantir resultados satisfatórios.",
  bioFull:
    "Jane Santos é Bibliotecária, Produtora Cultural, Arte Educadora e Biblioterapeuta. Criadora e produtora do projeto «Biblioterapia: a literatura como instrumento terapêutico», ganhadora dos editais: Prêmio Arte Escola (SMC), Cultura Presente no RJ e Cultura Presente nas Redes II (SECEC), enquanto fazedora cultural. Como produtora já elaborou diversos projetos vencedores de editais. Tendo formação técnica em Produção Cultural e Especialização em Gestão Cultural e Indústria Criativa pela PUC-RJ. Efetuou a produção técnica e executiva dos projetos ganhadores do Prêmio Literatura Resiste categoria A: «Mosaicando Histórias», «Mundo do faz de conta: contando histórias para a melhor idade» e dos projetos Pachamama nos braços da mãe natureza, Piracema diVersos e Festival Raízes de Lúcia Tucuju. Além de ser Coordenadora de Produção dos projetos do Instituto de Mulheres Negras Herderas de Candaces, da Roda Cultural Canta Teresa, e dos artistas Lúcia Tucuju, Eliane Potiguara, Bruno Black, Teresa Arapium com o projeto Kari Oka, e Mariza Sorriso. Tendo também parceria nos projetos dos escritores Silvia Castro, Julio Emilio Braz e Arlene Costa, do músico Greg Sanfoneiro e do artista plástico Ismael David entre outros artistas. Sendo uma mulher preta, busca através de seu trabalho destacar a importância da Representatividade enaltecendo principalmente o trabalho de outras mulheres, pois acredita que juntas somos mais fortes. Atua na área da cultura há 15 anos e agora resolveu se dedicar exclusivamente à produção. Dinâmica, desafiadora, apaixonada pela literatura, educação e pela cultura. Busca sempre inovar dentro das propostas que lhe são confiadas, acredita na dedicação e na entrega para um resultado satisfatório.",
  areas: [
    "Produção Cultural",
    "Arte Educação",
    "Biblioterapia",
    "Literatura",
    "Gestão Cultural",
  ],
};

export const teamMembersMock: TeamMemberMock[] = [luanda, jane];

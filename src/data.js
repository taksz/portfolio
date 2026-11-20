export const USER = 'taksz'

export const LINKS = {
  github: 'https://github.com/taksz',
  linkedin: 'https://www.linkedin.com/in/arthur-gomes-822313446',
  email: 'arthurmagalhaes83@gmail.com',
}

export const status = {
  role: '6º semestre de Ciência da Computação',
  school: 'UDF · Brasília, DF',
  looking: 'Procurando o primeiro estágio em dados, automação ou Python',
}

export const about = [
  'Comecei pela parte de redes e suporte técnico. Hoje meus projetos giram em torno de pegar dado bagunçado e transformar em algo útil: um alerta, um painel, uma API.',
  'Três deles têm demonstração no ar, e quase todos têm testes com pytest.',
]

export const snapshot = [
  ['foco', 'Python, automação e IA aplicada à análise de dados'],
  ['agora', 'pandas, SQL para análise, Power BI e estatística com R'],
  ['base', 'redes de computadores (Cisco) e suporte técnico de TI'],
]

export const facts = [
  ['6º', 'semestre na UDF'],
  ['3', 'projetos com demo no ar'],
  ['pytest', 'testes na maioria dos projetos'],
]

const REPO = 'https://github.com/taksz'
export const projects = [
  {
    name: 'Gestor de anúncios',
    file: 'gestor_anuncios.py',
    icon: 'fastapi',
    text: 'Acompanha anúncios de veículos de revendas, junta o mesmo carro pela placa e compara o preço com a tabela FIPE.',
    stack: ['FastAPI', 'SQLite'],
    code: `${REPO}/portfolio-dados/tree/main/gestor-anuncios`,
    demo: 'https://gestor-anuncios-6xy4.onrender.com',
  },
  {
    name: 'Rastreador de preços',
    file: 'rastreador_precos.py',
    icon: 'python',
    text: 'Monitora preços na web, guarda o histórico e avisa quando o valor cai abaixo de um limite.',
    stack: ['Python', 'Scraping', 'SQLite'],
    code: `${REPO}/portfolio-dados/tree/main/rastreador-precos`,
    demo: 'https://rastreador-precos-4zyj.onrender.com',
  },
  {
    name: 'Encurtador de URL',
    file: 'encurtador_url.py',
    icon: 'fastapi',
    text: 'Encurta links e mostra cliques por dia, navegador, sistema e origem.',
    stack: ['FastAPI'],
    code: `${REPO}/portfolio-dados/tree/main/encurtador-url`,
    demo: 'https://encurtador-url-amgn.onrender.com',
  },
  {
    name: 'Análise de vendas',
    file: 'analise_vendas.sql',
    icon: 'pandas',
    text: 'Consultas SQL, análise com pandas, comparação com dados do IBGE e dashboard.',
    stack: ['SQL', 'pandas', 'Power BI'],
    code: `${REPO}/portfolio-dados/tree/main/analise-vendas`,
  },
  {
    name: 'Filtragem de mensagens',
    file: 'filtro_mensagens.py',
    icon: 'scikitlearn',
    text: 'Sistema especialista que classifica mensagens em phishing, spam ou seguro, combinando regras com machine learning (trabalho em grupo).',
    stack: ['Python', 'scikit-learn'],
    code: `${REPO}/SE-filtragem-de-mensagens`,
  },
  {
    name: 'Gerenciador de notas',
    file: 'gerenciador_notas.py',
    icon: 'pytest',
    text: 'Cadastro, busca e estatísticas de notas de uma turma, com exportação para CSV.',
    stack: ['Python', 'pytest'],
    code: `${REPO}/Sistema-gerenciador-de-notas-`,
  },
  {
    name: 'Estrutura de dados',
    file: 'arvore_binaria.py',
    icon: 'git',
    text: 'Listas encadeadas, lista ordenada e árvore binária de busca feitas do zero.',
    stack: ['Python', 'pytest'],
    code: `${REPO}/Estrutura-de-Dados`,
  },
]

// slug = nome no Simple Icons (https://simpleicons.org)
export const tools = [
  ['Linguagens', [['Python', 'python'], ['R', 'r'], ['Java', 'openjdk'], ['C++', 'cplusplus']]],
  ['Dados', [['pandas', 'pandas'], ['scikit-learn', 'scikitlearn'], ['Power BI', 'powerbi'], ['MySQL', 'mysql'], ['SQLite', 'sqlite']]],
  ['Web e testes', [['FastAPI', 'fastapi'], ['pytest', 'pytest'], ['Git', 'git'], ['GitHub Actions', 'githubactions']]],
]

export const marquee = tools.flatMap(([, items]) => items)

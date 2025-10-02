export interface ExplanationLink {
  title: string;
  url: string;
}

export interface Explanation {
  id: string;
  type: 'definition' | 'concept' | 'important' | 'medical' | 'educational' | 'tip' | 'warning';
  title?: string;
  content: string;
  icon?: string;
  category?: string;
  examples?: string[];
  relatedLinks?: ExplanationLink[];
  keywords?: string[];
  difficulty?: 'basic' | 'intermediate' | 'advanced';
  lastUpdated?: Date;
}

// Base de dados de explicações
export const explanationsDatabase: Record<string, Explanation> = {
  // Conceitos médicos básicos
  'pbl-metodologia': {
    id: 'pbl-metodologia',
    type: 'educational',
    title: 'Problem-Based Learning',
    content: 'Metodologia educacional ativa onde os estudantes aprendem através da resolução de problemas reais, desenvolvendo pensamento crítico e habilidades práticas.',
    icon: '🧠',
    category: 'Metodologia de Ensino',
    examples: [
      'Análise de casos clínicos complexos',
      'Discussão em grupos sobre diagnósticos',
      'Resolução colaborativa de problemas'
    ],
    keywords: ['pbl', 'aprendizado ativo', 'metodologia'],
    difficulty: 'basic'
  },

  'gamificacao-educacao': {
    id: 'gamificacao-educacao',
    type: 'concept',
    title: 'Gamificação na Educação',
    content: 'Aplicação de elementos de jogos (pontos, níveis, conquistas) em contextos educacionais para aumentar motivação e engajamento dos estudantes.',
    icon: '🎮',
    category: 'Tecnologia Educacional',
    examples: [
      'Sistema de pontos por questões respondidas',
      'Níveis baseados em progresso de estudo',
      'Conquistas por metas alcançadas'
    ],
    relatedLinks: [
      { title: 'Teoria da Gamificação', url: 'https://en.wikipedia.org/wiki/Gamification' },
      { title: 'Casos de Sucesso em Educação', url: '#' }
    ],
    keywords: ['gamificação', 'motivação', 'engajamento'],
    difficulty: 'basic'
  },

  // Termos médicos
  'anamnese': {
    id: 'anamnese',
    type: 'medical',
    title: 'Anamnese',
    content: 'Processo de entrevista médica onde o profissional coleta informações sobre a história clínica do paciente, sintomas atuais e passado médico.',
    icon: '📝',
    category: 'Semiologia Médica',
    examples: [
      'História da doença atual (HDA)',
      'História patológica pregressa (HPP)',
      'História familiar e social'
    ],
    keywords: ['anamnese', 'história clínica', 'entrevista médica'],
    difficulty: 'basic'
  },

  'diagnostico-diferencial': {
    id: 'diagnostico-diferencial',
    type: 'medical',
    title: 'Diagnóstico Diferencial',
    content: 'Processo sistemático de distinção entre duas ou mais doenças que apresentam sinais e sintomas similares, para chegar ao diagnóstico correto.',
    icon: '🔍',
    category: 'Diagnóstico Médico',
    examples: [
      'Dor torácica: IAM vs. angina vs. refluxo',
      'Febre: infecção viral vs. bacteriana',
      'Cefaleia: enxaqueca vs. tensional vs. secundária'
    ],
    keywords: ['diagnóstico', 'diferencial', 'raciocínio clínico'],
    difficulty: 'intermediate'
  },

  'exame-fisico': {
    id: 'exame-fisico',
    type: 'medical',
    title: 'Exame Físico',
    content: 'Avaliação sistemática do corpo do paciente através de inspeção, palpação, percussão e ausculta para identificar sinais clínicos.',
    icon: '👩‍⚕️',
    category: 'Semiologia Médica',
    examples: [
      'Inspeção geral e específica',
      'Palpação de órgãos e massas',
      'Ausculta cardíaca e pulmonar',
      'Percussão do abdome'
    ],
    keywords: ['exame físico', 'semiologia', 'propedêutica'],
    difficulty: 'basic'
  },

  // Conceitos de estudo
  'flashcards': {
    id: 'flashcards',
    type: 'educational',
    title: 'Flashcards',
    content: 'Cartões de estudo com pergunta/conceito de um lado e resposta/explicação do outro, utilizados para memorização através de repetição espaçada.',
    icon: '🃏',
    category: 'Técnicas de Estudo',
    examples: [
      'Definições de termos médicos',
      'Fórmulas e cálculos',
      'Associações diagnósticas'
    ],
    relatedLinks: [
      { title: 'Técnica de Repetição Espaçada', url: '#repeticao-espacada' }
    ],
    keywords: ['flashcards', 'memorização', 'repetição espaçada'],
    difficulty: 'basic'
  },

  'casos-clinicos': {
    id: 'casos-clinicos',
    type: 'educational',
    title: 'Casos Clínicos',
    content: 'Situações reais ou simuladas de pacientes apresentadas de forma estruturada para desenvolver raciocínio clínico e habilidades diagnósticas.',
    icon: '🩺',
    category: 'Metodologia de Ensino',
    examples: [
      'Paciente com dor abdominal aguda',
      'Criança com febre e exantema',
      'Idoso com dispneia progressiva'
    ],
    keywords: ['casos clínicos', 'raciocínio clínico', 'simulação'],
    difficulty: 'intermediate'
  },

  'medicina-baseada-evidencias': {
    id: 'medicina-baseada-evidencias',
    type: 'important',
    title: 'Medicina Baseada em Evidências',
    content: 'Prática médica que integra a melhor evidência científica disponível com a experiência clínica e as preferências do paciente para tomar decisões clínicas.',
    icon: '📊',
    category: 'Medicina Baseada em Evidências',
    examples: [
      'Ensaios clínicos randomizados',
      'Meta-análises e revisões sistemáticas',
      'Estudos observacionais'
    ],
    relatedLinks: [
      { title: 'Níveis de Evidência', url: '#' },
      { title: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/' }
    ],
    keywords: ['evidência', 'pesquisa', 'medicina baseada em evidências'],
    difficulty: 'advanced'
  },

  // Dicas de estudo
  'repeticao-espacada': {
    id: 'repeticao-espacada',
    type: 'tip',
    title: 'Repetição Espaçada',
    content: 'Técnica de estudo que envolve revisar informações em intervalos crescentes de tempo, otimizando a retenção na memória de longo prazo.',
    icon: '⏰',
    category: 'Técnicas de Estudo',
    examples: [
      'Revisar em 1 dia, depois 3 dias, depois 1 semana',
      'Usar algoritmos de repetição (Anki, SuperMemo)',
      'Focar no que você mais esquece'
    ],
    keywords: ['repetição espaçada', 'memória', 'retenção'],
    difficulty: 'basic'
  },

  'tecnica-pomodoro': {
    id: 'tecnica-pomodoro',
    type: 'tip',
    title: 'Técnica Pomodoro',
    content: 'Método de gestão de tempo que utiliza intervalos de 25 minutos de foco intenso seguidos de pausas de 5 minutos para maximizar a produtividade.',
    icon: '🍅',
    category: 'Técnicas de Estudo',
    examples: [
      '25 min de estudo + 5 min de pausa',
      'Pausa longa de 15-30 min a cada 4 pomodoros',
      'Eliminar distrações durante o foco'
    ],
    keywords: ['pomodoro', 'produtividade', 'foco'],
    difficulty: 'basic'
  },

  // Avisos importantes
  'contraindicacao': {
    id: 'contraindicacao',
    type: 'warning',
    title: 'Contraindicação',
    content: 'Situação clínica onde um tratamento, procedimento ou medicamento pode ser prejudicial ou perigoso para o paciente e não deve ser usado.',
    icon: '⚠️',
    category: 'Segurança Médica',
    examples: [
      'Aspirina em crianças com síndrome viral',
      'Beta-bloqueadores em asma grave',
      'Metformina em insuficiência renal'
    ],
    keywords: ['contraindicação', 'segurança', 'efeitos adversos'],
    difficulty: 'intermediate'
  },

  'interacao-medicamentosa': {
    id: 'interacao-medicamentosa',
    type: 'warning',
    title: 'Interação Medicamentosa',
    content: 'Alteração do efeito de um medicamento causada pela administração concomitante de outro medicamento, alimento ou substância.',
    icon: '💊',
    category: 'Farmacologia',
    examples: [
      'Warfarina + Aspirina (risco de sangramento)',
      'Estatinas + Ciclosporina (toxicidade muscular)',
      'Digoxina + Diuréticos (arritmias)'
    ],
    keywords: ['interação', 'medicamentos', 'farmacologia'],
    difficulty: 'advanced'
  },

  // Conceitos de especialidades
  'pediatria': {
    id: 'pediatria',
    type: 'definition',
    title: 'Pediatria',
    content: 'Especialidade médica dedicada aos cuidados de saúde de bebês, crianças e adolescentes, desde o nascimento até os 18 anos de idade.',
    icon: '👶',
    category: 'Especialidades Médicas',
    examples: [
      'Puericultura e acompanhamento do desenvolvimento',
      'Vacinação e prevenção',
      'Doenças específicas da infância'
    ],
    keywords: ['pediatria', 'criança', 'adolescente'],
    difficulty: 'basic'
  },

  'cardiologia': {
    id: 'cardiologia',
    type: 'definition',
    title: 'Cardiologia',
    content: 'Especialidade médica que se dedica ao diagnóstico e tratamento das doenças relacionadas ao coração e sistema cardiovascular.',
    icon: '❤️',
    category: 'Especialidades Médicas',
    examples: [
      'Infarto agudo do miocárdio',
      'Insuficiência cardíaca',
      'Arritmias e valvopatias'
    ],
    keywords: ['cardiologia', 'coração', 'cardiovascular'],
    difficulty: 'basic'
  },

  // Conceitos de emergência
  'emergencia-medica': {
    id: 'emergencia-medica',
    type: 'important',
    title: 'Emergência Médica',
    content: 'Situação clínica aguda que representa risco imediato à vida ou função de órgãos, exigindo intervenção médica urgente.',
    icon: '🚨',
    category: 'Medicina de Emergência',
    examples: [
      'Parada cardiorrespiratória',
      'Infarto agudo do miocárdio',
      'Choque anafilático',
      'Trauma grave'
    ],
    keywords: ['emergência', 'urgência', 'risco de vida'],
    difficulty: 'intermediate'
  },

  'triagem': {
    id: 'triagem',
    type: 'concept',
    title: 'Triagem',
    content: 'Sistema de classificação de pacientes baseado na gravidade e urgência dos sintomas para priorizar o atendimento médico.',
    icon: '🏥',
    category: 'Medicina de Emergência',
    examples: [
      'Triagem de Manchester',
      'Protocolo de classificação de risco',
      'Cores: vermelho, amarelo, verde, azul'
    ],
    keywords: ['triagem', 'classificação', 'prioridade'],
    difficulty: 'basic'
  },

  // Novos termos para questões médicas
  'asma': {
    id: 'asma',
    type: 'medical',
    title: 'Asma',
    content: 'Doença inflamatória crônica das vias aéreas caracterizada por obstrução reversível, hiper-responsividade brônquica e inflamação das vias respiratórias.',
    icon: '🫁',
    category: 'Pneumologia',
    examples: [
      'Crise de broncoespasmo',
      'Chiado no peito (sibilância)',
      'Tosse seca, especialmente noturna',
      'Falta de ar aos esforços'
    ],
    relatedLinks: [
      { title: 'GINA - Global Initiative for Asthma', url: 'https://ginasthma.org/' },
      { title: 'Diretrizes Brasileiras de Asma', url: '#' }
    ],
    keywords: ['asma', 'broncoespasmo', 'sibilância', 'pneumologia'],
    difficulty: 'basic'
  },

  'broncoespasmo': {
    id: 'broncoespasmo',
    type: 'medical',
    title: 'Broncoespasmo',
    content: 'Contração súbita e involuntária dos músculos lisos dos brônquios, causando estreitamento das vias aéreas e dificuldade respiratória.',
    icon: '🌪️',
    category: 'Pneumologia',
    examples: [
      'Crise asmática aguda',
      'Chiado audível (sibilância)',
      'Sensação de aperto no peito',
      'Uso de musculatura acessória'
    ],
    keywords: ['broncoespasmo', 'crise asmática', 'obstrução brônquica'],
    difficulty: 'intermediate'
  },

  'tabagismo': {
    id: 'tabagismo',
    type: 'warning',
    title: 'Tabagismo',
    content: 'Dependência física e psíquica provocada pelo uso de produtos derivados do tabaco, considerado fator de risco para múltiplas doenças.',
    icon: '🚭',
    category: 'Saúde Pública',
    examples: [
      'Fator de risco para câncer de pulmão',
      'Agrava sintomas de asma em crianças',
      'Causa doenças cardiovasculares',
      'Tabagismo passivo em crianças'
    ],
    relatedLinks: [
      { title: 'INCA - Programa Nacional de Controle do Tabagismo', url: 'https://www.inca.gov.br/programa-nacional-de-controle-do-tabagismo' }
    ],
    keywords: ['tabagismo', 'cigarro', 'dependência nicotina'],
    difficulty: 'basic'
  },

  'ubs': {
    id: 'ubs',
    type: 'definition',
    title: 'UBS - Unidade Básica de Saúde',
    content: 'Estabelecimento de saúde da Atenção Primária, porta de entrada preferencial do SUS, responsável pelo cuidado longitudinal da população adscrita.',
    icon: '🏥',
    category: 'Sistema de Saúde',
    examples: [
      'Consultas de rotina e prevenção',
      'Atendimento de urgências simples',
      'Acompanhamento de doenças crônicas',
      'Programa Saúde da Família (PSF)'
    ],
    keywords: ['ubs', 'atenção primária', 'sus', 'saúde da família'],
    difficulty: 'basic'
  },

  'entrevista-motivacional': {
    id: 'entrevista-motivacional',
    type: 'concept',
    title: 'Entrevista Motivacional',
    content: 'Abordagem terapêutica colaborativa e centrada no paciente, designada para fortalecer a motivação pessoal e o comprometimento com uma mudança específica.',
    icon: '💬',
    category: 'Psicologia Médica',
    examples: [
      'Cessação do tabagismo',
      'Mudanças no estilo de vida',
      'Adesão ao tratamento',
      'Perguntas abertas e reflexivas'
    ],
    keywords: ['entrevista motivacional', 'mudança comportamental', 'motivação'],
    difficulty: 'intermediate'
  }
};

// Função para buscar explicação por ID
export const getExplanation = (id: string): Explanation | null => {
  return explanationsDatabase[id] || null;
};

// Função para buscar explicações por categoria
export const getExplanationsByCategory = (category: string): Explanation[] => {
  return Object.values(explanationsDatabase).filter(
    explanation => explanation.category === category
  );
};

// Função para buscar explicações por tipo
export const getExplanationsByType = (type: string): Explanation[] => {
  return Object.values(explanationsDatabase).filter(
    explanation => explanation.type === type
  );
};

// Função para buscar explicações por palavra-chave
export const searchExplanations = (query: string): Explanation[] => {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(explanationsDatabase).filter(explanation =>
    explanation.keywords?.some(keyword => 
      keyword.toLowerCase().includes(lowercaseQuery)
    ) ||
    explanation.title?.toLowerCase().includes(lowercaseQuery) ||
    explanation.content.toLowerCase().includes(lowercaseQuery)
  );
};

// Função para adicionar nova explicação
export const addExplanation = (explanation: Explanation): void => {
  explanationsDatabase[explanation.id] = {
    ...explanation,
    lastUpdated: new Date()
  };
};

// Função para atualizar explicação existente
export const updateExplanation = (id: string, updates: Partial<Explanation>): boolean => {
  if (explanationsDatabase[id]) {
    explanationsDatabase[id] = {
      ...explanationsDatabase[id],
      ...updates,
      lastUpdated: new Date()
    };
    return true;
  }
  return false;
};

// Função para remover explicação
export const removeExplanation = (id: string): boolean => {
  if (explanationsDatabase[id]) {
    delete explanationsDatabase[id];
    return true;
  }
  return false;
};

// Função para listar todas as categorias disponíveis
export const getAvailableCategories = (): string[] => {
  const categories = new Set<string>();
  Object.values(explanationsDatabase).forEach(explanation => {
    if (explanation.category) {
      categories.add(explanation.category);
    }
  });
  return Array.from(categories).sort();
};

// Função para obter estatísticas das explicações
export const getExplanationsStats = () => {
  const explanations = Object.values(explanationsDatabase);
  return {
    total: explanations.length,
    byType: explanations.reduce((acc, exp) => {
      acc[exp.type] = (acc[exp.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byCategory: explanations.reduce((acc, exp) => {
      if (exp.category) {
        acc[exp.category] = (acc[exp.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>),
    byDifficulty: explanations.reduce((acc, exp) => {
      if (exp.difficulty) {
        acc[exp.difficulty] = (acc[exp.difficulty] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>)
  };
};
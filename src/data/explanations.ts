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
  },

  // Novos termos médicos solicitados
  'higido': {
    id: 'higido',
    type: 'medical',
    title: 'Hígido',
    content: 'Estado de saúde normal, sem alterações patológicas. Termo utilizado para descrever pacientes saudáveis ou órgãos/sistemas sem anormalidades.',
    icon: '✅',
    category: 'Terminologia Médica',
    examples: [
      'Paciente hígido sem comorbidades',
      'Abdome hígido ao exame físico',
      'Sistema cardiovascular hígido'
    ],
    keywords: ['hígido', 'saudável', 'normal', 'sem alterações'],
    difficulty: 'basic'
  },

  'pronto-socorro': {
    id: 'pronto-socorro',
    type: 'medical',
    title: 'Pronto-Socorro',
    content: 'Unidade de atendimento médico de urgência e emergência, responsável pelo primeiro atendimento a pacientes em situações críticas.',
    icon: '🚨',
    category: 'Atendimento de Emergência',
    examples: [
      'Atendimento de trauma',
      'Emergências clínicas',
      'Triagem de pacientes'
    ],
    keywords: ['pronto-socorro', 'emergência', 'urgência', 'atendimento'],
    difficulty: 'basic'
  },

  'diarreia-aguda': {
    id: 'diarreia-aguda',
    type: 'medical',
    title: 'Diarreia Aguda',
    content: 'Evacuações líquidas ou semi-líquidas frequentes (≥3 vezes/dia) com duração menor que 14 dias. Pode causar desidratação e desequilíbrio eletrolítico.',
    icon: '💧',
    category: 'Gastroenterologia',
    examples: [
      'Gastroenterite infecciosa',
      'Intoxicação alimentar',
      'Diarreia osmótica'
    ],
    keywords: ['diarreia aguda', 'evacuações líquidas', 'desidratação'],
    difficulty: 'intermediate'
  },

  'acesso-venoso-periferico': {
    id: 'acesso-venoso-periferico',
    type: 'medical',
    title: 'Acesso Venoso Periférico',
    content: 'Procedimento de punção de veia periférica para administração de medicamentos, fluidos ou coleta de sangue. Utiliza cateter sobre agulha.',
    icon: '💉',
    category: 'Procedimentos',
    examples: [
      'Jelco em veia do dorso da mão',
      'Cateter em veia do antebraço',
      'Acesso em veia jugular externa'
    ],
    keywords: ['acesso venoso', 'jelco', 'cateter', 'punção venosa'],
    difficulty: 'intermediate'
  },

  'hidratacao-endovenosa': {
    id: 'hidratacao-endovenosa',
    type: 'medical',
    title: 'Hidratação Endovenosa (EV)',
    content: 'Administração de fluidos diretamente na corrente sanguínea através de acesso venoso, para correção de desidratação e desequilíbrios hidroeletrolíticos.',
    icon: '💧',
    category: 'Procedimentos',
    examples: [
      'Soro fisiológico 0,9%',
      'Ringer lactato',
      'Solução glicosada 5%'
    ],
    keywords: ['hidratação', 'endovenosa', 'EV', 'soro', 'fluidos'],
    difficulty: 'intermediate'
  },

  'estabilizacao-inicial': {
    id: 'estabilizacao-inicial',
    type: 'important',
    title: 'Estabilização Inicial',
    content: 'Primeiras medidas de suporte vital para estabilizar paciente crítico, incluindo ABCDE (vias aéreas, respiração, circulação, déficit neurológico, exposição).',
    icon: '🆘',
    category: 'Atendimento de Emergência',
    examples: [
      'Controle de vias aéreas',
      'Oxigenoterapia',
      'Acesso vascular de urgência'
    ],
    keywords: ['estabilização', 'ABCDE', 'suporte vital', 'emergência'],
    difficulty: 'advanced'
  },

  'hidratacao': {
    id: 'hidratacao',
    type: 'medical',
    title: 'Hidratação',
    content: 'Processo de reposição de fluidos corporais para manter equilíbrio hidroeletrolítico adequado. Pode ser oral, enteral ou parenteral.',
    icon: '💧',
    category: 'Terapêutica',
    examples: [
      'Hidratação oral com SRO',
      'Hidratação venosa com cristaloides',
      'Hidratação de manutenção'
    ],
    keywords: ['hidratação', 'fluidos', 'reposição', 'equilíbrio'],
    difficulty: 'basic'
  },

  'perdas': {
    id: 'perdas',
    type: 'medical',
    title: 'Perdas (Hidroeletrolíticas)',
    content: 'Perdas anormais de água e eletrólitos através de vômitos, diarreia, sudorese excessiva, poliúria ou outras vias.',
    icon: '📉',
    category: 'Fisiologia',
    examples: [
      'Perdas por vômitos',
      'Perdas diarreicas',
      'Perdas insensíveis aumentadas'
    ],
    keywords: ['perdas', 'água', 'eletrólitos', 'desidratação'],
    difficulty: 'intermediate'
  },

  'via-oral': {
    id: 'via-oral',
    type: 'medical',
    title: 'Via Oral (VO)',
    content: 'Administração de medicamentos ou fluidos pela boca. É a via preferencial quando o trato gastrointestinal está funcionante.',
    icon: '👄',
    category: 'Vias de Administração',
    examples: [
      'Medicamentos VO',
      'Hidratação oral',
      'Soro de reidratação oral (SRO)'
    ],
    keywords: ['via oral', 'VO', 'oral', 'boca'],
    difficulty: 'basic'
  },

  'exames-laboratoriais': {
    id: 'exames-laboratoriais',
    type: 'medical',
    title: 'Exames Laboratoriais',
    content: 'Análises de amostras biológicas (sangue, urina, fezes) para diagnóstico, monitoramento e seguimento de condições médicas.',
    icon: '🧪',
    category: 'Exames Complementares',
    examples: [
      'Hemograma completo',
      'Bioquímica sanguínea',
      'Urina tipo I'
    ],
    keywords: ['exames laboratoriais', 'análises', 'sangue', 'laboratório'],
    difficulty: 'basic'
  },

  'tracado-eletrocardiografico': {
    id: 'tracado-eletrocardiografico',
    type: 'medical',
    title: 'Traçado Eletrocardiográfico',
    content: 'Registro gráfico da atividade elétrica do coração obtido através do eletrocardiograma (ECG), mostrando ritmo, frequência e condução cardíaca.',
    icon: '📈',
    category: 'Exames Complementares',
    examples: [
      'ECG de 12 derivações',
      'Análise do ritmo cardíaco',
      'Detecção de arritmias'
    ],
    keywords: ['ECG', 'eletrocardiograma', 'traçado', 'coração'],
    difficulty: 'intermediate'
  },

  'ph': {
    id: 'ph',
    type: 'medical',
    title: 'pH Sanguíneo',
    content: 'Medida da acidez ou alcalinidade do sangue. Valor normal: 7,35-7,45. Alterações indicam distúrbios ácido-básicos.',
    icon: '🔬',
    category: 'Gasometria',
    examples: [
      'pH < 7,35: acidemia',
      'pH > 7,45: alcalemia',
      'pH normal: 7,35-7,45'
    ],
    keywords: ['pH', 'acidez', 'gasometria', 'ácido-base'],
    difficulty: 'intermediate'
  },

  'po2': {
    id: 'po2',
    type: 'medical',
    title: 'pO₂ (Pressão Parcial de Oxigênio)',
    content: 'Pressão exercida pelo oxigênio dissolvido no sangue arterial. Valor normal: 80-100 mmHg. Indica eficiência da oxigenação.',
    icon: '🫁',
    category: 'Gasometria',
    examples: [
      'pO₂ normal: 80-100 mmHg',
      'Hipoxemia: pO₂ < 80 mmHg',
      'Oxigenação adequada'
    ],
    keywords: ['pO2', 'oxigênio', 'gasometria', 'oxigenação'],
    difficulty: 'intermediate'
  },

  'pco2': {
    id: 'pco2',
    type: 'medical',
    title: 'pCO₂ (Pressão Parcial de CO₂)',
    content: 'Pressão exercida pelo dióxido de carbono no sangue arterial. Valor normal: 35-45 mmHg. Reflete ventilação alveolar.',
    icon: '💨',
    category: 'Gasometria',
    examples: [
      'pCO₂ normal: 35-45 mmHg',
      'Hipercapnia: pCO₂ > 45 mmHg',
      'Hipocapnia: pCO₂ < 35 mmHg'
    ],
    keywords: ['pCO2', 'dióxido de carbono', 'gasometria', 'ventilação'],
    difficulty: 'intermediate'
  },

  'hco3': {
    id: 'hco3',
    type: 'medical',
    title: 'HCO₃⁻ (Bicarbonato)',
    content: 'Principal tampão do sangue, responsável pelo equilíbrio ácido-básico. Valor normal: 22-26 mEq/L.',
    icon: '⚖️',
    category: 'Gasometria',
    examples: [
      'HCO₃⁻ normal: 22-26 mEq/L',
      'Acidose metabólica: HCO₃⁻ baixo',
      'Alcalose metabólica: HCO₃⁻ alto'
    ],
    keywords: ['bicarbonato', 'HCO3', 'tampão', 'ácido-base'],
    difficulty: 'intermediate'
  },

  'sato2': {
    id: 'sato2',
    type: 'medical',
    title: 'SatO₂ (Saturação de Oxigênio)',
    content: 'Porcentagem de hemoglobina saturada com oxigênio. Valor normal: >95%. Pode ser medida por gasometria ou oximetria de pulso.',
    icon: '📊',
    category: 'Gasometria',
    examples: [
      'SatO₂ normal: >95%',
      'Hipoxemia: SatO₂ <90%',
      'Oximetria de pulso'
    ],
    keywords: ['saturação', 'oxigênio', 'SatO2', 'oximetria'],
    difficulty: 'basic'
  },

  'potassio': {
    id: 'potassio',
    type: 'medical',
    title: 'Potássio (K+)',
    content: 'Eletrólito essencial para função neuromuscular e cardíaca. Valor normal: 3,5-5,0 mEq/L. Alterações podem causar arritmias.',
    icon: '⚡',
    category: 'Eletrólitos',
    examples: [
      'K+ normal: 3,5-5,0 mEq/L',
      'Hipocalemia: K+ <3,5 mEq/L',
      'Hipercalemia: K+ >5,0 mEq/L'
    ],
    keywords: ['potássio', 'K+', 'eletrólito', 'arritmia'],
    difficulty: 'intermediate'
  },

  'sodio': {
    id: 'sodio',
    type: 'medical',
    title: 'Sódio (Na+)',
    content: 'Principal eletrólito extracelular, essencial para equilíbrio hídrico e função neurológica. Valor normal: 135-145 mEq/L.',
    icon: '🧂',
    category: 'Eletrólitos',
    examples: [
      'Na+ normal: 135-145 mEq/L',
      'Hiponatremia: Na+ <135 mEq/L',
      'Hipernatremia: Na+ >145 mEq/L'
    ],
    keywords: ['sódio', 'Na+', 'eletrólito', 'equilíbrio hídrico'],
    difficulty: 'intermediate'
  },

  'hipocalemia': {
    id: 'hipocalemia',
    type: 'important',
    title: 'Hipocalemia',
    content: 'Concentração baixa de potássio no sangue (<3,5 mEq/L). Pode causar fraqueza muscular, arritmias e paralisia flácida.',
    icon: '⚠️',
    category: 'Distúrbios Eletrolíticos',
    examples: [
      'Fraqueza muscular',
      'Arritmias cardíacas',
      'Íleo paralítico'
    ],
    keywords: ['hipocalemia', 'potássio baixo', 'fraqueza', 'arritmia'],
    difficulty: 'intermediate'
  },

  'prescricoes': {
    id: 'prescricoes',
    type: 'medical',
    title: 'Prescrições Médicas',
    content: 'Orientações escritas do médico sobre medicamentos, exames, dieta e cuidados a serem seguidos pelo paciente ou equipe de enfermagem.',
    icon: '📝',
    category: 'Prática Médica',
    examples: [
      'Prescrição de medicamentos',
      'Orientações dietéticas',
      'Solicitação de exames'
    ],
    keywords: ['prescrições', 'medicamentos', 'orientações', 'receita'],
    difficulty: 'basic'
  },

  // Epidemiologia e Saúde Pública
  'sifilis-congenita': {
    id: 'sifilis-congenita',
    type: 'medical',
    title: 'Sífilis Congênita',
    content: 'Infecção pelo Treponema pallidum transmitida da mãe infectada para o feto durante a gestação. É uma condição prevenível através do diagnóstico e tratamento adequado da sífilis materna durante o pré-natal.',
    icon: '🤰',
    category: 'Infectologia',
    examples: [
      'Manifestações precoces: hepatomegalia, lesões cutâneas',
      'Manifestações tardias: surdez, deformidades ósseas',
      'Morte fetal ou neonatal'
    ],
    keywords: ['sífilis', 'transmissão vertical', 'treponema', 'pré-natal'],
    difficulty: 'intermediate'
  },

  'transmissao-vertical': {
    id: 'transmissao-vertical',
    type: 'concept',
    title: 'Transmissão Vertical',
    content: 'Transmissão de patógenos da mãe para o feto durante a gestação, parto ou amamentação. É um importante modo de transmissão para diversas infecções, incluindo HIV, sífilis, hepatite B, entre outras.',
    icon: '👶',
    category: 'Epidemiologia',
    examples: [
      'Transmissão intrauterina (sífilis, toxoplasmose)',
      'Transmissão durante o parto (HIV, hepatite B)',
      'Transmissão pela amamentação (HIV)'
    ],
    keywords: ['materno-fetal', 'transmissão', 'gestação', 'perinatal'],
    difficulty: 'basic'
  },

  'gestante': {
    id: 'gestante',
    type: 'definition',
    title: 'Gestante',
    content: 'Mulher que está grávida, desde a concepção até o parto. Durante a gestação, requer cuidados médicos especiais para garantir sua saúde e a do feto, incluindo consultas de pré-natal regulares.',
    icon: '🤱',
    category: 'Obstetrícia',
    examples: [
      'Consultas de pré-natal',
      'Exames laboratoriais específicos',
      'Vacinação durante a gestação'
    ],
    keywords: ['gravidez', 'pré-natal', 'maternidade', 'obstetrícia'],
    difficulty: 'basic'
  },

  'cascata-cuidado-continuo': {
    id: 'cascata-cuidado-continuo',
    type: 'concept',
    title: 'Cascata do Cuidado Contínuo',
    content: 'Representação gráfica que mostra a proporção de pessoas em diferentes etapas do cuidado de saúde, desde o diagnóstico até o desfecho final. É uma ferramenta epidemiológica para avaliar a efetividade de programas de saúde.',
    icon: '📊',
    category: 'Epidemiologia',
    examples: [
      'Cascata do HIV: diagnóstico → tratamento → supressão viral',
      'Cascata da sífilis congênita: gestantes infectadas → tratadas → nascidos sem sífilis',
      'Cascata da tuberculose: casos notificados → tratamento → cura'
    ],
    keywords: ['epidemiologia', 'indicadores', 'monitoramento', 'programa de saúde'],
    difficulty: 'intermediate'
  },

  'cascata-cuidado-hiv': {
    id: 'cascata-cuidado-hiv',
    type: 'medical',
    title: 'Cascata do Cuidado Contínuo do HIV',
    content: 'Parâmetro internacional para avaliar o desempenho da atenção de saúde em HIV. Mostra a proporção de pessoas vivendo com HIV em cada etapa: diagnóstico, vinculação ao cuidado, retenção no cuidado, prescrição de antirretrovirais e supressão viral.',
    icon: '🏥',
    category: 'Infectologia',
    examples: [
      'Etapa 1: Pessoas vivendo com HIV diagnosticadas',
      'Etapa 2: Pessoas vinculadas ao cuidado',
      'Etapa 3: Pessoas em tratamento antirretroviral',
      'Etapa 4: Pessoas com carga viral suprimida'
    ],
    keywords: ['HIV', 'AIDS', 'antirretroviral', 'carga viral', 'monitoramento'],
    difficulty: 'advanced'
  },

  'hiv': {
    id: 'hiv',
    type: 'medical',
    title: 'HIV (Vírus da Imunodeficiência Humana)',
    content: 'Retrovírus que infecta células do sistema imunológico, especialmente linfócitos T CD4+, causando progressiva imunodeficiência. Transmitido principalmente por via sexual, sanguínea e vertical (mãe-filho). Com tratamento antirretroviral adequado, pode-se alcançar carga viral indetectável e vida normal.',
    icon: '🦠',
    category: 'Infectologia',
    examples: [
      'Transmissão sexual desprotegida (principal via)',
      'Compartilhamento de seringas contaminadas',
      'Transmissão vertical durante gravidez/parto/amamentação',
      'Tratamento com antirretrovirais (TARV)'
    ],
    keywords: ['retrovírus', 'CD4', 'carga viral', 'TARV', 'PrEP', 'AIDS'],
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
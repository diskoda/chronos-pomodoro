import type { QuestionFlowData } from '../components/questionFlow/types';
import { 
  registerQuestionFlowData,
  initializeFlowDataSystem 
} from './universalFlowDataManager';

// ==========================================
// USP-SP 2025 - ESPECIALIDADES PEDIÁTRICAS
// ==========================================

// Questão 17 - Vacina pneumocócica
const question17FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o esquema vacinal para pneumococo em crianças, especificamente as indicações da vacina pneumocócica 23-valente polissacarídica (VPP23).

A vacinação contra pneumococo é essencial na pediatria, especialmente em grupos de risco elevado para doença pneumocócica invasiva.

**Caso Clínico:** Criança de 3 anos, com esquema básico da vacina pneumocócica 10-valente (VPC10) completo, que apresentou pneumonia pneumocócica grave aos 2 anos de idade.

**Pergunta:** Qual é a indicação para vacinação adicional com VPP23?`,

  explanationText: `Para resolver esta questão sobre vacinação pneumocócica complementar, analise os seguintes aspectos:

**Vacinas Pneumocócicas Disponíveis:**

**VPC10 (Pneumocócica Conjugada):**
• Faixa etária: < 5 anos
• Esquema básico: 2+1 doses
• Imunogenicidade: Excelente em lactentes
• Cobertura: 10 sorotipos mais prevalentes

**VPP23 (Pneumocócica Polissacarídica):**
• Faixa etária: ≥ 2 anos
• Indicações especiais: Grupos de risco
• Cobertura: 23 sorotipos
• Duração: Proteção prolongada

**Grupos de Risco para VPP23:**
• História de doença pneumocócica invasiva
• Imunodeficiências
• Doenças crônicas (cardiopatias, pneumopatias)
• Asplenia funcional ou anatômica
• Diabetes mellitus

**Indicação no Caso:**
A história de pneumonia pneumocócica grave é um fator de risco que indica susceptibilidade aumentada, justificando a proteção adicional com VPP23.`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Não há indicação para vacinação adicional, pois o esquema básico está completo.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nIndicação perdida:\n\n• **História:** Pneumonia pneumocócica grave prévia\n• **Fator de risco:** Indica susceptibilidade aumentada\n• **Proteção adicional:** VPP23 oferece cobertura ampliada\n• **Recomendação:** Criança com história de DPI deve receber VPP23',
      category: 'incorrect',
      conceptsInvolved: ['grupos de risco', 'história de DPI', 'indicações especiais']
    },
    {
      letter: 'B',
      text: 'Administrar uma dose da vacina pneumocócica 23-valente (VPP23) após os 2 anos de idade.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nIndicação adequada para VPP23:\n\n• **Critério:** História de doença pneumocócica invasiva\n• **Idade apropriada:** ≥ 2 anos (VPP23 eficaz)\n• **Benefício:** Proteção contra 23 sorotipos\n• **Esquema:** 1 dose após esquema básico completo\n• **Evidência:** Reduz risco de recidiva',
      category: 'correct',
      conceptsInvolved: ['VPP23', 'grupos de risco', 'prevenção secundária']
    },
    {
      letter: 'C',
      text: 'Repetir o esquema completo da vacina pneumocócica 10-valente.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nEsquema inadequado:\n\n• **Desnecessário:** VPC10 já completa\n• **Imunogenicidade:** Não há benefício em repetir\n• **Indicação correta:** VPP23 para ampliação de cobertura\n• **Sobreposição:** Seria redundante',
      category: 'incorrect',
      conceptsInvolved: ['esquemas vacinais', 'redundância', 'eficácia limitada']
    },
    {
      letter: 'D',
      text: 'Aguardar até os 5 anos para avaliar necessidade de revacinação.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nPerda de oportunidade:\n\n• **Risco atual:** Criança já demonstrou susceptibilidade\n• **Proteção imediata:** VPP23 pode ser dada ≥ 2 anos\n• **Benefício perdido:** Delay desnecessário na proteção\n• **Recomendação:** Vacinar o quanto antes',
      category: 'incorrect',
      conceptsInvolved: ['timing vacinal', 'perda de oportunidade', 'risco-benefício']
    }
  ],

  metadata: {
    specialty: 'Imunizações',
    difficulty: 'medium',
    tags: ['pneumococo', 'VPP23', 'grupos de risco', 'DPI'],
    estimatedTime: 4,
    conceptsRequired: ['vacinas pneumocócicas', 'grupos de risco', 'doença pneumocócica invasiva'],
    learningObjectives: [
      'Identificar indicações para VPP23',
      'Reconhecer grupos de risco para pneumococo',
      'Compreender diferenças entre VPC e VPP',
      'Aplicar prevenção secundária em DPI'
    ]
  }
};

// Questão 18 - Desenvolvimento neuromotor
const question18FlowData: QuestionFlowData = {
  contextText: `Esta questão avalia conhecimentos sobre marcos do desenvolvimento neuropsicomotor em lactentes, especificamente os marcos esperados aos 6 meses de idade.

O acompanhamento do desenvolvimento é fundamental na pediatria para detecção precoce de atrasos.

**Caso Clínico:** Lactente de 6 meses em consulta de puericultura. Os pais questionam sobre os marcos de desenvolvimento esperados para essa idade.

**Pergunta:** Qual marco do desenvolvimento é esperado aos 6 meses de idade?`,

  explanationText: `Para resolver esta questão sobre desenvolvimento neuromotor, analise os marcos por faixa etária:

**Desenvolvimento Normal aos 6 Meses:**

**Motor Grosso:**
• Sentar com apoio (4-6 meses) → Sentar sem apoio (6-8 meses)
• Controle de cabeça completo (4 meses)
• Rolar da posição supina para prona (4-6 meses)
• Sustentar peso nas pernas com apoio (6 meses)

**Motor Fino:**
• Transferir objetos entre as mãos (6 meses)
• Preensão palmar voluntária (4-5 meses)
• Coordenação mão-boca desenvolvida
• Pinça ainda rudimentar

**Social/Cognitivo:**
• Reconhecer pessoas familiares vs estranhos
• Balbucio social (não palavras ainda)
• Interesse ativo por objetos
• Resposta ao nome

**Marcos Posteriores (para referência):**
• Andar: 12-15 meses
• Primeiras palavras: 10-12 meses
• Desenhar: 3-4 anos

**Importância da Avaliação:**
O sentar sem apoio aos 6 meses é um marco motor fundamental que indica desenvolvimento adequado do controle postural e força axial.`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Andar sem apoio.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nMarco tardio:\n\n• **Idade esperada:** 12-15 meses\n• **Aos 6 meses:** Ainda não sustenta peso adequadamente\n• **Desenvolvimento:** Muito prematuro para essa idade\n• **Marco atual:** Sentar com apoio',
      category: 'incorrect',
      conceptsInvolved: ['marcos tardios', 'desenvolvimento motor', 'cronologia inadequada']
    },
    {
      letter: 'B',
      text: 'Sentar sem apoio.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nMarco apropriado para 6 meses:\n\n• **Desenvolvimento motor:** Sentar sem apoio (6-8 meses)\n• **Controle postural:** Já desenvolvido aos 6 meses\n• **Progressão:** Após sentar com apoio (4-6 meses)\n• **Variação normal:** Pode ocorrer entre 6-8 meses\n• **Importância:** Marco fundamental do desenvolvimento',
      category: 'correct',
      conceptsInvolved: ['desenvolvimento motor', 'marcos dos 6 meses', 'controle postural']
    },
    {
      letter: 'C',
      text: 'Falar as primeiras palavras com significado.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nMarco de linguagem tardio:\n\n• **Idade esperada:** 10-12 meses\n• **Aos 6 meses:** Apenas balbucio\n• **Desenvolvimento:** Linguagem ainda em formação\n• **Marco atual:** Balbucio social',
      category: 'incorrect',
      conceptsInvolved: ['desenvolvimento da linguagem', 'marcos tardios', 'balbucio vs palavras']
    },
    {
      letter: 'D',
      text: 'Desenhar círculos.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nMarco muito tardio:\n\n• **Idade esperada:** 3-4 anos\n• **Aos 6 meses:** Motor fino ainda rudimentar\n• **Desenvolvimento:** Apenas preensão palmar\n• **Incompatível:** Muito além da capacidade atual',
      category: 'incorrect',
      conceptsInvolved: ['desenvolvimento motor fino', 'marcos tardios', 'capacidades inadequadas']
    }
  ],

  metadata: {
    specialty: 'Desenvolvimento',
    difficulty: 'easy',
    tags: ['marcos desenvolvimento', '6 meses', 'sentar', 'motor grosso'],
    estimatedTime: 3,
    conceptsRequired: ['desenvolvimento neuromotor', 'marcos por idade', 'avaliação pediátrica'],
    learningObjectives: [
      'Conhecer marcos dos 6 meses',
      'Identificar desenvolvimento motor normal',
      'Distinguir marcos por faixa etária',
      'Aplicar na avaliação pediátrica'
    ]
  }
};

// Questão 19 - Diagnóstico diferencial de sopro cardíaco em criança
const question19FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda avaliação cardiológica pediátrica, especificamente o diagnóstico diferencial de sopros cardíacos em crianças.

A ausculta cardíaca é fundamental na avaliação pediátrica, sendo necessário distinguir sopros inocentes de patológicos.

**Caso Clínico:** Criança de 4 anos apresenta sopro sistólico grau II/VI em foco pulmonar, detectado em exame de rotina. Criança assintomática, com desenvolvimento normal.

**Pergunta:** Qual característica sugere sopro inocente?`,

  explanationText: `Para avaliar sopros cardíacos em pediatria, considere as características distintivas:

**Sopros Inocentes (Funcionais):**

**Características:**
• Intensidade: Grau I-II/VI
• Timing: Sistólico
• Localização: Borda esternal esquerda
• Qualidade: Musical, vibrante
• Variação: Com posição e respiração
• Irradiação: Limitada

**Condições associadas:**
• Criança assintomática
• Exame físico normal
• Ausência de sintomas cardíacos
• Desenvolvimento normal

**Sopros Patológicos:**

**Sinais de alerta:**
• Intensidade ≥ III/VI
• Sopros diastólicos (sempre patológicos)
• Sopros holosistólicos
• Irradiação extensa
• Presença de fremito

**Sintomas associados:**
• Dispneia, fadiga
• Cianose
• Retardo do crescimento
• Sinais de ICC

**Avaliação Complementar:**
• ECG: Geralmente normal em sopros inocentes
• Ecocardiograma: Se dúvida diagnóstica
• História familiar: Cardiopatias congênitas

O sopro descrito (sistólico II/VI, foco pulmonar, criança assintomática) tem características típicas de sopro inocente.`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Presença de fremito palpável.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nIndicador de sopro patológico:\n\n• **Fremito:** Vibração palpável indica fluxo turbulento significativo\n• **Significado:** Sopro intenso (≥ IV/VI)\n• **Patologia:** Sugere obstrução ou shunt importante\n• **Sopro inocente:** Nunca apresenta fremito',
      category: 'incorrect',
      conceptsInvolved: ['fremito', 'sopro patológico', 'turbulência']
    },
    {
      letter: 'B',
      text: 'Sopro sistólico grau II/VI que varia com a posição.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nCaracterística típica de sopro inocente:\n\n• **Intensidade baixa:** Grau II/VI é compatible com sopro funcional\n• **Variação postural:** Sopros inocentes mudam com posição\n• **Mecanismo:** Alteração do retorno venoso modifica intensidade\n• **Ausência de patologia:** Variação indica origem funcional\n• **Tranquilidade:** Característica reassuradora',
      category: 'correct',
      conceptsInvolved: ['sopro inocente', 'variação postural', 'intensidade baixa']
    },
    {
      letter: 'C',
      text: 'Sopro holosistólico com irradiação para axila.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nCaracterísticas de sopro patológico:\n\n• **Holosistólico:** Ocupar toda sístole sugere regurgitação\n• **Irradiação:** Propagação para axila indica intensidade alta\n• **Patologia:** Típico de insuficiência mitral\n• **Investigação:** Necessita ecocardiograma urgente',
      category: 'incorrect',
      conceptsInvolved: ['sopro holosistólico', 'irradiação', 'regurgitação']
    },
    {
      letter: 'D',
      text: 'Componente diastólico audível.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSempre patológico:\n\n• **Sopro diastólico:** Nunca é inocente\n• **Patologia:** Indica regurgitação aórtica ou pulmonar\n• **Investigação obrigatória:** Ecocardiograma urgente\n• **Gravidade:** Pode indicar doença valvar significativa',
      category: 'incorrect',
      conceptsInvolved: ['sopro diastólico', 'sempre patológico', 'regurgitação']
    }
  ],

  metadata: {
    specialty: 'Cardiologia',
    difficulty: 'medium',
    tags: ['sopro cardíaco', 'sopro inocente', 'ausculta', 'cardiologia pediátrica'],
    estimatedTime: 4,
    conceptsRequired: ['ausculta cardíaca', 'sopros cardíacos', 'semiologia cardiovascular'],
    learningObjectives: [
      'Distinguir sopros inocentes de patológicos',
      'Reconhecer características de sopros funcionais',
      'Avaliar necessidade de investigação cardiológica',
      'Aplicar semiologia cardiovascular em pediatria'
    ]
  }
};

// Questão 20 - Manejo da bronquiolite viral aguda
const question20FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o manejo da bronquiolite viral aguda, uma das principais causas de hospitalização em lactentes.

A bronquiolite é caracterizada por inflamação dos bronquíolos, causando obstrução e dificuldade respiratória.

**Caso Clínico:** Lactente de 8 meses apresenta quadro de 3 dias de coriza, tosse e dificuldade respiratória progressiva. Ao exame: taquipneia, tiragem subcostal, sibilos difusos e saturação de O2 de 92%.

**Pergunta:** Qual é o manejo inicial mais apropriado?`,

  explanationText: `O manejo da bronquiolite viral aguda baseia-se em medidas de suporte, evitando intervenções desnecessárias:

**Definição e Epidemiologia:**
• Inflamação viral dos bronquíolos
• Principal agente: Vírus Sincicial Respiratório (VSR)
• Pico: Lactentes < 2 anos
• Sazonalidade: Outono/inverno

**Apresentação Clínica:**
• Pródromos: Coriza, tosse seca
• Progressão: Taquipneia, tiragem, sibilos
• Sinais de gravidade: Saturação < 92%, apneia, recusa alimentar

**Manejo Baseado em Evidências:**

**Medidas Eficazes:**
• Oxigenoterapia: Se SatO2 < 92%
• Hidratação adequada: Oral ou EV conforme tolerância
• Posicionamento: Elevação de cabeceira
• Aspiração de VAS: Se secreções excessivas

**Medidas Ineficazes/Controversas:**
• Broncodilatadores: Sem benefício comprovado
• Corticoides: Não recomendados
• Antibióticos: Apenas se coinfecção bacteriana
• Fisioterapia respiratória: Sem evidência

**Critérios de Hospitalização:**
• Saturação < 92% em ar ambiente
• Dificuldade alimentar significativa
• Desidratação
• Apneia
• Fatores de risco: Prematuridade, cardiopatia

**Oxigenoterapia:**
É a intervenção principal quando há hipoxemia (SatO2 < 92%).`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Iniciar broncodilatador inalatório e corticoide sistêmico.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nMedicações sem eficácia comprovada:\n\n• **Broncodilatadores:** Múltiplos estudos mostram ausência de benefício\n• **Corticoides:** Não reduzem duração ou gravidade\n• **Evidência:** Guidelines contraindicam uso rotineiro\n• **Efeitos adversos:** Potenciais sem benefício clínico',
      category: 'incorrect',
      conceptsInvolved: ['broncodilatadores ineficazes', 'corticoides desnecessários', 'medicina baseada em evidências']
    },
    {
      letter: 'B',
      text: 'Administrar oxigenoterapia e manter hidratação adequada.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nManejo adequado baseado em evidências:\n\n• **Oxigenoterapia:** Indicada para SatO2 < 92%\n• **Hidratação:** Fundamental para fluidificação de secreções\n• **Suporte:** Medidas de suporte são o pilar do tratamento\n• **Evidência:** Abordagem recomendada pelas diretrizes\n• **Segurança:** Intervenções com benefício comprovado',
      category: 'correct',
      conceptsInvolved: ['oxigenoterapia', 'hidratação', 'cuidado de suporte', 'medicina baseada em evidências']
    },
    {
      letter: 'C',
      text: 'Prescrever antibiótico profilático e fisioterapia respiratória.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nIntervenções desnecessárias:\n\n• **Antibiótico profilático:** Bronquiolite é viral\n• **Resistência bacteriana:** Uso inapropriado promove resistência\n• **Fisioterapia:** Sem evidência de benefício, pode ser prejudicial\n• **Complicações:** Potencial para iatrogenias',
      category: 'incorrect',
      conceptsInvolved: ['antibióticos desnecessários', 'fisioterapia ineficaz', 'iatrogenia']
    },
    {
      letter: 'D',
      text: 'Realizar nebulização com soro fisiológico hipertônico.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nTerapia controversa:\n\n• **Evidência limitada:** Benefício marginal em alguns estudos\n• **Não consensual:** Não é recomendação universal\n• **Alternativa:** Outras medidas de suporte são prioritárias\n• **Primeira escolha:** Oxigenoterapia e hidratação são fundamentais',
      category: 'incorrect',
      conceptsInvolved: ['soro hipertônico', 'evidência limitada', 'terapias controversas']
    }
  ],

  metadata: {
    specialty: 'Pneumologia',
    difficulty: 'medium',
    tags: ['bronquiolite', 'VSR', 'lactente', 'oxigenoterapia'],
    estimatedTime: 4,
    conceptsRequired: ['bronquiolite viral', 'manejo respiratório', 'medicina baseada em evidências'],
    learningObjectives: [
      'Reconhecer apresentação da bronquiolite',
      'Aplicar manejo baseado em evidências',
      'Identificar medidas de suporte eficazes',
      'Evitar intervenções desnecessárias'
    ]
  }
};

// Questão 21 - Convulsão febril em lactente
const question21FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o manejo de convulsões febris em pediatria, uma emergência comum na prática pediátrica.

Convulsões febris são eventos neurológicos transitórios associados à febre, mais frequentes entre 6 meses e 5 anos.

**Caso Clínico:** Lactente de 18 meses é trazido ao pronto-socorro após episódio convulsivo tônico-clônico generalizado com duração de 3 minutos, associado à febre de 39,5°C. Primeira convulsão da criança.

**Pergunta:** Qual é a classificação e conduta inicial mais apropriada?`,

  explanationText: `O manejo de convulsões febris requer classificação adequada e abordagem sistematizada:

**Definição:**
• Convulsão associada à febre (≥38°C)
• Idade: 6 meses a 5 anos
• Ausência de infecção do SNC
• Sem história prévia de convulsões afebrís

**Classificação:**

**Convulsão Febril Simples:**
• Duração: < 15 minutos
• Tipo: Tônico-clônica generalizada
• Sem recorrência em 24h
• Prognóstico excelente

**Convulsão Febril Complexa:**
• Duração: ≥ 15 minutos
• Focal ou parcial
• Recorrência em 24h
• Déficit neurológico pós-ictal

**Investigação:**

**Convulsão Simples:**
• Investigação da causa da febre
• Hemograma, hemocultura se indicado
• EEG: Não rotineiro
• Neuroimagem: Não indicada

**Convulsão Complexa:**
• Investigação mais ampla
• Considerar EEG
• TC/RM se déficit focal
• Punção lombar se suspeita de meningite

**Conduta Imediata:**
• Manter vias aéreas pérvias
• Controle da febre
• Benzodiazepínicos se convulsão prolongada
• Investigar foco infeccioso

**Orientação Familiar:**
• Baixo risco de epilepsia
• Recorrência: 30-40%
• Medidas durante convulsão
• Quando procurar atendimento

O caso descrito é uma convulsão febril simples (primeira convulsão, duração < 15 min, generalizada).`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Convulsão febril complexa; realizar EEG e TC de crânio imediatamente.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nClassificação equivocada:\n\n• **Critérios:** Primeira convulsão, duração 3 min, generalizada\n• **Classificação correta:** Convulsão febril simples\n• **Investigação desnecessária:** EEG e TC não indicados\n• **Conduta excessiva:** Superinvestigação sem benefício',
      category: 'incorrect',
      conceptsInvolved: ['classificação incorreta', 'superinvestigação', 'convulsão simples']
    },
    {
      letter: 'B',
      text: 'Convulsão febril simples; investigar foco infeccioso e orientar familiares.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nAbordagem adequada:\n\n• **Classificação:** Simples (primeira, < 15 min, generalizada)\n• **Investigação:** Focar na causa da febre\n• **Orientação:** Fundamental para tranquilizar família\n• **Prognóstico:** Excelente, baixo risco de sequelas\n• **Seguimento:** Acompanhamento pediátrico rotineiro',
      category: 'correct',
      conceptsInvolved: ['convulsão febril simples', 'investigação adequada', 'orientação familiar']
    },
    {
      letter: 'C',
      text: 'Iniciar anticonvulsivante profilático e internação para observação.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nConduta excessiva:\n\n• **Anticonvulsivante:** Não indicado em convulsão febril simples\n• **Profilaxia:** Não recomendada devido ao baixo risco\n• **Internação:** Desnecessária se criança estável\n• **Custo-benefício:** Riscos superam benefícios',
      category: 'incorrect',
      conceptsInvolved: ['anticonvulsivante desnecessário', 'internação excessiva', 'profilaxia inadequada']
    },
    {
      letter: 'D',
      text: 'Realizar punção lombar de urgência para descartar meningite.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nIndicação inadequada:\n\n• **Critérios:** Ausência de sinais meníngeos\n• **Idade:** 18 meses (não neonato)\n• **Convulsão simples:** Sem indicação rotineira para PL\n• **Risco-benefício:** Procedimento invasivo desnecessário',
      category: 'incorrect',
      conceptsInvolved: ['punção lombar desnecessária', 'ausência de indicação', 'procedimento invasivo']
    }
  ],

  metadata: {
    specialty: 'Neurologia',
    difficulty: 'medium',
    tags: ['convulsão febril', 'emergência neurológica', 'lactente', 'febre'],
    estimatedTime: 4,
    conceptsRequired: ['convulsões febris', 'emergências neurológicas', 'classificação neurológica'],
    learningObjectives: [
      'Classificar convulsões febris simples vs complexas',
      'Definir investigação apropriada',
      'Orientar adequadamente familiares',
      'Reconhecer indicações para neuroimagem'
    ]
  }
};

// Questão 22 - Diarreia aguda em lactente
const question22FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o manejo da diarreia aguda em lactentes, uma causa importante de morbimortalidade em pediatria.

A diarreia aguda pode levar rapidamente à desidratação em lactentes devido ao maior turnover de água corporal.

**Caso Clínico:** Lactente de 8 meses apresenta diarreia há 2 dias (8-10 evacuações/dia), vômitos ocasionais e recusa alimentar. Ao exame: mucosas secas, turgor diminuído, olhos encovados, irritado.

**Pergunta:** Qual é o grau de desidratação e conduta inicial?`,

  explanationText: `A avaliação e manejo da desidratação em lactentes requer sistematização baseada em sinais clínicos:

**Classificação da Desidratação:**

**Ausente/Leve (< 3%):**
• Mucosas úmidas
• Turgor normal
• Diurese normal
• Criança alerta

**Moderada (3-9%):**
• Mucosas secas
• Turgor diminuído
• Olhos encovados
• Irritabilidade
• Fontanela deprimida

**Grave (≥ 10%):**
• Mucosas muito secas
• Turgor muito diminuído
• Olhos muito encovados
• Letargia/coma
• Pulso fraco/ausente
• Extremidades frias

**Manejo por Gravidade:**

**Desidratação Leve:**
• Soro de reidratação oral (SRO)
• Manter alimentação
• Acompanhamento ambulatorial

**Desidratação Moderada:**
• SRO como primeira escolha
• 75 mL/kg em 4-6 horas
• Reavaliação frequente
• Hidratação EV se falha do SRO

**Desidratação Grave:**
• Hidratação EV imediata
• Expansão volêmica se choque
• Monitorização contínua
• Correção eletrolítica

**Soro de Reidratação Oral:**
• Primeira escolha em desidratação leve/moderada
• Eficácia comprovada
• Menor custo e morbidade
• Administração domiciliar possível

**Sinais do Caso:**
Mucosas secas + turgor diminuído + olhos encovados + irritabilidade = Desidratação MODERADA`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Desidratação leve; orientar uso de soro de reidratação oral em casa.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSubestimação da gravidade:\n\n• **Sinais presentes:** Mucosas secas, turgor diminuído, olhos encovados\n• **Classificação:** Indica desidratação moderada\n• **Risco:** Subestimação pode levar à piora clínica\n• **Conduta:** Necessita supervisão médica mais próxima',
      category: 'incorrect',
      conceptsInvolved: ['subestimação', 'sinais de desidratação', 'classificação incorreta']
    },
    {
      letter: 'B',
      text: 'Desidratação moderada; iniciar soro de reidratação oral supervisionado.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nAvaliação e conduta adequadas:\n\n• **Sinais:** Mucosas secas + turgor diminuído + olhos encovados = moderada\n• **SRO:** Primeira escolha para desidratação moderada\n• **Supervisão:** Importante para monitorar resposta\n• **Evidência:** Abordagem recomendada pelas diretrizes\n• **Eficácia:** 75 mL/kg em 4-6h com reavaliação',
      category: 'correct',
      conceptsInvolved: ['desidratação moderada', 'SRO supervisionado', 'classificação correta']
    },
    {
      letter: 'C',
      text: 'Desidratação grave; hidratação venosa imediata em ambiente hospitalar.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSuperestimação da gravidade:\n\n• **Ausência de:** Letargia, pulso fraco, extremidades frias\n• **Presença de:** Irritabilidade (não letargia)\n• **Classificação:** Moderada, não grave\n• **Conduta:** Hidratação EV seria segunda escolha',
      category: 'incorrect',
      conceptsInvolved: ['superestimação', 'hidratação EV prematura', 'classificação excessiva']
    },
    {
      letter: 'D',
      text: 'Sem sinais de desidratação; manter apenas observação clínica.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSubestimação grave:\n\n• **Sinais evidentes:** Mucosas secas, turgor diminuído\n• **Risco:** Progressão para desidratação grave\n• **Negligência:** Ignorar sinais clínicos claros\n• **Conduta:** Necessidade de intervenção ativa',
      category: 'incorrect',
      conceptsInvolved: ['negligência clínica', 'sinais ignorados', 'subestimação perigosa']
    }
  ],

  metadata: {
    specialty: 'Gastroenterologia',
    difficulty: 'medium',
    tags: ['diarreia aguda', 'desidratação', 'SRO', 'lactente'],
    estimatedTime: 4,
    conceptsRequired: ['avaliação de desidratação', 'soro de reidratação oral', 'hidratação pediátrica'],
    learningObjectives: [
      'Classificar graus de desidratação',
      'Indicar soro de reidratação oral adequadamente',
      'Reconhecer sinais clínicos de desidratação',
      'Definir local de tratamento apropriado'
    ]
  }
};

// Questão 23 - Asma aguda em escolar
const question23FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o manejo da crise asmática em pediatria, uma emergência respiratória comum na prática pediátrica.

A asma é a doença crônica mais frequente na infância, e as exacerbações agudas requerem tratamento rápido e eficaz.

**Caso Clínico:** Escolar de 7 anos, com diagnóstico prévio de asma intermitente, chega ao pronto-socorro com dispneia, tosse seca e sibilos há 6 horas. Ao exame: tiragem subcostal, sibilos expiratórios difusos, saturação 94%.

**Pergunta:** Qual é a classificação da crise e tratamento inicial mais apropriado?`,

  explanationText: `O manejo da crise asmática requer avaliação rápida da gravidade e tratamento escalonado:

**Classificação da Crise Asmática:**

**Leve:**
• Fala em frases
• Sem tiragem
• Sibilos ausentes/leves
• SatO2 > 95%
• FC < 100 bpm (escolar)

**Moderada:**
• Fala em palavras
• Tiragem subcostal
• Sibilos moderados
• SatO2 90-95%
• FC 100-120 bpm

**Grave:**
• Dificuldade para falar
• Tiragem importante
• Sibilos intensos ou ausentes
• SatO2 < 90%
• FC > 120 bpm
• Cianose

**Tratamento Escalonado:**

**Primeira Linha:**
• Beta-2 agonista inalatório (Salbutamol)
• Spray/espaçador ou nebulização
• Repetir a cada 20 min (até 3x)

**Segunda Linha:**
• Corticoide sistêmico (Prednisolona)
• Anti-inflamatório potente
• Reduz inflamação das vias aéreas

**Terceira Linha:**
• Ipratrópio (anticolinérgico)
• Associado ao beta-2 agonista
• Broncodilatação adicional

**Quarta Linha:**
• Sulfato de magnésio EV
• Aminofilina EV
• Considerar intubação

**Oxigenoterapia:**
• Se SatO2 < 92%
• Manter saturação > 94%

**Avaliação da Resposta:**
• Melhora clínica em 1-2h
• Saturação mantida > 94%
• Redução da tiragem e sibilos

**O Caso Descrito:**
Tiragem subcostal + sibilos + SatO2 94% = Crise MODERADA
Tratamento: Salbutamol + Corticoide sistêmico`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Crise leve; administrar apenas salbutamol inalatório.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSubestimação da gravidade:\n\n• **Sinais moderados:** Tiragem subcostal + SatO2 94%\n• **Tratamento insuficiente:** Apenas beta-2 agonista\n• **Corticoide necessário:** Crise moderada requer anti-inflamatório\n• **Risco:** Progressão para crise grave',
      category: 'incorrect',
      conceptsInvolved: ['subestimação', 'tratamento insuficiente', 'ausência de corticoide']
    },
    {
      letter: 'B',
      text: 'Crise moderada; salbutamol inalatório e corticoide sistêmico.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nAvaliação e tratamento adequados:\n\n• **Classificação:** Tiragem + sibilos + SatO2 94% = moderada\n• **Broncodilatador:** Salbutamol primeira linha\n• **Anti-inflamatório:** Corticoide sistêmico essencial\n• **Evidência:** Protocolo padrão para crise moderada\n• **Eficácia:** Combinação reduz hospitalização',
      category: 'correct',
      conceptsInvolved: ['crise moderada', 'salbutamol', 'corticoide sistêmico', 'tratamento combinado']
    },
    {
      letter: 'C',
      text: 'Crise grave; intubação imediata e ventilação mecânica.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nSuperestimação da gravidade:\n\n• **Ausência de:** Dificuldade importante para falar, cianose\n• **SatO2:** 94% não indica crise grave (< 90%)\n• **Intubação prematura:** Deve ser última opção\n• **Tratamento inicial:** Beta-2 + corticoide devem ser tentados',
      category: 'incorrect',
      conceptsInvolved: ['superestimação', 'intubação prematura', 'ventilação desnecessária']
    },
    {
      letter: 'D',
      text: 'Administrar aminofilina endovenosa como primeira escolha.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nMedicação de segunda/terceira linha:\n\n• **Primeira linha:** Beta-2 agonistas inalatórios\n• **Aminofilina:** Reservada para casos refratários\n• **Efeitos adversos:** Maior risco de toxicidade\n• **Eficácia:** Inferior aos beta-2 agonistas',
      category: 'incorrect',
      conceptsInvolved: ['aminofilina inadequada', 'primeira linha incorreta', 'maior toxicidade']
    }
  ],

  metadata: {
    specialty: 'Pneumologia',
    difficulty: 'medium',
    tags: ['asma', 'crise asmática', 'broncodilatador', 'corticoide'],
    estimatedTime: 4,
    conceptsRequired: ['manejo da asma', 'broncodilatadores', 'classificação de gravidade'],
    learningObjectives: [
      'Classificar gravidade de crise asmática',
      'Aplicar tratamento escalonado',
      'Reconhecer indicações para corticoides',
      'Avaliar resposta ao tratamento'
    ]
  }
};

// Questão 24 - Anemia ferropriva em pré-escolar
const question24FlowData: QuestionFlowData = {
  contextText: `Esta questão aborda o diagnóstico e manejo da anemia ferropriva, a deficiência nutricional mais comum na infância.

A anemia por deficiência de ferro afeta principalmente lactentes e pré-escolares, podendo causar alterações no desenvolvimento neuropsicomotor.

**Caso Clínico:** Pré-escolar de 3 anos apresenta palidez, irritabilidade e cansaço fácil. Alimentação baseada principalmente em leite e carboidratos, com baixo consumo de carnes. Hemoglobina: 8,5 g/dL, VCM: 65 fL, ferritina: 8 ng/mL.

**Pergunta:** Qual é o diagnóstico e tratamento mais apropriado?`,

  explanationText: `O diagnóstico e manejo da anemia ferropriva requer avaliação laboratorial adequada e suplementação eficaz:

**Critérios Diagnósticos:**

**Valores de Hemoglobina por Idade:**
• 6-24 meses: < 11,0 g/dL
• 2-5 anos: < 11,5 g/dL
• 5-12 anos: < 11,5 g/dL
• > 12 anos: < 12,0 g/dL (♀) / < 13,0 g/dL (♂)

**Parâmetros do Ferro:**
• VCM diminuído (microcitose)
• Ferritina < 15 ng/mL
• Saturação transferrina < 16%
• Ferro sérico diminuído

**Fatores de Risco:**
• Baixo peso ao nascer
• Introdução precoce leite de vaca
• Dieta inadequada (pouco ferro)
• Crescimento rápido
• Perdas aumentadas

**Tratamento:**

**Ferro Elementar:**
• Dose: 3-6 mg/kg/dia
• Via oral preferencial
• Dividir em 2-3 tomadas
• Entre as refeições

**Duração:**
• Correção: 2-3 meses
• Reposição dos estoques: + 3 meses
• Total: 6 meses de tratamento

**Orientações:**
• Vitamina C aumenta absorção
• Evitar leite, chá, café junto
• Constipação intestinal comum
• Escurecimento das fezes normal

**Resposta Terapêutica:**
• Aumento Hb: 1 g/dL/mês
• Reticulocitose em 5-10 dias
• Reavaliação em 30 dias

**Prevenção:**
• Aleitamento materno exclusivo 6 meses
• Introdução adequada ferro
• Evitar leite de vaca < 12 meses
• Suplementação profilática

**O Caso:**
Hb 8,5 g/dL + VCM 65 fL + ferritina 8 ng/mL = ANEMIA FERROPRIVA confirmada`,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Anemia ferropriva; suplementação com ferro oral por 3 meses.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDuração insuficiente:\n\n• **Diagnóstico correto:** Anemia ferropriva confirmada\n• **Tratamento adequado:** Ferro oral apropriado\n• **Duração insuficiente:** Apenas correção da anemia\n• **Duração adequada:** 6 meses (correção + reposição estoques)',
      category: 'incorrect',
      conceptsInvolved: ['duração insuficiente', 'reposição incompleta', 'estoques de ferro']
    },
    {
      letter: 'B',
      text: 'Anemia ferropriva; ferro oral por 6 meses e orientação nutricional.',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e tratamento completos:\n\n• **Diagnóstico:** Hb baixa + VCM baixo + ferritina baixa\n• **Ferro oral:** Primeira escolha, 3-6 mg/kg/dia\n• **Duração adequada:** 6 meses (3 correção + 3 estoques)\n• **Orientação nutricional:** Fundamental para prevenção\n• **Abordagem holística:** Trata e previne recidiva',
      category: 'correct',
      conceptsInvolved: ['anemia ferropriva', 'ferro oral', 'duração adequada', 'orientação nutricional']
    },
    {
      letter: 'C',
      text: 'Anemia de doença crônica; investigar foco infeccioso oculto.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico equivocado:\n\n• **Ferritina baixa:** Indica deficiência de ferro\n• **Anemia doença crônica:** Ferritina normal/alta\n• **História clínica:** Compatible com deficiência nutricional\n• **Investigação desnecessária:** Diagnóstico já estabelecido',
      category: 'incorrect',
      conceptsInvolved: ['diagnóstico incorreto', 'ferritina mal interpretada', 'investigação desnecessária']
    },
    {
      letter: 'D',
      text: 'Talassemia minor; solicitar eletroforese de hemoglobina.',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico alternativo inadequado:\n\n• **Ferritina baixa:** Descarta talassemia (ferritina normal)\n• **Resposta nutricional:** História sugere deficiência ferro\n• **Eletroforese:** Indicada se ferritina normal\n• **Tratamento perdido:** Delay na suplementação',
      category: 'incorrect',
      conceptsInvolved: ['talassemia incorreta', 'ferritina ignorada', 'delay terapêutico']
    }
  ],

  metadata: {
    specialty: 'Hematologia',
    difficulty: 'medium',
    tags: ['anemia ferropriva', 'deficiência ferro', 'suplementação', 'nutrição'],
    estimatedTime: 4,
    conceptsRequired: ['anemias carenciais', 'metabolismo do ferro', 'interpretação laboratorial'],
    learningObjectives: [
      'Diagnosticar anemia ferropriva',
      'Prescrever suplementação adequada',
      'Orientar prevenção nutricional',
      'Definir duração do tratamento'
    ]
  }
};

// ==========================================
// SISTEMA DE INICIALIZAÇÃO ESPECIALIDADES PEDIÁTRICAS
// ==========================================

async function initializeUSPSP2025EspecialidadesPediatricasSystem() {
  console.log('🎯 Inicializando sistema USP-SP 2025 Especialidades Pediátricas...');
  
  try {
    // Aguardar inicialização do sistema base
    await initializeFlowDataSystem();
    
    // Registrar dados das especialidades pediátricas
    registerEspecialidadesPediatricasFlowData();
    
    console.log('✅ Sistema USP-SP 2025 Especialidades Pediátricas inicializado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inicializar sistema USP-SP 2025 Especialidades Pediátricas:', error);
    throw error;
  }
}

function registerEspecialidadesPediatricasFlowData() {
  // Registrar questões específicas de Especialidades Pediátricas
  console.log('📚 Registrando dados de fluxo para Especialidades Pediátricas...');
  
  // Questões da prova de Especialidades Pediátricas USP-SP 2025
  registerQuestionFlowData(17, question17FlowData);
  registerQuestionFlowData(18, question18FlowData);
  registerQuestionFlowData(19, question19FlowData);
  registerQuestionFlowData(20, question20FlowData);
  registerQuestionFlowData(21, question21FlowData);
  registerQuestionFlowData(22, question22FlowData);
  registerQuestionFlowData(23, question23FlowData);
  registerQuestionFlowData(24, question24FlowData);
  
  console.log('✅ 8 questões de Especialidades Pediátricas registradas!');
}

export {
  question17FlowData,
  question18FlowData,
  question19FlowData,
  question20FlowData,
  question21FlowData,
  question22FlowData,
  question23FlowData,
  question24FlowData,
  initializeUSPSP2025EspecialidadesPediatricasSystem,
  registerEspecialidadesPediatricasFlowData
};

// Auto-inicializar quando o módulo for importado
initializeUSPSP2025EspecialidadesPediatricasSystem().catch(console.error);
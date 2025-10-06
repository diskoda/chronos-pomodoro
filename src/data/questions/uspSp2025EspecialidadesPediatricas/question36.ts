import type { QuestionFlowData } from '../../../components/questionFlow/types';

export const question36FlowData: QuestionFlowData = {
  contextText: `
Uma criança de 3 anos é trazida pelos pais com história de episódios recorrentes de chiado no peito e tosse seca, principalmente à noite e pela manhã ao acordar. Os pais relatam que os sintomas pioram quando a criança brinca com o gato da família e durante as mudanças de clima.

A mãe refere que a criança também apresenta espirros frequentes, coriza clara e coceira no nariz. Há história familiar de asma (pai) e rinite alérgica (mãe). A criança já teve três episódios similares nos últimos 6 meses, que melhoraram com broncodilatador.

**História clínica:**
- Episódios recorrentes de chiado e tosse seca (6 meses)
- Sintomas predominantemente noturnos e matinais
- Desencadeantes: contato com gato, mudanças climáticas
- Melhora com broncodilatador (salbutamol)
- Sintomas nasais: coriza, espirros, prurido
- História familiar positiva para atopia

**Exame físico (crise):**
- Estado geral: Bom
- FR: 28 irpm
- Sibilos expiratórios difusos
- Tiragem intercostal leve
- SpO2: 96% em ar ambiente
- Rinite: cornetos edemaciados, secreção clara

**Exame físico (intercrise):**
- Ausculta pulmonar normal
- Sem tiragem ou desconforto respiratório
- Cornetos nasais edemaciados

**Pergunta:** Qual é o diagnóstico mais provável e qual a primeira linha de tratamento de manutenção?
  `,

  explanationText: `
**Diagnóstico: Asma Persistente Leve + Rinite Alérgica**

**Análise diagnóstica:**

A asma é a doença crônica mais comum na infância, caracterizada por inflamação crônica das vias aéreas com hiperresponsividade brônquica e obstrução reversível.

**Critérios diagnósticos de asma (3-5 anos):**
1. **Episódios recorrentes:** ≥ 3 episódios de chiado
2. **Melhora com broncodilatador:** Resposta ao salbutamol
3. **Padrão clínico:** Sintomas noturnos/matinais
4. **Desencadeantes:** Alérgenos, irritantes
5. **História familiar:** Predisposição genética

**Classificação da gravidade:**

**Asma Persistente Leve:**
- **Sintomas:** 1x/semana, mas < 1x/dia
- **Sintomas noturnos:** ≤ 2x/mês
- **Uso de broncodilatador:** ≤ 2x/semana
- **Limitação atividades:** Mínima
- **Função pulmonar:** VEF1 ≥ 80% predito

**Rinite alérgica associada:**
- **"Marcha atópica":** Rinite → asma
- **Sintomas:** Coriza, espirros, prurido nasal
- **Desencadeantes:** Alérgenos (gato, ácaros)
- **Via aérea única:** Tratamento conjunto

**Tratamento de manutenção - Primeira linha:**

**Corticosteroides inalatórios (CI):**
- **Droga de escolha:** Budesonida ou beclometasona
- **Dose:** Baixa dose (100-200 mcg/dia budesonida)
- **Dispositivo:** Espaçador + máscara (< 5 anos)
- **Objetivo:** Controle da inflamação crônica

**Vantagens dos CI:**
- **Anti-inflamatório:** Reduz inflamação crônica
- **Prevenção:** Diminui frequência e gravidade das crises
- **Segurança:** Perfil seguro em doses baixas
- **Função pulmonar:** Melhora e preserva função

**Rinite alérgica:**
- **Corticosteroides nasais:** Budesonida nasal
- **Anti-histamínicos:** Loratadina (se necessário)
- **Medidas ambientais:** Controle de alérgenos

**Medidas não farmacológicas:**
1. **Controle ambiental:** Evitar contato com gato
2. **Educação:** Técnica inalatória, reconhecimento sintomas
3. **Plano de ação:** Quando procurar ajuda
4. **Seguimento:** Reavaliação periódica do controle

**Monitorização:**
- **Controle clínico:** Frequência e intensidade sintomas
- **Função pulmonar:** Peak flow (se possível)
- **Efeitos adversos:** Crescimento, candidíase oral
- **Adesão:** Técnica inalatória, uso regular

O tratamento precoce e adequado previne exacerbações e melhora a qualidade de vida.
  `,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Bronquiolite viral recorrente - tratamento sintomático com broncodilatadores apenas durante as crises',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Idade:** Bronquiolite é típica < 2 anos, criança tem 3 anos\n• **Padrão:** Bronquiolite não é recorrente com desencadeantes específicos\n• **Resposta:** Bronquiolite viral não responde bem a broncodilatadores\n• **Sazonalidade:** Episódios não seguem padrão viral sazonal\n• **História familiar:** Atopia familiar sugere base alérgica\n• **Tratamento:** Apenas sintomático seria inadequado para asma persistente',
      category: 'incorrect',
      conceptsInvolved: ['bronquiolite viral', 'diagnóstico diferencial', 'faixa etária']
    },
    {
      letter: 'B',
      text: 'Asma persistente leve - corticosteroides inalatórios em baixas doses',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e tratamento adequados:\n\n• **Critérios asma:** Episódios recorrentes + resposta broncodilatador + padrão típico\n• **Classificação:** Sintomas < 1x/dia, noturno ≤ 2x/mês = persistente leve\n• **Desencadeantes:** Alérgenos (gato) + história familiar atópica\n• **Tratamento primeira linha:** Corticosteroides inalatórios (budesonida/beclometasona)\n• **Dose adequada:** Baixas doses para controle inflamação crônica\n• **Rinite associada:** Componente da marcha atópica\n• **Evidência:** CI previnem exacerbações e melhoram função pulmonar',
      category: 'correct',
      conceptsInvolved: ['asma persistente leve', 'corticosteroides inalatórios', 'controle inflamação', 'primeira linha']
    },
    {
      letter: 'C',
      text: 'Refluxo gastroesofágico - inibidor bomba prótons e medidas posturais',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Sintomas:** RGE não causa sibilos típicos nem resposta a broncodilatador\n• **Padrão:** Sintomas de RGE são pós-prandiais, não noturnos por alergia\n• **Desencadeantes:** Contato com gato não desencadeia RGE\n• **História familiar:** Atopia não predispõe a RGE\n• **Exame:** Sibilos difusos são típicos de asma, não RGE\n• **Resposta:** Melhora com broncodilatador exclui RGE como causa primária',
      category: 'incorrect',
      conceptsInvolved: ['refluxo gastroesofágico', 'sintomas respiratórios', 'diagnóstico diferencial']
    },
    {
      letter: 'D',
      text: 'Pneumonia recorrente - investigação para imunodeficiência e antibioticoterapia',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Sintomas:** Pneumonia causa febre, toxemia, não apenas chiado\n• **Padrão:** Pneumonias recorrentes não melhoram com broncodilatador\n• **Radiologia:** Não há relato de infiltrados pulmonares\n• **Desencadeantes:** Pneumonia não tem relação com contato alérgenos\n• **Intercrise:** Exame normal entre episódios descarta pneumonia\n• **Resposta:** Melhora rápida com salbutamol é típica de asma',
      category: 'incorrect',
      conceptsInvolved: ['pneumonia recorrente', 'imunodeficiência', 'investigação infecciosa']
    },
    {
      letter: 'E',
      text: 'Laringomalácia - observação e fisioterapia respiratória',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Idade:** Laringomalácia manifesta-se desde nascimento, não aos 3 anos\n• **Som:** Laringomalácia causa estridor inspiratório, não sibilos expiratórios\n• **Padrão:** Não há relação com alérgenos ou história familiar\n• **Resposta:** Laringomalácia não responde a broncodilatadores\n• **Localização:** Obstrução é supraglótica, não brônquica\n• **Evolução:** Laringomalácia melhora com crescimento, não tem crises',
      category: 'incorrect',
      conceptsInvolved: ['laringomalácia', 'estridor', 'obstrução supraglótica']
    }
  ],

  metadata: {
    specialty: 'Alergia e Imunologia Pediátrica',
    difficulty: 'medium',
    tags: ['asma persistente leve', 'rinite alérgica', 'corticosteroides inalatórios', 'marcha atópica', 'controle ambiental'],
    estimatedTime: 5,
    conceptsRequired: ['asma pediátrica', 'classificação gravidade', 'tratamento manutenção', 'doenças atópicas'],
    learningObjectives: [
      'Reconhecer critérios diagnósticos de asma em pré-escolares',
      'Classificar gravidade da asma persistente',
      'Compreender indicação de corticosteroides inalatórios',
      'Identificar associação entre rinite alérgica e asma'
    ]
  }
};
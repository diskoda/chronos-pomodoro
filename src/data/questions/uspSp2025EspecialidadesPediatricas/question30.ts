import type { QuestionFlowData } from '../../../components/questionFlow/types';

export const question30FlowData: QuestionFlowData = {
  contextText: `
Uma criança de 6 anos é trazida com história de febre alta (39-40°C) intermitente há 10 dias, acompanhada de exantema evanescente que aparece principalmente durante os picos febris. A mãe relata que a criança está irritada, com diminuição do apetite e dor nas articulações.

Ao exame físico, observa-se criança em regular estado geral, com artrite em punhos e joelhos bilateralmente. Durante o exame, surge exantema maculopapular salmon-colored no tronco que desaparece rapidamente. Há linfadenomegalia generalizada e hepatoesplenomegalia discreta.

**História clínica:**
- Febre alta intermitente há 10 dias (39-40°C)
- Exantema evanescente durante picos febris
- Artralgia e artrite em punhos e joelhos
- Irritabilidade e anorexia
- Sem história de infecção prévia ou viagem

**Exame físico:**
- Regular estado geral
- Artrite em punhos e joelhos (simétrica)
- Exantema salmon-colored evanescente
- Linfadenomegalia generalizada
- Hepatoesplenomegalia discreta

**Laboratório:**
- Leucócitos: 18.000/mm³ (neutrofilia)
- VHS: 85 mm/h
- PCR: 12 mg/dL
- Fator reumatoide: negativo
- FAN: negativo

**Pergunta:** Qual é o diagnóstico mais provável e o tratamento de primeira linha?
  `,

  explanationText: `
**Diagnóstico: Artrite Idiopática Juvenil Sistêmica (AIJ Sistêmica)**

**Análise diagnóstica:**

A AIJ sistêmica é a forma mais grave da artrite idiopática juvenil, caracterizada por manifestações sistêmicas proeminentes. O caso apresenta critérios diagnósticos clássicos:

**Critérios diagnósticos (ILAR):**
1. **Artrite:** ≥ 1 articulação
2. **Febre:** ≥ 2 semanas, quotidiana por ≥ 3 dias
3. **Exantema:** Típico evanescente
4. **Mais um de:**
   - Linfadenomegalia generalizada
   - Hepatomegalia ou esplenomegalia
   - Serosite

**Manifestações características:**
- **Febre:** Quotidiana, alta (≥ 39°C), intermitente
- **Exantema:** Salmon-colored, evanescente, durante febre
- **Artrite:** Oligoarticular ou poliarticular
- **Organomegalia:** Linfadenomegalia, hepatoesplenomegalia
- **Laboratório:** Leucocitose, neutrofilia, VHS e PCR elevados

**Diagnóstico diferencial:**
- Infecções (sepse, endocardite, osteomielite)
- Neoplasias (leucemia, linfoma)
- Outras conectivopatias
- Doença de Kawasaki

**Tratamento de primeira linha:**

**AINEs:**
- **Droga:** Naproxeno ou ibuprofeno
- **Dose:** Naproxeno 10-20 mg/kg/dia (2x/dia)
- **Duração:** Resposta em 2-4 semanas

**Corticosteroides:**
- **Indicação:** Casos refratários ou manifestações graves
- **Droga:** Prednisolona 1-2 mg/kg/dia
- **Uso:** Ponte até resposta aos AINEs

O tratamento precoce e adequado é fundamental para controlar a inflamação e prevenir complicações como síndrome de ativação macrofágica.
  `,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Doença de Kawasaki - imunoglobulina endovenosa e AAS',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Critérios:** Não preenche critérios de Kawasaki (falta conjuntivite, alterações extremidades, mucosas)\n• **Artrite:** Não é característica proeminente do Kawasaki\n• **Exantema:** Na Kawasaki é polimórfico, não evanescente\n• **Organomegalia:** Linfadenomegalia no Kawasaki é cervical, não generalizada',
      category: 'plausible',
      conceptsInvolved: ['doença de Kawasaki', 'critérios diagnósticos', 'vasculites']
    },
    {
      letter: 'B',
      text: 'Artrite idiopática juvenil sistêmica - anti-inflamatórios não esteroidais',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e tratamento adequados:\n\n• **Critérios diagnósticos:** Preenche critérios ILAR para AIJ sistêmica\n• **Febre quotidiana:** > 2 semanas com picos diários\n• **Exantema evanescente:** Salmon-colored típico\n• **Artrite + organomegalia:** Completam o quadro\n• **Tratamento:** AINEs são primeira linha (naproxeno/ibuprofeno)\n• **Laboratório:** Padrão inflamatório com autoanticorpos negativos',
      category: 'correct',
      conceptsInvolved: ['AIJ sistêmica', 'AINEs', 'critérios ILAR', 'tratamento primeira linha']
    },
    {
      letter: 'C',
      text: 'Leucemia linfoblástica aguda - quimioterapia de indução',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico oncológico inadequado:\n\n• **Blastos:** Não há relato de blastos no hemograma\n• **Exantema:** Petéquias/equimoses seriam mais típicas\n• **Artrite:** Artralgias na LLA são diferentes da artrite franca\n• **Organomegalia:** Menos pronunciada que o descrito\n• **Investigação:** Necessário mielograma para confirmar',
      category: 'plausible',
      conceptsInvolved: ['leucemia', 'diagnóstico diferencial', 'manifestações oncológicas']
    },
    {
      letter: 'D',
      text: 'Endocardite bacteriana - antibioticoterapia endovenosa',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico infeccioso inadequado:\n\n• **Sopro cardíaco:** Não relatado no exame\n• **Artrite:** Endocardite causa mais artralgias que artrite\n• **Exantema:** Não é evanescente na endocardite\n• **Ecocardiograma:** Necessário para confirmar vegetações\n• **Hemoculturas:** Não realizadas',
      category: 'incorrect',
      conceptsInvolved: ['endocardite', 'infecções sistêmicas', 'manifestações cardíacas']
    },
    {
      letter: 'E',
      text: 'Artrite séptica poliarticular - drenagem cirúrgica e antibióticos',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Múltiplas articulações:** Artrite séptica poliarticular é rara\n• **Estado geral:** Criança em estado mais preservado\n• **Exantema:** Não característico de infecção articular\n• **Punção articular:** Não realizada para confirmação\n• **Evolução:** Quadro arrastado não sugere infecção aguda',
      category: 'incorrect',
      conceptsInvolved: ['artrite séptica', 'emergências ortopédicas', 'infecções articulares']
    }
  ],

  metadata: {
    specialty: 'Reumatologia Pediátrica',
    difficulty: 'medium',
    tags: ['AIJ sistêmica', 'artrite juvenil', 'exantema evanescente', 'febre quotidiana', 'AINEs'],
    estimatedTime: 5,
    conceptsRequired: ['artrite idiopática juvenil', 'critérios ILAR', 'manifestações sistêmicas', 'tratamento anti-inflamatório'],
    learningObjectives: [
      'Reconhecer critérios diagnósticos da AIJ sistêmica',
      'Identificar manifestações sistêmicas características',
      'Compreender diagnóstico diferencial com infecções e neoplasias',
      'Conhecer tratamento de primeira linha com AINEs'
    ]
  }
};
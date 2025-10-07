import type { QuestionFlowData } from '../../../components/questionFlow/core/types';

export const question28FlowData: QuestionFlowData = {
  contextText: `
Uma criança de 18 meses é trazida pelos pais com queixa de "marcha anormal". Os pais referem que a criança começou a andar aos 15 meses, mas apresenta claudicação à esquerda e "joga o quadril para fora" ao caminhar.

Ao exame físico, observa-se discrepância no comprimento dos membros inferiores, com encurtamento aparente à esquerda. O sinal de Trendelenburg é positivo à esquerda. Há limitação da abdução do quadril esquerdo.

**Exame físico:**
- Sinal de Trendelenburg positivo à esquerda
- Limitação da abdução do quadril esquerdo (< 45°)
- Encurtamento aparente do membro inferior esquerdo
- Marcha claudicante com báscula pélvica
- Assimetria das pregas glúteas

**Radiografia de quadris:**
- Atraso na ossificação do núcleo femoral à esquerda
- Ângulo acetabular aumentado à esquerda (> 30°)
- Linha de Shenton interrompida à esquerda
- Subluxação da cabeça femoral

**Pergunta:** Qual é o diagnóstico mais provável e a conduta terapêutica indicada?
  `,

  explanationText: `
**Diagnóstico: Displasia do Desenvolvimento do Quadril (DDQ) - Subluxação**

**Análise diagnóstica:**

A displasia do desenvolvimento do quadril é uma malformação que pode variar desde instabilidade leve até luxação completa. O caso apresenta características clássicas de DDQ tardia:

**Sinais clínicos:**
- **Sinal de Trendelenburg positivo:** Indica insuficiência do glúteo médio
- **Limitação da abdução:** Contratura dos adutores
- **Discrepância de comprimento:** Subluxação/luxação causa encurtamento
- **Claudicação:** Marcha antálgica compensatória

**Achados radiográficos:**
- **Atraso da ossificação:** Núcleo femoral tardio ou ausente
- **Ângulo acetabular aumentado:** Displasia acetabular
- **Linha de Shenton interrompida:** Perda da continuidade anatômica
- **Subluxação:** Deslocamento parcial da cabeça femoral

**Conduta terapêutica:**
A idade (18 meses) e presença de subluxação indicam tratamento cirúrgico:

1. **Redução aberta:** Necessária pela idade > 12-18 meses
2. **Osteotomia acetabular:** Correção da displasia acetabular
3. **Possível osteotomia femoral:** Se necessária para estabilização
4. **Imobilização pós-operatória:** Gesso pélvico-podálico

O tratamento precoce previne artrose secundária e melhora o prognóstico funcional a longo prazo.
  `,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Doença de Legg-Calvé-Perthes - repouso e limitação de atividades',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Idade:** Perthes é mais comum entre 4-8 anos\n• **Radiografia:** Não há necrose avascular da cabeça femoral\n• **Sinais:** Displasia acetabular não é característica do Perthes\n• **História:** Sintomas desde início da marcha sugerem malformação congênita',
      category: 'incorrect',
      conceptsInvolved: ['diagnóstico diferencial', 'osteocondrite', 'faixa etária']
    },
    {
      letter: 'B',
      text: 'Displasia do desenvolvimento do quadril - redução aberta e osteotomia acetabular',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e tratamento adequados:\n\n• **Sinais patognomônicos:** Trendelenburg + limitação abdução + encurtamento\n• **Radiografia:** Displasia acetabular + subluxação confirmam DDQ\n• **Idade:** 18 meses indica necessidade de tratamento cirúrgico\n• **Técnica:** Redução aberta + osteotomia para correção da displasia\n• **Prognóstico:** Intervenção precoce previne complicações',
      category: 'correct',
      conceptsInvolved: ['DDQ', 'redução aberta', 'osteotomia acetabular', 'tratamento cirúrgico']
    },
    {
      letter: 'C',
      text: 'Coxa vara congênita - osteotomia valgizante do fêmur proximal',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico parcialmente equivocado:\n\n• **Componente principal:** DDQ é o diagnóstico primário\n• **Coxa vara:** Pode estar presente, mas é secundária à displasia\n• **Tratamento:** Não corrige a displasia acetabular principal\n• **Anatomia:** Foco deve ser na correção acetabular',
      category: 'plausible',
      conceptsInvolved: ['coxa vara', 'deformidades femorais', 'prioridade terapêutica']
    },
    {
      letter: 'D',
      text: 'Paralisia cerebral - fisioterapia e órteses',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico incompatível:\n\n• **Desenvolvimento:** Criança atingiu marcos motores normalmente\n• **Neurológico:** Sem sinais de comprometimento neurológico\n• **Radiografia:** Alterações estruturais, não funcionais\n• **Assimetria:** Unilateral, não bilateral como na PC',
      category: 'incorrect',
      conceptsInvolved: ['paralisia cerebral', 'desenvolvimento neuromotor', 'sinais neurológicos']
    },
    {
      letter: 'E',
      text: 'Artrite séptica do quadril - drenagem cirúrgica e antibioticoterapia',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico agudo inadequado:\n\n• **Cronologia:** Sintomas crônicos desde início da marcha\n• **Sinais inflamatórios:** Ausentes (febre, dor aguda, impotência funcional)\n• **Radiografia:** Alterações estruturais, não destrutivas\n• **Evolução:** Quadro progressivo, não agudo',
      category: 'incorrect',
      conceptsInvolved: ['artrite séptica', 'emergências ortopédicas', 'sinais inflamatórios']
    }
  ],

  metadata: {
    specialty: 'Ortopedia Pediátrica',
    difficulty: 'medium',
    tags: ['DDQ', 'displasia quadril', 'subluxação', 'sinal Trendelenburg', 'redução aberta'],
    estimatedTime: 5,
    conceptsRequired: ['anatomia do quadril', 'displasia do desenvolvimento', 'sinais clínicos ortopédicos', 'radiografia de quadris'],
    learningObjectives: [
      'Reconhecer sinais clínicos da DDQ tardia',
      'Interpretar achados radiográficos da displasia',
      'Compreender indicações para tratamento cirúrgico',
      'Conhecer princípios da redução aberta e osteotomia'
    ]
  }
};

import type { QuestionFlowData } from '../../../components/questionFlow/types';

export const question38FlowData: QuestionFlowData = {
  contextText: `
Uma criança de 8 meses é trazida pelos pais com queixa de palidez e irritabilidade nas últimas semanas. A mãe relata que a criança está "manhosa", com diminuição do apetite e sono agitado. O aleitamento materno foi exclusivo até os 6 meses, quando iniciaram a introdução alimentar.

A alimentação atual consiste predominantemente em leite de vaca integral (800 mL/dia), frutas processadas em potinhos industrializados e alguns legumes cozidos. Os pais evitam oferecer carnes por medo de engasgo.

**História alimentar:**
- Aleitamento materno exclusivo até 6 meses
- Introdução alimentar iniciada aos 6 meses
- Alimentação atual: leite de vaca 800 mL/dia + frutas industrializadas + legumes
- Ausência de carnes na dieta
- Recusa de outros alimentos oferecidos

**Exame físico:**
- Peso: 7,2 kg (P10 - limítrofe)
- Altura: 68 cm (P25)
- Palidez cutâneo-mucosa (2+/4+)
- Irritabilidade
- Sem organomegalias
- Desenvolvimento neuropsicomotor normal

**Laboratório:**
- Hemoglobina: 8,5 g/dL (normal > 11,0 g/dL)
- Hematócrito: 25%
- VCM: 65 fL (normal: 70-86 fL)
- RDW: 18% (aumentado)
- Ferritina: 8 ng/mL (normal > 15 ng/mL)
- Ferro sérico: 35 mcg/dL (baixo)

**Pergunta:** Qual é o diagnóstico mais provável e qual a conduta nutricional mais adequada?
  `,

  explanationText: `
**Diagnóstico: Anemia Ferropriva por Deficiência Nutricional**

**Análise diagnóstica:**

A anemia ferropriva é a deficiência nutricional mais comum na infância, especialmente entre 6 meses e 2 anos, período de maior crescimento e necessidades aumentadas de ferro.

**Fatores de risco identificados:**

**1. Alimentação inadequada:**
- **Excesso de leite de vaca:** 800 mL/dia (limitar a 500 mL/dia)
- **Ausência de carnes:** Principal fonte de ferro heme (biodisponível)
- **Alimentos industrializados:** Baixo teor de ferro e nutrientes
- **Monotonia alimentar:** Limitação da variedade nutricional

**2. Mecanismos da deficiência:**
- **Ferro heme vs não-heme:** Carnes têm ferro de alta biodisponibilidade
- **Cálcio compete com ferro:** Excesso de leite prejudica absorção
- **Fitatos em vegetais:** Inibem absorção de ferro não-heme
- **Vitamina C aumenta absorção:** Ausente na dieta atual

**Laboratório característico:**
- **Anemia microcítica hipocrômica:** VCM baixo, RDW aumentado
- **Depleção dos estoques:** Ferritina baixa (< 15 ng/mL)
- **Deficiência funcional:** Ferro sérico baixo

**Conduta nutricional adequada:**

**1. Correção da dieta:**
- **Reduzir leite de vaca:** Máximo 500 mL/dia (2-3 copos)
- **Introduzir carnes:** Frango, peixe, carne bovina (ferro heme)
- **Leguminosas:** Feijão, lentilha, ervilha (ferro não-heme)
- **Vegetais verde-escuros:** Espinafre, brócolis

**2. Potencializar absorção:**
- **Vitamina C:** Frutas cítricas, tomate, pimentão
- **Combinar alimentos:** Carne + vitamina C na mesma refeição
- **Separar cálcio:** Evitar leite junto com refeições ricas em ferro

**3. Evitar inibidores:**
- **Chás:** Não oferecer (taninos inibem absorção)
- **Leite nas refeições:** Cálcio compete com ferro
- **Alimentos industrializados:** Pobres em ferro biodisponível

**4. Suplementação medicamentosa:**
- **Sulfato ferroso:** 3-5 mg/kg/dia de ferro elementar
- **Administração:** Jejum ou com vitamina C
- **Duração:** 2-3 meses após normalização da hemoglobina
- **Controle:** Hemograma em 4-6 semanas

**Orientações práticas:**
- **Texturas adequadas:** Carnes desfiadas, bem cozidas
- **Variedade:** Introduzir novos alimentos gradualmente
- **Paciência:** Pode precisar 8-10 exposições para aceitar
- **Exemplo familiar:** Pais como modelo alimentar

**Prevenção:**
- **Aleitamento materno:** Até 2 anos complementado
- **Introdução alimentar adequada:** Ferro desde 6 meses
- **Educação nutricional:** Orientação contínua

O tratamento adequado resulta em melhora clínica em 2-4 semanas e normalização laboratorial em 8-12 semanas.
  `,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Anemia ferropriva - suplementação de ferro e redução do consumo de leite de vaca para 500 mL/dia',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e conduta adequados:\n\n• **Diagnóstico:** Anemia microcítica + ferritina baixa + ferro baixo = ferropriva\n• **Causa nutricional:** Excesso leite (800 mL) + ausência carnes + monotonia alimentar\n• **Suplementação:** Sulfato ferroso 3-5 mg/kg/dia necessária para correção\n• **Limitação do leite:** 500 mL/dia evita competição cálcio-ferro\n• **Introdução carnes:** Fonte de ferro heme (alta biodisponibilidade)\n• **Educação nutricional:** Variedade alimentar e combinações adequadas\n• **Prognóstico:** Excelente com adesão ao tratamento',
      category: 'correct',
      conceptsInvolved: ['anemia ferropriva', 'deficiência ferro', 'suplementação ferrosa', 'orientação nutricional']
    },
    {
      letter: 'B',
      text: 'Anemia megaloblástica - suplementação de ácido fólico e vitamina B12',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico laboratorial inadequado:\n\n• **VCM baixo:** Anemia megaloblástica cursa com VCM alto (> 100 fL)\n• **Microcitose:** VCM 65 fL indica anemia microcítica, não megaloblástica\n• **Ferritina baixa:** Confirma deficiência de ferro, não B12/folato\n• **Idade:** Deficiência B12/folato é rara em lactentes\n• **Morfologia:** Esperaríamos macrocitose, não microcitose\n• **Causa:** Dieta com leite (fonte B12) torna deficiência improvável',
      category: 'incorrect',
      conceptsInvolved: ['anemia megaloblástica', 'deficiência B12', 'macrocitose']
    },
    {
      letter: 'C',
      text: 'Talassemia minor - eletroforese de hemoglobina e aconselhamento genético',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Ferritina baixa:** Talassemia minor tem ferritina normal/alta\n• **Ferro baixo:** Talassemia não cursa com deficiência de ferro\n• **RDW aumentado:** Talassemia tem RDW normal/discretamente aumentado\n• **Resposta clínica:** Ferropriva tem sintomas (irritabilidade), talassemia minor é assintomática\n• **Idade:** Manifestação súbita aos 8 meses sugere causa nutricional\n• **História:** Dieta inadequada explica o quadro',
      category: 'plausible',
      conceptsInvolved: ['talassemia minor', 'eletroforese Hb', 'hemoglobinopatias']
    },
    {
      letter: 'D',
      text: 'Anemia de doença crônica - investigação para processos inflamatórios',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Ferritina baixa:** Anemia de doença crônica tem ferritina normal/alta\n• **Ferro baixo com ferritina baixa:** Padrão de deficiência, não inflamação\n• **Estado geral:** Criança sem sinais de doença crônica\n• **Desenvolvimento:** Normal, sem atraso de crescimento significativo\n• **História:** Causa nutricional clara (dieta inadequada)\n• **Laboratório:** Padrão típico de deficiência de ferro',
      category: 'incorrect',
      conceptsInvolved: ['anemia doença crônica', 'processos inflamatórios', 'ferritina elevada']
    },
    {
      letter: 'E',
      text: 'Anemia fisiológica do lactente - observação e reavaliação em 3 meses',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Gravidade:** Hb 8,5 g/dL está muito baixa para ser fisiológica\n• **Ferritina baixa:** Anemia fisiológica não cursa com deficiência de ferro\n• **Sintomas:** Irritabilidade e palidez indicam anemia patológica\n• **Idade:** 8 meses está além do período da anemia fisiológica (2-3 meses)\n• **Conduta:** Observação seria negligência com Hb tão baixa\n• **Necessidade:** Tratamento imediato para evitar prejuízos ao desenvolvimento',
      category: 'incorrect',
      conceptsInvolved: ['anemia fisiológica', 'nadir hemoglobina', 'lactente jovem']
    }
  ],

  metadata: {
    specialty: 'Nutrição Pediátrica',
    difficulty: 'medium',
    tags: ['anemia ferropriva', 'deficiência ferro', 'introdução alimentar', 'suplementação', 'orientação nutricional'],
    estimatedTime: 5,
    conceptsRequired: ['nutrição infantil', 'deficiências nutricionais', 'anemia ferropriva', 'introdução alimentar'],
    learningObjectives: [
      'Reconhecer anemia ferropriva nutricional no lactente',
      'Compreender fatores dietéticos que predispõem à deficiência',
      'Identificar necessidade de suplementação e orientação nutricional',
      'Conhecer estratégias para otimizar absorção de ferro'
    ]
  }
};
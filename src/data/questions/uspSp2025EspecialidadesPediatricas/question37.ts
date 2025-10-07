import type { QuestionFlowData } from '../../../components/questionFlow/core/types';

export const question37FlowData: QuestionFlowData = {
  contextText: `
Uma adolescente de 16 anos é trazida pela mãe com queixa de "ainda não menstruou". A jovem relata desenvolvimento normal das mamas (iniciado aos 12 anos) e pelos pubianos (aos 13 anos), mas nunca apresentou menarca. Nega dor abdominal ou pélvica.

Ao exame físico, observa-se desenvolvimento mamário completo (Tanner M5), pelos pubianos normais (Tanner P5), mas ausência de pelos axilares. O exame genital externo revela clitóris de tamanho normal, mas vagina em fundo cego de aproximadamente 2 cm de profundidade.

**História clínica:**
- Idade: 16 anos
- Ausência de menarca
- Desenvolvimento mamário: iniciado aos 12 anos (normal)
- Pelos pubianos: iniciados aos 13 anos (normal)
- Ausência de dor pélvica ou abdominal
- Nega uso de medicações
- Sem história de cirurgias

**Exame físico:**
- Altura: 165 cm (normal)
- Peso: 58 kg (normal)
- Mamas: Tanner M5 (desenvolvimento completo)
- Pelos pubianos: Tanner P5 (desenvolvimento normal)
- Pelos axilares: Ausentes
- Genitália externa: Clitóris normal, vagina em fundo cego (2 cm)

**Exames complementares solicitados:**
- Ultrassom pélvico: Ausência de útero e ovários
- Cariótipo: 46,XY
- Testosterona: Níveis altos para o sexo feminino
- LH e FSH: Elevados

**Pergunta:** Qual é o diagnóstico mais provável e qual a conduta inicial mais adequada?
  `,

  explanationText: `
**Diagnóstico: Síndrome da Insensibilidade aos Andrógenos (SIA) - Forma Completa**

**Análise diagnóstica:**

A síndrome da insensibilidade aos andrógenos é uma condição rara de desenvolvimento sexual diferente (DSD) causada por mutações no gene do receptor de andrógenos, resultando em resistência aos efeitos da testosterona.

**Fisiopatologia:**
1. **Cariótipo 46,XY** com desenvolvimento testicular normal
2. **Produção normal de testosterona** pelos testículos
3. **Defeito no receptor de andrógenos** → insensibilidade à testosterona
4. **Diferenciação feminina** por ausência de ação androgênica
5. **Hormônio anti-mülleriano normal** → regressão ductos müllerianos

**Características clínicas:**

**Forma completa (CAIS):**
- **Fenótipo feminino:** Aparência externa feminina normal
- **Desenvolvimento mamário:** Normal (estrogênios pela aromatização)
- **Genitália externa:** Feminina normal, vagina em fundo cego
- **Ausência de útero e ovários:** Por ação do hormônio anti-mülleriano
- **Testículos intra-abdominais:** Produzem testosterona e estrogênios
- **Ausência de pelos axilares e pubianos:** Característico da CAIS

**Diagnóstico diferencial:**
- **Síndrome de Mayer-Rokitansky:** Cariótipo 46,XX, ovários presentes
- **Disgenesia gonadal:** Testosterona baixa, sem desenvolvimento mamário
- **Deficiência de 5-alfa-redutase:** Ambiguidade genital

**Conduta inicial:**

**1. Confirmação diagnóstica:**
- **Estudo molecular:** Sequenciamento gene receptor andrógenos
- **Dosagem hormonal:** Confirmar perfil (testosterona alta, LH/FSH elevados)
- **Imagem:** RM pelve para localizar testículos

**2. Aconselhamento multidisciplinar:**
- **Psicológico:** Suporte para paciente e família
- **Endocrinológico:** Manejo hormonal
- **Ginecológico:** Orientação sobre sexualidade
- **Genético:** Counseling familiar (herança ligada ao X)

**3. Decisões terapêuticas:**
- **Gonadectomia:** Recomendada após desenvolvimento puberal completo
- **Risco de malignização:** 2-5% (gonadoblastoma, disgerminoma)
- **Timing:** Após desenvolvimento mamário completo
- **Reposição hormonal:** Estrogênios após gonadectomia

**4. Cuidados específicos:**
- **Identidade de gênero:** Manter identidade feminina estabelecida
- **Sexualidade:** Orientação sobre função sexual (dilatação vaginal/cirurgia)
- **Fertilidade:** Impossível (ausência útero/ovários)
- **Seguimento:** Multidisciplinar longo prazo

**Prognóstico:**
- **Qualidade de vida:** Excelente com suporte adequado
- **Função sexual:** Normal com cuidados específicos
- **Desenvolvimento:** Feminino normal com reposição hormonal

O diagnóstico precoce e manejo multidisciplinar são fundamentais para o bem-estar da paciente.
  `,

  alternativesAnalysis: [
    {
      letter: 'A',
      text: 'Síndrome de Mayer-Rokitansky - ressonância magnética pélvica e criação de neovagina',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Cariótipo:** MRKH tem cariótipo 46,XX, não 46,XY\n• **Ovários:** MRKH apresenta ovários normais funcionantes\n• **Pelos:** MRKH tem pelos axilares e pubianos normais\n• **Hormônios:** Testosterona seria normal para sexo feminino\n• **Diagnóstico:** Conjunto de achados aponta para SIA, não MRKH\n• **Conduta:** Neovagina seria prematura sem confirmação diagnóstica',
      category: 'plausible',
      conceptsInvolved: ['síndrome MRKH', 'aplasia mülleriana', 'cariótipo 46,XX']
    },
    {
      letter: 'B',
      text: 'Síndrome da insensibilidade aos andrógenos - aconselhamento multidisciplinar e planejamento da gonadectomia',
      isCorrect: true,
      explanation: '✅ **CORRETA**\n\nDiagnóstico e conduta adequados:\n\n• **Cariótipo 46,XY:** Confirma DSD com fenótipo feminino\n• **Ausência pelos axilares:** Patognomônico da SIA completa\n• **Testosterona alta + LH/FSH elevados:** Resistência aos andrógenos\n• **Vagina em fundo cego + ausência útero:** Típico da SIA\n• **Conduta adequada:** Equipe multidisciplinar essencial\n• **Gonadectomia:** Indicada pelo risco de malignização (2-5%)\n• **Timing:** Após desenvolvimento puberal completo',
      category: 'correct',
      conceptsInvolved: ['SIA completa', 'DSD', 'gonadectomia', 'aconselhamento multidisciplinar']
    },
    {
      letter: 'C',
      text: 'Disgenesia gonadal - reposição hormonal e investigação para síndrome de Turner',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Desenvolvimento mamário:** Disgenesia gonadal não permite desenvolvimento mamário espontâneo\n• **Testosterona:** Níveis altos incompatíveis com disgenesia\n• **Cariótipo:** 46,XY não sugere Turner (45,X ou mosaicos)\n• **Fenótipo:** Desenvolvimento feminino normal descarta disgenesia\n• **Hormônios:** LH/FSH elevados com testosterona alta indicam resistência, não deficiência',
      category: 'incorrect',
      conceptsInvolved: ['disgenesia gonadal', 'síndrome Turner', 'deficiência hormonal']
    },
    {
      letter: 'D',
      text: 'Amenorreia primária por stress - aconselhamento psicológico e observação',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico completamente inadequado:\n\n• **Malformação anatômica:** Vagina em fundo cego indica DSD, não stress\n• **Cariótipo 46,XY:** Incompatível com stress como causa\n• **Ausência útero/ovários:** Achado anatômico, não funcional\n• **Hormônios:** Testosterona alta indica patologia específica\n• **Conduta:** Observação seria negligência médica neste caso',
      category: 'incorrect',
      conceptsInvolved: ['amenorreia funcional', 'stress psicológico', 'causas psicogênicas']
    },
    {
      letter: 'E',
      text: 'Deficiência de 5-alfa-redutase - dosagem de di-hidrotestosterona e correção cirúrgica',
      isCorrect: false,
      explanation: '❌ **INCORRETA**\n\nDiagnóstico inadequado:\n\n• **Genitália externa:** Deficiência 5α-redutase causa ambiguidade, não fenótipo feminino normal\n• **Desenvolvimento mamário:** Não ocorre na deficiência 5α-redutase\n• **Pelos pubianos:** Seriam presentes na deficiência 5α-redutase\n• **Virilização:** Deficiência 5α-redutase causa virilização na puberdade\n• **Padrão hormonal:** DHT baixa, não testosterona alta com resistência',
      category: 'incorrect',
      conceptsInvolved: ['deficiência 5α-redutase', 'ambiguidade genital', 'virilização puberal']
    }
  ],

  metadata: {
    specialty: 'Adolescência',
    difficulty: 'hard',
    tags: ['SIA', 'DSD', 'amenorreia primária', 'cariótipo 46,XY', 'gonadectomia', 'aconselhamento'],
    estimatedTime: 6,
    conceptsRequired: ['desenvolvimento sexual diferente', 'endocrinologia reprodutiva', 'genética médica', 'ginecologia do adolescente'],
    learningObjectives: [
      'Reconhecer características da síndrome da insensibilidade aos andrógenos',
      'Compreender fisiopatologia do DSD 46,XY',
      'Identificar necessidade de abordagem multidisciplinar',
      'Conhecer indicações e timing da gonadectomia'
    ]
  }
};

import type { Question } from '../../types/Question';

export const question2: Question = {
  id: 2,
  title: "Cascata do cuidado contínuo – Sífilis congênita",
  category: ["Pediatria Geral", "Infectologia", "Saúde Pública"],
  difficulty: "Difícil",
  exam: "USP-SP 2025",
  completed: false,
  correctRate: 41,
  timeEstimate: 5,
  tags: ["Epidemiologia", "Sífilis congênita", "Cascata do cuidado", "Saúde materno-infantil"],
  statement: "A cascata do cuidado contínuo do HIV (continuum of HIV care) é um parâmetro internacional do desempenho da atenção de saúde em HIV. Trata-se de uma representação gráfica, na qual as barras representam a proporção estimada de pessoas nas fases do cuidado, como exemplifica a figura a seguir:\n\n[IMAGEM: question2_img.png]\n\nA utilidade da cascata para avaliar o desempenho da atenção em saúde fez com que o modelo passasse a ser utilizado para vários agravos, entre eles a sífilis congênita. Sabendo que o tratamento adequado e oportuno da sífilis na gestante tem alta efetividade, qual deve ser a estimativa da proporção da última barra da cascata da transmissão vertical de sífilis?",
  alternatives: [
    "(A) Número de gestantes curadas /Número de gestantes tratadas X 100.",
    "(B) Número de gestantes curadas/Número de nascidos vivos X 100.",
    "(C) Número de nascidos vivos sem sífilis/Número de nascidos vivos X 100.",
    "(D) Número de nascidos vivos sem sífilis/Número de gestantes infectadas X 100."
  ]
};
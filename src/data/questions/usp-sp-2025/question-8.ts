import type { Question } from '../../types/Question';

export const question8: Question = {
  id: 8,
  title: "Precauções de isolamento em bronquiolite viral",
  category: ["Pediatria", "Infectologia", "Controle de infecção"],
  difficulty: "Médio",
  exam: "USP-SP 2025",
  completed: false,
  correctRate: 48,
  timeEstimate: 4,
  tags: ["Bronquiolite", "Isolamento", "VSR", "Parainfluenza", "Influenza A"],
  statement: "Você está de plantão na enfermaria de pediatria e há disponibilidade de 3 leitos para internação. Há um quarto compartilhado de enfermaria que comporta dois leitos com distância de 2 metros entre eles e um quarto de isolamento respiratório com um leito. No pronto-socorro infantil, três crianças com bronquiolite aguardam internação: Enzo com vírus sincicial respiratório; Miguel com parainfluenza 3 e Caio com Influenza A.\n\nAlém de precaução padrão, assinale a alternativa que apresenta a melhor opção de alocação dessas crianças.",
  alternatives: [
    "(A) Quarto de isolamento com precaução de gotícula para Miguel e quarto compartilhado com precauções de contato para Enzo e Caio.",
    "(B) Quarto de isolamento com precaução de gotícula para Enzo e quarto compartilhado com precauções de contato para Miguel e Caio.",
    "(C) Quarto de isolamento com precaução de gotícula para Caio e quarto compartilhado com precauções de contato para Enzo e Miguel.",
    "(D) Não é possível colocar dois destes pacientes em um mesmo quarto, deve-se optar por internar apenas os dois de maior gravidade em quartos diferentes."
  ]
};
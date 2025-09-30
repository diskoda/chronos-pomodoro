import type { Question } from '../../types/Question';

export const question26: Question = {
  id: 26,
  title: "Teste de oximetria neonatal - Interpretação e conduta",
  category: ["Pediatria", "Neonatologia", "Cardiologia"],
  difficulty: "Médio",
  exam: "USP-SP 2025",
  completed: false,
  correctRate: 56,
  timeEstimate: 4,
  tags: ["Teste de oximetria", "Cardiopatia congênita", "Ecocardiograma", "Triagem neonatal"],
  statement: "**CONTINUAÇÃO DO CASO ANTERIOR:**\n\nRecém-nascido termo, 30 horas de vida, submetido ao teste de oximetria neonatal. Os valores obtidos foram:\n\n*[Resultados do teste mostram diferença significativa entre medidas pré e pós-ductal]*\n\nAssinale a alternativa que apresenta a interpretação adequada sobre o resultado do teste neste paciente e a respectiva conduta.",
  alternatives: [
    "(A) Esta diferença deve ser consequência de hipoperfusão em membro inferior, por hipotermia, deve-se aquecer o paciente e repetir o teste após 1 hora.",
    "(B) A técnica do teste de oximetria não foi realizada de forma adequada, deve-se corrigir técnica e refazer o teste no período adequado.",
    "(C) O teste de oximetria é considerado positivo, deve-se realizar investigação complementar com ecocardiograma transtorácico.",
    "(D) Devido à dessaturação, deve-se iniciar oxigenioterapia e repetir o teste de oximetria 24 horas após suspensão, para excluir causa respiratória."
  ]
};
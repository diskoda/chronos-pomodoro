import type { Question } from '../../types/Question';

export const question15: Question = {
  id: 15,
  title: "Pneumotórax em paciente com doença neuromuscular",
  category: ["Pediatria", "Pneumologia", "Emergência"],
  difficulty: "Médio",
  exam: "USP-SP 2025",
  completed: false,
  correctRate: 41,
  timeEstimate: 5,
  tags: ["Pneumotórax", "Doença neuromuscular", "Drenagem torácica", "Emergência respiratória"],
  statement: "Menina, 5 anos de idade, portadora de doença neuromuscular, foi admitida com história de tosse e cansaço há 2 dias, sendo feito o diagnóstico de crise asmática. A radiografia de tórax, realizada na admissão, é apresentada a seguir:\n\n*[Radiografia inicial normal]*\n\nNo terceiro dia de internação em enfermaria, apresentou piora clínica com frequência respiratória de 44 ipm, frequência cardíaca de 138 bpm, PA de 88x68 mmHg, saturação de O₂ de 88% em máscara de Venturi 50%, ausculta pulmonar diminuída em hemitórax direito, tiragens subcostal e intercostal, tempo de enchimento capilar de 2 segundos. Foi repetida a radiografia de tórax, conforme imagem a seguir:\n\n*[Radiografia mostra pneumotórax à direita]*\n\nBaseada no diagnóstico principal, a conduta indicada é:",
  alternatives: [
    "(A) Punção de alívio em segundo espaço intercostal direito, seguida de drenagem.",
    "(B) Toraconcentese diagnóstica à direita e drenagem a depender do resultado bioquímico.",
    "(C) Fisioterapia respiratória, ventilação não invasiva e medidas de higiene pulmonar.",
    "(D) Antibioticoterapia com cobertura para patógenos nosocomiais."
  ]
};
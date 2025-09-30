import type { Question } from '../../types/Question';

export const question4: Question = {
  id: 4,
  title: "Pneumonia vs Bronquiolite - Diagnóstico e conduta",
  category: ["Pediatria", "Pneumologia", "Emergência"],
  difficulty: "Médio",
  exam: "USP-SP 2025",
  completed: false,
  correctRate: 58,
  timeEstimate: 5,
  tags: ["Pneumonia", "Bronquiolite", "Insuficiência respiratória", "Emergência pediátrica", "Suporte ventilatório"],
  statement: "Paciente, 8 meses de idade, do sexo masculino, é levado ao pronto atendimento por tosse há uma semana, com febre de até 39,5 °C há três dias. O responsável notou que ele apresenta cansaço e dificuldade para respirar. Ao exame físico, está letárgico, pálido e gemente, FC de 172 bpm, FR de 88 ipm, saturando 90% em máscara não reinalante, PA de 85x40 mmHg, temperatura axilar, no momento, de 36,9 °C. Sem alterações em ausculta cardíaca e pulmonar; com presença de tiragens intercostal, subdiafragmática e de fúrcula importantes. Tempo de enchimento capilar de 2 segundos, pulsos cheios. Restante do exame físico sem alterações.\n\nAssinale a alternativa que descreve a principal hipótese diagnóstica e a conduta indicada nesse momento.",
  alternatives: [
    "(A) Pneumonia; indicar intubação orotraqueal, mantendo o paciente em máscara não reinalante até que as medicações e materiais do procedimento estejam prontos.",
    "(B) Pneumonia; indicar cateter nasal de alto fluxo, mantendo o paciente em ventilações com bolsa-válvula-máscara até que o equipamento seja acoplado.",
    "(C) Bronquiolite; indicar intubação orotraqueal, mantendo o paciente em ventilações com bolsa-válvula-máscara até que as medicações e materiais do procedimento estejam prontos.",
    "(D) Bronquiolite; indicar cateter nasal de alto fluxo, mantendo o paciente em máscara não reinalante até que o equipamento seja acoplado."
  ]
};
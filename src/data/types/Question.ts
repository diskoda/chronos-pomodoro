export interface Question {
  id: number;
  title: string;
  category: string | string[]; // Agora suporta uma categoria ou múltiplas categorias
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  exam: string;
  completed: boolean;
  correctRate: number;
  timeEstimate: number;
  tags: string[];
  statement?: string;
  alternatives?: string[];
  answer?: string; // Resposta correta (letra: A, B, C, D, E)
  correctAnswer?: string; // Alias para compatibilidade
}
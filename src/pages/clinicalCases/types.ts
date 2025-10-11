export interface ClinicalCase {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Básico' | 'Intermediário' | 'Avançado';
  completed: boolean;
  locked: boolean;
}

export interface StudyModule {
  id: number;
  title: string;
  description: string;
  specialty: string;
  totalDuration: string;
  cases: ClinicalCase[];
  icon: any;
  completedCases: number;
  totalCases: number;
}
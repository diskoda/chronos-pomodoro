export interface CaseBase {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  topics: string[];
  completed: boolean;
}

export interface BasicCase extends CaseBase {}

export interface ClinicalCase extends CaseBase {
  specialty?: string;
  complexity?: 'low' | 'medium' | 'high';
}

export interface SpecialtyCase extends CaseBase {
  specialty: string;
  prerequisites?: string[];
}

export interface StatItem {
  icon: React.ComponentType<any>;
  iconColor: string;
  value: string | number;
  label: string;
  bgColor?: string;
}

export interface InfoSection {
  title: string;
  content: string;
}
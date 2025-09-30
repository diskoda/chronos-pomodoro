export interface StudyModeOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  image?: string;
  isActive: boolean;
  route: string;
}
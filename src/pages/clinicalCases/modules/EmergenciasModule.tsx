import { AlertTriangle } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import type { StudyModule } from '../types.ts';

interface EmergenciasModuleProps {
  onSelectCase: (moduleId: number, caseId: number) => void;
  getDifficultyColor: (difficulty: string) => string;
  getSpecialtyColor: (specialty: string) => string;
}

export default function EmergenciasModule({ 
  onSelectCase, 
  getDifficultyColor, 
  getSpecialtyColor 
}: EmergenciasModuleProps) {
  const module: StudyModule = {
    id: 3,
    title: "Emergências",
    description: "Atendimento de urgência e emergência pediátrica",
    specialty: "Emergência",
    totalDuration: "140 min",
    completedCases: 0,
    totalCases: 5,
    icon: AlertTriangle,
    cases: [
      {
        id: 1,
        title: "Reanimação Cardiopulmonar",
        description: "RCP em pediatria - protocolos e técnicas",
        duration: "35 min",
        difficulty: "Avançado",
        completed: false,
        locked: false
      },
      {
        id: 2,
        title: "Choque em Pediatria",
        description: "Reconhecimento e manejo dos diferentes tipos de choque",
        duration: "30 min",
        difficulty: "Avançado",
        completed: false,
        locked: false
      },
      {
        id: 3,
        title: "Trauma Pediátrico",
        description: "Abordagem inicial do paciente politraumatizado",
        duration: "25 min",
        difficulty: "Intermediário",
        completed: false,
        locked: true
      },
      {
        id: 4,
        title: "Convulsões Agudas",
        description: "Manejo de crises convulsivas em emergência",
        duration: "25 min",
        difficulty: "Intermediário",
        completed: false,
        locked: true
      },
      {
        id: 5,
        title: "Insuficiência Respiratória",
        description: "Diagnóstico e tratamento da IRpA em crianças",
        duration: "25 min",
        difficulty: "Avançado",
        completed: false,
        locked: true
      }
    ]
  };

  return (
    <ModuleCard
      module={module}
      onSelectCase={onSelectCase}
      getDifficultyColor={getDifficultyColor}
      getSpecialtyColor={getSpecialtyColor}
    />
  );
}
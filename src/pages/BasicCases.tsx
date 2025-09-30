import { useNavigate } from 'react-router-dom';
import { PageHeaderWithBack } from '../components/common';
import { StatsOverview, CaseGrid, InfoPanel, type BasicCase, type InfoSection } from '../components/clinicalCases';

export default function BasicCases() {
  const navigate = useNavigate();

  const basicCases: BasicCase[] = [
    {
      id: 1,
      title: "Febre em lactente de 2 meses",
      description: "Avaliação inicial de febre em lactente jovem. Aborda investigação, critérios de internação e manejo.",
      duration: "15 min",
      difficulty: "Básico",
      topics: ["Febre", "Lactente", "Investigação"],
      completed: false
    },
    {
      id: 2,
      title: "Diarreia aguda em pré-escolar",
      description: "Manejo de gastroenterite aguda, avaliação de desidratação e terapia de reidratação oral.",
      duration: "18 min",
      difficulty: "Básico",
      topics: ["Diarreia", "Desidratação", "TRO"],
      completed: false
    },
    {
      id: 3,
      title: "Tosse persistente em escolar",
      description: "Investigação de tosse crônica, diagnóstico diferencial e abordagem terapêutica.",
      duration: "20 min",
      difficulty: "Básico",
      topics: ["Tosse", "Pneumologia", "Diagnóstico diferencial"],
      completed: false
    },
    {
      id: 4,
      title: "Crescimento e desenvolvimento normal",
      description: "Avaliação do crescimento e marcos do desenvolvimento em consulta de puericultura.",
      duration: "16 min",
      difficulty: "Básico",
      topics: ["Crescimento", "Desenvolvimento", "Puericultura"],
      completed: false
    }
  ];

  const infoSections: InfoSection[] = [
    {
      title: "Objetivo",
      content: "Os casos básicos são projetados para fortalecer conceitos fundamentais da pediatria através de situações clínicas comuns e bem estruturadas."
    },
    {
      title: "Estrutura",
      content: "Cada caso inclui anamnese, exame físico, raciocínio diagnóstico e plano terapêutico com feedback detalhado."
    }
  ];

  const handleBack = () => {
    navigate('/clinical-cases');
  };

  const handleCaseSelect = (caseId: number) => {
    navigate(`/clinical-case/${caseId}`);
  };

  return (
    <div className="dashboard-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <PageHeaderWithBack
          title="Casos Básicos"
          subtitle="Casos fundamentais para consolidar conhecimentos essenciais de pediatria"
          onBack={handleBack}
        />

        <StatsOverview cases={basicCases} />

        <CaseGrid 
          cases={basicCases}
          onCaseSelect={handleCaseSelect}
          variant="basic"
        />

        <InfoPanel 
          title="Sobre os Casos Básicos"
          sections={infoSections}
        />
      </div>
    </div>
  );
}
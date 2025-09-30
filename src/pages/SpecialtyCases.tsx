import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, BookOpen } from 'lucide-react';

interface SpecialtyCase {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  specialty: string;
  topics: string[];
  completed: boolean;
}

export default function SpecialtyCases() {
  const navigate = useNavigate();

  const specialtyCases: SpecialtyCase[] = [
    {
      id: 9,
      title: "Neonato com distúrbio metabólico",
      description: "Investigação de erro inato do metabolismo, acidemia metabólica e manejo em UTI neonatal.",
      duration: "40 min",
      difficulty: "Avançado",
      specialty: "Neonatologia",
      topics: ["Erro inato metabolismo", "Acidemia", "UTI neonatal"],
      completed: false
    },
    {
      id: 10,
      title: "Criança com cardiopatia complexa",
      description: "Avaliação pré-operatória, manejo perioperatório e seguimento de cardiopatia congênita complexa.",
      duration: "45 min",
      difficulty: "Avançado",
      specialty: "Cardiologia",
      topics: ["Cardiopatia complexa", "Cirurgia cardíaca", "Hemodinâmica"],
      completed: false
    },
    {
      id: 11,
      title: "Adolescente com doença inflamatória intestinal",
      description: "Diagnóstico diferencial de DII, investigação endoscópica e terapia imunossupressora.",
      duration: "35 min",
      difficulty: "Avançado",
      specialty: "Gastroenterologia",
      topics: ["DII", "Endoscopia", "Imunossupressão"],
      completed: false
    },
    {
      id: 12,
      title: "Lactente com imunodeficiência primária",
      description: "Investigação de imunodeficiência, infecções oportunistas e terapia de reposição.",
      duration: "38 min",
      difficulty: "Avançado",
      specialty: "Imunologia",
      topics: ["Imunodeficiência", "Infecções oportunistas", "Imunoglobulina"],
      completed: false
    }
  ];

  const handleBack = () => {
    navigate('/clinical-cases');
  };

  const handleCaseSelect = (caseId: number) => {
    navigate(`/clinical-case/${caseId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Avançado': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors = {
      'Neonatologia': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Cardiologia': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Gastroenterologia': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Imunologia': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    };
    return colors[specialty as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="dashboard-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 theme-text-secondary hover:theme-text-primary transition-colors mr-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </button>
          
          <div>
            <h1 className="text-3xl font-bold theme-text-primary">
              Especialidades
            </h1>
            <p className="theme-text-secondary mt-2">
              Casos avançados de subespecialidades pediátricas
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="theme-card rounded-lg p-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold theme-text-primary">{specialtyCases.length}</p>
                <p className="text-sm theme-text-secondary">Total de Casos</p>
              </div>
            </div>
          </div>
          
          <div className="theme-card rounded-lg p-4">
            <div className="flex items-center">
              <User className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold theme-text-primary">
                  {specialtyCases.filter(c => c.completed).length}
                </p>
                <p className="text-sm theme-text-secondary">Concluídos</p>
              </div>
            </div>
          </div>

          <div className="theme-card rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-2xl font-bold theme-text-primary">
                  {Math.round(specialtyCases.reduce((acc, c) => acc + parseInt(c.duration), 0) / specialtyCases.length)}min
                </p>
                <p className="text-sm theme-text-secondary">Tempo Médio</p>
              </div>
            </div>
          </div>

          <div className="theme-card rounded-lg p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 dark:text-purple-400 font-bold">%</span>
              </div>
              <div>
                <p className="text-2xl font-bold theme-text-primary">
                  {Math.round((specialtyCases.filter(c => c.completed).length / specialtyCases.length) * 100)}%
                </p>
                <p className="text-sm theme-text-secondary">Progresso</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cases List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {specialtyCases.map((specialtyCase) => (
            <div
              key={specialtyCase.id}
              onClick={() => handleCaseSelect(specialtyCase.id)}
              className={`
                theme-card rounded-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:theme-shadow-lg border hover:border-blue-500
                ${specialtyCase.completed ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''}
              `}
            >
              
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold theme-text-primary mb-2">
                    {specialtyCase.title}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(specialtyCase.difficulty)}`}>
                      {specialtyCase.difficulty}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSpecialtyColor(specialtyCase.specialty)}`}>
                      {specialtyCase.specialty}
                    </span>
                  </div>
                  <span className="text-xs theme-text-tertiary flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {specialtyCase.duration}
                  </span>
                </div>
                
                {specialtyCase.completed && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="theme-text-secondary text-sm leading-relaxed mb-4">
                {specialtyCase.description}
              </p>

              {/* Topics */}
              <div className="flex flex-wrap gap-2">
                {specialtyCase.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Information Panel */}
        <div className="mt-8 theme-card rounded-lg p-6">
          <h3 className="text-lg font-semibold theme-text-primary mb-4">
            🏆 Sobre as Especialidades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm theme-text-secondary">
            <div>
              <h4 className="font-medium theme-text-primary mb-2">Nível Avançado</h4>
              <p>Casos que requerem conhecimento especializado e experiência clínica em subespecialidades pediátricas específicas.</p>
            </div>
            <div>
              <h4 className="font-medium theme-text-primary mb-2">Especialistas</h4>
              <p>Desenvolvidos em colaboração com especialistas de cada área, oferecendo insights únicos e atualizações baseadas em evidências.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
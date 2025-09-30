import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, BookOpen } from 'lucide-react';

interface ClinicalCase {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  topics: string[];
  completed: boolean;
}

export default function ClinicalCases() {
  const navigate = useNavigate();

  const clinicalCases: ClinicalCase[] = [
    {
      id: 5,
      title: "Lactente com dificuldade respiratória e cianose",
      description: "Caso complexo envolvendo cardiopatia congênita, insuficiência cardíaca e manejo multidisciplinar.",
      duration: "30 min",
      difficulty: "Intermediário",
      topics: ["Cardiopatia", "Insuficiência cardíaca", "Cianose"],
      completed: false
    },
    {
      id: 6,
      title: "Adolescente com perda de peso e poliúria",
      description: "Investigação de diabetes mellitus tipo 1, cetoacidose diabética e manejo agudo e crônico.",
      duration: "28 min",
      difficulty: "Intermediário",
      topics: ["Diabetes", "Cetoacidose", "Endocrinologia"],
      completed: false
    },
    {
      id: 7,
      title: "Escolar com convulsões recorrentes",
      description: "Abordagem diagnóstica de epilepsia, investigação neurológica e tratamento anticonvulsivante.",
      duration: "32 min",
      difficulty: "Intermediário",
      topics: ["Epilepsia", "Convulsão", "Neurologia"],
      completed: false
    },
    {
      id: 8,
      title: "RN com icterícia e hepatomegalia",
      description: "Investigação de icterícia neonatal patológica, causas metabólicas e infecciosas.",
      duration: "25 min",
      difficulty: "Intermediário",
      topics: ["Icterícia neonatal", "Hepatomegalia", "Metabolismo"],
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
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
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
              Casos Clínicos
            </h1>
            <p className="theme-text-secondary mt-2">
              Casos complexos que integram múltiplas áreas do conhecimento pediátrico
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="theme-card rounded-lg p-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold theme-text-primary">{clinicalCases.length}</p>
                <p className="text-sm theme-text-secondary">Total de Casos</p>
              </div>
            </div>
          </div>
          
          <div className="theme-card rounded-lg p-4">
            <div className="flex items-center">
              <User className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold theme-text-primary">
                  {clinicalCases.filter(c => c.completed).length}
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
                  {Math.round(clinicalCases.reduce((acc, c) => acc + parseInt(c.duration), 0) / clinicalCases.length)}min
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
                  {Math.round((clinicalCases.filter(c => c.completed).length / clinicalCases.length) * 100)}%
                </p>
                <p className="text-sm theme-text-secondary">Progresso</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cases List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clinicalCases.map((clinicalCase) => (
            <div
              key={clinicalCase.id}
              onClick={() => handleCaseSelect(clinicalCase.id)}
              className={`
                theme-card rounded-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:theme-shadow-lg border hover:border-blue-500
                ${clinicalCase.completed ? 'border-green-500 bg-green-50 dark:bg-green-950' : ''}
              `}
            >
              
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold theme-text-primary mb-2">
                    {clinicalCase.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(clinicalCase.difficulty)}`}>
                      {clinicalCase.difficulty}
                    </span>
                    <span className="text-xs theme-text-tertiary flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {clinicalCase.duration}
                    </span>
                  </div>
                </div>
                
                {clinicalCase.completed && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="theme-text-secondary text-sm leading-relaxed mb-4">
                {clinicalCase.description}
              </p>

              {/* Topics */}
              <div className="flex flex-wrap gap-2">
                {clinicalCase.topics.map((topic, index) => (
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
            🎯 Sobre os Casos Clínicos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm theme-text-secondary">
            <div>
              <h4 className="font-medium theme-text-primary mb-2">Complexidade</h4>
              <p>Casos que exigem integração de conhecimentos de múltiplas áreas da pediatria, simulando situações reais de alta complexidade.</p>
            </div>
            <div>
              <h4 className="font-medium theme-text-primary mb-2">Abordagem</h4>
              <p>Foco no raciocínio clínico avançado, tomada de decisões em cenários desafiadores e manejo multidisciplinar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
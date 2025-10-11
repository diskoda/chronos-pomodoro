import { useNavigate } from 'react-router-dom';
import ClinicalCasesHeader from './components/ClinicalCasesHeader';
import StaticStatsOverview from './components/StaticStatsOverview';
import InfoPanel from './components/InfoPanel';
import {
  BioeticaModule,
  FundamentosModule,
  EmergenciasModule,
  DesenvolvimentoModule,
  SaudeEscolarModule,
  AcidentesViolenciasModule,
  ToxicologiaModule,
  DrogasViolenciasModule,
  AleitamentoModule,
  NeonatologiaModule,
  AdolescenciaModule,
  AlergiaModule,
  ImunologiaModule,
  CardiologiaModule
} from './modules';

export default function ClinicalCases() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/study');
  };

  const handleModuleSelect = (moduleId: number, caseId: number) => {
    // Navegação para o caso clínico específico
    navigate(`/clinical-case/${moduleId}/${caseId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico':
        return 'bg-green-500 text-white';
      case 'Intermediário':
        return 'bg-orange-500 text-white';
      case 'Avançado':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors = [
      'bg-blue-500', 'bg-purple-500', 'bg-teal-500', 'bg-pink-500',
      'bg-indigo-500', 'bg-cyan-500', 'bg-amber-500', 'bg-emerald-500',
      'bg-violet-500', 'bg-rose-500', 'bg-sky-500', 'bg-lime-500',
      'bg-fuchsia-500', 'bg-orange-600'
    ];
    const index = specialty.length % colors.length;
    return colors[index];
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ClinicalCasesHeader onBack={handleBack} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Módulos de Casos Clínicos
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto">
            Explore módulos especializados em pediatria, cada um contendo múltiplos casos clínicos progressivos para aprimorar suas habilidades diagnósticas e terapêuticas.
          </p>
        </div>

        {/* Stats Overview */}
        <StaticStatsOverview />

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          <BioeticaModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <FundamentosModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <EmergenciasModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <DesenvolvimentoModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <SaudeEscolarModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <AcidentesViolenciasModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <ToxicologiaModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <DrogasViolenciasModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <AleitamentoModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <NeonatologiaModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <AdolescenciaModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <AlergiaModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <ImunologiaModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
          <CardiologiaModule
            onSelectCase={handleModuleSelect}
            getDifficultyColor={getDifficultyColor}
            getSpecialtyColor={getSpecialtyColor}
          />
        </div>

        {/* Info Panel */}
        <InfoPanel />
      </div>
    </div>
  );
}
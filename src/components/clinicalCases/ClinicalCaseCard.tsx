import { Play } from 'lucide-react';
import DifficultyBadge from './DifficultyBadge';
import CaseInfo from './CaseInfo';
import ObjectivesPreview from './ObjectivesPreview';

interface ClinicalCase {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: number;
  specialties: string[];
  objectives: string[];
}

interface ClinicalCaseCardProps {
  clinicalCase: ClinicalCase;
  onSelect: (caseId: string) => void;
}

export default function ClinicalCaseCard({ clinicalCase, onSelect }: ClinicalCaseCardProps) {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-600 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              {clinicalCase.title}
            </h3>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">
              {clinicalCase.description}
            </p>
          </div>
          <div className="ml-4">
            <DifficultyBadge difficulty={clinicalCase.difficulty} />
          </div>
        </div>

        {/* Info */}
        <CaseInfo 
          estimatedTime={clinicalCase.estimatedTime}
          specialties={clinicalCase.specialties}
          objectivesCount={clinicalCase.objectives.length}
        />

        {/* Objectives Preview */}
        <ObjectivesPreview objectives={clinicalCase.objectives} />

        {/* Action Button */}
        <button
          onClick={() => onSelect(clinicalCase.id)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group"
        >
          <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Iniciar Caso</span>
        </button>
      </div>
    </div>
  );
}
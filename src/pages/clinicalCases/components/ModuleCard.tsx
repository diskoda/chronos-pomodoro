import { Clock, Target, ChevronRight, Lock } from 'lucide-react';
import type { StudyModule } from '../types.ts';

interface ModuleCardProps {
  module: StudyModule;
  onSelectCase: (moduleId: number, caseId: number) => void;
  getSpecialtyColor: (specialty: string) => string;
  getDifficultyColor: (difficulty: string) => string;
}

export default function ModuleCard({ 
  module, 
  onSelectCase, 
  getSpecialtyColor,
  getDifficultyColor
}: ModuleCardProps) {
  const IconComponent = module.icon;
  const progressPercentage = Math.round((module.completedCases / module.totalCases) * 100);

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-blue-500 transition-all duration-300 group">
      {/* Module Header */}
      <div className={`${getSpecialtyColor(module.specialty)} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">{module.title}</h3>
              <p className="text-white/80 text-sm">{module.specialty}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white text-sm font-medium">
              {module.completedCases}/{module.totalCases} casos
            </div>
            <div className="w-16 bg-white/20 rounded-full h-2 mt-1">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <div className="p-6">
        <p className="text-slate-300 text-sm mb-4">{module.description}</p>
        
        {/* Cases List */}
        <div className="space-y-3 mb-4">
          <h4 className="font-semibold text-white text-sm flex items-center">
            Casos Clínicos ({module.totalCases})
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {module.cases.map((clinicalCase) => (
              <div
                key={clinicalCase.id}
                onClick={() => !clinicalCase.locked && onSelectCase(module.id, clinicalCase.id)}
                className={`
                  p-3 rounded-lg border transition-all duration-200 cursor-pointer
                  ${clinicalCase.locked 
                    ? 'bg-slate-700/30 border-slate-600 cursor-not-allowed opacity-60' 
                    : clinicalCase.completed
                      ? 'bg-green-900/30 border-green-700 hover:border-green-500'
                      : 'bg-slate-700/50 border-slate-600 hover:border-blue-500'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {clinicalCase.locked && <Lock className="h-3 w-3 text-slate-400" />}
                      <p className={`font-medium text-sm ${
                        clinicalCase.locked ? 'text-slate-400' : 
                        clinicalCase.completed ? 'text-green-300' : 'text-blue-300'
                      }`}>
                        {clinicalCase.title}
                      </p>
                    </div>
                    <p className="text-slate-400 text-xs">{clinicalCase.description}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-slate-400" />
                        <span className="text-slate-400 text-xs">{clinicalCase.duration}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(clinicalCase.difficulty)}`}>
                        {clinicalCase.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    {clinicalCase.completed ? (
                      <Target className="h-4 w-4 text-green-400" />
                    ) : clinicalCase.locked ? (
                      <Lock className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className="text-slate-400 text-sm">{module.totalDuration}</span>
          </div>
          
          <div className="text-sm">
            {module.completedCases === module.totalCases ? (
              <div className="flex items-center space-x-1 text-green-400">
                <Target className="h-4 w-4" />
                <span className="font-medium">Módulo Completo</span>
              </div>
            ) : (
              <div className="text-blue-300 font-medium">
                {progressPercentage}% concluído
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
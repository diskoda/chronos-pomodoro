import { BookOpen, Target, Clock, Users } from 'lucide-react';
import type { StudyModule } from '../types.ts';

interface StatsOverviewProps {
  modules: StudyModule[];
}

export default function StatsOverview({ modules }: StatsOverviewProps) {
  const totalCases = modules.reduce((sum, module) => sum + module.totalCases, 0);
  const completedCases = modules.reduce((sum, module) => sum + module.completedCases, 0);
  const totalSpecialties = new Set(modules.map(m => m.specialty)).size;
  
  // Calcular tempo total em minutos e converter para horas e minutos
  const totalMinutes = modules.reduce((sum, module) => {
    const duration = module.totalDuration;
    const minutes = parseInt(duration.replace(/\D/g, ''));
    return sum + minutes;
  }, 0);
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const totalTimeFormatted = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center">
          <BookOpen className="h-8 w-8 text-blue-400 mr-3" />
          <div>
            <p className="text-2xl font-bold text-white">{totalCases}</p>
            <p className="text-slate-400 text-sm">Casos Disponíveis</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center">
          <Target className="h-8 w-8 text-green-400 mr-3" />
          <div>
            <p className="text-2xl font-bold text-white">{completedCases}</p>
            <p className="text-slate-400 text-sm">Casos Concluídos</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center">
          <Clock className="h-8 w-8 text-orange-400 mr-3" />
          <div>
            <p className="text-2xl font-bold text-white">{totalTimeFormatted}</p>
            <p className="text-slate-400 text-sm">Tempo Total</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-purple-400 mr-3" />
          <div>
            <p className="text-2xl font-bold text-white">{totalSpecialties}</p>
            <p className="text-slate-400 text-sm">Especialidades</p>
          </div>
        </div>
      </div>
    </div>
  );
}
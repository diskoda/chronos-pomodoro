import { BookOpen, Target, Clock, Users } from 'lucide-react';

export default function StaticStatsOverview() {
  // Estatísticas calculadas estaticamente para os 14 módulos
  const totalCases = 54; // 4+3+5+4+3+4+3+4+3+5+4+4+4+4
  const completedCases = 0; // Nenhum caso concluído inicialmente
  const totalMinutes = 1555; // Soma de todos os módulos: 120+95+140+110+85+100+90+105+80+135+115+95+110+125
  const totalSpecialties = 13; // Número de especialidades diferentes
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const totalTimeFormatted = `${hours}h ${minutes}min`;

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
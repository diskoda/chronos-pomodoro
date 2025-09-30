import { CheckCircle, Play, AlertCircle } from 'lucide-react';

export default function ClinicalCases() {
  return (
    <div className="theme-card rounded-lg">
      <div className="p-6 border-b theme-border">
        <h2 className="text-lg font-semibold theme-text-primary">Casos Clínicos Recentes</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Caso #157: Febre em lactente de 3 meses</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Emergência Pediátrica • Concluído</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">95 pontos</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Há 2 horas</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-2">
                <Play className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Caso #158: Dispneia em recém-nascido</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Neonatologia • Em progresso</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">50% completo</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Iniciado hoje</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 dark:bg-red-900 rounded-full p-2">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Caso #156: Sopro cardíaco em criança de 5 anos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Cardiologia Pediátrica • Pendente</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Não iniciado</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Disponível</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
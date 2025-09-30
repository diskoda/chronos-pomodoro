export default function StudyProgress() {
  return (
    <div className="theme-card rounded-lg">
      <div className="p-6 border-b theme-border">
        <h2 className="text-lg font-semibold theme-text-primary">Progresso de Estudo</h2>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium theme-text-primary">Casos Clínicos</span>
              <span className="text-sm theme-text-secondary">78%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium theme-text-primary">Banco de Questões</span>
              <span className="text-sm theme-text-secondary">65%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: '65%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium theme-text-primary">Flashcards</span>
              <span className="text-sm theme-text-secondary">52%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{width: '52%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
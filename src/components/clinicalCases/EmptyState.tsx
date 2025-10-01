interface EmptyStateProps {
  onBackToDashboard: () => void;
}

export default function EmptyState({ onBackToDashboard }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">📚</div>
      <h2 className="text-2xl font-bold text-white mb-4">Nenhum caso disponível</h2>
      <p className="text-gray-400 mb-8">Os casos clínicos serão adicionados em breve.</p>
      <button
        onClick={onBackToDashboard}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
      >
        Voltar ao Dashboard
      </button>
    </div>
  );
}
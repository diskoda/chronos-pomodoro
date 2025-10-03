import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import type { Question } from '../../data/types/Question';
import { useQuestionCooldown } from '../../hooks/useQuestionCooldown';
import { useLoading } from '../../contexts/LoadingContext';

interface UniversalQuestionCardProps {
  question: Question;
  className?: string;
  showActions?: boolean;
  compact?: boolean;
}

export default function UniversalQuestionCard({ 
  question, 
  className = '',
  showActions = true,
  compact = false
}: UniversalQuestionCardProps) {
  
  // Hooks de cooldown para ambos os modos
  const drSkodaCooldown = useQuestionCooldown(question.id, 'dr-skoda');
  const examCooldown = useQuestionCooldown(question.id, 'exam');
  const { showLoading } = useLoading();
  const navigate = useNavigate();
  
  // Função para obter a categoria de exibição mais específica
  const getDisplayCategory = () => {
    if (Array.isArray(question.category)) {
      // Se há múltiplas categorias, priorizar especialidades específicas
      const priorities = [
        'Neonatologia',
        'Cardiologia',
        'Endocrinologia', 
        'Pneumologia',
        'Dermatologia',
        'Infectologia',
        'Neurologia',
        'Cirurgia',
        'Emergência',
        'Otorrinolaringologia',
        'Nefrologia',
        'Gastroenterologia',
        'Hematologia',
        'Oftalmologia',
        'Genética',
        'Alergia e Imunologia',
        'Controle de infecção',
        'Saúde Pública'
      ];
      
      // Encontrar a primeira categoria específica
      for (const priority of priorities) {
        const found = question.category.find(cat => cat.includes(priority));
        if (found) return found;
      }
      
      // Se não encontrar especialidade específica, usar a categoria não-Pediatria
      const nonPediatric = question.category.find(cat => 
        !cat.toLowerCase().includes('pediatria') && 
        cat !== 'Pediatria Geral' && 
        cat !== 'Pediatria'
      );
      if (nonPediatric) return nonPediatric;
      
      // Fallback para a primeira categoria
      return question.category[0];
    }
    
    // Se é string única, verificar se é muito genérica
    if (question.category === 'Pediatria Geral' || question.category === 'Pediatria') {
      // Tentar usar as tags para uma categorização mais específica
      const categoryFromTags = getCategoryFromTags();
      if (categoryFromTags) return categoryFromTags;
    }
    
    return question.category;
  };
  
  // Função para extrair categoria das tags quando categoria é muito genérica
  const getCategoryFromTags = () => {
    if (!question.tags || question.tags.length === 0) return null;
    
    const specialtyMappings: Record<string, string> = {
      'Reanimação neonatal': 'Neonatologia',
      'Neonatologia': 'Neonatologia',
      'Teste de oximetria': 'Neonatologia',
      'Triagem neonatal': 'Neonatologia',
      'Cetoacidose diabética': 'Endocrinologia',
      'Diabetes': 'Endocrinologia',
      'Pneumotórax': 'Pneumologia',
      'Bronquiolite': 'Pneumologia',
      'Asma': 'Pneumologia',
      'Doença neuromuscular': 'Neurologia',
      'Molusco contagioso': 'Dermatologia',
      'Onicomicose': 'Dermatologia',
      'Otite média': 'Otorrinolaringologia',
      'Isolamento': 'Infectologia',
      'VSR': 'Infectologia',
      'Parainfluenza': 'Infectologia',
      'Influenza A': 'Infectologia',
      'Sífilis congênita': 'Infectologia',
      'Glaucoma congênito': 'Oftalmologia',
      'Entrevista motivacional': 'Saúde Pública',
      'Epidemiologia': 'Saúde Pública',
      'Cascata do cuidado': 'Saúde Pública',
      'Hidratação venosa': 'Nefrologia',
      'Hipocalemia': 'Nefrologia',
      'Diarreia aguda': 'Gastroenterologia',
      'APLV': 'Alergia e Imunologia',
      'Alergia alimentar': 'Alergia e Imunologia',
      'Parada cardiorrespiratória': 'Cardiologia',
      'Bradiarritmia': 'Cardiologia',
      'Ducto arterioso': 'Cardiologia',
      'Cardiopatia congênita': 'Cardiologia',
      'PTI': 'Hematologia',
      'Plaquetopenia': 'Hematologia',
      'Erro inato do metabolismo': 'Genética'
    };
    
    for (const tag of question.tags) {
      if (specialtyMappings[tag]) {
        return specialtyMappings[tag];
      }
    }
    
    return null;
  };
  
  const displayCategory = getDisplayCategory();
  
  // Função para renderizar botão com status de cooldown
  const renderActionButton = (
    mode: 'dr-skoda' | 'exam',
    label: string,
    bgColor: string,
    hoverColor: string,
    cooldown: typeof drSkodaCooldown,
    isCompact = false
  ) => {
    const route = mode === 'dr-skoda' ? `/question/dr-skoda/${question.id}` : `/exam/question/${question.id}`;
    const sizeClasses = isCompact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm';
    
    // Função para navegar com loading
    const handleNavigation = (e: React.MouseEvent) => {
      e.preventDefault();
      showLoading(`Preparando questão ${question.id}...`, 'default');
      
      // Pequeno delay para mostrar o loading
      setTimeout(() => {
        navigate(route);
      }, 300);
    };
    
    if (cooldown.loading) {
      return (
        <div className={`flex items-center justify-center gap-2 ${bgColor} opacity-50 text-white ${sizeClasses} rounded font-medium cursor-not-allowed`}>
          <Clock className="w-4 h-4 animate-spin" />
          {label}
        </div>
      );
    }
    
    if (!cooldown.canAttempt) {
      return (
        <div 
          className={`flex items-center justify-center gap-2 bg-gray-400 text-white ${sizeClasses} rounded font-medium cursor-not-allowed relative group`}
          title={`Aguarde ${cooldown.timeUntilAvailable} para tentar novamente`}
        >
          <Clock className="w-4 h-4" />
          {label}
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {cooldown.timeUntilAvailable}
          </span>
        </div>
      );
    }
    
    return (
      <button
        onClick={handleNavigation}
        className={`flex items-center justify-center gap-2 ${bgColor} ${hoverColor} text-white ${sizeClasses} rounded font-medium transition-colors`}
      >
        {label}
      </button>
    );
  };
  
  // Modo compacto para visualização em lista
  if (compact) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 ${className}`}>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-start gap-3">
                <div className="text-sm font-bold theme-text-secondary bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded min-w-[3rem] text-center">
                  #{question.id}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold theme-text-primary mb-1 line-clamp-1">
                    {question.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                      {displayCategory}
                    </span>
                    <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                      {question.difficulty || 'Médio'}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">⏱️ ~{question.timeEstimate}min</span>
                  </div>
                  
                  {/* Tags da questão */}
                  {question.tags && question.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {question.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {question.tags.length > 3 && (
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                          +{question.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {question.statement && (
                    <p className="theme-text-secondary text-xs line-clamp-1">
                      {question.statement.length > 80 
                        ? `${question.statement.substring(0, 80)}...`
                        : question.statement
                      }
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {showActions && (
              <div className="flex gap-2">
                {renderActionButton(
                  'dr-skoda',
                  'Dr. Skoda',
                  'bg-blue-600',
                  'hover:bg-blue-700',
                  drSkodaCooldown,
                  true
                )}
                {renderActionButton(
                  'exam',
                  'Simulado',
                  'bg-purple-600',
                  'hover:bg-purple-700',
                  examCooldown,
                  true
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 ${className}`}>
      {/* Header Compacto */}
      <div className="p-4 pb-3">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-3">
            <h3 className="text-base font-semibold theme-text-primary mb-2 line-clamp-2 leading-tight">
              {question.title}
            </h3>
            
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
                {displayCategory}
              </span>
              
              <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                {question.difficulty || 'Médio'}
              </span>
              
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                ⏱️ ~{question.timeEstimate}min
              </span>
            </div>
            
            {/* Tags da questão */}
            {question.tags && question.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {question.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {question.tags.length > 4 && (
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    +{question.tags.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="text-lg font-bold theme-text-secondary bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
            #{question.id}
          </div>
        </div>

        {/* Preview Compacto do Enunciado */}
        {question.statement && (
          <div className="mb-3">
            <p className="theme-text-secondary text-xs line-clamp-2 leading-relaxed">
              {question.statement.length > 120 
                ? `${question.statement.substring(0, 120)}...`
                : question.statement
              }
            </p>
          </div>
        )}
      </div>

      {/* Ações Simplificadas */}
      {showActions && (
        <div className="px-4 pb-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Botão Principal - Dr. Skoda (Padrão) */}
            {renderActionButton(
              'dr-skoda',
              'Dr. Skoda',
              'bg-blue-600',
              'hover:bg-blue-700',
              drSkodaCooldown
            )}

            {/* Botão Simulado */}
            {renderActionButton(
              'exam',
              'Simulado',
              'bg-purple-600',
              'hover:bg-purple-700',
              examCooldown
            )}
          </div>
        </div>
      )}

      {/* Footer Compacto */}
      <div className="px-4 pb-3 pt-1 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center text-xs theme-text-secondary">
          <div className="flex gap-3">
            <span className="text-purple-600 dark:text-purple-400">{question.exam}</span>
          </div>
          
          <div className="flex gap-1">
            <span title="Sistema universal ativo" className="text-green-500 text-xs">Sistema ativo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
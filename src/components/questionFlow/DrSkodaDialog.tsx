import { useState } from 'react';
import DoctorSkoda from '../images/DoctorSkoda';

interface DrSkodaDialogProps {
  title: string;
  content: string;
  showContinueButton?: boolean;
  continueButtonText?: string;
  onContinue?: () => void;
  className?: string;
}

export default function DrSkodaDialog({
  title,
  content,
  showContinueButton = true,
  continueButtonText = "Prosseguir",
  onContinue,
  className = ""
}: DrSkodaDialogProps) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleContinue = () => {
    setIsAnimatingOut(true);
    // Aguarda a animação de saída antes de chamar onContinue
    setTimeout(() => {
      if (onContinue) {
        onContinue();
      }
    }, 300);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 pointer-events-none ${className}`}>
      {/* Efeito de glow pulsante - aparece depois do componente */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-glow-pulse blur-xl scale-125 animate-in fade-in duration-700 delay-1000"></div>
      
      {/* Borda animada rainbow - aparece depois do componente */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-600 via-pink-500 via-red-500 via-yellow-500 via-green-500 to-blue-500 animate-rainbow-border p-0.5 animate-in fade-in duration-700 delay-800">
        <div className="w-full h-full bg-transparent rounded-2xl"></div>
      </div>
      
      {/* Partículas flutuantes - aparecem depois */}
      <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-80 animate-in fade-in scale-in duration-500 delay-1200"></div>
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-60 animate-in fade-in scale-in duration-500 delay-1400"></div>
      <div className="absolute -bottom-1 -right-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-70 animate-in fade-in scale-in duration-500 delay-1600"></div>
      
      {/* Sparkles - aparecem por último */}
      <div className="absolute top-2 right-2 text-yellow-300 animate-pulse animate-in fade-in scale-in duration-300 delay-1800">✨</div>
      <div className="absolute bottom-3 left-2 text-purple-300 animate-bounce animate-in fade-in scale-in duration-300 delay-2000">💫</div>
      
      <div className={`dr-skoda-dialog bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-96 max-w-[calc(100vw-2rem)] overflow-hidden transform transition-all duration-500 max-h-[70vh] flex flex-col pointer-events-auto relative z-10 ring-4 ring-blue-400 ring-opacity-60 shadow-blue-500/50 animate-in slide-in-from-bottom-4 fade-in duration-700 ${
        isAnimatingOut ? 'animate-out slide-out-to-bottom-4 fade-out duration-300' : ''
      }`}>
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-4 flex-shrink-0 animate-in fade-in slide-in-from-top-2 duration-500 delay-300">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-lg">👨‍⚕️</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-blue-100 text-xs">Dr. Skoda - Seu mentor</p>
            </div>
          </div>
        </div>
        
        {/* Conteúdo principal com scroll */}
        <div className="p-4 flex-1 overflow-y-auto animate-in fade-in slide-in-from-left-2 duration-500 delay-500">
          <div className="flex items-start gap-3">
            {/* Avatar do Dr. Skoda */}
            <div className="flex-shrink-0 sticky top-0">
              <div className="relative">
                {/* Glow do avatar */}
                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse blur-md opacity-60"></div>
                
                <div className="relative w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-full p-1 shadow-lg ring-2 ring-blue-300 ring-opacity-50">
                  <DoctorSkoda 
                    width="100%"
                    height="100%"
                    className="rounded-full object-cover"
                  />
                </div>
                {/* Indicador de "falando" com efeito vibrante */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center speaking-indicator shadow-lg ring-2 ring-green-300 ring-opacity-60">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                
                {/* Efeito de "energia" */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
            </div>
            
            {/* Balão de fala */}
            <div className="flex-1 min-h-0">
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 shadow-md">
                {/* Seta do balão */}
                <div className="absolute -left-2 top-4 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-8 border-r-blue-50 dark:border-r-gray-700"></div>
                
                {/* Conteúdo com animação de digitação */}
                <div className="dr-skoda-content animate-in fade-in slide-in-from-top-2 duration-700 delay-700">
                  <div className="prose prose-blue dark:prose-invert max-w-none prose-sm">
                    {content.split('\n').map((paragraph, index) => {
                      // Pular parágrafos vazios
                      if (!paragraph.trim()) return null;
                      
                      // Títulos com **texto**
                      if (paragraph.includes('**') && paragraph.trim().startsWith('**')) {
                        const cleanTitle = paragraph.replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
                        return (
                          <h4 key={index} className="text-blue-700 dark:text-blue-300 font-bold text-sm mb-2 mt-3 first:mt-0">
                            {cleanTitle}
                          </h4>
                        );
                      }
                      
                      // Itens de lista com •, -, ou números
                      if (paragraph.trim().match(/^[•\-\*]\s/) || paragraph.trim().match(/^\d+\.\s/)) {
                        return (
                          <li key={index} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-1 ml-4">
                            {paragraph.trim().replace(/^[•\-\*]\s/, '').replace(/^\d+\.\s/, '')}
                          </li>
                        );
                      }
                      
                      // Alternativas com ✅ ou ❌
                      if (paragraph.includes('✅') || paragraph.includes('❌')) {
                        const isCorrect = paragraph.includes('✅');
                        return (
                          <div key={index} className={`p-2 rounded-lg mb-2 border-l-4 ${
                            isCorrect 
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200' 
                              : 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200'
                          }`}>
                            <div className="text-sm font-medium">
                              {paragraph}
                            </div>
                          </div>
                        );
                      }
                      
                      // Texto com **negrito** inline
                      if (paragraph.includes('**')) {
                        const parts = paragraph.split(/(\*\*[^*]+\*\*)/);
                        return (
                          <p key={index} className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm mb-2">
                            {parts.map((part, partIndex) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <strong key={partIndex} className="text-blue-700 dark:text-blue-300 font-semibold">
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return part;
                            })}
                          </p>
                        );
                      }
                      
                      // Separadores ---
                      if (paragraph.trim() === '---') {
                        return (
                          <hr key={index} className="my-3 border-gray-300 dark:border-gray-600" />
                        );
                      }
                      
                      // Parágrafos normais
                      return (
                        <p key={index} className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm mb-2">
                          {paragraph}
                        </p>
                      );
                    }).filter(Boolean)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Botão de continuar fixo no bottom */}
        {showContinueButton && (
          <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex-shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-900">
            <button
              onClick={handleContinue}
              className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2 text-sm shadow-blue-500/50 ring-2 ring-blue-400 ring-opacity-50 animate-pulse"
            >
              {/* Glow do botão */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
              
              <span className="relative z-10">{continueButtonText}</span>
              <svg 
                className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
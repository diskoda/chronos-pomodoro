import { useState, useEffect } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animação de entrada
    setIsVisible(true);
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${className}`}>
      <div className={`dr-skoda-dialog bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden transform transition-all duration-500 ${
        showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="text-blue-100 text-sm">Dr. Skoda - Seu mentor em Pediatria</p>
            </div>
          </div>
        </div>
        
        {/* Conteúdo principal */}
        <div className="p-8">
          <div className="flex items-start gap-6">
            {/* Avatar do Dr. Skoda */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-full p-2 shadow-lg">
                  <DoctorSkoda 
                    width="100%"
                    height="100%"
                    className="rounded-full object-cover"
                  />
                </div>
                {/* Indicador de "falando" */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center speaking-indicator">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Balão de fala */}
            <div className="flex-1">
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 shadow-md">
                {/* Seta do balão */}
                <div className="absolute -left-3 top-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-12 border-r-blue-50 dark:border-r-gray-700"></div>
                
                {/* Conteúdo com animação de digitação */}
                <div className={`dr-skoda-content transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    {content.split('\n').map((paragraph, index) => (
                      <p key={index} className={`text-gray-800 dark:text-gray-200 leading-relaxed ${
                        paragraph.startsWith('**') ? 'font-semibold text-blue-700 dark:text-blue-300' : ''
                      } ${
                        paragraph.includes('✅') || paragraph.includes('❌') ? 'font-medium' : ''
                      }`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Botão de continuar */}
          {showContinueButton && (
            <div className={`flex justify-end mt-8 transition-all duration-700 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <button
                onClick={handleContinue}
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
              >
                <span>{continueButtonText}</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
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
    </div>
  );
}
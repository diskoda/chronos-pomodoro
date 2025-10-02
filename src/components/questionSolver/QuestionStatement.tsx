import { useState, useEffect } from 'react';
import { SmartTextProcessor } from '../common/SmartTextProcessor';

interface QuestionStatementProps {
  statement: string;
  className?: string;
}

export default function QuestionStatement({ statement, className = "" }: QuestionStatementProps) {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  const loadImage = async (imageName: string) => {
    try {
      const imageModule = await import(`../../assets/images/${imageName}`);
      return imageModule.default;
    } catch (error) {
      console.error('Erro ao carregar imagem:', imageName, error);
      return null;
    }
  };

  useEffect(() => {
    const imageMatches = statement.match(/\[IMAGEM: ([^\]]+)\]/g);
    if (imageMatches) {
      imageMatches.forEach(async (match) => {
        const imageName = match.match(/\[IMAGEM: ([^\]]+)\]/)![1];
        const url = await loadImage(imageName);
        if (url) {
          setImageUrls(prev => ({ ...prev, [imageName]: url }));
        }
      });
    }
  }, [statement]);

  const renderContent = (text: string) => {
    const parts = text.split(/(\[IMAGEM: ([^\]]+)\])/g);
    
    return parts.map((part, index) => {
      // Verifica se é uma tag de imagem
      if (part.match(/\[IMAGEM: ([^\]]+)\]/)) {
        const imageName = part.match(/\[IMAGEM: ([^\]]+)\]/)![1];
        const imageUrl = imageUrls[imageName];
        
        if (imageUrl) {
          return (
            <div key={index} className="my-6 flex justify-center">
              <img 
                src={imageUrl}
                alt="Imagem da questão"
                className="max-w-full h-auto rounded-lg shadow-md theme-border border"
              />
            </div>
          );
        }
        return null;
      }
      
      // Se é o nome da imagem sozinho (capturado pelo grupo), ignora
      if (part && part.includes('.png') && !part.includes('[IMAGEM:')) {
        return null;
      }
      
      // Se não é imagem, renderiza como texto normal com processamento inteligente
      if (part && !part.match(/\[IMAGEM:/) && !part.includes('.png')) {
        return part.split('\n').map((paragraph, paragraphIndex) => (
          <p key={`${index}-${paragraphIndex}`} className={paragraphIndex > 0 ? 'mt-4' : ''}>
            <SmartTextProcessor theme="medical" variant="hover">
              {paragraph}
            </SmartTextProcessor>
          </p>
        ));
      }
      
      return null;
    }).filter(Boolean);
  };

  return (
    <div className={`theme-card rounded-lg p-6 ${className}`}>
      <h2 className="text-lg font-semibold theme-text-primary mb-4">
        Enunciado
      </h2>
      <div className="theme-text-secondary leading-relaxed">
        {renderContent(statement)}
      </div>
    </div>
  );
}
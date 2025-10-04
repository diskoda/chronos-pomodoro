import { SmartTextProcessor } from '../common/SmartTextProcessor';
import question2Image from '../../assets/images/question2_img.png';

interface QuestionStatementProps {
  statement: string;
  className?: string;
}

export default function QuestionStatement({ statement, className = "" }: QuestionStatementProps) {
  // Mapeamento direto das imagens
  const imageMap: Record<string, string> = {
    'question2_img.png': question2Image
  };

  const renderContent = (text: string) => {
    console.log('renderContent chamado com texto:', text);
    const parts = text.split(/(\[IMAGEM: ([^\]]+)\])/g);
    console.log('Partes divididas:', parts);
    
    return parts.map((part, index) => {
      console.log(`Processando parte ${index}:`, part);
      
      // Verifica se é uma tag de imagem
      if (part.match(/\[IMAGEM: ([^\]]+)\]/)) {
        const imageName = part.match(/\[IMAGEM: ([^\]]+)\]/)![1];
        const imageUrl = imageMap[imageName];
        
        console.log('Tag de imagem encontrada:', imageName, 'URL:', imageUrl);
        
        if (imageUrl) {
          return (
            <div key={index} className="my-6 flex justify-center">
              <img 
                src={imageUrl}
                alt="Imagem da questão"
                className="max-w-full h-auto rounded-lg shadow-md theme-border border"
                onLoad={() => console.log('Imagem carregada com sucesso:', imageUrl)}
                onError={(e) => console.error('Erro ao carregar imagem:', imageUrl, e)}
              />
            </div>
          );
        } else {
          console.log('Imagem não encontrada no mapeamento:', imageName);
          return (
            <div key={index} className="my-6 flex justify-center">
              <div className="p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">Imagem não encontrada: {imageName}</p>
              </div>
            </div>
          );
        }
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
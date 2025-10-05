import { Image } from 'lucide-react';
import { SmartTextProcessor } from '../common/SmartTextProcessor';

interface QuestionStatementProps {
  statement: string;
  className?: string;
}

export default function QuestionStatement({ statement, className = "" }: QuestionStatementProps) {
  const renderContent = (text: string) => {
    console.log('renderContent chamado com texto:', text);
    const parts = text.split(/(\[IMAGEM: ([^\]]+)\])/g);
    console.log('Partes divididas:', parts);
    
    return parts.map((part, index) => {
      console.log(`Processando parte ${index}:`, part);
      
      // Verifica se é uma tag de imagem
      if (part.match(/\[IMAGEM: ([^\]]+)\]/)) {
        const imageName = part.match(/\[IMAGEM: ([^\]]+)\]/)![1];
        const imageUrl = `/${imageName}`; // Caminho direto na pasta public
        
        console.log('Tag de imagem encontrada:', imageName, 'URL:', imageUrl);
        
        return (
          <div key={index} className="my-8 relative group">
            {/* Enhanced Image Container */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-4 border border-slate-700/50 group-hover:border-slate-600/70 transition-all duration-300">
              {/* Image Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/30 via-purple-500/20 to-orange-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Image Header */}
              <div className="relative flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-lg blur opacity-60"></div>
                  <div className="relative bg-teal-500/20 border border-teal-500/40 rounded-lg p-2">
                    <Image className="w-4 h-4 text-teal-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-teal-300">Imagem Diagnóstica</h4>
                  <p className="text-xs text-slate-400">Analise cuidadosamente</p>
                </div>
              </div>
              
              {/* Enhanced Image */}
              <div className="relative rounded-xl overflow-hidden bg-slate-900/40 border border-slate-600/40">
                <img 
                  src={imageUrl}
                  alt="Imagem da questão"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  onLoad={() => console.log('Imagem carregada com sucesso:', imageUrl)}
                  onError={(e) => console.error('Erro ao carregar imagem:', imageUrl, e)}
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        );
      }
      
      // Se é o nome da imagem sozinho (capturado pelo grupo), ignora
      if (part && part.includes('.png') && !part.includes('[IMAGEM:')) {
        return null;
      }
      
      // Se não é imagem, renderiza como texto normal com processamento inteligente
      if (part && !part.match(/\[IMAGEM:/) && !part.includes('.png')) {
        return part.split('\n').map((paragraph, paragraphIndex) => (
          <div key={`${index}-${paragraphIndex}`} className={`${paragraphIndex > 0 ? 'mt-6' : ''} relative group/text`}>
            {/* Paragraph Background */}
            <div className="absolute -inset-2 bg-gradient-to-r from-slate-800/20 via-slate-700/10 to-slate-800/20 rounded-lg blur opacity-0 group-hover/text:opacity-100 transition-opacity duration-300"></div>
            
            <p className="relative text-slate-200 leading-relaxed group-hover/text:text-slate-100 transition-colors duration-300">
              <SmartTextProcessor theme="medical" variant="hover">
                {paragraph}
              </SmartTextProcessor>
            </p>
          </div>
        ));
      }
      
      return null;
    }).filter(Boolean);
  };

  return (
    <div className={`relative ${className}`} data-question-container>
      {/* Simplified Container */}
      <div className="bg-slate-800/40 border border-slate-700/30 rounded-lg p-4 backdrop-blur-sm">
        {/* Main Content Only */}
        <div className="text-slate-200 leading-relaxed">
          {renderContent(statement)}
        </div>
      </div>
    </div>
  );
}
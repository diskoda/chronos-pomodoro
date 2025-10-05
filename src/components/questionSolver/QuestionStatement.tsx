import { FileText, Image } from 'lucide-react';
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
    <div className={`relative ${className}`}>
      {/* Cyber Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 via-indigo-900/20 to-teal-900/20 rounded-2xl blur-sm opacity-60"></div>
      
      {/* Main Container */}
      <div className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-lg border border-indigo-500/30 rounded-2xl p-8 shadow-2xl">
        {/* Animated Border Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-teal-600/20 rounded-2xl blur opacity-75 animate-pulse"></div>
        
        <div className="relative">
          {/* Enhanced Header */}
          <div className="flex items-center gap-4 mb-6">
            {/* Neural Icon */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl blur opacity-60 animate-pulse"></div>
              <div className="relative w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Header Text */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                Neural Case Statement
              </h2>
              <p className="text-sm text-slate-400 font-medium">
                Processamento de dados clínicos
              </p>
            </div>
          </div>

          {/* Enhanced Content Container */}
          <div className="relative">
            {/* Content Background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-slate-800/30 via-slate-700/20 to-slate-800/30 rounded-xl blur opacity-50"></div>
            
            {/* Main Content */}
            <div className="relative bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-lg leading-relaxed">
              {renderContent(statement)}
            </div>
          </div>

          {/* Neural Processing Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
            </div>
            <span className="text-xs text-slate-400 font-medium ml-2">PROCESSAMENTO NEURAL ATIVO</span>
          </div>

          {/* Neural Connection Dots */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
            <div className="absolute top-6 left-8 w-1 h-1 bg-indigo-400 rounded-full animate-ping"></div>
            <div className="absolute top-12 right-12 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-8 left-1/3 w-1 h-1 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-6 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
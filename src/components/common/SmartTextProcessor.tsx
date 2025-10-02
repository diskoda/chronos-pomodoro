import React from 'react';
import TextExplanation from '../../components/common/TextExplanation';
import { explanationsDatabase } from '../../data/explanations';

interface TermMap {
  term: string;
  explanationId: string;
  caseSensitive?: boolean;
  wholeWord?: boolean;
}

interface SmartTextProcessorProps {
  children: string | React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark' | 'medical';
  variant?: 'hover' | 'click';
  customTerms?: TermMap[];
  enableAutoDetection?: boolean;
}

// Mapeamento de termos para IDs de explicação
const defaultTermMappings: TermMap[] = [
  // Termos médicos básicos
  { term: 'asma', explanationId: 'asma', wholeWord: false },
  { term: 'broncoespasmo', explanationId: 'broncoespasmo', wholeWord: false },
  { term: 'tabagismo', explanationId: 'tabagismo', wholeWord: false },
  { term: 'tabagista', explanationId: 'tabagismo', wholeWord: false },
  { term: 'UBS', explanationId: 'ubs', wholeWord: false },
  { term: 'anamnese', explanationId: 'anamnese', wholeWord: true },
  { term: 'diagnóstico diferencial', explanationId: 'diagnostico-diferencial' },
  { term: 'exame físico', explanationId: 'exame-fisico' },
  { term: 'contraindicação', explanationId: 'contraindicacao', wholeWord: true },
  { term: 'contraindicações', explanationId: 'contraindicacao', wholeWord: true },
  { term: 'interação medicamentosa', explanationId: 'interacao-medicamentosa' },
  { term: 'interações medicamentosas', explanationId: 'interacao-medicamentosa' },
  
  // Especialidades
  { term: 'pediatria', explanationId: 'pediatria', wholeWord: true },
  { term: 'cardiologia', explanationId: 'cardiologia', wholeWord: true },
  { term: 'emergência médica', explanationId: 'emergencia-medica' },
  { term: 'triagem', explanationId: 'triagem', wholeWord: true },
  
  // Conceitos educacionais
  { term: 'PBL', explanationId: 'pbl-metodologia', wholeWord: true },
  { term: 'Problem-Based Learning', explanationId: 'pbl-metodologia' },
  { term: 'gamificação', explanationId: 'gamificacao-educacao', wholeWord: true },
  { term: 'flashcards', explanationId: 'flashcards', wholeWord: true },
  { term: 'casos clínicos', explanationId: 'casos-clinicos' },
  { term: 'repetição espaçada', explanationId: 'repeticao-espacada' },
  { term: 'técnica pomodoro', explanationId: 'tecnica-pomodoro' },
  { term: 'medicina baseada em evidências', explanationId: 'medicina-baseada-evidencias' },
  
  // Termos específicos que podem aparecer em questões
  { term: 'broncoespasmo', explanationId: 'broncoespasmo', wholeWord: true },
  { term: 'tabagismo', explanationId: 'tabagismo', wholeWord: true },
  { term: 'tabagista', explanationId: 'tabagismo', wholeWord: true },
  { term: 'UBS', explanationId: 'ubs', wholeWord: true },
  { term: 'entrevista motivacional', explanationId: 'entrevista-motivacional' },
];

export const SmartTextProcessor: React.FC<SmartTextProcessorProps> = ({
  children,
  className = '',
  theme = 'light',
  variant = 'hover',
  customTerms = [],
  enableAutoDetection = true
}) => {
  // Combinar mapeamentos padrão com customizados
  const allTermMappings = [...defaultTermMappings, ...customTerms];

  const processText = (text: string): React.ReactNode[] => {
    if (!text || !enableAutoDetection) {
      return [text];
    }

    let processedParts: React.ReactNode[] = [text];

    // Processar cada termo mapeado
    allTermMappings.forEach((mapping, mappingIndex) => {
      const { term, explanationId, caseSensitive = false, wholeWord = false } = mapping;
      
      // Verificar se a explicação existe
      if (!explanationsDatabase[explanationId]) {
        return;
      }

      // Criar regex para encontrar o termo
      const flags = caseSensitive ? 'g' : 'gi';
      const pattern = wholeWord 
        ? `\\b${escapeRegExp(term)}\\b`
        : escapeRegExp(term);
      const regex = new RegExp(pattern, flags);

      // Processar cada parte do array atual
      processedParts = processedParts.flatMap((part, partIndex) => {
        // Se não for string, manter como está
        if (typeof part !== 'string') {
          return [part];
        }

        const matches = Array.from(part.matchAll(regex));
        if (matches.length === 0) {
          return [part];
        }

        const newParts: React.ReactNode[] = [];
        let lastIndex = 0;

        matches.forEach((match, matchIndex) => {
          const matchStart = match.index!;
          const matchEnd = matchStart + match[0].length;

          // Adicionar texto antes do match
          if (matchStart > lastIndex) {
            newParts.push(part.substring(lastIndex, matchStart));
          }

          // Adicionar o termo envolvido com TextExplanation
          newParts.push(
            <TextExplanation
              key={`${explanationId}-${mappingIndex}-${partIndex}-${matchIndex}`}
              explanationId={explanationId}
              theme={theme}
              variant={variant}
            >
              {match[0]}
            </TextExplanation>
          );

          lastIndex = matchEnd;
        });

        // Adicionar texto após o último match
        if (lastIndex < part.length) {
          newParts.push(part.substring(lastIndex));
        }

        return newParts;
      });
    });

    return processedParts;
  };

  const processedContent = processText(typeof children === 'string' ? children : String(children || ''));

  return (
    <span className={className}>
      {processedContent.map((part, index) => (
        <React.Fragment key={index}>{part}</React.Fragment>
      ))}
    </span>
  );
};

// Função utilitária para escapar caracteres especiais de regex
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default SmartTextProcessor;
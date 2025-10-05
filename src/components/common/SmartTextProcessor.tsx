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
  
  // Doenças respiratórias
  { term: 'pneumonia', explanationId: 'pneumonia', wholeWord: false },
  { term: 'bronquiolite', explanationId: 'bronquiolite', wholeWord: false },
  { term: 'pneumotórax', explanationId: 'pneumotorax', wholeWord: false },
  { term: 'pneumotorax', explanationId: 'pneumotorax', wholeWord: false },
  { term: 'VSR', explanationId: 'vsr', wholeWord: true },
  { term: 'vírus sincicial respiratório', explanationId: 'vsr' },
  
  // Doenças infecciosas
  { term: 'otite média', explanationId: 'otite-media' },
  { term: 'otite', explanationId: 'otite-media', wholeWord: false },
  { term: 'sífilis congênita', explanationId: 'sifilis-congenita' },
  { term: 'sífilis', explanationId: 'sifilis-congenita', wholeWord: false },
  { term: 'transmissão vertical', explanationId: 'transmissao-vertical' },
  { term: 'gestante', explanationId: 'gestante', wholeWord: false },
  { term: 'cascata do cuidado contínuo', explanationId: 'cascata-cuidado-continuo' },
  { term: 'cascata do cuidado', explanationId: 'cascata-cuidado-continuo' },
  { term: 'cascata do cuidado contínuo do HIV', explanationId: 'cascata-cuidado-hiv' },
  { term: 'HIV', explanationId: 'hiv', wholeWord: true },
  
  // Emergências endócrinas
  { term: 'cetoacidose diabética', explanationId: 'cetoacidose-diabetica' },
  { term: 'cetoacidose', explanationId: 'cetoacidose-diabetica', wholeWord: false },
  { term: 'hipoglicemia', explanationId: 'hipoglicemia', wholeWord: false },
  
  // Cardiologia
  { term: 'insuficiência cardíaca', explanationId: 'insuficiencia-cardiaca' },
  { term: 'insuficiência', explanationId: 'insuficiencia-cardiaca', wholeWord: false },
  
  // Procedimentos
  { term: 'reanimação neonatal', explanationId: 'reanimacao-neonatal' },
  { term: 'reanimação', explanationId: 'reanimacao-neonatal', wholeWord: false },
  { term: 'intubação orotraqueal', explanationId: 'intubacao-orotraqueal' },
  { term: 'intubação', explanationId: 'intubacao-orotraqueal', wholeWord: false },
  { term: 'ventilação não invasiva', explanationId: 'ventilacao-nao-invasiva' },
  { term: 'VNI', explanationId: 'ventilacao-nao-invasiva', wholeWord: true },
  { term: 'CPAP', explanationId: 'ventilacao-nao-invasiva', wholeWord: true },
  { term: 'BiPAP', explanationId: 'ventilacao-nao-invasiva', wholeWord: true },
  { term: 'cateter nasal de alto fluxo', explanationId: 'cateter-nasal-alto-fluxo' },
  { term: 'alto fluxo', explanationId: 'cateter-nasal-alto-fluxo' },
  { term: 'isolamento respiratório', explanationId: 'isolamento-respiratorio' },
  
  // Exames
  { term: 'radiografia de tórax', explanationId: 'radiografia-torax' },
  { term: 'radiografia', explanationId: 'radiografia-torax', wholeWord: false },
  { term: 'RX de tórax', explanationId: 'radiografia-torax' },
  { term: 'gasometria arterial', explanationId: 'gasometria' },
  { term: 'gasometria', explanationId: 'gasometria', wholeWord: false },
  { term: 'hemograma completo', explanationId: 'hemograma' },
  { term: 'hemograma', explanationId: 'hemograma', wholeWord: false },
  
  // Sinais e sintomas
  { term: 'tiragem', explanationId: 'tiragem', wholeWord: false },
  { term: 'cianose', explanationId: 'cianose', wholeWord: false },
  { term: 'desidratação', explanationId: 'desidratacao', wholeWord: false },
  { term: 'febre', explanationId: 'febre', wholeWord: false },
  { term: 'tosse', explanationId: 'tosse', wholeWord: false },
  { term: 'dispneia', explanationId: 'dispneia', wholeWord: false },
  { term: 'falta de ar', explanationId: 'dispneia' },
  { term: 'saturação de oxigênio', explanationId: 'saturacao-oxigenio' },
  { term: 'saturação', explanationId: 'saturacao-oxigenio', wholeWord: false },
  { term: 'SpO2', explanationId: 'saturacao-oxigenio', wholeWord: true },
  { term: 'frequência respiratória', explanationId: 'frequencia-respiratoria' },
  { term: 'irpm', explanationId: 'frequencia-respiratoria', wholeWord: true },
  
  // Medicamentos
  { term: 'antibiótico', explanationId: 'antibiotico', wholeWord: false },
  { term: 'antibióticos', explanationId: 'antibiotico', wholeWord: false },
  { term: 'amoxicilina', explanationId: 'amoxicilina', wholeWord: false },
  { term: 'analgésico', explanationId: 'analgesico', wholeWord: false },
  { term: 'analgésicos', explanationId: 'analgesico', wholeWord: false },
  { term: 'paracetamol', explanationId: 'analgesico', wholeWord: false },
  
  // Dermatologia
  { term: 'molusco contagioso', explanationId: 'molusco-contagioso' },
  { term: 'molusco', explanationId: 'molusco-contagioso', wholeWord: false },
  
  // Saúde pública
  { term: 'cascata do cuidado', explanationId: 'cascata-cuidado' },
  { term: 'cascata', explanationId: 'cascata-cuidado', wholeWord: false },
  
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
  { term: 'entrevista motivacional', explanationId: 'entrevista-motivacional' },

  // Novos termos médicos adicionados
  { term: 'hígido', explanationId: 'higido', wholeWord: false },
  { term: 'pronto-socorro', explanationId: 'pronto-socorro', wholeWord: false },
  { term: 'pronto socorro', explanationId: 'pronto-socorro', wholeWord: false },
  { term: 'diarreia aguda', explanationId: 'diarreia-aguda', wholeWord: false },
  { term: 'diarreia', explanationId: 'diarreia-aguda', wholeWord: false },
  { term: 'acesso venoso periférico', explanationId: 'acesso-venoso-periferico' },
  { term: 'acesso venoso', explanationId: 'acesso-venoso-periferico', wholeWord: false },
  { term: 'jelco', explanationId: 'acesso-venoso-periferico', wholeWord: false },
  { term: 'hidratação endovenosa', explanationId: 'hidratacao-endovenosa' },
  { term: 'hidratação EV', explanationId: 'hidratacao-endovenosa' },
  { term: 'EV', explanationId: 'hidratacao-endovenosa', wholeWord: true },
  { term: 'estabilização inicial', explanationId: 'estabilizacao-inicial' },
  { term: 'estabilização', explanationId: 'estabilizacao-inicial', wholeWord: false },
  { term: 'hidratação', explanationId: 'hidratacao', wholeWord: false },
  { term: 'perdas', explanationId: 'perdas', wholeWord: false },
  { term: 'perdas hidroeletrolíticas', explanationId: 'perdas' },
  { term: 'via oral', explanationId: 'via-oral', wholeWord: false },
  { term: 'VO', explanationId: 'via-oral', wholeWord: true },
  { term: 'exames laboratoriais', explanationId: 'exames-laboratoriais' },
  { term: 'laboratório', explanationId: 'exames-laboratoriais', wholeWord: false },
  { term: 'traçado eletrocardiográfico', explanationId: 'tracado-eletrocardiografico' },
  { term: 'ECG', explanationId: 'tracado-eletrocardiografico', wholeWord: true },
  { term: 'eletrocardiograma', explanationId: 'tracado-eletrocardiografico', wholeWord: false },
  { term: 'pH', explanationId: 'ph', wholeWord: true },
  { term: 'pO₂', explanationId: 'po2', wholeWord: true },
  { term: 'pO2', explanationId: 'po2', wholeWord: true },
  { term: 'pCO₂', explanationId: 'pco2', wholeWord: true },
  { term: 'pCO2', explanationId: 'pco2', wholeWord: true },
  { term: 'HCO₃⁻', explanationId: 'hco3', wholeWord: true },
  { term: 'HCO3', explanationId: 'hco3', wholeWord: true },
  { term: 'bicarbonato', explanationId: 'hco3', wholeWord: false },
  { term: 'SatO₂', explanationId: 'sato2', wholeWord: true },
  { term: 'SatO2', explanationId: 'sato2', wholeWord: true },
  { term: 'potássio', explanationId: 'potassio', wholeWord: false },
  { term: 'K+', explanationId: 'potassio', wholeWord: true },
  { term: 'sódio', explanationId: 'sodio', wholeWord: false },
  { term: 'Na+', explanationId: 'sodio', wholeWord: true },
  { term: 'hipocalemia', explanationId: 'hipocalemia', wholeWord: false },
  { term: 'prescrições', explanationId: 'prescricoes', wholeWord: false },
  { term: 'prescrição', explanationId: 'prescricoes', wholeWord: false },

  // Termos específicos da questão 4 - Sinais vitais e exame físico
  { term: 'letárgico', explanationId: 'letargico', wholeWord: false },
  { term: 'letargia', explanationId: 'letargico', wholeWord: false },
  { term: 'gemente', explanationId: 'gemencia', wholeWord: false },
  { term: 'gemência', explanationId: 'gemencia', wholeWord: false },
  { term: 'FC', explanationId: 'frequencia-cardiaca', wholeWord: true },
  { term: 'frequência cardíaca', explanationId: 'frequencia-cardiaca', wholeWord: false },
  { term: 'bpm', explanationId: 'bpm', wholeWord: true },
  { term: 'batimentos por minuto', explanationId: 'bpm', wholeWord: false },
  { term: 'FR', explanationId: 'frequencia-respiratoria', wholeWord: true },
  { term: 'ipm', explanationId: 'ipm', wholeWord: true },
  { term: 'incursões por minuto', explanationId: 'ipm', wholeWord: false },
  { term: 'PA', explanationId: 'pressao-arterial', wholeWord: true },
  { term: 'pressão arterial', explanationId: 'pressao-arterial', wholeWord: false },
  { term: 'mmHg', explanationId: 'mmhg', wholeWord: true },
  { term: 'milímetros de mercúrio', explanationId: 'mmhg', wholeWord: false },
  { term: 'tiragem intercostal', explanationId: 'tiragem-intercostal', wholeWord: false },
  { term: 'tiragem subdiafragmática', explanationId: 'tiragem-subdiafragmatica', wholeWord: false },
  { term: 'subdiafragmática', explanationId: 'tiragem-subdiafragmatica', wholeWord: false },
  { term: 'tiragem de fúrcula', explanationId: 'tiragem-furcula', wholeWord: false },
  { term: 'fúrcula', explanationId: 'tiragem-furcula', wholeWord: false },
  { term: 'enchimento capilar', explanationId: 'enchimento-capilar', wholeWord: false },
  { term: 'tempo de enchimento capilar', explanationId: 'enchimento-capilar', wholeWord: false },
  { term: 'TEC', explanationId: 'enchimento-capilar', wholeWord: true },

  // Termos adicionais relacionados à insuficiência respiratória
  { term: 'insuficiência respiratória', explanationId: 'insuficiencia-respiratoria', wholeWord: false },
  { term: 'IRpA', explanationId: 'insuficiencia-respiratoria-aguda', wholeWord: true },
  { term: 'esforço respiratório', explanationId: 'esforco-respiratorio', wholeWord: false },
  { term: 'retração intercostal', explanationId: 'tiragem-intercostal', wholeWord: false },
  { term: 'batimento de asa nasal', explanationId: 'batimento-asa-nasal', wholeWord: false },
  { term: 'cornagem', explanationId: 'cornagem', wholeWord: false },
  { term: 'estridor', explanationId: 'estridor', wholeWord: false }
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
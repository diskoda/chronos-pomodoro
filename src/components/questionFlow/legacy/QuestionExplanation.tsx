import DrSkodaDialog from './DrSkodaDialog';

interface QuestionExplanationProps {
  explanationText: string;
  onContinue: () => void;
}

export default function QuestionExplanation({
  explanationText,
  onContinue
}: QuestionExplanationProps) {
  const title = "🧠 Hora de aprofundar o conhecimento!";
  
  const content = `Excelente! Você fez sua escolha! 👏

Agora, antes de revelarmos a resposta correta, vou te explicar os **conceitos fundamentais** que você precisa dominar para resolver esta questão com total segurança.

**📖 Base teórica essencial:**

${explanationText}

**🎯 Por que isso é importante?**
Entender esses conceitos não apenas te ajuda a responder esta questão, mas também te prepara para situações reais na prática médica.

**⚡ Próximos passos:**
Agora que você tem uma base sólida, vamos analisar cada alternativa em detalhes. Você verá não apenas qual é a resposta correta, mas também **por que** cada opção está certa ou errada.

Preparado para a análise completa? 🔍`;

  return (
    <DrSkodaDialog
      title={title}
      content={content}
      continueButtonText="🔍 Sim, vamos analisar as alternativas!"
      onContinue={onContinue}
    />
  );
}
import DrSkodaDialog from './DrSkodaDialog';

interface QuestionBeginProps {
  contextText: string;
  onContinue: () => void;
}

export default function QuestionBegin({
  contextText,
  onContinue
}: QuestionBeginProps) {
  const title = "🎯 Vamos começar esta jornada!";
  
  const content = `Olá! Sou o **Dr. Skoda** e será um prazer te acompanhar nesta questão! 👨‍⚕️

**📚 Sobre esta questão:**
${contextText}

**💡 Dica importante:**
Leia com atenção cada palavra do enunciado e das alternativas. Na medicina, cada detalhe pode fazer a diferença entre o diagnóstico correto e um equívoco.

**🎯 Seu objetivo:**
Analise o cenário clínico apresentado e identifique a melhor abordagem baseada em evidências científicas.

**✨ Lembre-se:**
• Não há pressa - qualidade > velocidade
• Pense como um pediatra experiente
• Considere o contexto familiar e social
• Aplique os princípios éticos da medicina

Quando estiver pronto, clique em continuar para ver a questão! 🚀`;

  return (
    <DrSkodaDialog
      title={title}
      content={content}
      continueButtonText="🚀 Estou pronto, vamos lá!"
      onContinue={onContinue}
    />
  );
}
import DrSkodaDialog from './DrSkodaDialog';

interface AlternativeAnalysis {
  letter: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface QuestionAnalysisProps {
  alternatives: AlternativeAnalysis[];
  selectedAlternative: string;
  onFinish: () => void;
}

export default function QuestionAnalysis({
  alternatives,
  selectedAlternative,
  onFinish
}: QuestionAnalysisProps) {
  const selectedOption = alternatives.find(alt => alt.letter === selectedAlternative);
  const correctOption = alternatives.find(alt => alt.isCorrect);
  const isCorrect = selectedOption?.isCorrect || false;
  
  const title = isCorrect ? "🎉 Parabéns! Você acertou!" : "📚 Vamos aprender juntos!";
  
  const content = `${isCorrect ? 
    `**🌟 Excelente trabalho!** Você escolheu a alternativa **${selectedAlternative}** e acertou em cheio! 

Seu raciocínio clínico está afiado! Vou explicar por que sua resposta está correta e também revisar as demais alternativas para consolidar ainda mais seu aprendizado.` :
    `Você escolheu a alternativa **${selectedAlternative}**. A resposta correta é a alternativa **${correctOption?.letter}**.

**Não se preocupe!** 💪 Errar faz parte do processo de aprendizado. Cada erro é uma oportunidade valiosa de crescimento. Vamos revisar todas as opções para que você entenda perfeitamente o raciocínio.`
  }

**🔍 ANÁLISE DETALHADA DAS ALTERNATIVAS:**

${alternatives.map(alt => {
  const icon = alt.isCorrect ? '✅' : '❌';
  const status = alt.isCorrect ? '**RESPOSTA CORRETA**' : '**INCORRETA**';
  const selectedMark = alt.letter === selectedAlternative ? '\n\n🎯 **Esta foi sua escolha**' : '';
  
  return `**${icon} Alternativa ${alt.letter})**
${alt.text}

${status}
${alt.explanation}${selectedMark}`;
}).join('\n\n---\n\n')}

**💡 PONTOS-CHAVE PARA LEMBRAR:**
• Na medicina, cada pergunta tem um propósito específico
• A abordagem do paciente deve ser sempre empática e eficaz
• O contexto clínico orienta nossa tomada de decisão
• A comunicação é uma ferramenta terapêutica poderosa

**🚀 Continue assim!** Cada questão te aproxima mais de se tornar um pediatra excepcional! 

${isCorrect ? 
  'Você está no caminho certo! Continue confiante e estudando com dedicação.' : 
  'Use este aprendizado como combustível para seguir estudando. Você tem potencial!'
}`;

  return (
    <DrSkodaDialog
      title={title}
      content={content}
      continueButtonText={isCorrect ? "🏆 Finalizar com sucesso!" : "💪 Continuar aprendendo!"}
      onContinue={onFinish}
    />
  );
}
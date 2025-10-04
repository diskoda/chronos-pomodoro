import GlowWrapper from '../components/common/GlowWrapper';

export default function GlowEffectDemo() {
  return (
    <div className="min-h-screen bg-slate-900 p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8 text-center">
          Demonstração do Efeito de Glow Luminoso
        </h1>
        
        {/* Exemplo 1: Card com glow wrapper - reproduzindo a imagem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <GlowWrapper
            color="blue"
            triggerOn="hover"
            className="bg-slate-800 p-6 rounded-xl"
          >
            <h3 className="text-cyan-400 text-lg font-bold mb-4 flex items-center">
              <span className="mr-2">👤</span> Identificação
            </h3>
            <div className="grid grid-cols-2 gap-4 text-slate-300">
              <div>
                <p className="text-slate-400 text-sm">Nome</p>
                <p className="text-white font-semibold">Lucas S.</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Idade</p>
                <p className="text-white font-semibold">6 anos</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Escolaridade</p>
                <p className="text-white font-semibold">1º ano do ensino fundamental</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Responsável</p>
                <p className="text-white font-semibold">Mãe</p>
              </div>
            </div>
          </GlowWrapper>

          <GlowWrapper
            color="purple"
            intensity="intense"
            pulse={true}
            triggerOn="hover"
            className="bg-slate-800 p-6 rounded-xl"
          >
            <h3 className="text-white text-xl font-bold mb-4">Glow Intenso</h3>
            <p className="text-slate-300">
              Este card tem um efeito de glow mais intenso e pulsante.
              Passe o mouse para ver o efeito!
            </p>
          </GlowWrapper>
        </div>

        {/* Exemplo 2: Botões com diferentes cores */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <GlowWrapper
            as="button"
            color="blue"
            className="bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Azul
          </GlowWrapper>
          
          <GlowWrapper
            as="button"
            color="purple"
            className="bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Roxo
          </GlowWrapper>
          
          <GlowWrapper
            as="button"
            color="green"
            className="bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Verde
          </GlowWrapper>
          
          <GlowWrapper
            as="button"
            color="orange"
            className="bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Laranja
          </GlowWrapper>
        </div>

        {/* Exemplo 3: Input com foco */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-bold">Inputs com Glow no Foco</h3>
          <GlowWrapper
            as="input"
            color="green"
            triggerOn="focus"
            className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-600 focus:outline-none"
            placeholder="Clique aqui para focar e ver o glow"
          />
          
          <GlowWrapper
            color="purple"
            triggerOn="focus"
            className="w-full"
          >
            <textarea
              className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-600 focus:outline-none resize-none"
              placeholder="Textarea com glow wrapper"
              rows={3}
            />
          </GlowWrapper>
        </div>

        {/* Instruções */}
        <div className="mt-12 bg-slate-800 p-6 rounded-xl">
          <h3 className="text-white text-xl font-bold mb-4">Como Usar</h3>
          <div className="text-slate-300 space-y-2 text-sm">
            <p><strong className="text-blue-400">GlowWrapper:</strong> Envolve qualquer componente com efeito de glow</p>
            <p><strong className="text-purple-400">useSimpleGlow:</strong> Hook para controle manual do efeito</p>
            <p><strong className="text-green-400">useAlwaysGlow:</strong> Hook para efeito sempre ativo</p>
            <p><strong className="text-orange-400">Cores disponíveis:</strong> blue, purple, green, orange</p>
            <p><strong className="text-cyan-400">Triggers:</strong> hover, focus, active, manual</p>
            
            <div className="mt-4 p-4 bg-slate-700 rounded-lg">
              <p className="text-yellow-400 font-semibold mb-2">Exemplo de Uso:</p>
              <code className="text-green-300 text-xs">
                {`<GlowWrapper color="blue" triggerOn="hover" className="your-classes">
  <div>Seu conteúdo aqui</div>
</GlowWrapper>`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { DrSkodaDialog } from '../components/questionFlow';

const longContent = `**Protocolo de Reanimação Neonatal Avançada:**

**1. Indicações para Massagem Cardíaca:**
- **FC < 60 bpm** após 30 segundos de VPP eficaz
- Sempre associada à ventilação com pressão positiva
- Coordenação essencial entre compressão e ventilação

**2. Técnica Padrão - Relação 3:1:**
- **3 compressões** para **1 ventilação**
- Total: **120 eventos/minuto** (90 compressões + 30 ventilações)
- **Sincronizada:** Pausa nas compressões durante ventilação
- **Ritmo:** "Um-e-dois-e-três-e-ventila"

**3. FiO₂ na Reanimação Neonatal:**
- **RN ≥ 35 semanas:** Iniciar com **ar ambiente (21%)**
- **Se necessário IOT + massagem:** Progredir para **100%**
- **RN < 35 semanas:** Iniciar com **30%**
- **Ajustes:** Baseados na saturação e resposta clínica

**4. Coordenação Compressão-Ventilação:**
- **Sincronia obrigatória:** Evita ventilação contra resistência
- **Posicionamento:** 2 polegares no terço inferior do esterno
- **Profundidade:** 1/3 do diâmetro anteroposterior do tórax
- **Retorno completo** entre compressões

**5. Medicações na Reanimação:**
- **Epinefrina:** 0,01-0,03 mg/kg IV ou 0,05-0,1 mg/kg endotraqueal
- **Volume:** 10 ml/kg de cristaloide se hipovolemia
- **Bicarbonato:** Apenas se acidose documentada e ventilação adequada

**6. Critérios de Parada:**
- **FC > 100 bpm** sustentada
- **Respiração espontânea** adequada
- **Boa perfusão** e coloração

**7. Pós-Reanimação:**
- **Cuidados intensivos** neonatais
- **Monitorização** contínua
- **Investigação** de causas
- **Suporte** familiar

**8. Considerações Especiais:**
- **Prematuridade** extrema
- **Malformações** congênitas
- **Asfixia** perinatal severa
- **Aspectos** éticos

**Diferenças importantes:**
- **Adulto/Criança:** 30:2 (diferente do neonato!)
- **Neonato:** 3:1 (permite maior frequência ventilatória)

Este é um protocolo muito importante que deve ser seguido com precisão em todas as situações de emergência neonatal. A prática e o treinamento regular são essenciais para o sucesso.`;

export default function ScrollTestPage() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <h1 className="text-white text-2xl mb-4">Teste de Scroll - Dr. Skoda Dialog</h1>
      <p className="text-slate-300 mb-8">
        Esta página demonstra como o componente DrSkodaDialog lida com conteúdo longo
        através de scroll. O dialog tem altura máxima e permite rolagem quando necessário.
      </p>
      
      <DrSkodaDialog
        title="Reanimação neonatal – teste de scroll"
        content={longContent}
        onContinue={() => alert('Continuando...')}
        className=""
      />
    </div>
  );
}
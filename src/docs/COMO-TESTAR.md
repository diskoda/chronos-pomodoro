# 🧪 Como Testar o Sistema Universal de Questões

## 🚀 5 Formas de Testar

### 1. 📊 Dashboard (Mais Fácil)
```bash
# Acesse o dashboard e clique na aba "🧪 Teste"
http://localhost:3000/dashboard
```
- ✅ Clique na aba "🧪 Teste" no dashboard
- ✅ Veja 3 componentes renderizados:
  - Dr. Skoda completo
  - Interface simples 
  - Configuração customizada

### 2. 🔗 Rota Dedicada
```bash
# Acesse a página de teste dedicada
http://localhost:3000/test/universal
```
- ✅ Página completa de testes
- ✅ Múltiplos exemplos
- ✅ Console logs automáticos

### 3. 🖥️ Console do Navegador
```javascript
// 1. Abra o console (F12)
// 2. Cole e execute este código:

console.log('🧪 Testando Sistema Universal');

// Verificar se arquivos foram criados
fetch('/src/components/universal/UniversalQuestionSolver.tsx')
  .then(() => console.log('✅ UniversalQuestionSolver existe'))
  .catch(() => console.log('❌ Arquivo não encontrado'));

fetch('/src/data/questionConfigFactory.ts')
  .then(() => console.log('✅ questionConfigFactory existe'))
  .catch(() => console.log('❌ Arquivo não encontrado'));
```

### 4. 📝 Adicionar em Qualquer Página
```tsx
// Adicione este código em qualquer componente:
import QuickTest from '../components/QuickTest';

function MinhaComponente() {
  return (
    <div>
      {/* Seu código existente */}
      
      {/* Teste do sistema universal */}
      <QuickTest />
    </div>
  );
}
```

### 5. 🛠️ Teste Manual Direto
```tsx
// Crie um arquivo de teste simples:
import UniversalQuestionSolver from '../components/universal/UniversalQuestionSolver';
import { drSkodaConfig } from '../data/questionConfigFactory';

function MeuTeste() {
  const config = drSkodaConfig(1);
  return <UniversalQuestionSolver {...config} />;
}
```

## ✅ O Que Verificar

### 1. Renderização
- [ ] Componentes aparecem na tela
- [ ] Não há erros no console
- [ ] Interface está responsiva

### 2. Configurações
- [ ] Dr. Skoda aparece quando habilitado
- [ ] Interface simples não mostra Dr. Skoda
- [ ] Configurações customizadas funcionam

### 3. Navegação
- [ ] Botões "Voltar" funcionam
- [ ] Botões "Finalizar" funcionam
- [ ] Console mostra logs dos callbacks

### 4. Performance
- [ ] Carregamento é rápido
- [ ] Não há memory leaks
- [ ] Configurações são validadas

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
# Certifique-se que todos os arquivos foram criados:
src/components/universal/UniversalQuestionSolver.tsx
src/data/questionConfigFactory.ts
src/data/universalFlowDataManager.ts
src/components/QuickTest.tsx
src/pages/TestPage.tsx
```

### Erro: "Invalid configuration"
```tsx
// Verifique se questionId é válido:
const config = drSkodaConfig(1); // ✅ Correto
const config = drSkodaConfig(0); // ❌ Inválido
```

### Erro: "Dr. Skoda não aparece"
```tsx
// Verifique a configuração:
const config = drSkodaConfig(1); // ✅ Dr. Skoda habilitado
const config = simpleConfig(1);  // ✅ Dr. Skoda desabilitado
```

## 📊 Comandos de Teste no Terminal

```bash
# 1. Verificar se está funcionando
npm start

# 2. Acessar dashboard
# Browser: http://localhost:3000/dashboard

# 3. Acessar página de teste
# Browser: http://localhost:3000/test/universal

# 4. Verificar arquivos foram criados
ls src/components/universal/
ls src/data/questionConfigFactory.ts
ls src/components/QuickTest.tsx
```

## 🎯 Próximos Passos Após Teste

### Se Funcionou:
1. ✅ **Migrar primeira questão real**
2. ✅ **Criar dados de fluxo específicos**
3. ✅ **Ajustar estilos CSS**
4. ✅ **Integrar com rotas existentes**

### Se Deu Erro:
1. 🔍 **Verificar console do navegador**
2. 🔍 **Conferir imports dos arquivos**
3. 🔍 **Validar estrutura de pastas**
4. 🔍 **Testar componente por componente**

## 💡 Dicas de Teste

### Para Desenvolvimento:
```tsx
// Adicione logs para debug:
const config = drSkodaConfig(1);
console.log('Configuração criada:', config);

// Teste validação:
import { validateConfig } from '../data/questionConfigFactory';
const validation = validateConfig(config);
console.log('Validação:', validation);
```

### Para Produção:
```tsx
// Remova logs de debug
// Teste com dados reais
// Verifique performance
```

---

**🎉 Escolha uma das 5 formas acima e comece a testar!**

**Recomendação**: Comece com a **opção 1 (Dashboard)** - é a mais fácil e visual.
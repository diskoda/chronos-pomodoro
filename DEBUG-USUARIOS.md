# 🔍 DEBUG: Encontrar Usuários no Firebase

## 🚨 Problema: 0 usuários encontrados

Se o sistema não está encontrando usuários, siga este guia passo a passo:

## 📋 PASSO 1: Acessar Ferramenta de Debug

```bash
# 1. Certifique-se que o servidor está rodando
npm run dev

# 2. Acesse a página de administração
http://localhost:5173/admin/initialization

# 3. Clique no botão "Investigar Coleções" (amarelo)
# 4. Abra o console do navegador (F12)
# 5. Verifique os logs detalhados
```

## 🔍 PASSO 2: Analisar Resultados do Debug

O debug vai mostrar:
- ✅ **Coleções que existem** e quantos documentos têm
- ❌ **Coleções vazias** ou que não existem
- 📄 **Estrutura dos documentos** (campos disponíveis)
- 👤 **IDs de usuários** encontrados

### Exemplo de saída esperada:
```
📁 Verificando coleção: users
   ✅ Coleção users: 2 documentos
   📄 Documento 1:
      ID: abc123xyz
      Campos: email, name, createdAt
      Exemplo: { email: "user@email.com", name: "João" }
```

## 🛠️ PASSO 3: Soluções Baseadas no Resultado

### **Cenário A: Usuários em coleção 'users'**
Se encontrar usuários na coleção `users`, os IDs dos documentos são os user IDs.

### **Cenário B: Usuários em outra coleção**
Se estiverem em coleção com nome diferente (ex: `profiles`, `accounts`), o sistema já vai detectar automaticamente.

### **Cenário C: Campo userId diferente**
Se o campo for `uid`, `user_id`, ou outro nome, o sistema também vai detectar.

### **Cenário D: Nenhum usuário encontrado**
Se não encontrar nada, você pode:

#### Opção 1: Adicionar IDs manualmente (temporário)
```typescript
// Edite: src/services/userInitializationService.ts
// Linha ~XX: método getKnownUserIds()

static getKnownUserIds(): string[] {
  // SUBSTITUA pelos IDs reais dos seus usuários
  return [
    'ID_DO_USUARIO_1_AQUI', 
    'ID_DO_USUARIO_2_AQUI'
  ];
}
```

#### Opção 2: Verificar Firebase Auth
1. Acesse: https://console.firebase.google.com/
2. Vá em **Authentication** → **Users**
3. Verifique se os usuários estão listados lá
4. Copie os UIDs e use na Opção 1

#### Opção 3: Criar coleção manualmente
```javascript
// No console do navegador (F12), execute:

// Para cada usuário registrado:
await firebase.firestore().collection('users').doc('USER_ID_AQUI').set({
  email: 'user@email.com',
  name: 'Nome do Usuário',
  createdAt: firebase.firestore.Timestamp.now()
});
```

## 🧪 PASSO 4: Testar Novamente

Após fazer as correções:

```bash
# 1. Recarregar página admin
http://localhost:5173/admin/initialization

# 2. Clicar "Atualizar Estatísticas"
# 3. Verificar se agora mostra usuários encontrados
# 4. Se sim, clicar "Inicializar Todos"
```

## 📊 PASSO 5: Verificar Firebase Console

Após inicialização bem-sucedida, verifique no Firebase Console:

### Coleções que devem aparecer:
- `methodology_levels` - Níveis por metodologia
- `user_overall_levels` - Níveis gerais
- `methodology_stats` - Estatísticas detalhadas
- `methodology_xp_activities` - Histórico de atividades

### Exemplo de documento em `methodology_levels`:
```json
{
  "userId": "abc123xyz",
  "methodology": "questions",
  "currentLevel": 1,
  "currentXP": 0,
  "totalXP": 0,
  "xpToNextLevel": 100,
  "updatedAt": "2024-10-03T19:00:00Z"
}
```

## 🚨 Problemas Comuns

### **Erro: "Permission denied"**
- **Causa**: Regras do Firestore muito restritivas
- **Solução**: Verificar regras em Firestore → Rules

### **Erro: "Collection not found"**
- **Causa**: Coleção realmente não existe
- **Solução**: Criar usuários primeiro ou usar IDs manuais

### **Usuários aparecem mas inicialização falha**
- **Causa**: Problemas de permissão ou índices
- **Solução**: Verificar console do navegador para erros específicos

## 📞 Próximos Passos

Se seguir todos os passos e ainda não funcionar:

1. **Compartilhe os logs**: Cole os resultados do debug
2. **Verifique permissões**: Firebase Auth + Firestore Rules
3. **Considere recriação**: Criar usuários teste do zero

## 🎯 Objetivo Final

Após resolver, você deve ver:
- ✅ **Usuários detectados**: 2 usuários (ou quantos você tem)
- ✅ **Inicialização bem-sucedida**: Todos configurados no nível 1
- ✅ **Sistema funcionando**: XP aparecendo nas questões

---

**💡 Dica**: O debug é a ferramenta mais importante para entender a estrutura do seu Firebase!
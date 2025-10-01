# ⚠️ ERRO DE PERMISSÕES FIREBASE - SOLUÇÃO RÁPIDA

Se você está vendo o erro `Missing or insufficient permissions`, siga estes passos:

## 🚨 Solução Imediata (2 minutos)

### 1. Acesse o Firebase Console
- Abra: https://console.firebase.google.com/
- Login com sua conta Google
- Selecione o projeto: **penapedplataforma**

### 2. Configure as Regras Temporárias
1. No menu lateral, clique em **"Firestore Database"**
2. Clique na aba **"Rules"** (no topo)
3. **APAGUE TUDO** que está na caixa de texto
4. **COLE** o código abaixo:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

5. Clique no botão **"Publish"** (azul)
6. Aguarde a mensagem de confirmação

### 3. Execute a Migração
- Volte para a aplicação: http://localhost:5173/admin/questions
- Clique em **"Migrar Questões"**
- Aguarde a conclusão

## 🎯 Métodos Alternativos

### Método 1: Interface Web
```
http://localhost:5173/admin/questions
```
- Interface gráfica mais amigável
- Feedback visual em tempo real

### Método 2: Console do Navegador
1. Abra a aplicação no navegador
2. Pressione **F12** → **Console**
3. Cole e execute:

```javascript
// Cole todo o conteúdo de scripts/browser-migration.js
```

### Método 3: Script NPM (se permissões OK)
```bash
npm run migrate-questions
```

## ✅ Como Saber se Funcionou

Após a migração, você deve ver:
- ✅ **"Migração concluída com sucesso!"**
- ✅ **"X questões foram migradas"**
- ✅ **"Migração verificada com sucesso!"**

## ⚠️ IMPORTANTE - Segurança

As regras configuradas acima são **APENAS PARA DESENVOLVIMENTO**.

### Após a migração, configure regras de produção:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /questions/{questionId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                      request.auth.token.admin == true;
    }
  }
}
```

## 🆘 Se Ainda Não Funcionar

1. **Verifique o projeto Firebase**:
   - Tem certeza que é `penapedplataforma`?
   - Você tem permissões de admin?

2. **Aguarde alguns minutos**:
   - Mudanças nas regras podem demorar para propagar

3. **Limpe o cache**:
   - Ctrl+Shift+R para hard refresh

4. **Verifique o console**:
   - F12 → Console → procure por erros

## 📞 Status da Migração

- **Local**: 26 questões USP-SP 2025
- **Firebase**: 0 questões (após migração: 26)
- **Status**: Aguardando correção de permissões

---

**Tempo estimado**: 2-3 minutos para resolver completamente ⏱️
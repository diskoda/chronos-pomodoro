# Configuração de Permissões Firebase

## Problema: Erro de Permissões

O erro `Missing or insufficient permissions` indica que as regras do Firestore estão bloqueando as operações de escrita.

## Solução Rápida para Desenvolvimento

### 1. Configure as Regras do Firestore (TEMPORÁRIO)

Acesse o Firebase Console:
1. Vá para [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto: `penapedplataforma`
3. No menu lateral, clique em "Firestore Database"
4. Clique na aba "Rules"
5. Substitua as regras existentes por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // REGRAS TEMPORÁRIAS PARA DESENVOLVIMENTO
    // ⚠️ NÃO USE EM PRODUÇÃO! ⚠️
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

6. Clique em "Publish"

### 2. Regras de Produção (Usar após desenvolvimento)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Coleção de questões
    match /questions/{questionId} {
      // Permitir leitura para usuários autenticados
      allow read: if request.auth != null;
      
      // Permitir escrita apenas para administradores
      allow write: if request.auth != null && 
                      request.auth.token.admin == true;
    }
    
    // Estatísticas públicas (apenas leitura)
    match /stats/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
                      request.auth.token.admin == true;
    }
  }
}
```

### 3. Como Definir Usuários Administradores

#### Usando Firebase Admin SDK (Node.js):

```javascript
const admin = require('firebase-admin');

// Definir claims de administrador
await admin.auth().setCustomUserClaims(uid, { admin: true });
```

#### Usando Firebase CLI:

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Usar projeto
firebase use penapedplataforma

# Definir usuário como admin (substitua USER_UID)
firebase auth:set-claims USER_UID '{"admin":true}'
```

## Solução Alternativa: Sistema Híbrido

Se não conseguir configurar as permissões imediatamente, implementei um sistema híbrido que usa dados locais como fallback.

### Como Ativar o Sistema Híbrido:

1. No arquivo de configuração, defina uma variável:

```typescript
// src/config/firebase.ts
export const USE_FIREBASE = false; // Mude para true quando as permissões estiverem configuradas
```

2. Use o componente atualizado que detecta automaticamente se Firebase está disponível.

## Status Atual

- ✅ Firebase configurado e conectado
- ❌ Permissões de escrita bloqueadas
- ✅ Sistema de fallback funcionando
- ✅ Interface de migração pronta

## Próximos Passos

1. **Configurar regras temporárias** (desenvolvimento)
2. **Executar migração** via interface admin
3. **Configurar regras de produção** (quando ready)
4. **Definir usuários administradores**

## Comandos Úteis

```bash
# Verificar configuração atual
firebase projects:list

# Ver regras atuais
firebase firestore:rules

# Deploy de novas regras
firebase deploy --only firestore:rules
```
# 🔥 Guia de Configuração Firebase

## 📋 Pré-requisitos

1. **Conta Google** com projeto Firebase criado
2. **Firebase CLI** instalado globalmente
3. **Node.js** versão 18+ instalado

## 🚀 Passo a Passo da Configuração

### 1. Instalar Firebase CLI (se não tiver)

```powershell
npm install -g firebase-tools
```

### 2. Fazer login no Firebase

```powershell
firebase login
```

### 3. Inicializar o projeto Firebase no diretório

```powershell
# No diretório do seu projeto
cd c:\Users\Samuel\Desktop\projects\chronos-pomodoro

# Configurar Firebase no projeto
firebase init
```

**Durante o `firebase init`, selecione:**
- ✅ Firestore: Configure security rules and indexes
- ✅ Hosting: Configure files for Firebase Hosting
- ✅ Use existing project: `penapedplataforma`

### 4. Configurar regras de segurança do Firestore

```powershell
# Deploy das regras de segurança
firebase deploy --only firestore:rules
```

### 5. Configurar índices do Firestore

```powershell
# Deploy dos índices
firebase deploy --only firestore:indexes
```

### 6. Verificar configuração

```powershell
# Verificar se o projeto está configurado corretamente
firebase list
firebase use --project penapedplataforma
```

## 🗄️ Estrutura das Coleções

### Coleções principais do sistema XP:

1. **`xp_activities`** - Atividades que geram XP
2. **`user_levels`** - Níveis e XP dos usuários
3. **`user_achievements`** - Conquistas desbloqueadas
4. **`system_config`** - Configurações do sistema

### Exemplo de documentos:

#### `xp_activities/{activityId}`
```json
{
  "userId": "user123",
  "type": "question_correct",
  "xpGained": 15,
  "description": "Questão de Cardiologia (médio)",
  "metadata": {
    "difficulty": "medium",
    "subject": "Cardiologia",
    "timeSpent": 45
  },
  "createdAt": "2025-09-30T10:30:00Z"
}
```

#### `user_levels/{userId}`
```json
{
  "userId": "user123",
  "currentLevel": 5,
  "currentXP": 67,
  "totalXP": 342,
  "xpToNextLevel": 108,
  "lastLevelUp": "2025-09-29T15:20:00Z",
  "updatedAt": "2025-09-30T10:30:00Z"
}
```

#### `user_achievements/{achievementId}`
```json
{
  "userId": "user123",
  "achievementId": "week_warrior",
  "unlockedAt": "2025-09-30T08:00:00Z",
  "progress": 7,
  "maxProgress": 7
}
```

## 🔒 Regras de Segurança

As regras garantem que:
- ✅ Usuários só acessam seus próprios dados
- ✅ Campos obrigatórios são validados
- ✅ Tipos de dados são corretos
- ✅ Limites de XP são respeitados

## 📊 Índices Criados

Os índices otimizam as consultas:
- `userId + createdAt` - Histórico de atividades
- `userId + type + createdAt` - Atividades por tipo
- `userId + unlockedAt` - Conquistas por data

## 🧪 Testando a Configuração

### 1. Usando emuladores locais (desenvolvimento)

```powershell
# Iniciar emuladores
firebase emulators:start
```

Acesse: `http://localhost:4000` (UI dos emuladores)

### 2. Usando dados reais (produção)

```powershell
# Verificar conexão com Firestore
firebase firestore:delete --all-collections --yes
```

## 🛠️ Comandos Úteis

### Deploy completo
```powershell
firebase deploy
```

### Deploy apenas do Firestore
```powershell
firebase deploy --only firestore
```

### Deploy apenas do hosting
```powershell
firebase deploy --only hosting
```

### Ver logs em tempo real
```powershell
firebase functions:log
```

### Backup de dados
```powershell
firebase firestore:export gs://penapedplataforma.firebasestorage.app/backups/$(Get-Date -Format "yyyy-MM-dd")
```

### Monitorar uso
```powershell
firebase projects:describe penapedplataforma
```

## 🔧 Troubleshooting

### Erro: "Insufficient permissions"
- Verifique se está logado: `firebase login`
- Confirme o projeto: `firebase use penapedplataforma`

### Erro: "Index not found"
- Deploy dos índices: `firebase deploy --only firestore:indexes`
- Aguarde alguns minutos para criação

### Erro: "Permission denied"
- Verifique as regras: `firebase deploy --only firestore:rules`
- Confirme autenticação do usuário

### Erro: "Quota exceeded"
- Monitore uso no console Firebase
- Configure alertas de cobrança

## 📱 Console Firebase

Acesse o console em: `https://console.firebase.google.com/project/penapedplataforma`

### Seções importantes:
- **Authentication** - Gerenciar usuários
- **Firestore Database** - Ver dados e regras
- **Storage** - Arquivos dos usuários
- **Hosting** - Deploy da aplicação
- **Analytics** - Métricas de uso

## 🚀 Deploy da Aplicação

### 1. Build da aplicação
```powershell
npm run build
```

### 2. Deploy no Firebase Hosting
```powershell
firebase deploy --only hosting
```

### 3. Configurar domínio customizado (opcional)
```powershell
firebase hosting:sites:create chronos-pomodoro
```

## 🔍 Monitoramento

### 1. Performance
- Monitore tempo de resposta das consultas
- Verifique uso de índices no console

### 2. Custos
- Configure alertas de billing
- Monitore reads/writes do Firestore

### 3. Erros
- Configure Cloud Logging
- Monitore regras de segurança

## ✅ Checklist Final

- [ ] Firebase CLI instalado e logado
- [ ] Projeto inicializado com `firebase init`
- [ ] Regras de segurança deployadas
- [ ] Índices configurados
- [ ] Emuladores testados localmente
- [ ] Aplicação buildada e deployada
- [ ] Sistema XP testado em produção
- [ ] Monitoramento configurado

## 📞 Suporte

Em caso de problemas:
1. Consulte a documentação oficial: `https://firebase.google.com/docs`
2. Verifique o status do Firebase: `https://status.firebase.google.com`
3. Consulte os logs: `firebase functions:log`

O sistema está pronto para produção! 🎉
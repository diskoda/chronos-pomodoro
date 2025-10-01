# 🔥 Script de Configuração Automática do Firebase
# Execute este script no PowerShell como Administrador

param(
    [switch]$Production = $false,
    [switch]$EmulatorOnly = $false,
    [switch]$SkipLogin = $false
)

Write-Host "🚀 Iniciando configuração do Firebase para Chronos Pomodoro..." -ForegroundColor Green
Write-Host ""

# Verificar se o Firebase CLI está instalado
function Test-FirebaseCLI {
    try {
        $version = firebase --version 2>$null
        if ($version) {
            Write-Host "✅ Firebase CLI encontrado: $version" -ForegroundColor Green
            return $true
        }
    }
    catch {
        Write-Host "❌ Firebase CLI não encontrado" -ForegroundColor Red
        return $false
    }
}

# Instalar Firebase CLI se necessário
function Install-FirebaseCLI {
    Write-Host "📦 Instalando Firebase CLI..." -ForegroundColor Yellow
    try {
        npm install -g firebase-tools
        Write-Host "✅ Firebase CLI instalado com sucesso!" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Erro ao instalar Firebase CLI. Instale manualmente: npm install -g firebase-tools" -ForegroundColor Red
        exit 1
    }
}

# Login no Firebase
function Connect-Firebase {
    if (-not $SkipLogin) {
        Write-Host "🔑 Fazendo login no Firebase..." -ForegroundColor Yellow
        try {
            firebase login
            Write-Host "✅ Login realizado com sucesso!" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ Erro no login. Tente manualmente: firebase login" -ForegroundColor Red
            exit 1
        }
    }
}

# Configurar projeto Firebase
function Set-FirebaseProject {
    Write-Host "🔧 Configurando projeto Firebase..." -ForegroundColor Yellow
    try {
        firebase use penapedplataforma
        Write-Host "✅ Projeto configurado: penapedplataforma" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Erro ao configurar projeto. Verifique se o projeto existe." -ForegroundColor Red
        exit 1
    }
}

# Deploy das regras de segurança
function Deploy-FirestoreRules {
    Write-Host "🔒 Deployando regras de segurança..." -ForegroundColor Yellow
    try {
        firebase deploy --only firestore:rules
        Write-Host "✅ Regras de segurança deployadas!" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Erro ao deployar regras. Verifique o arquivo firestore.rules" -ForegroundColor Red
    }
}

# Deploy dos índices
function Deploy-FirestoreIndexes {
    Write-Host "📊 Deployando índices do Firestore..." -ForegroundColor Yellow
    try {
        firebase deploy --only firestore:indexes
        Write-Host "✅ Índices deployados!" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Erro ao deployar índices. Verifique o arquivo firestore.indexes.json" -ForegroundColor Red
    }
}

# Inicializar sistema XP
function Initialize-XPSystem {
    Write-Host "🎮 Inicializando sistema XP..." -ForegroundColor Yellow
    try {
        # Este comando pode ser executado no navegador ou via script personalizado
        Write-Host "ℹ️  Para inicializar o sistema XP, acesse: http://localhost:5174/xp-system" -ForegroundColor Cyan
        Write-Host "   E clique no botão 'Inicializar Sistema' na página de demonstração." -ForegroundColor Cyan
    }
    catch {
        Write-Host "❌ Erro ao inicializar sistema XP" -ForegroundColor Red
    }
}

# Iniciar emuladores
function Start-Emulators {
    Write-Host "🧪 Iniciando emuladores Firebase..." -ForegroundColor Yellow
    try {
        Start-Process -FilePath "firebase" -ArgumentList "emulators:start" -NoNewWindow
        Write-Host "✅ Emuladores iniciados!" -ForegroundColor Green
        Write-Host "   Acesse: http://localhost:4000 (UI dos emuladores)" -ForegroundColor Cyan
        Write-Host "   Firestore: http://localhost:8080" -ForegroundColor Cyan
        Write-Host "   Auth: http://localhost:9099" -ForegroundColor Cyan
    }
    catch {
        Write-Host "❌ Erro ao iniciar emuladores" -ForegroundColor Red
    }
}

# Build e deploy da aplicação
function Deploy-Application {
    Write-Host "🏗️  Buildando aplicação..." -ForegroundColor Yellow
    try {
        npm run build
        Write-Host "✅ Build concluído!" -ForegroundColor Green
        
        Write-Host "🚀 Deployando no Firebase Hosting..." -ForegroundColor Yellow
        firebase deploy --only hosting
        Write-Host "✅ Aplicação deployada!" -ForegroundColor Green
        Write-Host "   Acesse: https://penapedplataforma.web.app" -ForegroundColor Cyan
    }
    catch {
        Write-Host "❌ Erro no deploy da aplicação" -ForegroundColor Red
    }
}

# Verificar status
function Test-FirebaseSetup {
    Write-Host "🔍 Verificando configuração..." -ForegroundColor Yellow
    
    # Verificar conexão com o projeto
    try {
        $project = firebase use
        Write-Host "✅ Projeto ativo: $project" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Problema na configuração do projeto" -ForegroundColor Red
    }
    
    # Verificar arquivos de configuração
    $files = @(
        "firebase.json",
        "firestore.rules", 
        "firestore.indexes.json",
        "src/config/firebase.ts"
    )
    
    foreach ($file in $files) {
        if (Test-Path $file) {
            Write-Host "✅ $file encontrado" -ForegroundColor Green
        } else {
            Write-Host "❌ $file não encontrado" -ForegroundColor Red
        }
    }
}

# Mostrar informações do projeto
function Show-ProjectInfo {
    Write-Host ""
    Write-Host "📋 Informações do Projeto:" -ForegroundColor Cyan
    Write-Host "   Nome: Chronos Pomodoro" -ForegroundColor White
    Write-Host "   Firebase Project: penapedplataforma" -ForegroundColor White
    Write-Host "   Console: https://console.firebase.google.com/project/penapedplataforma" -ForegroundColor White
    Write-Host ""
    Write-Host "🔗 URLs Importantes:" -ForegroundColor Cyan
    Write-Host "   Aplicação: https://penapedplataforma.web.app" -ForegroundColor White
    Write-Host "   Emulator UI: http://localhost:4000" -ForegroundColor White
    Write-Host "   Sistema XP Demo: http://localhost:5174/xp-system" -ForegroundColor White
    Write-Host ""
}

# Função principal
function Main {
    Clear-Host
    Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║                 🔥 Firebase Setup - Chronos Pomodoro         ║" -ForegroundColor Cyan  
    Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
    
    # Verificar e instalar Firebase CLI
    if (-not (Test-FirebaseCLI)) {
        Install-FirebaseCLI
    }
    
    # Login (se necessário)
    if (-not $EmulatorOnly) {
        Connect-Firebase
        Set-FirebaseProject
    }
    
    # Verificar configuração
    Test-FirebaseSetup
    
    if ($EmulatorOnly) {
        # Apenas emuladores
        Write-Host "🧪 Modo apenas emuladores ativado" -ForegroundColor Yellow
        Start-Emulators
    }
    elseif ($Production) {
        # Deploy completo para produção
        Write-Host "🚀 Modo produção ativado" -ForegroundColor Yellow
        Deploy-FirestoreRules
        Deploy-FirestoreIndexes
        Deploy-Application
        Initialize-XPSystem
    }
    else {
        # Configuração desenvolvimento
        Write-Host "🛠️  Modo desenvolvimento ativado" -ForegroundColor Yellow
        Deploy-FirestoreRules
        Deploy-FirestoreIndexes
        Initialize-XPSystem
        
        $response = Read-Host "Deseja iniciar os emuladores? (s/n)"
        if ($response -eq 's' -or $response -eq 'S') {
            Start-Emulators
        }
    }
    
    Show-ProjectInfo
    
    Write-Host "🎉 Configuração concluída!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📚 Próximos passos:" -ForegroundColor Yellow
    Write-Host "1. Execute: npm run dev" -ForegroundColor White
    Write-Host "2. Acesse: http://localhost:5174/xp-system" -ForegroundColor White
    Write-Host "3. Teste o sistema XP completo" -ForegroundColor White
    Write-Host ""
}

# Executar script principal
Main
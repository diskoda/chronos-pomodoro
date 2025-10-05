# Script para remover emojis dos arquivos de dados
$files = @(
    "src\data\uspSp2025FlowData.ts",
    "src\data\explanations.ts", 
    "src\data\enhancedQuestionFlowData.ts",
    "src\data\universalFlowDataManager.ts"
)

$emojis = @(
    [char]0x2705,  # ✅
    [char]0x274C,  # ❌
    [char]0x26A0,  # ⚠
    [char]0x1F6AB, # 🚫
    [char]0x1F50D, # 🔍
    [char]0x1F4CA, # 📊
    [char]0x1F3AF, # 🎯
    [char]0x1F469, # 👩‍⚕️ (apenas parte)
    [char]0x2764,  # ❤️ (apenas parte)
    [char]0x1F32A, # 🌪️
    [char]0x2696,  # ⚖️
    [char]0x23F1,  # ⏱️
    [char]0x1F4A1, # 💡
    [char]0x1F52C, # 🔬
    [char]0x1F48A, # 💊
    [char]0x1FA7A, # 🩺
    [char]0x1F4C8, # 📈
    [char]0x1F4CB, # 📋
    [char]0x1F525, # 🔥
    [char]0x2728,  # ✨
    [char]0x1F4AA, # 💪
    [char]0x1F3A8, # 🎨
    [char]0x1F31F, # 🌟
    [char]0x1F4AB, # 💫
    [char]0x2B50,  # ⭐
    [char]0x1F3AA, # 🎪
    [char]0x1F3AD, # 🎭
    [char]0x1F680, # 🚀
    [char]0x26A1   # ⚡
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processando $file..."
        $content = Get-Content -Path $file -Raw -Encoding UTF8
        
        # Remover emojis específicos
        $content = $content -replace "✅", ""
        $content = $content -replace "❌", ""
        $content = $content -replace "⚠️", ""
        $content = $content -replace "🚫", ""
        $content = $content -replace "🔍", ""
        $content = $content -replace "📊", ""
        $content = $content -replace "🎯", ""
        $content = $content -replace "👩‍⚕️", ""
        $content = $content -replace "❤️", ""
        $content = $content -replace "🌪️", ""
        $content = $content -replace "⚖️", ""
        $content = $content -replace "⏱️", ""
        $content = $content -replace "💡", ""
        $content = $content -replace "🔬", ""
        $content = $content -replace "💊", ""
        $content = $content -replace "🩺", ""
        $content = $content -replace "📈", ""
        $content = $content -replace "📋", ""
        $content = $content -replace "🔥", ""
        $content = $content -replace "✨", ""
        $content = $content -replace "💪", ""
        $content = $content -replace "🎨", ""
        $content = $content -replace "🌟", ""
        $content = $content -replace "💫", ""
        $content = $content -replace "⭐", ""
        $content = $content -replace "🎪", ""
        $content = $content -replace "🎭", ""
        $content = $content -replace "🚀", ""
        $content = $content -replace "⚡", ""
        
        Set-Content -Path $file -Value $content -Encoding UTF8
        Write-Host "Emojis removidos de $file"
    }
}

Write-Host "Processo concluído!"
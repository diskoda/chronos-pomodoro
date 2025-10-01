#!/bin/bash

# Script para configurar permissões Firebase
# Execute: bash fix-firebase-permissions.sh

echo "🚀 Configurando permissões Firebase para desenvolvimento..."

echo ""
echo "📋 INSTRUÇÕES MANUAIS:"
echo "====================="
echo ""
echo "1. Acesse: https://console.firebase.google.com/"
echo "2. Selecione projeto: penapedplataforma"
echo "3. Vá para: Firestore Database → Rules"
echo "4. Cole as regras abaixo:"
echo ""

cat << 'EOF'
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
EOF

echo ""
echo "5. Clique em 'Publish'"
echo "6. Aguarde alguns segundos"
echo "7. Tente a migração novamente"
echo ""
echo "✅ Após migração bem-sucedida, configure regras de produção!"
echo ""

# Verificar se Firebase CLI está instalado
if command -v firebase &> /dev/null; then
    echo "🔧 Firebase CLI detectado!"
    echo ""
    echo "Comandos úteis:"
    echo "- firebase login"
    echo "- firebase use penapedplataforma"
    echo "- firebase firestore:rules"
    echo ""
else
    echo "💡 Para instalar Firebase CLI:"
    echo "npm install -g firebase-tools"
    echo ""
fi

echo "📖 Para mais detalhes, consulte:"
echo "docs/FIRESTORE-PERMISSIONS.md"
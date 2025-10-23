#!/bin/bash

# Script para remover a instalação local do gerador
# Uso: ./scripts/uninstall-local.sh

set -e

echo "🗑️  Removendo instalação local..."
echo ""

# Verifica se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto angular-jest-test-generator"
    exit 1
fi

# Remove link global
echo "🔗 Removendo link global..."
npm unlink -g 2>/dev/null || {
    echo "   Nenhum link global encontrado"
}

echo ""
echo "✅ Remoção concluída!"
echo ""
echo "📝 Para remover o link em projetos específicos:"
echo "   cd /seu/projeto"
echo "   npm unlink @angular-tools/jest-test-generator"
echo ""


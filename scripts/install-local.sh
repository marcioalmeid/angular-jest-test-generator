#!/bin/bash

# Script para instalar o gerador localmente usando npm link
# Uso: ./scripts/install-local.sh

set -e  # Para na primeira erro

echo "🔧 Instalando Angular Jest Test Generator localmente..."
echo ""

# Verifica se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto angular-jest-test-generator"
    exit 1
fi

# Verifica versões
echo "📋 Verificando versões..."
NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
echo "   Node: $NODE_VERSION"
echo "   npm: $NPM_VERSION"
echo ""

# Instala dependências
echo "📦 Instalando dependências..."
npm install
echo ""

# Cria link global
echo "🔗 Criando link global..."
npm link
echo ""

# Verifica se o comando está disponível
if command -v ng-test-gen &> /dev/null; then
    echo "✅ Instalação concluída com sucesso!"
    echo ""
    echo "📝 Comandos disponíveis:"
    echo "   ng-test-gen <arquivo>"
    echo "   angular-test-generator <arquivo>"
    echo ""
    echo "🚀 Para usar em outro projeto:"
    echo "   cd /seu/projeto"
    echo "   npm link @angular-tools/jest-test-generator"
    echo ""
else
    echo "⚠️  Link criado, mas comando não encontrado no PATH"
    echo "   Pode ser necessário reiniciar o terminal"
fi


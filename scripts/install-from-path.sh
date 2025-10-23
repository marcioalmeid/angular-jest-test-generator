#!/bin/bash

# Script para instalar o gerador em um projeto usando caminho local
# Uso: ./scripts/install-from-path.sh /caminho/do/projeto

set -e

GENERATOR_PATH=$(pwd)
PROJECT_PATH=$1

if [ -z "$PROJECT_PATH" ]; then
    echo "❌ Erro: Forneça o caminho do projeto"
    echo "Uso: $0 /caminho/do/projeto"
    exit 1
fi

if [ ! -d "$PROJECT_PATH" ]; then
    echo "❌ Erro: Diretório não encontrado: $PROJECT_PATH"
    exit 1
fi

if [ ! -f "$PROJECT_PATH/package.json" ]; then
    echo "❌ Erro: package.json não encontrado em $PROJECT_PATH"
    exit 1
fi

echo "📦 Instalando gerador do caminho local..."
echo "   Gerador: $GENERATOR_PATH"
echo "   Projeto: $PROJECT_PATH"
echo ""

cd "$PROJECT_PATH"

# Instala do caminho local
npm install "$GENERATOR_PATH"

echo ""
echo "✅ Instalação concluída!"
echo ""
echo "🚀 Agora você pode usar:"
echo "   cd $PROJECT_PATH"
echo "   npx ng-test-gen src/app/seu-arquivo.ts"
echo ""
echo "📝 O package.json foi atualizado com:"
echo '   "@angular-tools/jest-test-generator": "file:'"$GENERATOR_PATH"'"'
echo ""


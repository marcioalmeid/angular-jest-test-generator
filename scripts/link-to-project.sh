#!/bin/bash

# Script para criar link em um projeto Angular
# Uso: ./scripts/link-to-project.sh /caminho/do/projeto

set -e

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

echo "🔗 Linkando gerador ao projeto..."
echo "   Projeto: $PROJECT_PATH"
echo ""

cd "$PROJECT_PATH"

# Remove link antigo se existir
npm unlink @angular-tools/jest-test-generator 2>/dev/null || true

# Cria novo link
npm link @angular-tools/jest-test-generator

echo ""
echo "✅ Link criado com sucesso!"
echo ""
echo "🚀 Agora você pode usar:"
echo "   cd $PROJECT_PATH"
echo "   ng-test-gen src/app/seu-arquivo.ts"
echo ""


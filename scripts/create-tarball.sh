#!/bin/bash

# Script para criar tarball para distribuição
# Uso: ./scripts/create-tarball.sh [output-directory]

set -e

OUTPUT_DIR=${1:-"./dist"}

echo "📦 Criando tarball para distribuição..."
echo ""

# Verifica se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto"
    exit 1
fi

# Cria diretório de saída se não existir
mkdir -p "$OUTPUT_DIR"

# Obtém nome e versão do package.json
PACKAGE_NAME=$(node -p "require('./package.json').name")
VERSION=$(node -p "require('./package.json').version")

echo "📋 Informações do pacote:"
echo "   Nome: $PACKAGE_NAME"
echo "   Versão: $VERSION"
echo "   Destino: $OUTPUT_DIR"
echo ""

# Executa testes se existirem
if grep -q '"test"' package.json; then
    echo "🧪 Executando testes..."
    npm test || {
        echo "⚠️  Testes falharam, mas continuando..."
    }
    echo ""
fi

# Cria o tarball
echo "🔨 Criando tarball..."
npm pack

# Move para diretório de saída
TARBALL_NAME=$(ls -t *.tgz | head -n1)
mv "$TARBALL_NAME" "$OUTPUT_DIR/"

echo ""
echo "✅ Tarball criado com sucesso!"
echo ""
echo "📁 Arquivo: $OUTPUT_DIR/$TARBALL_NAME"
echo "📊 Tamanho: $(du -h "$OUTPUT_DIR/$TARBALL_NAME" | cut -f1)"
echo ""
echo "📤 Para instalar em outro projeto:"
echo "   npm install $OUTPUT_DIR/$TARBALL_NAME"
echo ""
echo "📤 Para compartilhar:"
echo "   1. Copie o arquivo para local compartilhado"
echo "   2. Outros podem instalar: npm install /caminho/para/$TARBALL_NAME"
echo ""


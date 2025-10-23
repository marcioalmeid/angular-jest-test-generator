#!/bin/bash

# Script para criar pacote de distribuição completo
# Uso: ./scripts/distribute.sh [versão] [output-directory]

set -e

VERSION=${1:-$(node -p "require('./package.json').version")}
OUTPUT_DIR=${2:-"./dist"}

echo "📦 Criando pacote de distribuição..."
echo ""

# Verifica se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto"
    exit 1
fi

# Cria estrutura de diretórios
DIST_PATH="$OUTPUT_DIR/angular-jest-test-generator-$VERSION"
mkdir -p "$DIST_PATH"

echo "📋 Versão: $VERSION"
echo "📁 Destino: $DIST_PATH"
echo ""

# Cria tarball
echo "1️⃣  Criando tarball..."
./scripts/create-tarball.sh "$DIST_PATH"

# Copia documentação
echo "2️⃣  Copiando documentação..."
cp README.md "$DIST_PATH/"
cp LOCAL_INSTALL.md "$DIST_PATH/"
cp INSTALL.md "$DIST_PATH/"
cp LICENSE "$DIST_PATH/" 2>/dev/null || echo "   ⚠️  LICENSE não encontrado"

# Cria README de distribuição
echo "3️⃣  Criando README de distribuição..."
cat > "$DIST_PATH/README-DISTRIBUICAO.md" << EOF
# Angular Jest Test Generator - v$VERSION

## 📦 Instalação

### Opção 1: Instalar do tarball (Recomendado)

\`\`\`bash
npm install ./angular-tools-jest-test-generator-$VERSION.tgz
\`\`\`

### Opção 2: Extrair e instalar do diretório

\`\`\`bash
# Extrair tarball (se necessário)
tar -xzf angular-tools-jest-test-generator-$VERSION.tgz

# Instalar do diretório
npm install ./package
\`\`\`

## 🚀 Uso Rápido

\`\`\`bash
# Gerar teste para um arquivo
npx ng-test-gen src/app/seu-arquivo.ts

# Gerar testes para diretório
npx ng-test-gen src/app --all
\`\`\`

## 📚 Documentação

- **README.md** - Documentação completa do projeto
- **LOCAL_INSTALL.md** - Guia de instalação local detalhado
- **INSTALL.md** - Guia de instalação e configuração

## 🆘 Suporte

Se tiver problemas, consulte LOCAL_INSTALL.md seção "Troubleshooting".

---

Distribuído em: $(date +"%Y-%m-%d %H:%M:%S")
EOF

# Cria script de instalação rápida
echo "4️⃣  Criando script de instalação rápida..."
cat > "$DIST_PATH/quick-install.sh" << 'EOF'
#!/bin/bash
set -e

echo "🚀 Instalação Rápida - Angular Jest Test Generator"
echo ""

# Encontra o tarball
TARBALL=$(ls -t *.tgz | head -n1)

if [ -z "$TARBALL" ]; then
    echo "❌ Tarball não encontrado!"
    exit 1
fi

echo "📦 Tarball encontrado: $TARBALL"
echo ""

# Pergunta o caminho do projeto
read -p "📁 Caminho do projeto Angular: " PROJECT_PATH

if [ ! -d "$PROJECT_PATH" ]; then
    echo "❌ Diretório não encontrado!"
    exit 1
fi

echo ""
echo "📦 Instalando..."
cd "$PROJECT_PATH"
npm install "$OLDPWD/$TARBALL"

echo ""
echo "✅ Instalação concluída!"
echo ""
echo "🚀 Para usar:"
echo "   npx ng-test-gen src/app/seu-arquivo.ts"
echo ""
EOF
chmod +x "$DIST_PATH/quick-install.sh"

# Cria arquivo de checksum
echo "5️⃣  Criando checksums..."
cd "$DIST_PATH"
sha256sum *.tgz > checksums.txt 2>/dev/null || shasum -a 256 *.tgz > checksums.txt
cd - > /dev/null

# Cria arquivo ZIP para distribuição fácil
echo "6️⃣  Criando arquivo ZIP..."
cd "$OUTPUT_DIR"
ZIP_NAME="angular-jest-test-generator-$VERSION.zip"
zip -r "$ZIP_NAME" "angular-jest-test-generator-$VERSION" > /dev/null
cd - > /dev/null

echo ""
echo "✅ Pacote de distribuição criado com sucesso!"
echo ""
echo "📦 Conteúdo:"
echo "   ✓ Tarball npm"
echo "   ✓ Documentação completa"
echo "   ✓ Script de instalação rápida"
echo "   ✓ Checksums"
echo "   ✓ Arquivo ZIP"
echo ""
echo "📁 Localização:"
echo "   Diretório: $DIST_PATH"
echo "   ZIP: $OUTPUT_DIR/$ZIP_NAME"
echo ""
echo "📤 Tamanhos:"
echo "   Tarball: $(du -h "$DIST_PATH"/*.tgz | cut -f1)"
echo "   ZIP total: $(du -h "$OUTPUT_DIR/$ZIP_NAME" | cut -f1)"
echo ""
echo "📤 Para distribuir:"
echo "   1. Compartilhe o ZIP: $OUTPUT_DIR/$ZIP_NAME"
echo "   2. Ou apenas o tarball: $DIST_PATH/*.tgz"
echo ""
echo "📝 Instruções para instalação:"
echo "   Incluídas em: $DIST_PATH/README-DISTRIBUICAO.md"
echo ""


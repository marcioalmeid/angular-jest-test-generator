#!/bin/bash

# Script de teste para o dashboard
# Verifica se todos os componentes estão funcionando

set -e

echo "🧪 Testando Dashboard e Scripts..."
echo ""

PASSED=0
FAILED=0

# Função para testar
test_script() {
    local script_name=$1
    local description=$2
    
    echo -n "Testing $script_name... "
    
    if [ -f "$script_name" ]; then
        if [ -x "$script_name" ]; then
            echo "✅ PASS - $description"
            PASSED=$((PASSED + 1))
        else
            echo "⚠️  WARN - Não executável (será corrigido)"
            chmod +x "$script_name"
            PASSED=$((PASSED + 1))
        fi
    else
        echo "❌ FAIL - Arquivo não encontrado"
        FAILED=$((FAILED + 1))
    fi
}

# Função para testar arquivo
test_file() {
    local file_name=$1
    local description=$2
    
    echo -n "Testing $file_name... "
    
    if [ -f "$file_name" ]; then
        echo "✅ PASS - $description"
        PASSED=$((PASSED + 1))
    else
        echo "❌ FAIL - Arquivo não encontrado"
        FAILED=$((FAILED + 1))
    fi
}

# Mudar para raiz do projeto
if [ -f "../package.json" ]; then
    cd ..
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Testando Scripts Bash"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

test_script "scripts/install-local.sh" "Instalação local"
test_script "scripts/link-to-project.sh" "Link a projeto"
test_script "scripts/install-from-path.sh" "Instalação do caminho"
test_script "scripts/create-tarball.sh" "Criar tarball"
test_script "scripts/setup-project.sh" "Setup Jest"
test_script "scripts/distribute.sh" "Criar distribuição"
test_script "scripts/uninstall-local.sh" "Desinstalar"
test_script "scripts/dashboard.sh" "Dashboard terminal"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Testando Arquivos Web"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

test_file "scripts/dashboard.html" "Dashboard web"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Testando Documentação"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

test_file "scripts/README.md" "Scripts README"
test_file "scripts/DASHBOARD.md" "Dashboard docs"
test_file "LOCAL_INSTALL.md" "Guia instalação local"
test_file "QUICK_START_DASHBOARD.md" "Quick start"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Testando Sintaxe dos Scripts"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

for script in scripts/*.sh; do
    if [ -f "$script" ]; then
        echo -n "Checking syntax: $(basename $script)... "
        if bash -n "$script" 2>/dev/null; then
            echo "✅ PASS"
            PASSED=$((PASSED + 1))
        else
            echo "❌ FAIL - Erro de sintaxe"
            FAILED=$((FAILED + 1))
        fi
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Verificando Dependências"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Node
echo -n "Node.js... "
if command -v node &> /dev/null; then
    echo "✅ $(node --version)"
    PASSED=$((PASSED + 1))
else
    echo "❌ FAIL - Não instalado"
    FAILED=$((FAILED + 1))
fi

# npm
echo -n "npm... "
if command -v npm &> /dev/null; then
    echo "✅ $(npm --version)"
    PASSED=$((PASSED + 1))
else
    echo "❌ FAIL - Não instalado"
    FAILED=$((FAILED + 1))
fi

# Git
echo -n "Git... "
if command -v git &> /dev/null; then
    echo "✅ $(git --version | cut -d' ' -f3)"
    PASSED=$((PASSED + 1))
else
    echo "⚠️  WARN - Não instalado (opcional)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Resultado"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Passed: $PASSED"
echo "❌ Failed: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "🎉 Todos os testes passaram!"
    echo ""
    echo "🚀 Você pode usar:"
    echo "   ./scripts/dashboard.sh"
    echo "   open scripts/dashboard.html"
    exit 0
else
    echo "⚠️  Alguns testes falharam. Verifique os erros acima."
    exit 1
fi


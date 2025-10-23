# 🛠️ Scripts de Instalação

Scripts bash para facilitar a instalação e distribuição do Angular Jest Test Generator sem publicar no npm.

## 🎨 Dashboard Interativo

**Novidade!** Use o dashboard para gerenciar todos os scripts de forma fácil:

```bash
# Dashboard Terminal (Recomendado)
./scripts/dashboard.sh

# Dashboard Web
open scripts/dashboard.html
```

Veja [DASHBOARD.md](./DASHBOARD.md) para guia completo.

## 📋 Índice

- [Dashboard Interativo](#-dashboard-interativo)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Uso Rápido](#-uso-rápido)
- [Guia Detalhado](#-guia-detalhado)
- [Exemplos Práticos](#-exemplos-práticos)

## 🎯 Scripts Disponíveis

### 1. `install-local.sh`
Instala o gerador localmente usando `npm link`.

**Uso:**
```bash
./scripts/install-local.sh
```

**O que faz:**
- ✅ Verifica versões do Node/npm
- ✅ Instala dependências
- ✅ Cria link global
- ✅ Torna comandos `ng-test-gen` e `angular-test-generator` disponíveis globalmente

### 2. `link-to-project.sh`
Cria link do gerador em um projeto Angular específico.

**Uso:**
```bash
./scripts/link-to-project.sh /caminho/do/projeto
```

**O que faz:**
- ✅ Valida o projeto
- ✅ Remove links antigos
- ✅ Cria novo link
- ✅ Prepara projeto para usar o gerador

### 3. `install-from-path.sh`
Instala o gerador em um projeto usando caminho local.

**Uso:**
```bash
./scripts/install-from-path.sh /caminho/do/projeto
```

**O que faz:**
- ✅ Instala do caminho local
- ✅ Atualiza package.json automaticamente
- ✅ Mantém referência ao caminho do gerador

### 4. `create-tarball.sh`
Cria arquivo `.tgz` para distribuição.

**Uso:**
```bash
./scripts/create-tarball.sh [diretório-saída]
```

**O que faz:**
- ✅ Executa testes (se existirem)
- ✅ Cria tarball npm
- ✅ Move para diretório especificado
- ✅ Mostra tamanho e instruções

### 5. `setup-project.sh`
Configura Jest completo em um projeto Angular.

**Uso:**
```bash
./scripts/setup-project.sh /caminho/do/projeto
```

**O que faz:**
- ✅ Instala dependências Jest
- ✅ Cria `jest.config.js`
- ✅ Cria `setup-jest.ts`
- ✅ Configura `tsconfig.spec.json`
- ✅ Adiciona scripts ao `package.json`

### 6. `distribute.sh`
Cria pacote completo de distribuição.

**Uso:**
```bash
./scripts/distribute.sh [versão] [diretório-saída]
```

**O que faz:**
- ✅ Cria tarball
- ✅ Copia documentação
- ✅ Cria README de distribuição
- ✅ Cria script de instalação rápida
- ✅ Gera checksums
- ✅ Cria arquivo ZIP completo

### 7. `uninstall-local.sh`
Remove instalação local do gerador.

**Uso:**
```bash
./scripts/uninstall-local.sh
```

**O que faz:**
- ✅ Remove link global
- ✅ Limpa instalação

## 🚀 Uso Rápido

### Cenário 1: Desenvolvimento Local

```bash
# 1. Instalar gerador globalmente
cd /Users/marcio/Development/AAG/angular-jest-test-generator
./scripts/install-local.sh

# 2. Linkar a um projeto
./scripts/link-to-project.sh /caminho/do/projeto-angular

# 3. Usar!
cd /caminho/do/projeto-angular
ng-test-gen src/app/app.component.ts
```

### Cenário 2: Distribuir para Equipe

```bash
# 1. Criar pacote de distribuição
./scripts/distribute.sh 1.0.0 ./release

# 2. Compartilhar o ZIP
# Arquivo criado: ./release/angular-jest-test-generator-1.0.0.zip

# 3. Equipe instala
# Extrair ZIP e executar: ./quick-install.sh
```

### Cenário 3: Setup Completo em Projeto Novo

```bash
# 1. Configurar Jest no projeto
./scripts/setup-project.sh /novo/projeto-angular

# 2. Instalar gerador
./scripts/link-to-project.sh /novo/projeto-angular

# 3. Pronto para gerar testes!
cd /novo/projeto-angular
npm run generate:test src/app/app.component.ts
```

## 📖 Guia Detalhado

### Primeira Instalação (Uma Vez)

```bash
cd /Users/marcio/Development/AAG/angular-jest-test-generator

# Torna scripts executáveis
chmod +x scripts/*.sh

# Instala localmente
./scripts/install-local.sh
```

### Usar em Múltiplos Projetos

```bash
# Projeto 1
./scripts/link-to-project.sh ~/projects/app1

# Projeto 2
./scripts/link-to-project.sh ~/projects/app2

# Projeto 3
./scripts/link-to-project.sh ~/projects/app3

# Agora todos os projetos podem usar ng-test-gen
```

### Criar Distribuição para Compartilhar

```bash
# Criar pacote completo
./scripts/distribute.sh 1.0.0

# Isso cria:
# dist/angular-jest-test-generator-1.0.0/
#   ├── angular-tools-jest-test-generator-1.0.0.tgz
#   ├── README.md
#   ├── LOCAL_INSTALL.md
#   ├── INSTALL.md
#   ├── LICENSE
#   ├── README-DISTRIBUICAO.md
#   ├── quick-install.sh
#   └── checksums.txt
# dist/angular-jest-test-generator-1.0.0.zip
```

### Distribuir o Pacote

**Opção 1: ZIP Completo**
```bash
# Compartilhe o ZIP
cp dist/angular-jest-test-generator-1.0.0.zip /shared-folder/

# Usuário instala:
# 1. Extrair ZIP
# 2. Executar ./quick-install.sh
```

**Opção 2: Apenas Tarball**
```bash
# Compartilhe apenas o tarball
cp dist/angular-jest-test-generator-1.0.0/*.tgz /shared-folder/

# Usuário instala:
npm install /shared-folder/angular-tools-jest-test-generator-1.0.0.tgz
```

## 💡 Exemplos Práticos

### Exemplo 1: Setup Completo de Zero

```bash
#!/bin/bash
# setup-everything.sh

GENERATOR_PATH="/Users/marcio/Development/AAG/angular-jest-test-generator"
PROJECT_PATH="/Users/marcio/projects/my-angular-app"

# 1. Instalar gerador
cd "$GENERATOR_PATH"
./scripts/install-local.sh

# 2. Configurar Jest no projeto
./scripts/setup-project.sh "$PROJECT_PATH"

# 3. Linkar gerador ao projeto
./scripts/link-to-project.sh "$PROJECT_PATH"

# 4. Gerar primeiro teste
cd "$PROJECT_PATH"
ng-test-gen src/app/app.component.ts

# 5. Executar testes
npm test

echo "✅ Setup completo!"
```

### Exemplo 2: Atualizar Todos os Projetos

```bash
#!/bin/bash
# update-all-projects.sh

GENERATOR_PATH="/Users/marcio/Development/AAG/angular-jest-test-generator"
PROJECTS=(
    "/Users/marcio/projects/app1"
    "/Users/marcio/projects/app2"
    "/Users/marcio/projects/app3"
)

# Reinstalar gerador
cd "$GENERATOR_PATH"
./scripts/uninstall-local.sh
./scripts/install-local.sh

# Atualizar cada projeto
for PROJECT in "${PROJECTS[@]}"; do
    echo "📦 Atualizando: $PROJECT"
    ./scripts/link-to-project.sh "$PROJECT"
done

echo "✅ Todos os projetos atualizados!"
```

### Exemplo 3: Criar Release Mensal

```bash
#!/bin/bash
# monthly-release.sh

VERSION=$(date +"%Y.%m")
RELEASE_PATH="/shared/releases"

echo "📦 Criando release $VERSION"

# Criar distribuição
./scripts/distribute.sh "$VERSION" "$RELEASE_PATH"

# Enviar email para equipe (exemplo)
echo "Nova versão disponível: $VERSION" | mail -s "Angular Test Generator Update" team@example.com

echo "✅ Release criado em: $RELEASE_PATH/angular-jest-test-generator-$VERSION.zip"
```

### Exemplo 4: Verificar Instalação

```bash
#!/bin/bash
# check-installation.sh

echo "🔍 Verificando instalação..."
echo ""

# Verifica Node/npm
echo "📋 Versões:"
node --version
npm --version
echo ""

# Verifica se comando existe
if command -v ng-test-gen &> /dev/null; then
    echo "✅ ng-test-gen disponível"
    ng-test-gen --version 2>/dev/null || echo "   (versão não disponível)"
else
    echo "❌ ng-test-gen não encontrado"
fi

# Verifica links npm
echo ""
echo "🔗 Links npm globais:"
npm ls -g --depth=0 | grep jest-test-generator || echo "   Nenhum link encontrado"

echo ""
echo "📦 Instalações locais:"
find ~/projects -name "node_modules" -type d 2>/dev/null | while read dir; do
    if [ -d "$dir/@angular-tools/jest-test-generator" ]; then
        echo "   ✓ ${dir%/node_modules}"
    fi
done
```

## 🔧 Customização

### Adicionar Variáveis de Ambiente

Crie um arquivo `.env.scripts`:

```bash
# .env.scripts
GENERATOR_PATH="/Users/marcio/Development/AAG/angular-jest-test-generator"
DEFAULT_OUTPUT_DIR="./dist"
SHARED_FOLDER="/shared/tools"
```

Use nos scripts:

```bash
#!/bin/bash
source .env.scripts

./scripts/distribute.sh 1.0.0 "$DEFAULT_OUTPUT_DIR"
cp "$DEFAULT_OUTPUT_DIR"/*.zip "$SHARED_FOLDER/"
```

### Adicionar Hooks

Crie hooks personalizados:

```bash
# pre-distribute.sh
echo "🔍 Executando verificações..."
npm audit
npm test
eslint .
```

Chame no script principal:

```bash
# Em distribute.sh, adicione:
if [ -f "scripts/pre-distribute.sh" ]; then
    ./scripts/pre-distribute.sh
fi
```

## 🐛 Troubleshooting

### Erro: "Permission denied"

```bash
# Torne scripts executáveis
chmod +x scripts/*.sh
```

### Erro: "command not found"

```bash
# Verifique se o PATH está correto
echo $PATH

# Reinicie o terminal ou
source ~/.bashrc
# ou
source ~/.zshrc
```

### Link não funciona

```bash
# Remova e recrie
./scripts/uninstall-local.sh
./scripts/install-local.sh
```

### Tarball muito grande

```bash
# Verifique o que está incluído
tar -tzf arquivo.tgz | less

# Ajuste o campo "files" no package.json
```

## 📞 Suporte

Se precisar de ajuda:

1. Verifique os logs de erro
2. Execute `npm doctor`
3. Consulte [LOCAL_INSTALL.md](../LOCAL_INSTALL.md)

## 📝 Notas

- Scripts foram testados no macOS (bash)
- Devem funcionar no Linux sem modificações
- Windows: use Git Bash ou WSL

---

**Desenvolvido com ❤️ pela equipe AAG**


# 🔄 Exemplos de Workflows

Exemplos de como usar o Angular Jest Test Generator em diferentes cenários de workflow.

## 🚀 Workflow 1: Desenvolvimento Individual

```bash
# 1. Setup inicial (uma vez)
cd /Users/marcio/Development/AAG/angular-jest-test-generator
./scripts/dashboard.sh
# Escolha opção 8 (Setup Completo)
# Informe o caminho do projeto

# 2. Uso diário
cd /seu/projeto-angular
ng-test-gen src/app/novo-componente.component.ts
npm test

# 3. Atualizar gerador (quando houver mudanças)
cd /Users/marcio/Development/AAG/angular-jest-test-generator
git pull
npm install
```

## 👥 Workflow 2: Equipe Pequena (2-5 pessoas)

### Setup do Gerador (Uma vez, pessoa responsável)

```bash
# 1. Criar distribuição
cd /Users/marcio/Development/AAG/angular-jest-test-generator
./scripts/dashboard.sh
# Escolha opção 6 (Criar Distribuição)
# Versão: 1.0.0
# Output: ./release

# 2. Compartilhar
cp release/angular-jest-test-generator-1.0.0.zip /rede-compartilhada/
```

### Setup Individual (Cada membro da equipe)

```bash
# 1. Baixar e extrair
cd ~/Downloads
unzip angular-jest-test-generator-1.0.0.zip
cd angular-jest-test-generator-1.0.0

# 2. Instalar
./quick-install.sh
# Informar caminho do projeto

# 3. Usar
cd /seu/projeto
ng-test-gen src/app/**/*.ts
```

## 🏢 Workflow 3: Empresa/Múltiplos Times

### Setup do Registro Privado (DevOps/Infraestrutura)

```bash
# 1. Instalar Verdaccio
npm install -g verdaccio
verdaccio &

# 2. Configurar no gerador
cd /path/to/angular-jest-test-generator
npm set registry http://verdaccio-server:4873
npm publish

# 3. Voltar registro
npm set registry https://registry.npmjs.org
```

### Setup nos Projetos (Desenvolvedores)

```bash
# 1. Configurar registro no projeto
echo "@angular-tools:registry=http://verdaccio-server:4873" > .npmrc

# 2. Instalar
npm install --save-dev @angular-tools/jest-test-generator

# 3. Usar
npx ng-test-gen src/app/**/*.ts
```

## 🔄 Workflow 4: CI/CD com GitHub Actions

### `.github/workflows/test.yml`

```yaml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout projeto
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Instalar dependências
        run: npm ci
      
      - name: Instalar Test Generator
        run: |
          npm install git+https://github.com/your-org/angular-jest-test-generator.git
      
      - name: Gerar testes (apenas arquivos sem testes)
        run: |
          find src/app -name "*.ts" ! -name "*.spec.ts" | while read file; do
            if [ ! -f "${file%.ts}.spec.ts" ]; then
              npx ng-test-gen "$file"
            fi
          done
      
      - name: Executar testes
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

## 🔄 Workflow 5: Desenvolvimento com Hot Reload

```bash
# Terminal 1: Observar mudanças no gerador
cd /Users/marcio/Development/AAG/angular-jest-test-generator
npm link
# Faça alterações no código do gerador

# Terminal 2: Projeto Angular com gerador linkado
cd /seu/projeto-angular
npm link @angular-tools/jest-test-generator

# Mudanças no gerador são refletidas instantaneamente!
ng-test-gen src/app/test.component.ts
```

## 📦 Workflow 6: Release e Versionamento

### Processo de Release

```bash
# 1. Atualizar versão
cd /Users/marcio/Development/AAG/angular-jest-test-generator
npm version patch # ou minor, ou major

# 2. Criar distribuição
./scripts/distribute.sh $(node -p "require('./package.json').version")

# 3. Commit e tag
git add package.json
git commit -m "Release v$(node -p "require('./package.json').version")"
git tag "v$(node -p "require('./package.json').version")"
git push && git push --tags

# 4. Compartilhar
# Opção A: GitHub Release (manual via interface)
# Opção B: Rede compartilhada
cp dist/*.zip /rede-compartilhada/releases/

# Opção C: Email para equipe
```

### Changelog Automático

```bash
# Gerar changelog entre versões
git log v1.0.0..v1.1.0 --pretty=format:"- %s" > CHANGELOG.txt
```

## 🧪 Workflow 7: TDD (Test-Driven Development)

```bash
# 1. Criar componente/serviço vazio
ng generate component features/user-profile --skip-tests

# 2. Gerar teste base
ng-test-gen src/app/features/user-profile/user-profile.component.ts

# 3. Escrever testes primeiro
# Edite: user-profile.component.spec.ts
# Adicione testes específicos do seu caso

# 4. Implementar funcionalidade
# Edite: user-profile.component.ts

# 5. Executar testes em watch mode
npm run test:watch
```

## 🔍 Workflow 8: Code Review com Testes

### Pré-commit Hook

```bash
# .husky/pre-commit
#!/bin/sh

# Gerar testes para arquivos staged
for file in $(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(component|service|pipe|directive)\.ts$' | grep -v '\.spec\.ts$'); do
  if [ ! -f "${file%.ts}.spec.ts" ]; then
    echo "Gerando teste para $file"
    npx ng-test-gen "$file"
    git add "${file%.ts}.spec.ts"
  fi
done

# Executar testes
npm test
```

### PR Template

```markdown
## Checklist

- [ ] Testes gerados para novos arquivos
- [ ] Testes existentes atualizados
- [ ] Cobertura de testes mantida/melhorada
- [ ] `npm test` passa sem erros

## Arquivos testados

<!-- Gerados automaticamente -->
ng-test-gen src/app/new-feature/**/*.ts
```

## 📊 Workflow 9: Monitoramento de Cobertura

```bash
# Script: check-coverage.sh
#!/bin/bash

# Gerar testes para arquivos sem cobertura
npm run test:coverage -- --json --outputFile=coverage.json

# Analisar resultado
node << 'EOF'
const coverage = require('./coverage/coverage-summary.json');
const threshold = 80;

Object.entries(coverage).forEach(([file, data]) => {
  if (data.lines.pct < threshold) {
    console.log(`⚠️  ${file}: ${data.lines.pct}% (mínimo: ${threshold}%)`);
    // Regenerar testes com mais casos
    const sourceFile = file.replace('.spec.ts', '.ts');
    console.log(`   Sugestão: ng-test-gen ${sourceFile} --force`);
  }
});
EOF
```

## 🔄 Workflow 10: Migração de Projeto Existente

```bash
#!/bin/bash
# migrate-to-jest.sh

PROJECT_PATH="/caminho/do/projeto"
GENERATOR_PATH="/Users/marcio/Development/AAG/angular-jest-test-generator"

echo "🚀 Iniciando migração para Jest..."

# 1. Backup
echo "📦 Criando backup..."
tar -czf "$PROJECT_PATH-backup-$(date +%Y%m%d).tar.gz" "$PROJECT_PATH"

# 2. Remover Karma (opcional)
cd "$PROJECT_PATH"
npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter

# 3. Configurar Jest
cd "$GENERATOR_PATH"
./scripts/setup-project.sh "$PROJECT_PATH"

# 4. Gerar testes para todos os arquivos
cd "$PROJECT_PATH"
find src/app -name "*.ts" ! -name "*.spec.ts" ! -name "*.module.ts" | while read file; do
  echo "Processando: $file"
  ng-test-gen "$file"
done

# 5. Executar testes
npm test

echo "✅ Migração concluída!"
echo "📝 Revise os testes gerados e customize conforme necessário"
```

## 🎯 Resumo por Cenário

| Cenário | Melhor Abordagem | Complexidade |
|---------|------------------|--------------|
| **Dev Individual** | npm link + Dashboard | ⭐ Fácil |
| **Equipe Pequena** | Tarball compartilhado | ⭐⭐ Média |
| **Empresa** | Registro Privado | ⭐⭐⭐ Alta |
| **CI/CD** | Git URL | ⭐⭐ Média |
| **Hot Reload** | npm link | ⭐ Fácil |
| **Release** | Dashboard + Git Tags | ⭐⭐ Média |
| **TDD** | Link + Watch mode | ⭐ Fácil |
| **Migração** | Script automatizado | ⭐⭐⭐ Alta |

## 💡 Melhores Práticas

### ✅ DO

- Use o dashboard para operações comuns
- Versione seus scripts de instalação
- Documente o processo de instalação para sua equipe
- Mantenha backups antes de migrações
- Execute testes após gerar

### ❌ DON'T

- Não commite `node_modules`
- Não force-push alterações nos testes gerados
- Não ignore erros de instalação
- Não esqueça de atualizar o gerador

## 📚 Recursos Adicionais

- [Dashboard Guide](../scripts/DASHBOARD.md)
- [Installation Guide](../LOCAL_INSTALL.md)
- [Scripts Documentation](../scripts/README.md)

---

**💜 Desenvolvido com amor pela equipe AAG**


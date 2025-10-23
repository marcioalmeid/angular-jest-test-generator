# 📦 Instalação e Uso

## Instalação

### Instalação Global (Recomendado)

```bash
npm install -g @angular-tools/jest-test-generator
```

Após instalação global, use em qualquer projeto:

```bash
cd seu-projeto-angular
ng-test-gen src/app/seu-componente.component.ts
```

### Instalação Local no Projeto

```bash
npm install --save-dev @angular-tools/jest-test-generator
```

Adicione ao `package.json`:

```json
{
  "scripts": {
    "generate:test": "ng-test-gen"
  }
}
```

Use no projeto:

```bash
npm run generate:test src/app/seu-componente.component.ts
```

### Instalação via npx (Sem Instalação)

```bash
npx @angular-tools/jest-test-generator src/app/seu-arquivo.ts
```

## Configuração Inicial do Projeto

### 1. Instalar Dependências Jest

```bash
npm install --save-dev jest jest-preset-angular @types/jest
```

### 2. Criar `jest.config.js`

```javascript
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.spec.ts',
    '!src/app/**/*.module.ts',
  ],
};
```

### 3. Criar `setup-jest.ts`

```typescript
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();
```

### 4. Atualizar `package.json`

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### 5. Atualizar `tsconfig.spec.json`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jest", "node"],
    "esModuleInterop": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

## Uso

### Comandos Disponíveis

```bash
# Gerar teste para um arquivo
ng-test-gen src/app/services/user.service.ts

# Gerar testes para diretório inteiro
ng-test-gen src/app --all

# Sobrescrever testes existentes
ng-test-gen src/app/component.ts --force

# Usando npx (sem instalação global)
npx @angular-tools/jest-test-generator src/app/arquivo.ts

# Usando script do package.json
npm run generate:test src/app/arquivo.ts
```

### Exemplos Práticos

#### Componente

```bash
ng-test-gen src/app/components/user-profile/user-profile.component.ts
```

Gera teste com:
- Setup do TestBed
- Testes de criação
- Testes de @Input() e @Output()
- Testes de lifecycle hooks
- Testes de métodos públicos

#### Serviço

```bash
ng-test-gen src/app/services/api.service.ts
```

Gera teste com:
- Injeção de dependências
- Mocks de dependências
- Testes de todos os métodos
- Testes de cenários de erro

#### Processar Múltiplos Arquivos

```bash
# Todo o diretório app
ng-test-gen src/app --all

# Apenas services
ng-test-gen src/app/services --all

# Feature específica
ng-test-gen src/app/features/user --all
```

## Integração com CI/CD

### GitHub Actions

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Generate Tests
        run: npx @angular-tools/jest-test-generator src/app --all
      
      - name: Run Tests
        run: npm test -- --coverage
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
```

### GitLab CI

```yaml
test:
  image: node:18
  script:
    - npm ci
    - npx @angular-tools/jest-test-generator src/app --all
    - npm test -- --coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
```

## Integração com VSCode

Adicione ao `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Generate Test",
      "type": "shell",
      "command": "ng-test-gen",
      "args": ["${file}"],
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}
```

Adicione atalho em `.vscode/keybindings.json`:

```json
[
  {
    "key": "ctrl+shift+t",
    "command": "workbench.action.tasks.runTask",
    "args": "Generate Test"
  }
]
```

## Configuração Avançada

### Criar Arquivo de Configuração

Crie `.testgenrc.json` na raiz do projeto:

```json
{
  "templatePath": "./custom-templates",
  "mockStrategy": "smart",
  "outputPath": "same",
  "testFramework": "jest",
  "coverage": {
    "threshold": 80
  }
}
```

### Customizar Templates

```bash
# Copie os templates padrão
cp -r node_modules/@angular-tools/jest-test-generator/templates ./custom-templates

# Edite conforme necessário
# Atualize .testgenrc.json para apontar para custom-templates
```

## Troubleshooting

### Erro: "ts-morph não encontrado"

```bash
npm install --save-dev ts-morph
```

### Erro: "tsconfig.json não encontrado"

Certifique-se de estar na raiz do projeto Angular com `tsconfig.json`.

### Testes não executam

Verifique se Jest está configurado:

```bash
npm test -- --version
```

### Mocks não funcionam

Verifique se as dependências estão mockadas no `beforeEach`.

## Suporte

- 📖 Documentação: [GitHub Wiki](https://github.com/your-org/angular-jest-test-generator/wiki)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/angular-jest-test-generator/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/your-org/angular-jest-test-generator/discussions)

## Atualizações

```bash
# Global
npm update -g @angular-tools/jest-test-generator

# Local
npm update @angular-tools/jest-test-generator
```

## Licença

MIT © AAG Development Team


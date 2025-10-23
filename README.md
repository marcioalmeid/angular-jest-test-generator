# 🧪 Angular Jest Test Generator

### Requirement
npm install -D jest @types/jest ts-jest


[![npm version](https://img.shields.io/npm/v/@angular-tools/jest-test-generator.svg)](https://www.npmjs.com/package/@angular-tools/jest-test-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg)](https://nodejs.org/)
[![Angular](https://img.shields.io/badge/Angular-14%20to%2018-red.svg)](https://angular.io/)
[![Angular 17](https://img.shields.io/badge/Angular%2017-✅%20Compatible-success.svg)](./COMPATIBILITY.md)

Sistema automatizado e inteligente para geração de testes unitários em projetos Angular, utilizando análise estática de código com **ts-morph** para máxima precisão.

**Gere testes Jest completos e funcionais em menos de 1 segundo!** ⚡

✅ **Compatível com Angular 14, 15, 16, 17 e 18** - Incluindo Standalone Components, Signals e Control Flow!

## 🎨 Dashboard Interativo

Use o dashboard para facilitar todas as operações:

```bash
# Dashboard Terminal (Recomendado)
./scripts/dashboard.sh

# Dashboard Web
open scripts/dashboard.html
```

📖 [Guia do Dashboard](./scripts/DASHBOARD.md) | [Quick Start](./QUICK_START_DASHBOARD.md) | [Compatibilidade Angular 17](./COMPATIBILITY.md)

## 🚀 Quick Start

```bash
# Instalar globalmente
npm install -g @angular-tools/jest-test-generator

# Usar em qualquer projeto Angular
cd seu-projeto-angular
ng-test-gen src/app/seu-componente.component.ts

# Executar os testes
npm test
```

## 📋 Índice

- [Dashboard Interativo](#-dashboard-interativo)
- [Características](#-características)
- [Compatibilidade](#-compatibilidade)
- [Instalação](#-instalação)
- [Uso Básico](#-uso-básico)
- [Exemplos](#-exemplos)
- [Arquitetura](#-arquitetura)
- [Personalização](#-personalização)
- [Boas Práticas](#-boas-práticas)
- [API](#-api)
- [Contribuindo](#-contribuindo)

## ✨ Características

### 🎯 Análise Inteligente com ts-morph

- **Análise AST precisa**: Usa ts-morph para análise sintática perfeita
- **Inferência de tipos**: Detecta tipos TypeScript automaticamente
- **Detecção de decorators**: Identifica @Component, @Injectable, @Input, @Output, etc.
- **Análise de dependências**: Extrai dependências do construtor com tipos corretos

### 🔧 Geração Automática

- **Componentes**: Testes completos incluindo lifecycle hooks, inputs/outputs
- **Serviços**: Testes de métodos, dependências e estados
- **Pipes**: Testes de transformação e casos edge
- **Diretivas**: Testes de comportamento e manipulação DOM

### 📦 Componentização

- **Templates modulares**: Cada tipo de teste em seu próprio template
- **Mocks inteligentes**: Geração automática de mocks para dependências
- **Formatação consistente**: Código formatado seguindo padrões TypeScript

### 🚀 Facilidade de Uso

- **Dashboard Interativo**: Terminal e Web para gerenciar instalação
- **CLI intuitivo**: Interface de linha de comando amigável
- **Processamento em lote**: Gera testes para múltiplos arquivos
- **Feedback visual**: Output colorido com informações detalhadas

## 🔄 Compatibilidade

### Versões Suportadas

| Angular | TypeScript | Jest | Status |
|---------|------------|------|--------|
| **17.x** | 5.x | 29.x | ✅ **Totalmente compatível** |
| 18.x | 5.x | 29.x | ✅ Compatível |
| 16.x | 4.9.x | 29.x | ✅ Compatível |
| 15.x | 4.8.x | 29.x | ✅ Compatível |
| 14.x | 4.8.x | 29.x | ✅ Versão mínima |

### Features Angular 17 Suportadas

- ✅ Standalone Components
- ✅ Signals (básico - customize conforme necessário)
- ✅ Control Flow (@if, @for, @switch)
- ✅ Input/Output com signals
- ✅ inject() function
- ✅ ViewChild/ViewChildren required

📖 **Guia completo:** [COMPATIBILITY.md](./COMPATIBILITY.md)

## 📦 Instalação

### Instalação Global (Recomendado)

```bash
npm install -g @angular-tools/jest-test-generator
```

### Instalação no Projeto

```bash
npm install --save-dev @angular-tools/jest-test-generator
```

### Usar sem Instalação (npx)

```bash
npx @angular-tools/jest-test-generator src/app/seu-arquivo.ts
```

### Configuração Inicial

Veja o guia completo de instalação: [INSTALL.md](./INSTALL.md)

Resumo rápido:

```bash
# 1. Instalar Jest
npm install --save-dev jest jest-preset-angular @types/jest

# 2. Criar arquivos de configuração
# - jest.config.js
# - setup-jest.ts
# - tsconfig.spec.json

# 3. Adicionar scripts ao package.json
```

Consulte [INSTALL.md](./INSTALL.md) para instruções detalhadas.

## 🎯 Uso Básico

### Gerar Teste para um Arquivo

```bash
npm run generate:test src/app/app.component.ts
```

ou

```bash
node test-generator/index.js src/app/app.component.ts
```

### Gerar Testes para Múltiplos Arquivos

```bash
npm run generate:test src/app --all
```

### Executar Testes

```bash
# Executa todos os testes
npm test

# Executa em modo watch
npm run test:watch

# Gera relatório de cobertura
npm run test:coverage
```

## 📚 Exemplos

### Exemplo 1: Gerar Teste de Componente

**Comando:**
```bash
npm run generate:test src/app/app.component.ts
```

**Resultado:** Cria `src/app/app.component.spec.ts` com:

```typescript
/**
 * Teste gerado automaticamente
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MjmlService } from './mjml.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockMjmlService: jest.Mocked<MjmlService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: MjmlService,
          useValue: createMockMjmlService()
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockMjmlService = TestBed.inject(MjmlService) as jest.Mocked<MjmlService>;
    fixture.detectChanges();
  });

  describe('Criação do Componente', () => {
    it('deve criar o componente com sucesso', () => {
      expect(component).toBeTruthy();
    });
    
    // ... mais testes
  });

  describe('ngOnInit', () => {
    it('deve executar a inicialização corretamente', () => {
      const spy = jest.spyOn(component, 'ngOnInit');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Métodos', () => {
    it('deve executar convertMjml() corretamente', () => {
      component.convertMjml();
      expect(component.jsonOutput).toBeDefined();
    });
  });
});
```

### Exemplo 2: Gerar Teste de Serviço

**Comando:**
```bash
npm run generate:test src/app/mjml.service.ts
```

**Resultado:** Cria `src/app/mjml.service.spec.ts` com testes completos de todos os métodos públicos.

### Exemplo 3: Processar Diretório Inteiro

**Comando:**
```bash
npm run generate:test src/app --all
```

**Resultado:**
```
🧪 Gerador de Testes Jest para Angular 🧪

📁 Processando diretório: src/app

📝 Analisando: src/app/app.component.ts
   Tipo detectado: COMPONENT
✅ Teste gerado com sucesso: src/app/app.component.spec.ts
   Classes: AppComponent
   Métodos encontrados: 4

📝 Analisando: src/app/mjml.service.ts
   Tipo detectado: SERVICE
✅ Teste gerado com sucesso: src/app/mjml.service.spec.ts
   Classes: MjmlService
   Métodos encontrados: 5

═══════════════════════════════════════════════════
✅ Resumo:
   Arquivos processados: 2
   Testes gerados: 2
═══════════════════════════════════════════════════
```

## 🏗️ Arquitetura

### Estrutura de Diretórios

```
test-generator/
├── index.js                  # CLI principal
├── README.md                 # Esta documentação
├── utils/
│   ├── code-analyzer.js      # Análise de código com ts-morph
│   ├── mock-generator.js     # Geração de mocks
│   └── formatter.js          # Formatação de código
└── templates/
    ├── component.template.js # Template para componentes
    ├── service.template.js   # Template para serviços
    ├── pipe.template.js      # Template para pipes
    └── directive.template.js # Template para diretivas
```

### Fluxo de Processamento

```
┌─────────────────┐
│  Arquivo .ts    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  code-analyzer  │ ◄── ts-morph (AST parsing)
│  (ts-morph)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Informações   │
│   Extraídas     │
│  - Classe       │
│  - Métodos      │
│  - Dependências │
│  - Decorators   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Template       │
│  Específico     │
│  (component,    │
│   service, etc) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  mock-generator │
│  (mocks auto)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Formatter     │
│  (formatação)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Arquivo .spec.ts│
└─────────────────┘
```

### Componentes Principais

#### 1. Code Analyzer (`code-analyzer.js`)

Usa **ts-morph** para análise profunda:

```javascript
const { Project } = require('ts-morph');

function analyzeFile(filePath) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);
  
  // Extrai informações usando AST
  return {
    className: extractClassName(sourceFile),
    methods: extractMethods(sourceFile),
    dependencies: extractDependencies(sourceFile),
    // ... muito mais
  };
}
```

**Extrai:**
- ✅ Classes e seus decorators
- ✅ Métodos com parâmetros e tipos de retorno
- ✅ Propriedades com decorators (@Input, @Output)
- ✅ Dependências do construtor
- ✅ Interfaces implementadas
- ✅ ViewChild/ViewChildren
- ✅ HostBindings
- ✅ Complexidade ciclomática

#### 2. Templates (`templates/*.template.js`)

Cada tipo de arquivo Angular tem seu template específico:

- **component.template.js**: Testes de lifecycle, inputs/outputs, métodos
- **service.template.js**: Testes de métodos, dependências, estados
- **pipe.template.js**: Testes de transformação, casos edge, performance
- **directive.template.js**: Testes de comportamento DOM, eventos

#### 3. Mock Generator (`mock-generator.js`)

Gera mocks inteligentes baseados nos tipos:

```javascript
// Detecta HttpClient e gera mock apropriado
if (type.includes('Http')) {
  return {
    get: jest.fn().mockReturnValue(of({})),
    post: jest.fn().mockReturnValue(of({})),
  };
}

// Detecta Observable e retorna mock RxJS
if (returnType.includes('Observable')) {
  return jest.fn().mockReturnValue(of({}));
}
```

## 🎨 Personalização

### Modificar Templates

Edite os arquivos em `test-generator/templates/`:

```javascript
// test-generator/templates/component.template.js

function generateCustomTest(analysis) {
  return `
    // Adicione seus testes customizados aqui
    it('meu teste específico', () => {
      // ...
    });
  `;
}
```

### Adicionar Novos Tipos de Análise

Estenda o `code-analyzer.js`:

```javascript
function extractCustomInfo(classDeclaration) {
  // Sua lógica customizada usando ts-morph
  return customData;
}
```

### Configurar Mocks Específicos

Edite `mock-generator.js` para suas dependências:

```javascript
function createCustomMock(dependency) {
  if (dependency.type === 'MyCustomService') {
    return {
      provide: MyCustomService,
      useValue: {
        myMethod: jest.fn().mockReturnValue(customValue),
      }
    };
  }
}
```

## 💡 Boas Práticas

### 1. Revise os Testes Gerados

Os testes gerados são um **ponto de partida**. Sempre revise e customize:

```typescript
// ❌ Não deixe TODOs sem resolver
// TODO: Adicionar asserções específicas

// ✅ Complete com suas asserções
expect(result.data).toEqual(expectedData);
expect(result.status).toBe('success');
```

### 2. Use o Padrão AAA (Arrange-Act-Assert)

Os testes gerados já seguem este padrão:

```typescript
it('deve fazer algo', () => {
  // Arrange - Prepara o cenário
  const input = 'test';
  
  // Act - Executa a ação
  const result = service.doSomething(input);
  
  // Assert - Verifica o resultado
  expect(result).toBeDefined();
});
```

### 3. Complete Testes de Edge Cases

```typescript
// Testes gerados incluem estrutura básica
it('deve tratar valores null/undefined', () => {
  // Complete com lógica específica do seu app
  expect(() => pipe.transform(null)).not.toThrow();
  expect(pipe.transform(null)).toBe('valor-padrao');
});
```

### 4. Teste Comportamento, Não Implementação

```typescript
// ❌ Evite testar detalhes de implementação
expect(component['privateMethod']).toHaveBeenCalled();

// ✅ Teste o comportamento público
expect(component.output).toEqual(expectedOutput);
```

### 5. Mantenha Testes Independentes

```typescript
// Cada teste deve ser independente
beforeEach(() => {
  // Reset do estado antes de cada teste
  component = new Component();
  mockService.reset();
});
```

## 🔍 Análise Detalhada com ts-morph

### Vantagens do ts-morph

1. **Precisão**: AST parsing ao invés de regex
2. **Tipos**: Inferência completa de tipos TypeScript
3. **Contexto**: Entende o código em seu contexto completo
4. **Manutenibilidade**: Menos propenso a erros

### Exemplo de Análise

Para este código:

```typescript
@Component({
  selector: 'app-user',
  template: './user.component.html'
})
export class UserComponent implements OnInit {
  @Input() userId!: number;
  @Output() userLoaded = new EventEmitter<User>();
  
  constructor(private userService: UserService) {}
  
  async ngOnInit(): Promise<void> {
    const user = await this.userService.getUser(this.userId);
    this.userLoaded.emit(user);
  }
}
```

**ts-morph extrai:**

```javascript
{
  className: 'UserComponent',
  isComponent: true,
  inputProperties: [
    { name: 'userId', type: 'number', required: true }
  ],
  outputProperties: [
    { name: 'userLoaded', type: 'EventEmitter<User>' }
  ],
  dependencies: [
    { name: 'userService', type: 'UserService', visibility: 'private' }
  ],
  methods: [
    {
      name: 'ngOnInit',
      returnType: 'Promise<void>',
      isAsync: true,
      complexity: 1
    }
  ],
  interfaces: ['OnInit']
}
```

## 🐛 Troubleshooting

### Erro: "Nenhuma classe encontrada no arquivo"

**Solução**: Verifique se o arquivo contém uma classe exportada.

### Erro: "tsconfig.json não encontrado"

**Solução**: Execute o comando a partir do diretório raiz do projeto.

### Testes não executam

**Solução**: Verifique se o Jest está configurado:
```bash
npm test -- --version
```

### Mocks não funcionam

**Solução**: Verifique se as dependências estão mockadas corretamente no `beforeEach`.

## 📝 TODO Futuro

- [ ] Suporte para Guards
- [ ] Suporte para Interceptors
- [ ] Integração com CI/CD
- [ ] Geração de testes E2E
- [ ] Interface Web
- [ ] Plugins customizáveis

## 🤝 Contribuindo

Para adicionar novas funcionalidades:

1. Edite o `code-analyzer.js` para extrair novas informações
2. Atualize os templates correspondentes
3. Adicione exemplos nesta documentação
4. Teste com casos reais

## 📄 Licença

Este projeto é parte do sistema MJML UI.

---

**Desenvolvido com ❤️ e ts-morph**


# 📖 Guia de Uso

## Instalação

```bash
npm install -g @angular-tools/jest-test-generator
```

## Comandos

### Sintaxe Básica

```bash
ng-test-gen <arquivo-ou-diretorio> [opções]
```

### Opções

- `--all` - Processar todos os arquivos no diretório
- `--force` - Sobrescrever testes existentes
- `--help` - Mostrar ajuda
- `--version` - Mostrar versão

## Exemplos de Uso

### 1. Gerar Teste de Componente

```bash
ng-test-gen src/app/components/user-card/user-card.component.ts
```

**Resultado:**
```
✅ Teste gerado: src/app/components/user-card/user-card.component.spec.ts
```

O teste incluirá:
- Setup do TestBed
- Teste de criação
- Testes de @Input() e @Output()
- Testes de lifecycle hooks (ngOnInit, ngOnDestroy, etc.)
- Testes de métodos públicos
- Testes de propriedades

### 2. Gerar Teste de Serviço

```bash
ng-test-gen src/app/services/user.service.ts
```

**Resultado:**
```
✅ Teste gerado: src/app/services/user.service.spec.ts
```

O teste incluirá:
- Setup do TestBed
- Mocks de dependências
- Testes de injeção
- Testes de todos os métodos
- Testes de cenários de erro

### 3. Gerar Teste de Pipe

```bash
ng-test-gen src/app/pipes/currency-format.pipe.ts
```

**Resultado:**
```
✅ Teste gerado: src/app/pipes/currency-format.pipe.spec.ts
```

O teste incluirá:
- Teste de transformação
- Testes de valores null/undefined
- Testes de casos edge
- Testes de performance

### 4. Gerar Teste de Diretiva

```bash
ng-test-gen src/app/directives/highlight.directive.ts
```

**Resultado:**
```
✅ Teste gerado: src/app/directives/highlight.directive.spec.ts
```

O teste incluirá:
- Componente de teste
- Testes de aplicação da diretiva
- Testes de eventos
- Testes de manipulação DOM

### 5. Processar Diretório Inteiro

```bash
ng-test-gen src/app/components --all
```

**Resultado:**
```
📁 Processando diretório: src/app/components

✅ user-card.component.spec.ts gerado
✅ product-list.component.spec.ts gerado
✅ navigation.component.spec.ts gerado

═══════════════════════════════════════
Arquivos processados: 3
Testes gerados: 3
═══════════════════════════════════════
```

### 6. Processar Todo o Projeto

```bash
ng-test-gen src/app --all
```

Isso gerará testes para **todos** os arquivos TypeScript (exceto .spec.ts).

### 7. Sobrescrever Testes Existentes

```bash
ng-test-gen src/app/user.service.ts --force
```

Use `--force` quando quiser regenerar um teste que já existe.

## Fluxo de Trabalho Típico

### Desenvolvimento de Nova Feature

```bash
# 1. Criar componente
ng generate component features/dashboard

# 2. Implementar lógica
# Editar dashboard.component.ts

# 3. Gerar teste
ng-test-gen src/app/features/dashboard/dashboard.component.ts

# 4. Customizar teste
# Editar dashboard.component.spec.ts
# - Completar TODOs
# - Adicionar casos específicos

# 5. Executar testes
npm test dashboard

# 6. Ver cobertura
npm run test:coverage
```

### Projeto Existente Sem Testes

```bash
# 1. Configurar Jest (ver INSTALL.md)
npm install --save-dev jest jest-preset-angular @types/jest

# 2. Gerar todos os testes
ng-test-gen src/app --all

# 3. Revisar testes gerados
# Cada arquivo .spec.ts criado

# 4. Completar TODOs
# Procurar por "// TODO:" nos arquivos

# 5. Executar testes
npm test

# 6. Ajustar testes que falharam
# Corrigir mocks ou lógica

# 7. Commit
git add .
git commit -m "test: adiciona testes unitários"
```

## Customização

### Completar TODOs

Os testes gerados incluem comentários TODO:

```typescript
it('deve executar método', () => {
  // Arrange
  const input = 'test';
  
  // Act
  const result = service.doSomething(input);
  
  // Assert
  expect(result).toBeDefined();
  // TODO: Validar o resultado específico do método
});
```

**Complete com:**

```typescript
  expect(result).toBeDefined();
  expect(result.data).toEqual(expectedData);
  expect(result.success).toBe(true);
```

### Adicionar Testes Específicos

Adicione seus próprios testes aos blocos describe:

```typescript
describe('UserService', () => {
  // ... testes gerados ...
  
  describe('Regras de Negócio', () => {
    it('deve validar CPF', () => {
      const validCPF = '123.456.789-00';
      expect(service.validateCPF(validCPF)).toBe(true);
    });
    
    it('deve rejeitar CPF inválido', () => {
      const invalidCPF = '000.000.000-00';
      expect(service.validateCPF(invalidCPF)).toBe(false);
    });
  });
});
```

## Integrações

### VSCode

**Atalho de teclado:**

Adicione ao `.vscode/keybindings.json`:

```json
[
  {
    "key": "ctrl+shift+t",
    "command": "workbench.action.terminal.sendSequence",
    "args": {
      "text": "ng-test-gen ${file}\n"
    }
  }
]
```

**Task:**

Adicione ao `.vscode/tasks.json`:

```json
{
  "label": "Generate Test",
  "type": "shell",
  "command": "ng-test-gen ${file}"
}
```

### Git Hooks

**Pre-commit (com Husky):**

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test"
    }
  }
}
```

### CI/CD

**GitHub Actions:**

```yaml
- name: Generate Tests
  run: ng-test-gen src/app --all
  
- name: Run Tests
  run: npm test -- --coverage
```

## Exemplos Práticos

### E-commerce

```bash
# Produtos
ng-test-gen src/app/services/product.service.ts
ng-test-gen src/app/components/product-card
ng-test-gen src/app/pipes/price-format.pipe.ts

# Carrinho
ng-test-gen src/app/services/cart.service.ts
ng-test-gen src/app/components/cart

# Checkout
ng-test-gen src/app/components/checkout
ng-test-gen src/app/services/payment.service.ts
```

### Dashboard Admin

```bash
# Autenticação
ng-test-gen src/app/services/auth.service.ts
ng-test-gen src/app/guards/auth.guard.ts

# Dashboard
ng-test-gen src/app/components/dashboard
ng-test-gen src/app/services/analytics.service.ts

# Usuários
ng-test-gen src/app/components/user-management
ng-test-gen src/app/services/user.service.ts
```

## Troubleshooting

### "Arquivo já existe"

```bash
ng-test-gen arquivo.ts --force
```

### "Classe não encontrada"

Certifique-se de que o arquivo tem uma classe exportada:

```typescript
export class MyComponent { }
```

### "tsconfig.json não encontrado"

Execute o comando da raiz do projeto Angular.

### Testes não passam

1. Revise mocks no `beforeEach`
2. Complete TODOs com lógica específica
3. Ajuste valores de teste conforme necessário

## Dicas

✅ **Sempre revise** os testes gerados  
✅ **Complete TODOs** com lógica específica  
✅ **Adicione casos edge** relevantes ao seu domínio  
✅ **Execute testes** após gerar: `npm test`  
✅ **Verifique cobertura**: `npm run test:coverage`  
✅ **Commit testes** junto com código  

## Recursos

- [Documentação Completa](./README.md)
- [Instalação](./INSTALL.md)
- [Contribuindo](./CONTRIBUTING.md)
- [Publicação](./PUBLISH.md)

---

**Happy Testing! 🧪**


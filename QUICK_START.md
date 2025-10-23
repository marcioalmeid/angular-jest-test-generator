# 🚀 Guia Rápido - Gerador de Testes Jest

## ⚡ Instalação em 3 Passos

### 1. Instalar Dependências

```bash
cd mjml_test
npm install
```

### 2. Gerar Seu Primeiro Teste

```bash
npm run generate:test src/app/mjml.service.ts
```

### 3. Executar os Testes

```bash
npm test
```

---

## 📝 Comandos Essenciais

### Gerar Testes

```bash
# Um arquivo
npm run generate:test src/app/app.component.ts

# Diretório inteiro
npm run generate:test src/app --all

# Sobrescrever existentes
npm run generate:test src/app/app.component.ts --force
```

### Executar Testes

```bash
# Todos os testes
npm test

# Modo watch (re-executa ao salvar)
npm run test:watch

# Com cobertura
npm run test:coverage

# Arquivo específico
npm test app.component.spec.ts
```

---

## 🎯 Casos de Uso Comuns

### Cenário 1: Novo Componente

```bash
# 1. Crie seu componente
ng generate component meu-componente

# 2. Gere o teste
npm run generate:test src/app/meu-componente/meu-componente.component.ts

# 3. Execute o teste
npm test meu-componente
```

### Cenário 2: Serviço Existente Sem Testes

```bash
# Gere o teste
npm run generate:test src/app/services/meu-servico.service.ts

# Execute
npm test meu-servico
```

### Cenário 3: Migração de Projeto Completo

```bash
# Gere todos os testes
npm run generate:test src/app --all

# Verifique cobertura
npm run test:coverage

# Abra relatório HTML
open coverage/index.html
```

---

## ✅ Checklist Pós-Geração

Após gerar os testes, faça:

- [ ] Revise os testes gerados
- [ ] Complete os `// TODO:` com lógica específica
- [ ] Adicione casos edge específicos do seu domínio
- [ ] Execute os testes: `npm test`
- [ ] Verifique cobertura: `npm run test:coverage`
- [ ] Commit os testes junto com o código

---

## 🎨 Customização Rápida

### Adicionar Mock Customizado

Edite: `test-generator/utils/mock-generator.js`

```javascript
if (dependency.type === 'MeuServico') {
  return {
    provide: MeuServico,
    useValue: {
      meuMetodo: jest.fn().mockReturnValue(of(mockData))
    }
  };
}
```

### Modificar Template de Componente

Edite: `test-generator/templates/component.template.js`

```javascript
function generateCustomTest(analysis) {
  return `
    it('meu teste específico', () => {
      // seu código aqui
    });
  `;
}
```

---

## 🐛 Problemas Comuns

### "Nenhuma classe encontrada"

**Problema**: Arquivo não contém classe exportada

**Solução**: Verifique se o arquivo tem `export class`

### Testes não executam

**Problema**: Jest não configurado

**Solução**:
```bash
npm install --save-dev jest jest-preset-angular @types/jest
```

### Mocks não funcionam

**Problema**: Dependências não mockadas

**Solução**: Verifique o `beforeEach` e adicione mocks manualmente se necessário

### Erro de TypeScript

**Problema**: Imports incorretos

**Solução**: Ajuste os imports no arquivo `.spec.ts` gerado

---

## 📊 Entendendo a Saída

### Ao Gerar Testes

```bash
🧪 Gerador de Testes Jest para Angular 🧪

📝 Analisando: src/app/app.component.ts
   Tipo detectado: COMPONENT
✅ Teste gerado: src/app/app.component.spec.ts
   Classes: AppComponent
   Métodos encontrados: 4
```

### Ao Executar Testes

```bash
PASS  src/app/app.component.spec.ts
  AppComponent
    ✓ deve criar o componente (45ms)
    ✓ deve ter título definido (12ms)
    ✓ deve executar ngOnInit (8ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Time:        2.5s
```

### Cobertura

```bash
----------------------|---------|----------|---------|---------|
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |   85.5  |   72.0   |   88.0  |   85.5  |
 app.component.ts     |   90.0  |   75.0   |   100   |   90.0  |
 mjml.service.ts      |   81.0  |   69.0   |   76.0  |   81.0  |
----------------------|---------|----------|---------|---------|
```

**Meta**: Manter acima de 80% em todas as métricas

---

## 💡 Dicas Pro

### 1. Use Watch Mode no Desenvolvimento

```bash
npm run test:watch
```

Testes re-executam automaticamente ao salvar arquivos.

### 2. Foque em Arquivos Específicos

```bash
npm test -- --testPathPattern=component
```

Executa apenas testes de componentes.

### 3. Debug com VSCode

Adicione ao `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal"
}
```

### 4. CI/CD Integration

```yaml
# .github/workflows/test.yml
- name: Run Tests
  run: |
    npm install
    npm run generate:test src/app --all
    npm test -- --coverage
```

---

## 📚 Próximos Passos

1. **Leia a documentação completa**: `test-generator/README.md`
2. **Veja os exemplos**: `test-generator/examples/EXAMPLES.md`
3. **Pratique**: Gere testes para seus componentes
4. **Customize**: Ajuste templates conforme sua necessidade

---

## 🆘 Precisa de Ajuda?

- 📖 **Documentação completa**: `test-generator/README.md`
- 📝 **Exemplos práticos**: `test-generator/examples/`
- 🐛 **Issues**: Verifique os problemas comuns acima

---

**Desenvolvido com ❤️ usando ts-morph para análise precisa de código**

**Tempo médio para gerar um teste**: < 1 segundo ⚡


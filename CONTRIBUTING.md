# 🤝 Contribuindo para Angular Jest Test Generator

Agradecemos seu interesse em contribuir! Este documento fornece diretrizes para contribuições.

## 🎯 Formas de Contribuir

- 🐛 Reportar bugs
- 💡 Sugerir novas funcionalidades
- 📝 Melhorar documentação
- 🔧 Corrigir bugs
- ✨ Implementar novas funcionalidades
- 🧪 Adicionar testes

## 🚀 Setup de Desenvolvimento

### 1. Fork e Clone

```bash
git clone https://github.com/seu-usuario/angular-jest-test-generator.git
cd angular-jest-test-generator
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Criar Branch

```bash
git checkout -b feature/minha-funcionalidade
# ou
git checkout -b fix/meu-bug
```

## 📁 Estrutura do Projeto

```
test-generator/
├── bin/              # CLI executável
├── templates/        # Templates de teste
│   ├── component.template.js
│   ├── service.template.js
│   ├── pipe.template.js
│   └── directive.template.js
├── utils/           # Utilitários
│   ├── code-analyzer.js    # Análise com ts-morph
│   ├── mock-generator.js   # Geração de mocks
│   └── formatter.js        # Formatação
├── index.js         # Entrada principal
└── package.json
```

## 🔧 Adicionando Funcionalidades

### Adicionar Novo Tipo de Arquivo

1. Crie template em `templates/`:

```javascript
// templates/guard.template.js
function generateGuardTest(analysis, filePath) {
  // Implementação
}

module.exports = { generateGuardTest };
```

2. Atualize `code-analyzer.js`:

```javascript
function analyzeFile(filePath) {
  return {
    // ...
    isGuard: hasDecorator(mainClass, 'Injectable'),
  };
}
```

3. Atualize `index.js`:

```javascript
const { generateGuardTest } = require('./templates/guard.template');

function generateTest(analysis, filePath) {
  const type = getFileType(analysis);
  
  switch (type) {
    case 'guard':
      return generateGuardTest(analysis, filePath);
    // ...
  }
}
```

### Melhorar Detecção de Mocks

Edite `utils/mock-generator.js`:

```javascript
function getMockValue(type, paramName = '') {
  const lowerName = paramName.toLowerCase();
  
  // Adicione sua detecção
  if (lowerName.includes('token')) {
    return "'mock-token-123'";
  }
  
  // ...
}
```

## 🧪 Testando Suas Mudanças

### Teste Localmente

```bash
# Link o pacote localmente
npm link

# Em outro projeto Angular
cd seu-projeto-test
npm link @angular-tools/jest-test-generator

# Teste o gerador
ng-test-gen src/app/seu-arquivo.ts
```

### Execute Testes

```bash
npm test
```

### Teste em Diferentes Cenários

1. Componente simples
2. Componente com @Input/@Output
3. Serviço com dependências
4. Pipe com transformação
5. Diretiva com HostListener

## 📝 Convenções de Código

### JavaScript/Node.js

```javascript
// Use JSDoc para documentação
/**
 * Gera teste para componente
 * @param {Object} analysis - Análise do código
 * @param {string} filePath - Caminho do arquivo
 * @returns {string} Código do teste
 */
function generateComponentTest(analysis, filePath) {
  // ...
}

// Use const para valores imutáveis
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
};

// Nomeação descritiva
function extractMethodsFromClass(classDeclaration) {
  // Implementação
}
```

### Formatação

- Indentação: 2 espaços
- Ponto e vírgula: obrigatório
- Aspas: simples para strings
- Linhas: máximo 100 caracteres

### Estrutura de Commits

```bash
# Formato: tipo(escopo): descrição

feat(templates): adiciona suporte para guards
fix(analyzer): corrige extração de interfaces
docs(readme): atualiza exemplos
test(service): adiciona testes para mocks
refactor(formatter): simplifica lógica de indentação
```

Tipos:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `test`: Testes
- `refactor`: Refatoração
- `style`: Formatação
- `chore`: Manutenção

## 📤 Enviando Pull Request

### 1. Certifique-se de que:

- [ ] Código está funcionando
- [ ] Testes passam
- [ ] Documentação está atualizada
- [ ] Commits seguem convenção
- [ ] Código está formatado

### 2. Push e PR

```bash
git push origin feature/minha-funcionalidade
```

Crie PR no GitHub com:

**Título:** Descrição clara da mudança

**Descrição:**
```markdown
## Mudanças
- Item 1
- Item 2

## Motivação
Por que essa mudança é necessária?

## Como testar
1. Passo 1
2. Passo 2

## Checklist
- [x] Testes adicionados
- [x] Documentação atualizada
- [x] Código revisado
```

## 🐛 Reportando Bugs

Use o template de issue no GitHub:

```markdown
## Descrição do Bug
Descrição clara do problema.

## Reproduzir
1. Execute comando...
2. Veja erro...

## Esperado
Comportamento esperado.

## Ambiente
- OS: [e.g. macOS 13.0]
- Node: [e.g. 18.0.0]
- Angular: [e.g. 17.0.0]
- Versão: [e.g. 1.0.0]

## Logs
```
Cole logs aqui
```
```

## 💡 Sugerindo Funcionalidades

Use template de feature request:

```markdown
## Funcionalidade
Descrição clara da funcionalidade.

## Motivação
Por que seria útil?

## Exemplo de Uso
```bash
ng-test-gen --nova-opcao valor
```

## Alternativas Consideradas
Outras abordagens que você considerou.
```

## 📚 Recursos

- [ts-morph Documentation](https://ts-morph.com/)
- [Jest Documentation](https://jestjs.io/)
- [Angular Testing Guide](https://angular.io/guide/testing)

## 🎖️ Reconhecimento

Contribuidores serão listados em:
- README.md
- CHANGELOG.md
- Release notes

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a MIT License.

## ❓ Dúvidas?

- Abra uma [Discussion](https://github.com/your-org/angular-jest-test-generator/discussions)
- Entre no Discord: [link]
- Email: dev@your-org.com

---

**Obrigado por contribuir! 🎉**


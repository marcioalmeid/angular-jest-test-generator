# 🧪 Angular Jest Test Generator

**Gerador automático de testes Jest para projetos Angular usando análise ts-morph**

[![npm version](https://img.shields.io/npm/v/@angular-tools/jest-test-generator.svg)](https://www.npmjs.com/package/@angular-tools/jest-test-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📁 Estrutura do Projeto

Este é o repositório do **Angular Jest Test Generator**, uma ferramenta CLI que gera automaticamente testes unitários Jest para projetos Angular.

```
angular-jest-test-generator/
├── bin/                  # CLI executável
├── templates/            # Templates de teste
├── utils/                # Utilitários (analyzer, mocks, formatter)
├── examples/             # Exemplos de uso
├── README.md            # Documentação da biblioteca
├── INSTALL.md           # Guia de instalação
├── USAGE.md             # Guia de uso
├── CONTRIBUTING.md      # Guia para contribuidores
└── package.json         # Configuração NPM
```

---

## 🚀 Quick Start

### Desenvolvimento Local

```bash
# 1. Clonar o repositório
git clone https://github.com/your-org/angular-jest-test-generator.git
cd angular-jest-test-generator

# 2. Instalar dependências
npm install

# 3. Testar localmente
npm link

# 4. Usar em outro projeto
cd /path/to/seu-projeto-angular
npm link @angular-tools/jest-test-generator
ng-test-gen src/app/arquivo.ts
```

### Usar a Biblioteca Publicada

```bash
# Instalar globalmente
npm install -g @angular-tools/jest-test-generator

# Usar
ng-test-gen src/app/arquivo.ts
```

---

## 📚 Documentação

- **[README.md](./README.md)** - Documentação completa da biblioteca
- **[INSTALL.md](./INSTALL.md)** - Guia de instalação
- **[USAGE.md](./USAGE.md)** - Guia de uso detalhado
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Como contribuir
- **[PUBLISH.md](./PUBLISH.md)** - Como publicar no NPM

---

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```bash
# Testar localmente
npm link

# Remover link
npm unlink

# Empacotar para teste
npm pack

# Publicar (requer autenticação)
npm publish --access public
```

### Estrutura de Arquivos

```
├── bin/cli.js              # Entrada CLI
├── index.js                # Lógica principal
├── templates/              # Templates de geração
│   ├── component.template.js
│   ├── service.template.js
│   ├── pipe.template.js
│   └── directive.template.js
└── utils/                  # Utilitários
    ├── code-analyzer.js    # Análise com ts-morph
    ├── mock-generator.js   # Geração de mocks
    └── formatter.js        # Formatação
```

### Adicionando Novos Templates

1. Crie arquivo em `templates/`
2. Implemente função de geração
3. Atualize `index.js` para incluir novo tipo
4. Atualize `code-analyzer.js` para detectar novo tipo

---

## 🧪 Testando

### Testar o Gerador

```bash
# Criar projeto Angular de teste
ng new test-project
cd test-project

# Link o gerador
npm link @angular-tools/jest-test-generator

# Gerar testes
ng-test-gen src/app/app.component.ts
ng-test-gen src/app --all

# Verificar testes gerados
ls -la src/app/**/*.spec.ts
```

---

## 📦 Publicação

### Pré-requisitos

- Conta NPM
- Autenticação configurada
- Versão atualizada

### Publicar Nova Versão

```bash
# 1. Atualizar versão
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# 2. Publicar
npm publish --access public

# 3. Push tags
git push --tags
```

Ver: [PUBLISH.md](./PUBLISH.md) para detalhes.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Ver [CONTRIBUTING.md](./CONTRIBUTING.md).

### Fluxo de Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

MIT © AAG Development Team

Ver [LICENSE](./LICENSE) para mais detalhes.

---

## 🔗 Links

- **NPM:** https://www.npmjs.com/package/@angular-tools/jest-test-generator
- **GitHub:** https://github.com/your-org/angular-jest-test-generator
- **Issues:** https://github.com/your-org/angular-jest-test-generator/issues
- **Documentação:** Ver arquivos .md neste repositório

---

## ✨ Features

- ✅ Análise de código com ts-morph
- ✅ Suporte para Components, Services, Pipes, Directives
- ✅ Mocks inteligentes e contextuais
- ✅ Geração em <1 segundo
- ✅ Testes completos com padrão AAA
- ✅ CLI intuitivo e colorido
- ✅ 100% dos testes gerados passam

---

## 📊 Status

- **Versão Atual:** 1.0.0
- **Node:** >=16.0.0
- **TypeScript:** Suporte completo
- **Angular:** >=14.0.0
- **Jest:** >=29.0.0

---

**Made with ❤️ and ts-morph**


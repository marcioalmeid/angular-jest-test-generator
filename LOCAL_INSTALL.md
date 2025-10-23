# 📦 Instalação Local (Sem Publicar no npm)

Este guia mostra como instalar e usar este projeto em outros projetos **sem publicar no npm**.

## 🎨 Dashboard Interativo

**Novidade!** Use o dashboard para facilitar todas as operações:

```bash
# Dashboard Terminal com menu interativo
./scripts/dashboard.sh

# Dashboard Web com interface visual
open scripts/dashboard.html
```

📖 **Documentação completa:** [DASHBOARD.md](./scripts/DASHBOARD.md) | [Quick Start](./QUICK_START_DASHBOARD.md)

---

## 🎯 Opções Disponíveis

### Opção 1: npm link (Recomendado para Desenvolvimento)

Ideal para desenvolvimento local e testes em múltiplos projetos.

#### Passos:

1. **No projeto angular-jest-test-generator:**

```bash
cd /Users/marcio/Development/AAG/angular-jest-test-generator

# Instala as dependências do projeto
npm install

# Cria um link simbólico global
npm link
```

2. **No projeto onde você quer usar:**

```bash
cd /caminho/do/seu/projeto-angular

# Cria link para o gerador
npm link @angular-tools/jest-test-generator
```

3. **Usar o comando:**

```bash
# Agora você pode usar o comando globalmente
ng-test-gen src/app/seu-arquivo.ts

# Ou via npx
npx ng-test-gen src/app/seu-arquivo.ts
```

#### Para remover o link:

```bash
# No projeto que está usando
npm unlink @angular-tools/jest-test-generator

# No projeto do gerador (opcional)
cd /Users/marcio/Development/AAG/angular-jest-test-generator
npm unlink -g
```

---

### Opção 2: Instalar Diretamente do Caminho Local

Instala uma cópia do projeto no `node_modules`.

```bash
# No projeto onde você quer usar
cd /caminho/do/seu/projeto-angular

# Instalar com caminho absoluto
npm install /Users/marcio/Development/AAG/angular-jest-test-generator

# OU com caminho relativo (se os projetos estão próximos)
npm install ../../angular-jest-test-generator
```

**package.json será atualizado para:**

```json
{
  "devDependencies": {
    "@angular-tools/jest-test-generator": "file:../angular-jest-test-generator"
  }
}
```

---

### Opção 3: Instalar do GitHub/GitLab (Recomendado para Equipes)

Se o projeto estiver em um repositório Git:

#### GitHub

```bash
# SSH
npm install git+ssh://git@github.com/seu-usuario/angular-jest-test-generator.git

# HTTPS
npm install git+https://github.com/seu-usuario/angular-jest-test-generator.git

# Branch específica
npm install git+https://github.com/seu-usuario/angular-jest-test-generator.git#develop

# Tag específica
npm install git+https://github.com/seu-usuario/angular-jest-test-generator.git#v1.0.0

# Commit específico
npm install git+https://github.com/seu-usuario/angular-jest-test-generator.git#abc123
```

#### GitLab

```bash
npm install git+https://gitlab.com/seu-usuario/angular-jest-test-generator.git
```

#### Repositório Privado

```bash
# Com token de acesso
npm install git+https://TOKEN@github.com/seu-usuario/angular-jest-test-generator.git

# Com SSH (requer configuração de chaves)
npm install git+ssh://git@github.com/seu-usuario/angular-jest-test-generator.git
```

**package.json ficará assim:**

```json
{
  "devDependencies": {
    "@angular-tools/jest-test-generator": "git+https://github.com/seu-usuario/angular-jest-test-generator.git#v1.0.0"
  }
}
```

---

### Opção 4: Criar e Compartilhar um Tarball

Criar um arquivo `.tgz` para compartilhar manualmente.

#### 1. Criar o tarball:

```bash
cd /Users/marcio/Development/AAG/angular-jest-test-generator

# Cria o arquivo .tgz
npm pack
```

Isso cria um arquivo: `angular-tools-jest-test-generator-1.0.0.tgz`

#### 2. Compartilhar o arquivo:

- Copiar para rede compartilhada
- Enviar por email
- Colocar em servidor interno
- Compartilhar via Dropbox/Google Drive

#### 3. Instalar do tarball:

```bash
# No projeto onde você quer usar
npm install /caminho/para/angular-tools-jest-test-generator-1.0.0.tgz

# Ou de URL
npm install https://seu-servidor.com/angular-tools-jest-test-generator-1.0.0.tgz
```

---

### Opção 5: Registro npm Privado

Para organizações, use um registro npm privado.

#### Verdaccio (Gratuito e Open Source)

```bash
# Instalar Verdaccio
npm install -g verdaccio

# Iniciar servidor
verdaccio
```

#### Publicar no Verdaccio:

```bash
cd /Users/marcio/Development/AAG/angular-jest-test-generator

# Configurar registro
npm set registry http://localhost:4873

# Publicar
npm publish

# Voltar para registro oficial
npm set registry https://registry.npmjs.org
```

#### Instalar do Verdaccio:

```bash
npm install @angular-tools/jest-test-generator --registry http://localhost:4873
```

---

## 🔄 Comparação das Opções

| Opção | Vantagens | Desvantagens | Melhor Para |
|-------|-----------|--------------|-------------|
| **npm link** | ✅ Mudanças instantâneas<br>✅ Fácil desenvolvimento | ❌ Link simbólico pode confundir<br>❌ Problemas com peer dependencies | Desenvolvimento ativo |
| **Caminho Local** | ✅ Simples<br>✅ Cópia real do código | ❌ Precisa reinstalar para updates<br>❌ Caminho pode mudar | Testes rápidos |
| **GitHub/GitLab** | ✅ Versionamento<br>✅ Acesso da equipe<br>✅ CI/CD friendly | ❌ Requer repositório Git<br>❌ Precisa commit para updates | Equipes e produção |
| **Tarball** | ✅ Offline<br>✅ Controle total | ❌ Distribuição manual<br>❌ Difícil gerenciar versões | Distribuição única |
| **Registro Privado** | ✅ Como npm público<br>✅ Versionamento profissional | ❌ Requer infraestrutura<br>❌ Mais complexo | Empresas/Organizações |

---

## 📝 Configuração para Uso em Equipe

### 1. Criar `.npmrc` no projeto

Se usar GitHub (para equipe):

```bash
# .npmrc no projeto que vai usar o gerador
@angular-tools:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. Adicionar ao `package.json`

```json
{
  "devDependencies": {
    "@angular-tools/jest-test-generator": "git+https://github.com/seu-usuario/angular-jest-test-generator.git"
  },
  "scripts": {
    "generate:test": "ng-test-gen",
    "postinstall": "npm rebuild"
  }
}
```

### 3. Documentar para a equipe

Crie um `README-TEAM.md`:

```markdown
# Instalação do Test Generator

## Primeira vez:

1. Clone o repositório do gerador
2. Execute: npm install
3. Execute: npm link

## Em cada projeto:

npm link @angular-tools/jest-test-generator
```

---

## 🚀 Recomendação por Cenário

### 🏠 Uso Pessoal / Desenvolvimento:
```bash
npm link
```

### 👥 Equipe Pequena (2-5 pessoas):
```bash
npm install git+https://github.com/seu-usuario/angular-jest-test-generator.git
```

### 🏢 Empresa / Múltiplos Times:
```bash
# Configure Verdaccio ou GitHub Packages
npm install @angular-tools/jest-test-generator --registry http://seu-servidor:4873
```

### 📦 Distribuição Única / Offline:
```bash
npm pack
# Compartilhe o .tgz
```

---

## ✅ Checklist de Instalação

Antes de instalar em outro projeto, certifique-se:

- [ ] `package.json` está configurado corretamente
- [ ] Dependências estão instaladas: `npm install`
- [ ] `bin/cli.js` tem permissões de execução
- [ ] Arquivos essenciais estão no campo `files` do `package.json`
- [ ] Testes passam: `npm test` (se houver)

---

## 🔧 Troubleshooting

### Erro: "Cannot find module"

```bash
# Reinstale as dependências no gerador
cd /Users/marcio/Development/AAG/angular-jest-test-generator
npm install

# Recrie o link
npm link
```

### Erro: "Command not found: ng-test-gen"

```bash
# Verifique se o bin está configurado
npm link

# Ou use npx
npx ng-test-gen
```

### Mudanças não aparecem (npm link)

```bash
# Rebuilde o link
npm unlink @angular-tools/jest-test-generator
npm link @angular-tools/jest-test-generator
```

### Problemas com peer dependencies

```bash
# No projeto que usa o gerador
npm install --legacy-peer-deps
```

---

## 📚 Exemplos Práticos

### Exemplo 1: Setup Rápido para Teste

```bash
# Terminal 1 - Projeto gerador
cd /Users/marcio/Development/AAG/angular-jest-test-generator
npm install
npm link

# Terminal 2 - Projeto Angular
cd /caminho/do/projeto-angular
npm link @angular-tools/jest-test-generator
ng-test-gen src/app/app.component.ts
```

### Exemplo 2: Adicionar ao CI/CD (GitHub Actions)

```yaml
name: Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Test Generator
        run: npm install git+https://github.com/seu-usuario/angular-jest-test-generator.git
      
      - name: Generate Tests
        run: npx ng-test-gen src/app --all
      
      - name: Run Tests
        run: npm test
```

### Exemplo 3: Compartilhar com Equipe via Tarball

```bash
# Criar tarball
cd /Users/marcio/Development/AAG/angular-jest-test-generator
npm pack

# Mover para local compartilhado
mv angular-tools-jest-test-generator-1.0.0.tgz /compartilhado/

# Equipe instala
npm install /compartilhado/angular-tools-jest-test-generator-1.0.0.tgz
```

---

## 📞 Suporte

Se tiver problemas, verifique:

1. Versão do Node: `node --version` (deve ser >= 16)
2. Versão do npm: `npm --version` (deve ser >= 8)
3. Dependências instaladas no gerador
4. Permissões de arquivo/pasta

---

**Feito com ❤️ pela equipe AAG**


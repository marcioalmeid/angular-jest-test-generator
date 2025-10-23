# 📦 Guia de Publicação no NPM

Este guia explica como publicar a biblioteca no NPM.

## Pré-requisitos

1. **Conta no NPM**: [Criar conta](https://www.npmjs.com/signup)
2. **Autenticação**: Login via CLI
3. **Permissões**: Acesso para publicar no escopo `@angular-tools`

## 🚀 Processo de Publicação

### 1. Preparação

```bash
cd test-generator

# Garantir que está na branch main
git checkout main
git pull origin main

# Atualizar versão
npm version patch  # para 1.0.1
# ou
npm version minor  # para 1.1.0
# ou
npm version major  # para 2.0.0
```

### 2. Autenticar no NPM

```bash
npm login
# Username: seu-usuario
# Password: sua-senha
# Email: seu-email@example.com
# OTP: (se 2FA ativado)
```

### 3. Testar Localmente

```bash
# Testar build
npm pack

# Isso cria: angular-tools-jest-test-generator-1.0.0.tgz

# Testar instalação em outro projeto
cd /path/to/test-project
npm install /path/to/test-generator/angular-tools-jest-test-generator-1.0.0.tgz

# Testar funcionamento
ng-test-gen src/app/test.ts
```

### 4. Publicar

```bash
cd test-generator

# Publicar versão pública
npm publish --access public

# Ou se for escopo privado
npm publish
```

### 5. Verificar

```bash
# Ver no NPM
npm view @angular-tools/jest-test-generator

# Instalar e testar
npm install -g @angular-tools/jest-test-generator
ng-test-gen --help
```

## 📝 Checklist Pré-Publicação

Antes de publicar, verifique:

- [ ] Testes passando: `npm test`
- [ ] Versão atualizada no `package.json`
- [ ] CHANGELOG.md atualizado
- [ ] README.md atualizado
- [ ] Documentação completa
- [ ] Exemplos funcionando
- [ ] LICENSE presente
- [ ] .npmignore configurado
- [ ] bin/cli.js executável
- [ ] Repository URL configurado
- [ ] Keywords relevantes

## 🏷️ Versionamento Semântico

Siga [SemVer](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Mudanças incompatíveis
- **MINOR** (1.0.0 → 1.1.0): Novas funcionalidades compatíveis
- **PATCH** (1.0.0 → 1.0.1): Correções de bugs

### Exemplos

```bash
# Correção de bug
npm version patch
# 1.0.0 → 1.0.1

# Nova funcionalidade
npm version minor
# 1.0.0 → 1.1.0

# Breaking change
npm version major
# 1.0.0 → 2.0.0

# Pre-release
npm version prerelease --preid=beta
# 1.0.0 → 1.0.1-beta.0
```

## 📋 Criando CHANGELOG

Antes de cada release, atualize `CHANGELOG.md`:

```markdown
# Changelog

## [1.0.1] - 2025-01-23

### Fixed
- Corrigido mock de parâmetros MJML
- Corrigido testes de erro para métodos síncronos

### Added
- Suporte para detecção de emails em parâmetros

## [1.0.0] - 2025-01-22

### Added
- Versão inicial
- Suporte para Components, Services, Pipes, Directives
- Análise com ts-morph
- Mocks inteligentes
```

## 🔄 Fluxo de Release

### 1. Feature Branch

```bash
git checkout -b feature/nova-funcionalidade
# Desenvolve
git commit -m "feat: adiciona nova funcionalidade"
```

### 2. Pull Request

```bash
git push origin feature/nova-funcionalidade
# Cria PR no GitHub
# Aguarda aprovação
```

### 3. Merge para Main

```bash
git checkout main
git pull origin main
```

### 4. Release

```bash
# Atualiza CHANGELOG.md
# Atualiza versão
npm version minor

# Cria tag
git push origin main --tags

# Publica
npm publish --access public
```

### 5. GitHub Release

No GitHub:
1. Vá para "Releases"
2. "Draft a new release"
3. Tag: v1.1.0
4. Title: Release 1.1.0
5. Description: Cole do CHANGELOG
6. "Publish release"

## 🏷️ Tags NPM

### Latest (Default)

```bash
npm publish --access public --tag latest
```

### Beta

```bash
npm version prerelease --preid=beta
npm publish --access public --tag beta
```

Usuários instalam:
```bash
npm install @angular-tools/jest-test-generator@beta
```

### Next

```bash
npm publish --access public --tag next
```

## 🔐 Escopo Organizacional

Para publicar em escopo da organização:

```bash
# Criar organização no NPM
# Adicionar membros

# Publicar
npm publish --access public
```

## 📊 Monitoramento

Após publicação:

```bash
# Ver downloads
npm view @angular-tools/jest-test-generator

# Ver estatísticas
https://npm-stat.com/charts.html?package=@angular-tools/jest-test-generator
```

## 🔄 Atualizações

### Publicar Patch

```bash
# Fix bugs
git commit -m "fix: corrige problema X"
npm version patch
npm publish --access public
git push --tags
```

### Publicar Minor

```bash
# Add features
git commit -m "feat: adiciona funcionalidade Y"
npm version minor
npm publish --access public
git push --tags
```

## 🚫 Despublicar (Último Recurso)

⚠️ **Cuidado:** Despublicar pode quebrar projetos que dependem da lib.

```bash
# Despublicar versão específica
npm unpublish @angular-tools/jest-test-generator@1.0.0

# Despublicar tudo (só possível em 72h após publicar)
npm unpublish @angular-tools/jest-test-generator --force
```

## 📧 Notificações

Configurar no GitHub para notificar:
- Issues
- Pull Requests
- Releases
- Discussions

## 🎯 Métricas de Sucesso

Acompanhar:
- Downloads por semana
- Stars no GitHub
- Issues abertas/fechadas
- Pull Requests
- Tempo de resposta

## 🆘 Troubleshooting

### Erro: Pacote já existe

```bash
# Incrementar versão
npm version patch
npm publish --access public
```

### Erro: Não autorizado

```bash
# Re-autenticar
npm logout
npm login
```

### Erro: Validação falhou

```bash
# Verificar package.json
npm pack --dry-run
```

## 📚 Recursos

- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [SemVer](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Boa publicação! 🚀**


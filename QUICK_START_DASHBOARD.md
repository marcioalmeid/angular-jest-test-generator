# ⚡ Quick Start - Dashboard

A maneira mais rápida de começar a usar o Angular Jest Test Generator!

## 🚀 1 Minuto para Começar

### Opção 1: Dashboard Terminal (Recomendado)

```bash
cd /Users/marcio/Development/AAG/angular-jest-test-generator
./scripts/dashboard.sh
```

Escolha a opção **8** para setup completo automático! 🎯

### Opção 2: Dashboard Web

```bash
open scripts/dashboard.html
```

Navegue visualmente pelas opções e copie os comandos.

## 🎯 Cenários Comuns

### Cenário 1: Primeiro Uso (Setup Completo)

```bash
# 1. Abrir dashboard
./scripts/dashboard.sh

# 2. Escolher opção "8" (Setup Completo)
# 3. Digitar caminho do projeto: /seu/projeto-angular
# 4. Confirmar com "s"
# 5. Pronto! ✅
```

**O que acontece:**
- ✅ Instala o gerador globalmente
- ✅ Configura Jest no projeto
- ✅ Linka o gerador ao projeto
- ✅ Tudo pronto para gerar testes!

### Cenário 2: Já Tenho Jest, Só Preciso do Gerador

```bash
# 1. Abrir dashboard
./scripts/dashboard.sh

# 2. Escolher opção "1" (Instalar Localmente)
# 3. Depois escolher opção "2" (Linkar a Projeto)
# 4. Digitar caminho do projeto
# 5. Pronto! ✅
```

### Cenário 3: Distribuir para Equipe

```bash
# 1. Abrir dashboard
./scripts/dashboard.sh

# 2. Escolher opção "6" (Criar Distribuição)
# 3. Informar versão: 1.0.0
# 4. Informar diretório: ./release
# 5. Compartilhar o ZIP criado! 📦
```

## 🎨 Comparação: Dashboard vs Scripts

| Ação | Dashboard | Script Manual |
|------|-----------|---------------|
| **Setup Completo** | 1 comando | 3 comandos |
| **Validação** | ✅ Automática | ❌ Manual |
| **Confirmações** | ✅ Interativa | ❌ Nenhuma |
| **Visual** | ✅ Colorido | ⚠️ Básico |
| **Ajuda** | ✅ Integrada | 📄 Docs separadas |

## 📖 Fluxo Visual

```
┌─────────────────────────────────────────┐
│    ./scripts/dashboard.sh               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  ╔═══════════════════════════════════╗  │
│  ║   Dashboard Principal             ║  │
│  ╚═══════════════════════════════════╝  │
│                                          │
│  Status do Sistema: ✅ OK               │
│                                          │
│  1) 🚀 Instalar Localmente              │
│  2) 🔗 Linkar a Projeto                 │
│  8) ⚡ Setup Completo  ◄───── ESCOLHA   │
│  q) ❌ Sair                             │
└──────────────┬──────────────────────────┘
               │
               ▼ (opção 8)
┌─────────────────────────────────────────┐
│  📁 Caminho do projeto:                 │
│  /Users/marcio/projects/my-app          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  🚀 Deseja continuar? [s/N]: s          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  ━━━ Passo 1/3: Instalando gerador      │
│  ✅ Instalação concluída                │
│                                          │
│  ━━━ Passo 2/3: Configurando Jest       │
│  ✅ Jest configurado                     │
│                                          │
│  ━━━ Passo 3/3: Linkando gerador        │
│  ✅ Link criado                          │
│                                          │
│  ✅ Setup completo finalizado!          │
└─────────────────────────────────────────┘
```

## 💡 Dicas Rápidas

### Dica 1: Criar Atalho

```bash
# Adicione ao ~/.bashrc ou ~/.zshrc
alias ng-dashboard='cd /Users/marcio/Development/AAG/angular-jest-test-generator && ./scripts/dashboard.sh'

# Use de qualquer lugar:
ng-dashboard
```

### Dica 2: Verificar Instalações

No dashboard, escolha opção **9** para ver:
- ✅ Links globais
- ✅ Comandos disponíveis
- ✅ Instalações locais encontradas

### Dica 3: Ajuda Integrada

No dashboard, pressione **h** para:
- 📖 Descrição de cada opção
- 💡 Dicas de uso
- 🔗 Links para documentação

## 🎯 Após o Setup

Depois de usar o dashboard para setup, você pode:

```bash
# Gerar teste para um arquivo
cd /seu/projeto-angular
ng-test-gen src/app/app.component.ts

# Gerar testes para diretório
ng-test-gen src/app --all

# Executar testes
npm test
```

## 📱 Dashboard Web

Se preferir interface visual:

```bash
# Abrir dashboard web
open scripts/dashboard.html

# Ou com servidor
cd scripts
python3 -m http.server 8000
# Acesse: http://localhost:8000/dashboard.html
```

**Recursos do Dashboard Web:**
- 🎨 Interface moderna com gradientes
- 📱 Responsivo (mobile + desktop)
- 🎯 6 cards clicáveis
- 💬 Modais com formulários
- 📋 Preview dos comandos

## 🆘 Problemas?

### Erro: "Permission denied"

```bash
chmod +x scripts/*.sh
```

### Dashboard não encontrado

```bash
# Certifique-se de estar no diretório correto
cd /Users/marcio/Development/AAG/angular-jest-test-generator
```

### Cores não aparecem

Use um terminal moderno (iTerm2, Terminal.app no macOS).

## 📚 Próximos Passos

1. **Começar:** Use o dashboard para setup
2. **Aprender:** Leia [DASHBOARD.md](./scripts/DASHBOARD.md)
3. **Explorar:** Veja [scripts/README.md](./scripts/README.md)
4. **Documentar:** Consulte [README.md](./README.md)

## 🎉 Pronto!

Agora você está pronto para gerar testes automaticamente! 

```bash
cd /seu/projeto-angular
ng-test-gen src/app/**/*.ts
npm test
```

---

**💜 Desenvolvido com amor pela equipe AAG**

[← Voltar](./README.md) | [Dashboard Completo →](./scripts/DASHBOARD.md)


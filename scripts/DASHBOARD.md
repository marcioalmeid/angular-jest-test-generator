# 🎨 Dashboard - Guia de Uso

Dashboard interativo para gerenciar a instalação e distribuição do Angular Jest Test Generator.

## 🚀 Início Rápido

### Dashboard Terminal (Interativo)

```bash
cd /Users/marcio/Development/AAG/angular-jest-test-generator
./scripts/dashboard.sh
```

### Dashboard Web (Visual)

```bash
# Abrir no navegador
open scripts/dashboard.html

# Ou com servidor local (opcional)
cd scripts
python3 -m http.server 8000
# Acesse: http://localhost:8000/dashboard.html
```

## 📋 Funcionalidades

### Dashboard Terminal (`dashboard.sh`)

Dashboard interativo com menu colorido e navegação por teclas.

#### Funcionalidades:

1. **✅ Status do Sistema**
   - Versão do Node.js
   - Versão do npm
   - Status de instalação do gerador
   - Versão do pacote

2. **🚀 Instalar Localmente**
   - Instala dependências
   - Cria link global (npm link)
   - Torna comandos disponíveis

3. **🔗 Linkar a Projeto**
   - Solicita caminho do projeto
   - Valida o projeto
   - Cria link no projeto

4. **📦 Instalar do Caminho**
   - Instala cópia local
   - Atualiza package.json

5. **📦 Criar Tarball**
   - Executa testes
   - Cria arquivo .tgz
   - Mostra tamanho e localização

6. **🛠️ Configurar Jest**
   - Instala dependências Jest
   - Cria arquivos de configuração
   - Adiciona scripts ao package.json

7. **📦 Criar Distribuição**
   - Cria pacote completo
   - Inclui documentação
   - Gera arquivo ZIP

8. **🗑️ Desinstalar**
   - Remove link global
   - Limpa instalação

9. **⚡ Setup Completo**
   - Executa todos os passos automaticamente
   - Instalação end-to-end

10. **ℹ️ Verificar Instalações**
    - Mostra links globais
    - Lista comandos disponíveis
    - Procura instalações locais

11. **❓ Ajuda**
    - Descrição detalhada de cada opção
    - Links para documentação

### Dashboard Web (`dashboard.html`)

Interface visual moderna com cards clicáveis.

#### Características:

- ✨ Design moderno e responsivo
- 🎨 Gradientes e animações
- 📱 Funciona em desktop e mobile
- 🔍 Status do sistema em tempo real
- 📋 Modais interativos com formulários
- 💻 Preview dos comandos

#### Cards Disponíveis:

1. **Instalar Localmente** - Instalação rápida com npm link
2. **Linkar a Projeto** - Conectar a projeto específico
3. **Criar Tarball** - Gerar arquivo de distribuição
4. **Configurar Jest** - Setup completo de Jest
5. **Criar Distribuição** - Pacote completo
6. **Setup Completo** - Instalação automática

## 🎯 Uso Detalhado

### Dashboard Terminal

#### Exemplo 1: Instalação Local

```bash
./scripts/dashboard.sh

# No menu:
# 1. Escolha opção "1" (Instalar Localmente)
# 2. Confirme com "s"
# 3. Aguarde a instalação
```

#### Exemplo 2: Linkar a Projeto

```bash
./scripts/dashboard.sh

# No menu:
# 1. Escolha opção "2" (Linkar a Projeto)
# 2. Digite o caminho: /Users/seu-usuario/projeto-angular
# 3. Confirme com "s"
```

#### Exemplo 3: Setup Completo

```bash
./scripts/dashboard.sh

# No menu:
# 1. Escolha opção "8" (Setup Completo)
# 2. Digite o caminho do projeto
# 3. Confirme com "s"
# 4. Aguarde execução dos 3 passos
```

### Dashboard Web

#### Como Usar:

1. **Abrir o Dashboard:**
   ```bash
   open scripts/dashboard.html
   ```

2. **Visualizar Status:**
   - Status bar no topo mostra informações do sistema

3. **Executar Ação:**
   - Clique no card desejado
   - Preencha o formulário no modal
   - Clique em "Executar"
   - Veja as instruções de terminal

4. **Copiar Comandos:**
   - Os comandos são mostrados em cada card
   - Use para referência rápida

## 🎨 Interface do Dashboard Terminal

```
╔══════════════════════════════════════════════════════════════╗
║        Angular Jest Test Generator - Dashboard          ║
╚══════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━ Sistema ━━━━━━━━━━━━━━━━
✅ Node.js: v18.0.0
✅ npm: 8.19.2
✅ ng-test-gen: Disponível
✅ Versão do pacote: 1.0.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━ Menu ━━━━━━━━━━━━━━━━━

  1) 🚀 Instalar Localmente (npm link)
  2) 🔗 Linkar a Projeto
  3) 📦 Instalar do Caminho Local
  4) 📦 Criar Tarball
  5) 🛠️  Configurar Jest em Projeto
  6) 📦 Criar Distribuição Completa
  7) 🗑️  Desinstalar Local

  8) 🚀 Setup Completo (tudo de uma vez)
  9) ℹ️  Verificar Instalações

  h) ℹ️  Ajuda
  q) ❌ Sair

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Escolha uma opção:
```

## 📱 Screenshots

### Dashboard Terminal

Cores e emojis para fácil visualização:
- 🟢 Verde: Sucesso / Disponível
- 🟡 Amarelo: Aviso / Informação
- 🔴 Vermelho: Erro / Não disponível
- 🔵 Azul: Títulos / Seções

### Dashboard Web

- **Header**: Título e descrição
- **Status Bar**: 4 cards com informações do sistema
- **Cards Grid**: 6 cards com ações principais
- **Modals**: Formulários interativos

## 🔧 Personalização

### Adicionar Nova Opção ao Dashboard Terminal

Edite `dashboard.sh`:

```bash
# Adicionar nova função
menu_nova_opcao() {
    show_header
    echo -e "${BOLD}${MAGENTA}${ROCKET} Nova Opção${NC}"
    echo ""
    
    # Sua lógica aqui
    
    pause
}

# Adicionar ao menu principal
show_menu() {
    # ... código existente ...
    echo -e "  ${GREEN}10${NC}) ${ROCKET} Nova Opção"
    # ...
}

# Adicionar ao case no main()
case $choice in
    # ... opções existentes ...
    10) menu_nova_opcao ;;
esac
```

### Adicionar Novo Card ao Dashboard Web

Edite `dashboard.html`:

```html
<!-- Adicionar novo card -->
<div class="card">
    <div class="card-header">
        <div class="card-icon">🎯</div>
        <div class="card-title">Novo Recurso</div>
    </div>
    <div class="card-description">
        Descrição do novo recurso.
    </div>
    <div class="card-command">./scripts/novo-script.sh</div>
    <button class="card-button" onclick="showModal('novo-recurso')">
        Executar
    </button>
</div>

<!-- Adicionar lógica no JavaScript -->
<script>
function showModal(action) {
    // ... código existente ...
    
    case 'novo-recurso':
        title.textContent = '🎯 Novo Recurso';
        body.innerHTML = `
            <div class="form-group">
                <label>Parâmetro:</label>
                <input type="text" id="parametro" placeholder="valor">
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="executeNovoRecurso()">
                    Executar
                </button>
                <button class="btn btn-secondary" onclick="closeModal()">
                    Cancelar
                </button>
            </div>
        `;
        break;
}

function executeNovoRecurso() {
    const param = document.getElementById('parametro').value;
    showOutput('📋 Comando: ./scripts/novo-script.sh ' + param);
}
</script>
```

## 🐛 Troubleshooting

### Dashboard Terminal não inicia

```bash
# Verificar permissões
chmod +x scripts/dashboard.sh

# Executar manualmente
bash scripts/dashboard.sh
```

### Cores não aparecem

```bash
# Alguns terminais não suportam cores ANSI
# Use um terminal moderno: iTerm2, Terminal.app (macOS)
```

### Dashboard Web não funciona

```bash
# Abrir diretamente no navegador
open scripts/dashboard.html

# Ou hospedar localmente
cd scripts
python3 -m http.server 8000
```

### Comandos não executam no Dashboard Web

O dashboard web é apenas visual e mostra instruções.
Para executar comandos, use:
- Dashboard terminal (`dashboard.sh`)
- Scripts individuais
- Terminal manualmente

## 💡 Dicas de Uso

### 1. Atalho para Dashboard

Adicione ao seu `.bashrc` ou `.zshrc`:

```bash
alias ng-dashboard='cd /Users/marcio/Development/AAG/angular-jest-test-generator && ./scripts/dashboard.sh'
```

Agora você pode executar de qualquer lugar:

```bash
ng-dashboard
```

### 2. Dashboard Web como Favorito

Adicione aos favoritos do navegador:

```
file:///Users/marcio/Development/AAG/angular-jest-test-generator/scripts/dashboard.html
```

### 3. Servidor Web Permanente

Para acesso remoto:

```bash
# Instalar serve globalmente
npm install -g serve

# Servir dashboard
cd /Users/marcio/Development/AAG/angular-jest-test-generator/scripts
serve -p 8080

# Acesse: http://localhost:8080/dashboard.html
```

### 4. Automação com Dashboard

Use o dashboard terminal em scripts:

```bash
#!/bin/bash
# auto-setup.sh

# Enviar entrada para o dashboard
echo -e "1\ns\nq" | ./scripts/dashboard.sh
```

## 📊 Comparação dos Dashboards

| Característica | Terminal | Web |
|----------------|----------|-----|
| **Interatividade** | ✅ Total | ⚠️ Limitada |
| **Execução de Comandos** | ✅ Direta | ❌ Manual |
| **Visual** | ⚠️ Texto colorido | ✅ Moderno |
| **Responsivo** | ✅ Terminal | ✅ Mobile/Desktop |
| **Offline** | ✅ Sim | ✅ Sim |
| **Requer Servidor** | ❌ Não | ⚠️ Opcional |
| **Melhor Para** | Automação | Visualização |

## 🎯 Casos de Uso

### Desenvolvimento Diário

```bash
# Usar dashboard terminal
./scripts/dashboard.sh
# Opção 8: Setup Completo
```

### Demonstração para Equipe

```bash
# Usar dashboard web
open scripts/dashboard.html
# Mostrar visualmente os recursos
```

### CI/CD

```bash
# Usar scripts individuais
./scripts/install-local.sh
./scripts/create-tarball.sh
```

### Documentação

```bash
# Dashboard web serve como documentação visual
# Compartilhe o link ou screenshots
```

## 📚 Recursos Adicionais

- **README.md** - Documentação geral
- **LOCAL_INSTALL.md** - Guia de instalação local
- **scripts/README.md** - Documentação dos scripts
- **INSTALL.md** - Guia de instalação completo

## 🆘 Suporte

Se encontrar problemas:

1. Verifique as permissões: `chmod +x scripts/*.sh`
2. Teste scripts individuais primeiro
3. Consulte os logs de erro
4. Veja a seção Troubleshooting

## 📝 Changelog

### v1.0.0 - 2025-10-23

- ✨ Dashboard terminal interativo
- 🎨 Dashboard web visual
- 🚀 10 funcionalidades principais
- 📱 Suporte mobile no dashboard web
- 🎯 Validação de entrada
- 💬 Mensagens de confirmação
- 🔍 Verificação de instalações
- 📊 Status do sistema em tempo real

---

**Desenvolvido com ❤️ pela equipe AAG**


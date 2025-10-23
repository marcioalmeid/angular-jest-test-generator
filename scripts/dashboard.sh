#!/bin/bash

# Dashboard interativo para Angular Jest Test Generator
# Uso: ./scripts/dashboard.sh

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Emojis
CHECK="✅"
CROSS="❌"
ROCKET="🚀"
PACKAGE="📦"
LINK="🔗"
TOOL="🛠️"
INFO="ℹ️"
FOLDER="📁"
TRASH="🗑️"

# Função para limpar tela
clear_screen() {
    clear
}

# Função para exibir cabeçalho
show_header() {
    clear_screen
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${WHITE}${BOLD}        Angular Jest Test Generator - Dashboard          ${NC}${CYAN}║${NC}"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Função para exibir status do sistema
show_status() {
    echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━ Sistema ━━━━━━━━━━━━━━━━${NC}"
    
    # Node version
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        echo -e "${GREEN}${CHECK}${NC} Node.js: ${NODE_VERSION}"
    else
        echo -e "${RED}${CROSS}${NC} Node.js: Não instalado"
    fi
    
    # npm version
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        echo -e "${GREEN}${CHECK}${NC} npm: ${NPM_VERSION}"
    else
        echo -e "${RED}${CROSS}${NC} npm: Não instalado"
    fi
    
    # Verificar se gerador está linkado
    if command -v ng-test-gen &> /dev/null; then
        echo -e "${GREEN}${CHECK}${NC} ng-test-gen: ${GREEN}Disponível${NC}"
    else
        echo -e "${YELLOW}${INFO}${NC} ng-test-gen: ${YELLOW}Não instalado globalmente${NC}"
    fi
    
    # Package version
    if [ -f "package.json" ]; then
        PKG_VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "N/A")
        echo -e "${GREEN}${CHECK}${NC} Versão do pacote: ${PKG_VERSION}"
    fi
    
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Função para pausar
pause() {
    echo ""
    read -p "Pressione ENTER para continuar..."
}

# Função para confirmar ação
confirm() {
    local prompt="$1"
    read -p "$prompt [s/N]: " response
    case "$response" in
        [sS][iI][mM]|[sS]) 
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

# Função para ler caminho do projeto
read_project_path() {
    echo ""
    read -e -p "${FOLDER} Caminho do projeto Angular: " project_path
    
    # Expandir ~
    project_path="${project_path/#\~/$HOME}"
    
    if [ -z "$project_path" ]; then
        echo -e "${RED}${CROSS} Caminho não fornecido${NC}"
        return 1
    fi
    
    if [ ! -d "$project_path" ]; then
        echo -e "${RED}${CROSS} Diretório não encontrado: $project_path${NC}"
        return 1
    fi
    
    if [ ! -f "$project_path/package.json" ]; then
        echo -e "${RED}${CROSS} package.json não encontrado em $project_path${NC}"
        return 1
    fi
    
    echo "$project_path"
    return 0
}

# Menu 1: Instalar localmente
menu_install_local() {
    show_header
    echo -e "${BOLD}${MAGENTA}${ROCKET} Instalação Local${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Esta opção irá:"
    echo "  1. Instalar dependências"
    echo "  2. Criar link global (npm link)"
    echo "  3. Tornar comandos disponíveis globalmente"
    echo ""
    
    if confirm "${ROCKET} Deseja continuar?"; then
        echo ""
        ./scripts/install-local.sh
        pause
    fi
}

# Menu 2: Linkar a projeto
menu_link_project() {
    show_header
    echo -e "${BOLD}${MAGENTA}${LINK} Linkar a Projeto${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    project_path=$(read_project_path)
    if [ $? -eq 0 ]; then
        echo ""
        if confirm "${LINK} Linkar gerador a $project_path?"; then
            echo ""
            ./scripts/link-to-project.sh "$project_path"
            pause
        fi
    else
        pause
    fi
}

# Menu 3: Instalar do caminho
menu_install_from_path() {
    show_header
    echo -e "${BOLD}${MAGENTA}${PACKAGE} Instalar do Caminho Local${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    project_path=$(read_project_path)
    if [ $? -eq 0 ]; then
        echo ""
        if confirm "${PACKAGE} Instalar gerador em $project_path?"; then
            echo ""
            ./scripts/install-from-path.sh "$project_path"
            pause
        fi
    else
        pause
    fi
}

# Menu 4: Criar tarball
menu_create_tarball() {
    show_header
    echo -e "${BOLD}${MAGENTA}${PACKAGE} Criar Tarball${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    read -e -p "${FOLDER} Diretório de saída [./dist]: " output_dir
    output_dir="${output_dir:-./dist}"
    
    echo ""
    if confirm "${PACKAGE} Criar tarball em $output_dir?"; then
        echo ""
        ./scripts/create-tarball.sh "$output_dir"
        pause
    fi
}

# Menu 5: Setup projeto
menu_setup_project() {
    show_header
    echo -e "${BOLD}${MAGENTA}${TOOL} Configurar Jest em Projeto${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Esta opção irá configurar Jest completo no projeto:"
    echo "  • Instalar dependências Jest"
    echo "  • Criar jest.config.js"
    echo "  • Criar setup-jest.ts"
    echo "  • Configurar tsconfig.spec.json"
    echo "  • Adicionar scripts ao package.json"
    echo ""
    
    project_path=$(read_project_path)
    if [ $? -eq 0 ]; then
        echo ""
        if confirm "${TOOL} Configurar Jest em $project_path?"; then
            echo ""
            ./scripts/setup-project.sh "$project_path"
            pause
        fi
    else
        pause
    fi
}

# Menu 6: Criar distribuição
menu_distribute() {
    show_header
    echo -e "${BOLD}${MAGENTA}${PACKAGE} Criar Pacote de Distribuição${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    current_version=$(node -p "require('./package.json').version" 2>/dev/null || echo "1.0.0")
    echo "Versão atual: $current_version"
    echo ""
    
    read -p "Versão [$current_version]: " version
    version="${version:-$current_version}"
    
    read -e -p "${FOLDER} Diretório de saída [./dist]: " output_dir
    output_dir="${output_dir:-./dist}"
    
    echo ""
    echo "Será criado:"
    echo "  • Tarball npm"
    echo "  • Documentação completa"
    echo "  • Script de instalação rápida"
    echo "  • Arquivo ZIP"
    echo ""
    
    if confirm "${PACKAGE} Criar distribuição v$version em $output_dir?"; then
        echo ""
        ./scripts/distribute.sh "$version" "$output_dir"
        pause
    fi
}

# Menu 7: Desinstalar
menu_uninstall() {
    show_header
    echo -e "${BOLD}${MAGENTA}${TRASH} Desinstalar Local${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  Esta ação irá remover o link global do gerador${NC}"
    echo ""
    
    if confirm "${TRASH} Deseja continuar?"; then
        echo ""
        ./scripts/uninstall-local.sh
        pause
    fi
}

# Menu 8: Setup completo
menu_complete_setup() {
    show_header
    echo -e "${BOLD}${MAGENTA}${ROCKET} Setup Completo${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Esta opção realiza setup completo:"
    echo "  1. Instala gerador localmente"
    echo "  2. Configura Jest no projeto"
    echo "  3. Linka gerador ao projeto"
    echo ""
    
    project_path=$(read_project_path)
    if [ $? -eq 0 ]; then
        echo ""
        if confirm "${ROCKET} Realizar setup completo em $project_path?"; then
            echo ""
            echo -e "${CYAN}━━━ Passo 1/3: Instalando gerador ━━━${NC}"
            ./scripts/install-local.sh
            echo ""
            
            echo -e "${CYAN}━━━ Passo 2/3: Configurando Jest ━━━${NC}"
            ./scripts/setup-project.sh "$project_path"
            echo ""
            
            echo -e "${CYAN}━━━ Passo 3/3: Linkando gerador ━━━${NC}"
            ./scripts/link-to-project.sh "$project_path"
            echo ""
            
            echo -e "${GREEN}${CHECK} Setup completo finalizado!${NC}"
            pause
        fi
    else
        pause
    fi
}

# Menu 9: Verificar instalações
menu_check_installations() {
    show_header
    echo -e "${BOLD}${MAGENTA}${INFO} Verificar Instalações${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    
    # Verificar link global
    echo -e "${BOLD}Links globais npm:${NC}"
    if npm ls -g --depth=0 2>/dev/null | grep -q "jest-test-generator"; then
        echo -e "${GREEN}${CHECK} Gerador linkado globalmente${NC}"
        npm ls -g --depth=0 2>/dev/null | grep "jest-test-generator"
    else
        echo -e "${YELLOW}${INFO} Nenhum link global encontrado${NC}"
    fi
    echo ""
    
    # Verificar comandos
    echo -e "${BOLD}Comandos disponíveis:${NC}"
    if command -v ng-test-gen &> /dev/null; then
        echo -e "${GREEN}${CHECK} ng-test-gen${NC}"
        which ng-test-gen
    else
        echo -e "${RED}${CROSS} ng-test-gen não encontrado${NC}"
    fi
    
    if command -v angular-test-generator &> /dev/null; then
        echo -e "${GREEN}${CHECK} angular-test-generator${NC}"
        which angular-test-generator
    else
        echo -e "${RED}${CROSS} angular-test-generator não encontrado${NC}"
    fi
    echo ""
    
    # Procurar instalações locais
    echo -e "${BOLD}Procurando instalações locais...${NC}"
    echo "(Isso pode demorar um pouco)"
    echo ""
    
    found=0
    if [ -d "$HOME/projects" ]; then
        while IFS= read -r -d '' dir; do
            project_dir=$(dirname "$dir")
            project_name=$(basename "$project_dir")
            echo -e "${GREEN}${CHECK}${NC} $project_dir"
            found=$((found + 1))
        done < <(find "$HOME/projects" -type d -path "*/node_modules/@angular-tools/jest-test-generator" -print0 2>/dev/null)
    fi
    
    if [ $found -eq 0 ]; then
        echo -e "${YELLOW}${INFO} Nenhuma instalação local encontrada em ~/projects${NC}"
    else
        echo ""
        echo -e "${GREEN}Total: $found instalação(ões) encontrada(s)${NC}"
    fi
    
    pause
}

# Menu 10: Ajuda
menu_help() {
    show_header
    echo -e "${BOLD}${MAGENTA}${INFO} Ajuda${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${BOLD}Descrição das opções:${NC}"
    echo ""
    echo -e "${GREEN}1. Instalar Localmente${NC}"
    echo "   Instala o gerador usando 'npm link'. Ideal para desenvolvimento."
    echo ""
    echo -e "${GREEN}2. Linkar a Projeto${NC}"
    echo "   Cria link do gerador em um projeto específico."
    echo ""
    echo -e "${GREEN}3. Instalar do Caminho${NC}"
    echo "   Instala cópia do gerador em um projeto."
    echo ""
    echo -e "${GREEN}4. Criar Tarball${NC}"
    echo "   Cria arquivo .tgz para distribuição."
    echo ""
    echo -e "${GREEN}5. Configurar Jest${NC}"
    echo "   Configura Jest completo em um projeto Angular."
    echo ""
    echo -e "${GREEN}6. Criar Distribuição${NC}"
    echo "   Cria pacote completo com docs e scripts."
    echo ""
    echo -e "${GREEN}7. Desinstalar${NC}"
    echo "   Remove link global do gerador."
    echo ""
    echo -e "${GREEN}8. Setup Completo${NC}"
    echo "   Realiza instalação e configuração completa."
    echo ""
    echo -e "${GREEN}9. Verificar Instalações${NC}"
    echo "   Mostra status de links e instalações."
    echo ""
    echo -e "${BOLD}Documentação completa:${NC}"
    echo "  • README.md"
    echo "  • LOCAL_INSTALL.md"
    echo "  • scripts/README.md"
    echo ""
    pause
}

# Menu principal
show_menu() {
    show_header
    show_status
    
    echo -e "${BOLD}${BLUE}━━━━━━━━━━━━━━━━ Menu ━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "  ${GREEN}1${NC}) ${ROCKET} Instalar Localmente (npm link)"
    echo -e "  ${GREEN}2${NC}) ${LINK} Linkar a Projeto"
    echo -e "  ${GREEN}3${NC}) ${PACKAGE} Instalar do Caminho Local"
    echo -e "  ${GREEN}4${NC}) ${PACKAGE} Criar Tarball"
    echo -e "  ${GREEN}5${NC}) ${TOOL} Configurar Jest em Projeto"
    echo -e "  ${GREEN}6${NC}) ${PACKAGE} Criar Distribuição Completa"
    echo -e "  ${GREEN}7${NC}) ${TRASH} Desinstalar Local"
    echo ""
    echo -e "  ${CYAN}8${NC}) ${ROCKET} ${BOLD}Setup Completo${NC} (tudo de uma vez)"
    echo -e "  ${CYAN}9${NC}) ${INFO} Verificar Instalações"
    echo ""
    echo -e "  ${YELLOW}h${NC}) ${INFO} Ajuda"
    echo -e "  ${RED}q${NC}) ${CROSS} Sair"
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

# Loop principal
main() {
    # Verifica se está no diretório correto
    if [ ! -f "package.json" ]; then
        echo -e "${RED}${CROSS} Erro: Execute este script na raiz do projeto angular-jest-test-generator${NC}"
        exit 1
    fi
    
    # Torna scripts executáveis
    chmod +x scripts/*.sh 2>/dev/null || true
    
    while true; do
        show_menu
        read -p "Escolha uma opção: " choice
        
        case $choice in
            1) menu_install_local ;;
            2) menu_link_project ;;
            3) menu_install_from_path ;;
            4) menu_create_tarball ;;
            5) menu_setup_project ;;
            6) menu_distribute ;;
            7) menu_uninstall ;;
            8) menu_complete_setup ;;
            9) menu_check_installations ;;
            h|H) menu_help ;;
            q|Q)
                clear_screen
                echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
                echo -e "${GREEN}${CHECK} Obrigado por usar o Dashboard!${NC}"
                echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
                echo ""
                exit 0
                ;;
            *)
                echo -e "${RED}${CROSS} Opção inválida!${NC}"
                sleep 1
                ;;
        esac
    done
}

# Executar
main


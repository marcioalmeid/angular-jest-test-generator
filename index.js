#!/usr/bin/env node

/**
 * Gerador de Testes Jest para Angular
 * 
 * Script principal que coordena a geração de testes unitários
 * baseado em análise de código Angular.
 * 
 * Uso:
 *   node test-generator/index.js <caminho-arquivo>
 *   npm run generate:test <caminho-arquivo>
 * 
 * Exemplos:
 *   node test-generator/index.js src/app/app.component.ts
 *   node test-generator/index.js src/app/mjml.service.ts
 *   node test-generator/index.js src/app --all
 */

const fs = require('fs');
const path = require('path');
const { analyzeFile } = require('./utils/code-analyzer');
const { generateComponentTest } = require('./templates/component.template');
const { generateServiceTest } = require('./templates/service.template');
const { generatePipeTest } = require('./templates/pipe.template');
const { generateDirectiveTest } = require('./templates/directive.template');

// Cores para output no terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

/**
 * Exibe banner inicial
 */
function showBanner() {
  console.log(`
${colors.blue}${colors.bright}╔═══════════════════════════════════════════════════╗
║   🧪 Gerador de Testes Jest para Angular 🧪      ║
║           Automatize seus testes unitários        ║
╚═══════════════════════════════════════════════════╝${colors.reset}
  `);
}

/**
 * Determina o tipo de arquivo Angular
 */
function getFileType(analysis) {
  if (analysis.isComponent) return 'component';
  if (analysis.isService) return 'service';
  if (analysis.isPipe) return 'pipe';
  if (analysis.isDirective) return 'directive';
  return 'unknown';
}

/**
 * Gera o teste apropriado baseado no tipo
 */
function generateTest(analysis, filePath) {
  const type = getFileType(analysis);
  
  switch (type) {
    case 'component':
      return generateComponentTest(analysis, filePath);
    case 'service':
      return generateServiceTest(analysis, filePath);
    case 'pipe':
      return generatePipeTest(analysis, filePath);
    case 'directive':
      return generateDirectiveTest(analysis, filePath);
    default:
      throw new Error(`Tipo de arquivo não suportado: ${type}`);
  }
}

/**
 * Processa um único arquivo
 */
function processFile(filePath) {
  const absolutePath = path.resolve(filePath);
  
  if (!fs.existsSync(absolutePath)) {
    console.error(`${colors.red}❌ Arquivo não encontrado: ${filePath}${colors.reset}`);
    return false;
  }

  console.log(`${colors.blue}📝 Analisando: ${filePath}${colors.reset}`);
  
  try {
    // Analisa o arquivo
    const analysis = analyzeFile(absolutePath);
    const type = getFileType(analysis);
    
    if (type === 'unknown') {
      console.log(`${colors.yellow}⚠️  Não é um arquivo Angular suportado${colors.reset}`);
      return false;
    }

    console.log(`${colors.blue}   Tipo detectado: ${type.toUpperCase()}${colors.reset}`);
    
    // Gera o conteúdo do teste
    const testContent = generateTest(analysis, absolutePath);
    
    // Define o caminho do arquivo de teste
    const testPath = absolutePath.replace(/\.ts$/, '.spec.ts');
    
    // Verifica se já existe
    if (fs.existsSync(testPath)) {
      console.log(`${colors.yellow}⚠️  Arquivo de teste já existe: ${testPath}${colors.reset}`);
      console.log(`${colors.yellow}   Use --force para sobrescrever${colors.reset}`);
      return false;
    }
    
    // Escreve o arquivo de teste
    fs.writeFileSync(testPath, testContent, 'utf8');
    
    console.log(`${colors.green}✅ Teste gerado com sucesso: ${testPath}${colors.reset}`);
    console.log(`${colors.green}   Classes: ${analysis.className}${colors.reset}`);
    console.log(`${colors.green}   Métodos encontrados: ${analysis.methods.length}${colors.reset}`);
    
    return true;
  } catch (error) {
    console.error(`${colors.red}❌ Erro ao processar arquivo:${colors.reset}`, error.message);
    return false;
  }
}

/**
 * Processa todos os arquivos em um diretório
 */
function processDirectory(dirPath, options = {}) {
  const files = fs.readdirSync(dirPath);
  let processed = 0;
  let generated = 0;
  
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !file.includes('node_modules') && !file.includes('dist')) {
      const result = processDirectory(fullPath, options);
      processed += result.processed;
      generated += result.generated;
    } else if (file.endsWith('.ts') && !file.endsWith('.spec.ts')) {
      processed++;
      if (processFile(fullPath)) {
        generated++;
      }
    }
  });
  
  return { processed, generated };
}

/**
 * Função principal
 */
function main() {
  showBanner();
  
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`${colors.yellow}Uso:${colors.reset}`);
    console.log(`  node test-generator/index.js <arquivo-ou-diretorio>`);
    console.log(`  node test-generator/index.js src/app/app.component.ts`);
    console.log(`  node test-generator/index.js src/app --all`);
    console.log('');
    console.log(`${colors.yellow}Opções:${colors.reset}`);
    console.log(`  --all     Processa todos os arquivos no diretório`);
    console.log(`  --force   Sobrescreve testes existentes`);
    process.exit(1);
  }
  
  const target = args[0];
  const options = {
    all: args.includes('--all'),
    force: args.includes('--force'),
  };
  
  const stat = fs.statSync(target);
  
  if (stat.isDirectory() && options.all) {
    console.log(`${colors.blue}📁 Processando diretório: ${target}${colors.reset}\n`);
    const result = processDirectory(target, options);
    console.log(`\n${colors.green}${colors.bright}═══════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.green}✅ Resumo:${colors.reset}`);
    console.log(`${colors.green}   Arquivos processados: ${result.processed}${colors.reset}`);
    console.log(`${colors.green}   Testes gerados: ${result.generated}${colors.reset}`);
    console.log(`${colors.green}${colors.bright}═══════════════════════════════════════════════════${colors.reset}\n`);
  } else if (stat.isFile()) {
    processFile(target);
  } else {
    console.error(`${colors.red}❌ Caminho inválido: ${target}${colors.reset}`);
    process.exit(1);
  }
}

// Executa o script
if (require.main === module) {
  main();
}

module.exports = { processFile, processDirectory };


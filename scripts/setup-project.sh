#!/bin/bash

# Script para configurar Jest em um projeto Angular
# Uso: ./scripts/setup-project.sh /caminho/do/projeto

set -e

PROJECT_PATH=$1

if [ -z "$PROJECT_PATH" ]; then
    echo "❌ Erro: Forneça o caminho do projeto"
    echo "Uso: $0 /caminho/do/projeto"
    exit 1
fi

if [ ! -d "$PROJECT_PATH" ]; then
    echo "❌ Erro: Diretório não encontrado: $PROJECT_PATH"
    exit 1
fi

if [ ! -f "$PROJECT_PATH/package.json" ]; then
    echo "❌ Erro: package.json não encontrado em $PROJECT_PATH"
    exit 1
fi

echo "🛠️  Configurando Jest no projeto Angular..."
echo "   Projeto: $PROJECT_PATH"
echo ""

cd "$PROJECT_PATH"

# Instala dependências Jest
echo "📦 Instalando dependências Jest..."
npm install --save-dev jest jest-preset-angular @types/jest
echo ""

# Cria jest.config.js
echo "📝 Criando jest.config.js..."
cat > jest.config.js << 'EOF'
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.spec.ts',
    '!src/app/**/*.module.ts',
  ],
  coverageReporters: ['html', 'text', 'lcov'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
  },
};
EOF
echo "   ✅ jest.config.js criado"

# Cria setup-jest.ts
echo "📝 Criando setup-jest.ts..."
cat > setup-jest.ts << 'EOF'
import 'jest-preset-angular/setup-jest';

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// Mock do sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock as any;

// Configurações globais do Jest
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
    };
  },
});
EOF
echo "   ✅ setup-jest.ts criado"

# Atualiza ou cria tsconfig.spec.json
echo "📝 Configurando tsconfig.spec.json..."
cat > tsconfig.spec.json << 'EOF'
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jest", "node"],
    "esModuleInterop": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
EOF
echo "   ✅ tsconfig.spec.json criado"

# Atualiza package.json com scripts
echo "📝 Atualizando package.json scripts..."
node << 'EOF'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.scripts = pkg.scripts || {};
pkg.scripts['test'] = 'jest';
pkg.scripts['test:watch'] = 'jest --watch';
pkg.scripts['test:coverage'] = 'jest --coverage';
pkg.scripts['generate:test'] = 'ng-test-gen';

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('   ✅ Scripts adicionados ao package.json');
EOF

echo ""
echo "✅ Configuração concluída!"
echo ""
echo "📝 Arquivos criados:"
echo "   ✓ jest.config.js"
echo "   ✓ setup-jest.ts"
echo "   ✓ tsconfig.spec.json"
echo ""
echo "📝 Scripts adicionados ao package.json:"
echo "   ✓ npm test"
echo "   ✓ npm run test:watch"
echo "   ✓ npm run test:coverage"
echo "   ✓ npm run generate:test"
echo ""
echo "🚀 Próximos passos:"
echo "   1. Instale o gerador: npm link @angular-tools/jest-test-generator"
echo "   2. Gere um teste: npm run generate:test src/app/seu-arquivo.ts"
echo "   3. Execute os testes: npm test"
echo ""


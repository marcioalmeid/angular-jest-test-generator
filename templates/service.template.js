/**
 * Template de Teste para Serviços Angular
 * 
 * Gera testes unitários completos para serviços Angular,
 * incluindo testes de injeção, métodos e dependências.
 */

const { generateMockImports, generateMockProviders } = require('../utils/mock-generator');
const { formatCode } = require('../utils/formatter');

/**
 * Gera teste completo para um serviço
 */
function generateServiceTest(analysis, filePath) {
  const sections = [
    generateImports(analysis),
    generateDescribeBlock(analysis),
  ];
  
  return formatCode(sections.join('\n\n'));
}

/**
 * Gera os imports necessários
 */
function generateImports(analysis) {
  const { className, fileName } = analysis;
  const mockImports = generateMockImports(analysis);
  
  return `import { TestBed } from '@angular/core/testing';
import { ${className} } from './${fileName.replace('.ts', '')}';
${mockImports}`;
}

/**
 * Gera o bloco describe principal
 */
function generateDescribeBlock(analysis) {
  const { className } = analysis;
  
  return `describe('${className}', () => {
  let service: ${className};
${generateMockDeclarations(analysis)}

  beforeEach(() => {
    TestBed.configureTestingModule({
${generateProvidersSection(analysis)}
    });
    
    service = TestBed.inject(${className});
${generateMockInitialization(analysis)}
  });

${generateBasicTests(analysis)}
${generateMethodTests(analysis)}
${generateDependencyTests(analysis)}
});`;
}

/**
 * Gera declarações de mocks
 */
function generateMockDeclarations(analysis) {
  const { dependencies } = analysis;
  
  if (dependencies.length === 0) return '';
  
  return dependencies.map(dep => {
    return `  let mock${dep.type}: jest.Mocked<${dep.type}>;`;
  }).join('\n');
}

/**
 * Gera seção de providers
 */
function generateProvidersSection(analysis) {
  const providers = generateMockProviders(analysis);
  
  if (!providers || providers.length === 0) return '';
  
  return `      providers: [
        ${analysis.className},
${providers.map(p => `        ${p}`).join(',\n')}
      ]`;
}

/**
 * Gera inicialização de mocks
 */
function generateMockInitialization(analysis) {
  const { dependencies } = analysis;
  
  if (dependencies.length === 0) return '';
  
  return '\n' + dependencies.map(dep => {
    return `    mock${dep.type} = TestBed.inject(${dep.type}) as jest.Mocked<${dep.type}>;`;
  }).join('\n');
}

/**
 * Gera testes básicos
 */
function generateBasicTests(analysis) {
  const { className, decoratorMetadata } = analysis;
  
  return `  describe('Criação do Serviço', () => {
    it('deve ser criado com sucesso', () => {
      expect(service).toBeTruthy();
    });

    it('deve ser uma instância de ${className}', () => {
      expect(service).toBeInstanceOf(${className});
    });
${decoratorMetadata.providedIn ? `
    it('deve ser injetável no escopo "${decoratorMetadata.providedIn}"', () => {
      expect(service).toBeDefined();
    });` : ''}
  });`;
}

/**
 * Gera testes de métodos
 */
function generateMethodTests(analysis) {
  const { methods } = analysis;
  
  const publicMethods = methods.filter(m => m.visibility === 'public');
  
  if (publicMethods.length === 0) return '';
  
  return `  describe('Métodos do Serviço', () => {
${publicMethods.map(method => generateMethodTest(method, analysis)).join('\n\n')}
  });`;
}

/**
 * Gera teste para um método específico
 */
function generateMethodTest(method, analysis) {
  const { name, returnType, params, isAsync } = method;
  const awaitKeyword = isAsync ? 'await ' : '';
  
  return `    ${isAsync ? 'it' : 'it'}('deve executar ${name}() e retornar resultado esperado', ${isAsync ? 'async ' : ''}() => {
      // Arrange
      ${generateMethodArrangement(method, analysis)}
      
      // Act
      const result = ${awaitKeyword}service.${name}(${generateMethodParams(params)});
      
      // Assert
      ${generateMethodAssertion(method, returnType)}
    });
${generateMethodErrorTest(method)}`;
}

/**
 * Gera seção Arrange do teste de método
 */
function generateMethodArrangement(method, analysis) {
  const arrangements = [];
  
  // Gera valores para parâmetros com contexto
  if (method.params.length > 0) {
    method.params.forEach(p => {
      arrangements.push(`const ${p.name} = ${getMockValue(p.type, p.name)};`);
    });
  }
  
  // Gera mocks de dependências se necessário
  const { dependencies } = analysis;
  if (dependencies.length > 0 && method.returnType !== 'void') {
    const expectedValue = getMockValue(method.returnType);
    arrangements.push(`const expectedResult = ${expectedValue};`);
  }
  
  if (arrangements.length === 0) {
    return '// Sem configuração necessária';
  }
  
  return arrangements.join('\n      ');
}

/**
 * Gera parâmetros do método
 */
function generateMethodParams(params) {
  if (params.length === 0) return '';
  return params.map(p => p.name).join(', ');
}

/**
 * Gera seção Assert do teste de método
 */
function generateMethodAssertion(method, returnType) {
  if (returnType === 'void') {
    return `expect(result).toBeUndefined();\n      // TODO: Adicionar asserções adicionais conforme necessário`;
  }
  
  if (returnType.includes('Observable')) {
    return `expect(result).toBeDefined();\n      // TODO: Testar Observable com subscribe ou firstValueFrom`;
  }
  
  if (returnType.includes('Promise')) {
    return `expect(result).toBeDefined();\n      // TODO: Adicionar asserções para o valor resolvido`;
  }
  
  return `expect(result).toBeDefined();\n      // TODO: Validar o resultado específico do método`;
}

/**
 * Gera teste de erro para método
 */
function generateMethodErrorTest(method) {
  if (method.returnType === 'void') return '';
  
  // Determina o tipo de asserção baseado no retorno
  let assertion = 'not.toThrow';
  if (method.isAsync || method.returnType.includes('Promise')) {
    assertion = 'rejects.toThrow';
  } else if (method.returnType.includes('Observable')) {
    // Para Observables, não testamos throw direto
    return '';
  }
  
  return `
    it('deve tratar erros em ${method.name}() adequadamente', ${method.isAsync ? 'async ' : ''}() => {
      // Arrange
      // TODO: Configurar cenário de erro conforme sua lógica de negócio
      
      // Act & Assert
      // Este teste deve ser customizado baseado no comportamento esperado do método
      ${method.isAsync ? 'await ' : ''}expect(() => {
        ${method.isAsync ? 'return ' : ''}service.${method.name}(${generateMockParams(method.params)});
      }).${assertion}();
    });`;
}

/**
 * Gera parâmetros mock
 */
function generateMockParams(params) {
  if (params.length === 0) return '';
  return params.map(p => getMockValue(p.type)).join(', ');
}

/**
 * Gera testes de dependências
 */
function generateDependencyTests(analysis) {
  const { dependencies } = analysis;
  
  if (dependencies.length === 0) return '';
  
  return `  describe('Dependências', () => {
${dependencies.map(dep => generateDependencyTest(dep)).join('\n\n')}
  });`;
}

/**
 * Gera teste para uma dependência específica
 */
function generateDependencyTest(dependency) {
  const { name, type } = dependency;
  
  return `    it('deve ter ${type} injetado corretamente', () => {
      expect((service as any).${name}).toBeDefined();
      expect((service as any).${name}).toBe(mock${type});
    });`;
}

/**
 * Retorna valor mock baseado no tipo
 */
function getMockValue(type, paramName = '') {
  // Tenta inferir valor baseado no nome do parâmetro
  const lowerName = paramName.toLowerCase();
  
  // Detecção inteligente baseada no nome
  if (lowerName.includes('mjml') || lowerName.includes('xml')) {
    return "'<mjml><mj-body><mj-section><mj-column><mj-text>Test</mj-text></mj-column></mj-section></mj-body></mjml>'";
  }
  
  if (lowerName.includes('json')) {
    return '{ tagName: "mjml", children: [] }';
  }
  
  if (lowerName.includes('email')) {
    return "'test@example.com'";
  }
  
  if (lowerName.includes('url')) {
    return "'https://example.com'";
  }
  
  if (lowerName.includes('id')) {
    return '1';
  }
  
  const typeMap = {
    'string': "'test-value'",
    'number': '42',
    'boolean': 'true',
    'any': '{}',
    'void': 'undefined',
    'Date': 'new Date()',
    'Array': '[]',
    'object': '{}',
  };
  
  // Tipos genéricos
  if (type.includes('[]')) return '[]';
  if (type.includes('Array<')) return '[]';
  if (type.includes('Observable')) return 'of({})';
  if (type.includes('Promise')) return 'Promise.resolve({})';
  
  return typeMap[type] || '{}';
}

module.exports = {
  generateServiceTest,
};


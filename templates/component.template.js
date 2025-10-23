/**
 * Template de Teste para Componentes Angular
 * 
 * Gera testes unitários completos para componentes Angular,
 * incluindo testes de criação, inputs, outputs, métodos e lifecycle hooks.
 */

const { generateMockImports, generateMockProviders } = require('../utils/mock-generator');
const { formatCode } = require('../utils/formatter');

/**
 * Gera teste completo para um componente
 */
function generateComponentTest(analysis, filePath) {
  const { className, dependencies, methods, properties, decoratorMetadata, interfaces } = analysis;
  
  const hasOnInit = interfaces.includes('OnInit');
  const hasOnDestroy = interfaces.includes('OnDestroy');
  const hasOnChanges = interfaces.includes('OnChanges');
  
  const sections = [
    generateImports(analysis),
    generateDescribeBlock(analysis, {
      hasOnInit,
      hasOnDestroy,
      hasOnChanges,
    }),
  ];
  
  return formatCode(sections.join('\n\n'));
}

/**
 * Gera os imports necessários
 */
function generateImports(analysis) {
  const { className, fileName } = analysis;
  const mockImports = generateMockImports(analysis);
  
  return `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${className} } from './${fileName.replace('.ts', '')}';
${mockImports}`;
}

/**
 * Gera o bloco describe principal
 */
function generateDescribeBlock(analysis, options) {
  const { className } = analysis;
  
  return `describe('${className}', () => {
  let component: ${className};
  let fixture: ComponentFixture<${className}>;
${generateMockDeclarations(analysis)}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [${className}],
${generateMockProvidersSection(analysis)}
    }).compileComponents();

    fixture = TestBed.createComponent(${className});
    component = fixture.componentInstance;
${generateMockInitialization(analysis)}
    fixture.detectChanges();
  });

${generateBasicTests(analysis)}
${generateLifecycleTests(analysis, options)}
${generatePropertyTests(analysis)}
${generateMethodTests(analysis)}
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
function generateMockProvidersSection(analysis) {
  const providers = generateMockProviders(analysis);
  
  if (!providers || providers.length === 0) return '';
  
  return `      providers: [
${providers.map(p => `        ${p}`).join(',\n')}
      ],`;
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
  const { className } = analysis;
  
  return `  describe('Criação do Componente', () => {
    it('deve criar o componente com sucesso', () => {
      expect(component).toBeTruthy();
    });

    it('deve ser uma instância de ${className}', () => {
      expect(component).toBeInstanceOf(${className});
    });

    it('deve compilar o template corretamente', () => {
      expect(fixture.nativeElement).toBeTruthy();
    });
  });`;
}

/**
 * Gera testes de lifecycle hooks
 */
function generateLifecycleTests(analysis, options) {
  const tests = [];
  
  if (options.hasOnInit) {
    tests.push(`  describe('ngOnInit', () => {
    it('deve executar a inicialização corretamente', () => {
      // Arrange
      const spy = jest.spyOn(component, 'ngOnInit');
      
      // Act
      component.ngOnInit();
      
      // Assert
      expect(spy).toHaveBeenCalled();
    });
  });`);
  }
  
  if (options.hasOnDestroy) {
    tests.push(`  describe('ngOnDestroy', () => {
    it('deve limpar recursos ao destruir', () => {
      // Arrange
      const spy = jest.spyOn(component, 'ngOnDestroy');
      
      // Act
      component.ngOnDestroy();
      
      // Assert
      expect(spy).toHaveBeenCalled();
    });
  });`);
  }
  
  if (options.hasOnChanges) {
    tests.push(`  describe('ngOnChanges', () => {
    it('deve responder a mudanças de input', () => {
      // Arrange
      const spy = jest.spyOn(component, 'ngOnChanges');
      const changes = {};
      
      // Act
      component.ngOnChanges(changes);
      
      // Assert
      expect(spy).toHaveBeenCalledWith(changes);
    });
  });`);
  }
  
  return tests.join('\n\n');
}

/**
 * Gera testes de propriedades
 */
function generatePropertyTests(analysis) {
  const { properties } = analysis;
  
  const publicProps = properties.filter(p => p.visibility === 'public' && !p.name.startsWith('_'));
  
  if (publicProps.length === 0) return '';
  
  return `  describe('Propriedades', () => {
${publicProps.map(prop => generatePropertyTest(prop)).join('\n\n')}
  });`;
}

/**
 * Gera teste para uma propriedade específica
 */
function generatePropertyTest(property) {
  const { name, type } = property;
  const mockValue = getMockValue(type);
  
  return `    it('deve ter a propriedade "${name}" definida', () => {
      expect(component.${name}).toBeDefined();
    });

    it('deve permitir atribuir valor a "${name}"', () => {
      // Arrange
      const value = ${mockValue};
      
      // Act
      component.${name} = value;
      
      // Assert
      expect(component.${name}).toBe(value);
    });`;
}

/**
 * Gera testes de métodos
 */
function generateMethodTests(analysis) {
  const { methods } = analysis;
  
  const publicMethods = methods.filter(m => 
    m.visibility === 'public' && 
    !['ngOnInit', 'ngOnDestroy', 'ngOnChanges', 'ngAfterViewInit'].includes(m.name)
  );
  
  if (publicMethods.length === 0) return '';
  
  return `  describe('Métodos', () => {
${publicMethods.map(method => generateMethodTest(method)).join('\n\n')}
  });`;
}

/**
 * Gera teste para um método específico
 */
function generateMethodTest(method) {
  const { name, returnType, params, isAsync } = method;
  const awaitKeyword = isAsync ? 'await ' : '';
  
  // Gera valores mock para parâmetros
  const paramValues = params.map(p => getMockValue(p.type));
  const paramArgs = paramValues.join(', ');
  
  return `    ${isAsync ? 'it' : 'it'}('deve executar ${name}() corretamente', ${isAsync ? 'async ' : ''}() => {
      // Arrange
      ${generateMethodArrangement(method)}
      
      // Act
      const result = ${awaitKeyword}component.${name}(${paramArgs});
      
      // Assert
      ${generateMethodAssertion(method, returnType)}
    });`;
}

/**
 * Gera seção Arrange do teste de método
 */
function generateMethodArrangement(method) {
  if (method.params.length === 0) return '// Sem parâmetros necessários';
  
  return method.params.map(p => {
    return `const ${p.name} = ${getMockValue(p.type)};`;
  }).join('\n      ');
}

/**
 * Gera seção Assert do teste de método
 */
function generateMethodAssertion(method, returnType) {
  if (returnType === 'void') {
    return 'expect(result).toBeUndefined();';
  }
  
  return 'expect(result).toBeDefined();';
}

/**
 * Retorna valor mock baseado no tipo
 */
function getMockValue(type, paramName = '') {
  // Tenta inferir valor baseado no nome
  const lowerName = paramName.toLowerCase();
  
  if (lowerName.includes('mjml') || lowerName.includes('template')) {
    return "'<mjml><mj-body></mj-body></mjml>'";
  }
  
  if (lowerName.includes('email')) {
    return "'test@example.com'";
  }
  
  if (lowerName.includes('name') || lowerName.includes('title')) {
    return "'Test Value'";
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
  generateComponentTest,
};


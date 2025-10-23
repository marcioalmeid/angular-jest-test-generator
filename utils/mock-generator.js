/**
 * Gerador de Mocks
 * 
 * Utilitários para gerar mocks de dependências Angular
 * de forma automática e inteligente.
 */

/**
 * Gera imports necessários para os mocks
 */
function generateMockImports(analysis) {
  const { dependencies } = analysis;
  
  if (dependencies.length === 0) return '';
  
  const imports = [];
  const uniqueTypes = new Set();
  
  dependencies.forEach(dep => {
    if (!uniqueTypes.has(dep.type)) {
      uniqueTypes.add(dep.type);
      
      // Detecta se é um serviço do RxJS
      if (dep.type.includes('Http')) {
        imports.push(`import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';`);
        imports.push(`import { provideHttpClient } from '@angular/common/http';`);
      } else if (dep.type === 'Router') {
        imports.push(`import { provideRouter } from '@angular/router';`);
      } else if (dep.type === 'ActivatedRoute') {
        imports.push(`import { ActivatedRoute } from '@angular/router';`);
      }
    }
  });
  
  // Adiciona import do RxJS se necessário
  const needsRxJS = dependencies.some(dep => 
    dep.type.includes('Observable') || dep.type.includes('Subject')
  );
  
  if (needsRxJS) {
    imports.push(`import { of, Subject } from 'rxjs';`);
  }
  
  return imports.join('\n');
}

/**
 * Gera providers de mock para o TestBed
 */
function generateMockProviders(analysis) {
  const { dependencies } = analysis;
  
  if (dependencies.length === 0) return [];
  
  const providers = [];
  
  dependencies.forEach(dep => {
    const mockProvider = createMockProvider(dep);
    if (mockProvider) {
      providers.push(mockProvider);
    }
  });
  
  return providers;
}

/**
 * Cria um provider de mock para uma dependência
 */
function createMockProvider(dependency) {
  const { name, type } = dependency;
  
  // Casos especiais
  if (type.includes('Http')) {
    return `provideHttpClient(),\n        provideHttpClientTesting()`;
  }
  
  if (type === 'Router') {
    return `provideRouter([])`;
  }
  
  if (type === 'ActivatedRoute') {
    return `{
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {}, queryParams: {} },
            params: of({}),
            queryParams: of({}),
          }
        }`;
  }
  
  // Mock genérico
  return `{
          provide: ${type},
          useValue: createMock${type}()
        }`;
}

/**
 * Gera função de criação de mock
 */
function generateMockCreator(type) {
  return `
function createMock${type}(): jest.Mocked<${type}> {
  return {
    // TODO: Adicionar métodos mockados conforme necessário
  } as any;
}`;
}

/**
 * Gera mock para um método
 */
function generateMethodMock(method) {
  const { name, returnType, params } = method;
  
  let mockImplementation = 'jest.fn()';
  
  // Ajusta o mock baseado no tipo de retorno
  if (returnType.includes('Observable')) {
    mockImplementation = `jest.fn().mockReturnValue(of({}))`;
  } else if (returnType.includes('Promise')) {
    mockImplementation = `jest.fn().mockResolvedValue({})`;
  } else if (returnType === 'void') {
    mockImplementation = `jest.fn().mockReturnValue(undefined)`;
  } else {
    const defaultValue = getDefaultMockValue(returnType);
    mockImplementation = `jest.fn().mockReturnValue(${defaultValue})`;
  }
  
  return `${name}: ${mockImplementation}`;
}

/**
 * Retorna valor mock padrão baseado no tipo
 */
function getDefaultMockValue(type, paramName = '') {
  // Tenta inferir valor baseado no nome do parâmetro
  const lowerName = paramName.toLowerCase();
  
  // Detecção inteligente baseada no nome
  if (lowerName.includes('mjml') || lowerName.includes('xml') || lowerName.includes('html')) {
    return "'<mjml><mj-body><mj-section><mj-column><mj-text>Test</mj-text></mj-column></mj-section></mj-body></mjml>'";
  }
  
  if (lowerName.includes('email')) {
    return "'test@example.com'";
  }
  
  if (lowerName.includes('url') || lowerName.includes('link')) {
    return "'https://example.com'";
  }
  
  if (lowerName.includes('name') || lowerName.includes('title')) {
    return "'Test Name'";
  }
  
  if (lowerName.includes('id')) {
    return '1';
  }
  
  if (lowerName.includes('count') || lowerName.includes('size') || lowerName.includes('length')) {
    return '10';
  }
  
  // Mapeamento por tipo
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
  
  if (type.includes('[]')) return '[]';
  if (type.includes('Array<')) return '[]';
  
  return typeMap[type] || '{}';
}

/**
 * Gera mock completo para uma classe
 */
function generateClassMock(className, methods) {
  const mockMethods = methods.map(method => generateMethodMock(method));
  
  return `const mock${className} = {
  ${mockMethods.join(',\n  ')}
} as jest.Mocked<${className}>;`;
}

/**
 * Gera mock para HttpClient
 */
function generateHttpClientMock() {
  return `const mockHttpClient = {
  get: jest.fn().mockReturnValue(of({})),
  post: jest.fn().mockReturnValue(of({})),
  put: jest.fn().mockReturnValue(of({})),
  delete: jest.fn().mockReturnValue(of({})),
  patch: jest.fn().mockReturnValue(of({})),
} as any;`;
}

/**
 * Gera mock para Router
 */
function generateRouterMock() {
  return `const mockRouter = {
  navigate: jest.fn().mockResolvedValue(true),
  navigateByUrl: jest.fn().mockResolvedValue(true),
  url: '/',
  events: of({}),
} as any;`;
}

/**
 * Gera mock para ActivatedRoute
 */
function generateActivatedRouteMock() {
  return `const mockActivatedRoute = {
  snapshot: {
    params: {},
    queryParams: {},
    data: {},
  },
  params: of({}),
  queryParams: of({}),
  data: of({}),
} as any;`;
}

/**
 * Gera spy para um método
 */
function generateMethodSpy(className, methodName) {
  return `jest.spyOn(${className.toLowerCase()}, '${methodName}')`;
}

/**
 * Gera configuração de mock para um método com retorno específico
 */
function generateMethodMockWithReturn(mockName, methodName, returnValue) {
  return `${mockName}.${methodName}.mockReturnValue(${returnValue});`;
}

/**
 * Gera configuração de mock para um método assíncrono
 */
function generateAsyncMethodMock(mockName, methodName, resolvedValue) {
  return `${mockName}.${methodName}.mockResolvedValue(${resolvedValue});`;
}

/**
 * Gera configuração de mock para um método que lança erro
 */
function generateMethodMockWithError(mockName, methodName, errorMessage) {
  return `${mockName}.${methodName}.mockRejectedValue(new Error('${errorMessage}'));`;
}

module.exports = {
  generateMockImports,
  generateMockProviders,
  createMockProvider,
  generateMockCreator,
  generateMethodMock,
  generateClassMock,
  generateHttpClientMock,
  generateRouterMock,
  generateActivatedRouteMock,
  generateMethodSpy,
  generateMethodMockWithReturn,
  generateAsyncMethodMock,
  generateMethodMockWithError,
};


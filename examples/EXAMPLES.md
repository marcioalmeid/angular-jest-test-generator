# 📚 Exemplos de Uso do Gerador de Testes

Este diretório contém exemplos práticos de como usar o gerador de testes Jest para Angular.

## 📁 Arquivo de Exemplo

### `simple-example.ts`

Componente Angular simples demonstrando:
- ✅ @Input() e @Output()
- ✅ Lifecycle hook (OnInit)
- ✅ Métodos públicos
- ✅ Propriedades

## 🚀 Como Usar

### 1. Gerar Teste do Exemplo

```bash
cd mjml_test
npm run generate:test test-generator/examples/simple-example.ts
```

### 2. Ver o Teste Gerado

O arquivo `simple-example.spec.ts` será criado automaticamente com:

```typescript
/**
 * Teste gerado automaticamente
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleComponent } from './simple-example';

describe('SimpleComponent', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Criação do Componente', () => {
    it('deve criar o componente com sucesso', () => {
      expect(component).toBeTruthy();
    });

    it('deve ser uma instância de SimpleComponent', () => {
      expect(component).toBeInstanceOf(SimpleComponent);
    });
  });

  describe('ngOnInit', () => {
    it('deve executar a inicialização corretamente', () => {
      const spy = jest.spyOn(component, 'ngOnInit');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });

    it('deve emitir evento loaded', (done) => {
      component.loaded.subscribe(() => {
        expect(true).toBe(true);
        done();
      });
      component.ngOnInit();
    });
  });

  describe('Propriedades', () => {
    it('deve ter title definido', () => {
      expect(component.title).toBeDefined();
    });

    it('deve ter count iniciando em 0', () => {
      expect(component.count).toBe(0);
    });
  });

  describe('Métodos', () => {
    it('deve incrementar count', () => {
      component.increment();
      expect(component.count).toBe(1);
    });

    it('deve resetar count para 0', () => {
      component.count = 5;
      component.reset();
      expect(component.count).toBe(0);
    });
  });
});
```

### 3. Executar os Testes

```bash
npm test simple-example
```

## 🎯 O Que Foi Gerado Automaticamente

### ✅ Estrutura Completa

- **TestBed.configureTestingModule**: Configuração do módulo de teste
- **beforeEach**: Setup executado antes de cada teste
- **fixture e component**: Instâncias para testes

### ✅ Blocos de Teste

- **Criação do Componente**: Verifica se componente é criado
- **ngOnInit**: Testa o lifecycle hook
- **Propriedades**: Testa propriedades da classe
- **Métodos**: Testa cada método público

### ✅ Testes de Input/Output

- Para **@Input()**: Testes de atribuição de valor
- Para **@Output()**: Testes de emissão de eventos

## 💡 Personalizando os Testes

### Adicionar Testes Específicos

```typescript
describe('Lógica de Negócio', () => {
  it('deve incrementar múltiplas vezes', () => {
    component.increment();
    component.increment();
    component.increment();
    expect(component.count).toBe(3);
  });

  it('não deve permitir count negativo', () => {
    component.count = 0;
    // Adicione sua lógica de validação
    expect(component.count).toBeGreaterThanOrEqual(0);
  });
});
```

### Testar Integração com Template

```typescript
it('deve exibir o título no template', () => {
  component.title = 'Meu Título';
  fixture.detectChanges();
  
  const compiled = fixture.nativeElement;
  expect(compiled.querySelector('h1').textContent).toBe('Meu Título');
});
```

### Testar Eventos

```typescript
it('deve emitir evento ao carregar', (done) => {
  component.loaded.subscribe(() => {
    expect(true).toBe(true);
    done();
  });
  
  component.ngOnInit();
});
```

## 📊 Resultado Esperado

Ao executar `npm test`:

```
PASS  test-generator/examples/simple-example.spec.ts
  SimpleComponent
    Criação do Componente
      ✓ deve criar o componente com sucesso (23ms)
      ✓ deve ser uma instância de SimpleComponent (5ms)
    ngOnInit
      ✓ deve executar a inicialização corretamente (8ms)
      ✓ deve emitir evento loaded (12ms)
    Propriedades
      ✓ deve ter title definido (3ms)
      ✓ deve ter count iniciando em 0 (2ms)
    Métodos
      ✓ deve incrementar count (4ms)
      ✓ deve resetar count para 0 (3ms)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Time:        1.234s
```

## 🔍 Análise com ts-morph

Para o exemplo acima, o `ts-morph` extrai:

```javascript
{
  className: 'SimpleComponent',
  isComponent: true,
  decoratorMetadata: {
    selector: 'app-simple',
    template: '<h1>{{ title }}</h1>'
  },
  interfaces: ['OnInit'],
  inputProperties: [
    { name: 'title', type: 'string', required: false }
  ],
  outputProperties: [
    { name: 'loaded', type: 'EventEmitter<void>' }
  ],
  properties: [
    { name: 'count', type: 'number', visibility: 'public' }
  ],
  methods: [
    { name: 'ngOnInit', returnType: 'void', params: [] },
    { name: 'increment', returnType: 'void', params: [] },
    { name: 'reset', returnType: 'void', params: [] }
  ]
}
```

## 🚀 Próximos Passos

1. ✅ Gere o teste: `npm run generate:test test-generator/examples/simple-example.ts`
2. ✅ Execute: `npm test`
3. ✅ Veja a cobertura: `npm run test:coverage`
4. ✅ Aplique no seu projeto: `npm run generate:test src/app`

## 📖 Mais Informações

- **Documentação Completa**: `test-generator/README.md`
- **Guia Rápido**: `test-generator/QUICK_START.md`
- **Jest Docs**: https://jestjs.io/
- **Angular Testing**: https://angular.io/guide/testing

---

**Dica**: Comece simples e adicione complexidade conforme necessário!

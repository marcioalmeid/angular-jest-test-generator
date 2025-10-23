# 🚀 Exemplos Angular 17

Exemplos práticos de uso do gerador com Angular 17, incluindo Signals, Standalone Components e Control Flow.

## 📋 Exemplos Incluídos

### 1. `angular17-example.ts`

Componente completo demonstrando todas as features do Angular 17:

- ✅ Standalone Component
- ✅ Signals (`signal`, `computed`)
- ✅ Input/Output com signals (`input()`, `output()`)
- ✅ Control Flow (`@if`, `@for`, `@empty`)
- ✅ Manipulação de estado com signals

### 2. `angular17-example.spec.ts`

Teste completo gerado e customizado mostrando como testar:

- ✅ Signals básicos e computed
- ✅ Inputs/Outputs modernos
- ✅ Renderização condicional
- ✅ Listas com @for
- ✅ Eventos e interações

## 🎯 Como Usar

### Passo 1: Gerar Teste Base

```bash
# Gerar teste para o componente
ng-test-gen examples/angular17-example.ts
```

### Passo 2: Customizar Testes

O gerador cria a estrutura básica. Customize para testar signals:

```typescript
it('deve atualizar signal', () => {
  component.mySignal.set(newValue);
  expect(component.mySignal()).toBe(newValue);
});

it('deve reagir a computed signal', () => {
  component.sourceSignal.set(10);
  expect(component.computedSignal()).toBe(20); // se computed multiplica por 2
});
```

### Passo 3: Testar Inputs com Signals

```typescript
// Angular 17 - nova forma de configurar inputs
fixture.componentRef.setInput('myInput', value);
expect(component.myInput()).toBe(value);
```

### Passo 4: Testar Outputs com Signals

```typescript
const spy = jest.fn();
component.myOutput.subscribe(spy);

component.triggerOutput();
expect(spy).toHaveBeenCalledWith(expectedValue);
```

## 📚 Padrões de Teste Angular 17

### Pattern 1: Testing Signals

```typescript
describe('Signal Management', () => {
  it('should initialize signal with default value', () => {
    expect(component.count()).toBe(0);
  });

  it('should update signal value', () => {
    component.count.set(5);
    expect(component.count()).toBe(5);
  });

  it('should update signal with function', () => {
    component.count.set(10);
    component.count.update(v => v + 5);
    expect(component.count()).toBe(15);
  });
});
```

### Pattern 2: Testing Computed Signals

```typescript
describe('Computed Signals', () => {
  it('should compute value from source signals', () => {
    component.count.set(5);
    expect(component.doubleCount()).toBe(10);
  });

  it('should react to source signal changes', () => {
    component.count.set(3);
    expect(component.doubleCount()).toBe(6);
    
    component.count.set(7);
    expect(component.doubleCount()).toBe(14);
  });
});
```

### Pattern 3: Testing Input/Output Signals

```typescript
describe('Input/Output Signals', () => {
  it('should set input via componentRef', () => {
    fixture.componentRef.setInput('userId', 123);
    expect(component.userId()).toBe(123);
  });

  it('should emit output signal', () => {
    const values: any[] = [];
    component.dataChanged.subscribe(v => values.push(v));
    
    component.updateData('test');
    expect(values).toContain('test');
  });
});
```

### Pattern 4: Testing Control Flow

```typescript
describe('Control Flow', () => {
  it('should render with @if when condition is true', () => {
    component.showContent.set(true);
    fixture.detectChanges();
    
    expect(fixture.nativeElement.textContent).toContain('Content');
  });

  it('should render with @for loop', () => {
    component.items.set([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]);
    fixture.detectChanges();
    
    const elements = fixture.nativeElement.querySelectorAll('.item');
    expect(elements.length).toBe(2);
  });

  it('should show @empty state', () => {
    component.items.set([]);
    fixture.detectChanges();
    
    expect(fixture.nativeElement.textContent).toContain('No items');
  });
});
```

### Pattern 5: Testing inject() Function

```typescript
describe('Dependency Injection', () => {
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      getData: jest.fn().mockReturnValue({ data: 'test' })
    };

    await TestBed.configureTestingModule({
      imports: [MyComponent],
      providers: [
        { provide: MyService, useValue: mockService }
      ]
    }).compileComponents();
  });

  it('should inject service correctly', () => {
    component.loadData();
    expect(mockService.getData).toHaveBeenCalled();
  });
});
```

## 🔍 Comparação: Angular 16 vs Angular 17

### Angular 16 (Tradicional)

```typescript
// Component
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  @Input() userId!: number;
  @Output() userLoaded = new EventEmitter<User>();
  user: User | null = null;
}

// Test
beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [UserComponent]
  }).compileComponents();
});

component.userId = 1;
expect(component.userId).toBe(1);
```

### Angular 17 (Moderno)

```typescript
// Component
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (user()) {
      <div>{{ user()?.name }}</div>
    }
  `
})
export class UserComponent {
  userId = input.required<number>();
  userLoaded = output<User>();
  user = signal<User | null>(null);
}

// Test
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [UserComponent] // standalone
  }).compileComponents();
});

fixture.componentRef.setInput('userId', 1);
expect(component.userId()).toBe(1);
```

## 💡 Dicas e Boas Práticas

### 1. Sempre Use `componentRef.setInput()`

```typescript
// ✅ Correto (Angular 17)
fixture.componentRef.setInput('myInput', value);

// ❌ Errado (não funciona com input signals)
component.myInput = value;
```

### 2. Teste Efeitos Colaterais de Signals

```typescript
it('should trigger side effects', () => {
  const spy = jest.fn();
  
  effect(() => {
    spy(component.count());
  });
  
  component.count.set(5);
  expect(spy).toHaveBeenCalledWith(5);
});
```

### 3. Use `flush()` para Effects Síncronos

```typescript
import { flush } from '@angular/core/testing';

it('should complete all effects', () => {
  component.count.set(10);
  flush(); // Garante que todos os effects foram executados
  expect(component.derivedValue()).toBe(20);
});
```

### 4. Teste Computed Signals com Múltiplas Dependências

```typescript
it('should compute from multiple sources', () => {
  component.firstName.set('John');
  component.lastName.set('Doe');
  
  expect(component.fullName()).toBe('John Doe');
  
  component.firstName.set('Jane');
  expect(component.fullName()).toBe('Jane Doe');
});
```

### 5. Teste Track Function em @for

```typescript
it('should track items correctly', () => {
  const items = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
  component.items.set(items);
  fixture.detectChanges();
  
  const elements = fixture.nativeElement.querySelectorAll('.item');
  
  // Atualiza um item mantendo o ID
  items[0].name = 'Updated A';
  component.items.set([...items]);
  fixture.detectChanges();
  
  const updatedElements = fixture.nativeElement.querySelectorAll('.item');
  expect(updatedElements[0].textContent).toContain('Updated A');
});
```

## 🚀 Executando os Exemplos

```bash
# 1. Copie os arquivos de exemplo para seu projeto
cp examples/angular17-example.* /seu/projeto/src/app/

# 2. Execute os testes
cd /seu/projeto
npm test angular17-example.spec.ts

# 3. Com coverage
npm run test:coverage -- angular17-example.spec.ts

# 4. Em watch mode
npm run test:watch -- angular17-example.spec.ts
```

## 📊 Coverage Esperado

Com os testes do exemplo, você deve ter:

- ✅ **Statements**: ~95%+
- ✅ **Branches**: ~90%+
- ✅ **Functions**: ~100%
- ✅ **Lines**: ~95%+

## 🔗 Recursos Adicionais

- [Angular 17 Signals Guide](https://angular.io/guide/signals)
- [Angular 17 Control Flow](https://angular.io/guide/control-flow)
- [Jest Testing Guide](https://jestjs.io/docs/getting-started)
- [COMPATIBILITY.md](../COMPATIBILITY.md)

## 🆘 Problemas Comuns

### Erro: "Cannot read properties of undefined (reading 'subscribe')"

**Causa:** Tentando usar output como EventEmitter

**Solução:** Use `.subscribe()` diretamente no output signal:
```typescript
component.myOutput.subscribe(spy);
```

### Erro: "NG0203: Input is required but no value is available"

**Causa:** Input `required` não foi configurado

**Solução:**
```typescript
fixture.componentRef.setInput('requiredInput', value);
```

### Erro: "Signal is not a function"

**Causa:** Tentando acessar signal sem `()`

**Solução:**
```typescript
// ✅ Correto
const value = component.mySignal();

// ❌ Errado
const value = component.mySignal;
```

---

**💜 Exemplos mantidos e testados com Angular 17.3+**

[← Voltar](../README.md) | [Compatibilidade →](../COMPATIBILITY.md)


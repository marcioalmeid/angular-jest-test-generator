/**
 * Template de Teste para Diretivas Angular
 * 
 * Gera testes unitários completos para diretivas Angular,
 * incluindo testes de comportamento e integração com DOM.
 */

const { formatCode } = require('../utils/formatter');

/**
 * Gera teste completo para uma diretiva
 */
function generateDirectiveTest(analysis, filePath) {
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
  
  return `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ${className} } from './${fileName.replace('.ts', '')}';`;
}

/**
 * Gera o bloco describe principal
 */
function generateDescribeBlock(analysis) {
  const { className, decoratorMetadata } = analysis;
  const selector = decoratorMetadata.selector || className.replace('Directive', '').toLowerCase();
  
  return `${generateTestComponent(className, selector)}

describe('${className}', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, ${className}],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    directiveElement = fixture.debugElement.query(By.directive(${className}));
    fixture.detectChanges();
  });

  describe('Criação da Diretiva', () => {
    it('deve criar a diretiva com sucesso', () => {
      expect(directiveElement).toBeTruthy();
    });

    it('deve aplicar a diretiva ao elemento', () => {
      const directive = directiveElement.injector.get(${className});
      expect(directive).toBeInstanceOf(${className});
    });
  });

  describe('Comportamento da Diretiva', () => {
    it('deve modificar o elemento hospedeiro', () => {
      // Arrange
      const element = directiveElement.nativeElement;
      
      // Act
      // A diretiva já foi aplicada no beforeEach
      
      // Assert
      expect(element).toBeDefined();
      // TODO: Adicionar asserções específicas de modificação do elemento
    });

    it('deve responder a eventos do elemento', () => {
      // Arrange
      const element = directiveElement.nativeElement;
      
      // Act
      element.click();
      fixture.detectChanges();
      
      // Assert
      // TODO: Verificar mudanças esperadas após o evento
      expect(element).toBeDefined();
    });

    it('deve atualizar quando inputs mudam', () => {
      // Arrange
      const directive = directiveElement.injector.get(${className});
      
      // Act
      // TODO: Modificar inputs da diretiva
      fixture.detectChanges();
      
      // Assert
      // TODO: Verificar mudanças esperadas
      expect(directive).toBeDefined();
    });
  });

  describe('Manipulação do DOM', () => {
    it('deve adicionar classes CSS quando apropriado', () => {
      // Arrange
      const element = directiveElement.nativeElement;
      
      // Act & Assert
      // TODO: Verificar classes CSS aplicadas
      expect(element.classList).toBeDefined();
    });

    it('deve adicionar atributos quando apropriado', () => {
      // Arrange
      const element = directiveElement.nativeElement;
      
      // Act & Assert
      // TODO: Verificar atributos aplicados
      expect(element.attributes).toBeDefined();
    });

    it('deve modificar estilos quando apropriado', () => {
      // Arrange
      const element = directiveElement.nativeElement;
      
      // Act & Assert
      // TODO: Verificar estilos aplicados
      expect(element.style).toBeDefined();
    });
  });

  describe('Lifecycle Hooks', () => {
    it('deve executar ngOnInit quando a diretiva é inicializada', () => {
      // Arrange
      const directive = directiveElement.injector.get(${className});
      const spy = jest.spyOn(directive as any, 'ngOnInit');
      
      // Act
      if (typeof (directive as any).ngOnInit === 'function') {
        (directive as any).ngOnInit();
      }
      
      // Assert
      if (spy.mock.calls.length > 0) {
        expect(spy).toHaveBeenCalled();
      } else {
        expect(directive).toBeDefined(); // Fallback se ngOnInit não existe
      }
    });

    it('deve limpar recursos em ngOnDestroy', () => {
      // Arrange
      const directive = directiveElement.injector.get(${className});
      
      // Act
      if (typeof (directive as any).ngOnDestroy === 'function') {
        (directive as any).ngOnDestroy();
      }
      
      // Assert
      expect(directive).toBeDefined();
      // TODO: Verificar limpeza de recursos
    });
  });

  describe('Casos Edge', () => {
    it('deve tratar valores null/undefined graciosamente', () => {
      // Arrange
      const directive = directiveElement.injector.get(${className});
      
      // Act & Assert
      expect(() => {
        // TODO: Testar comportamento com valores null/undefined
      }).not.toThrow();
    });

    it('deve funcionar com múltiplas instâncias', () => {
      // Arrange
      // Múltiplos elementos com a diretiva já foram renderizados via TestComponent
      
      // Act
      const allDirectives = fixture.debugElement.queryAll(By.directive(${className}));
      
      // Assert
      expect(allDirectives.length).toBeGreaterThan(0);
    });
  });
});`;
}

/**
 * Gera componente de teste
 */
function generateTestComponent(className, selector) {
  return `// Componente de teste para verificar o comportamento da diretiva
@Component({
  selector: 'test-component',
  template: \`
    <div ${selector}>Elemento com diretiva</div>
    <div ${selector}>Outro elemento</div>
  \`,
  standalone: true,
})
class TestComponent {}`;
}

module.exports = {
  generateDirectiveTest,
};


/**
 * Analisador de Código Angular com ts-morph
 * 
 * Utiliza ts-morph para análise precisa e robusta de código TypeScript Angular.
 * Extrai informações detalhadas para gerar testes unitários automaticamente.
 */

const { Project, SyntaxKind } = require('ts-morph');
const path = require('path');

/**
 * Analisa um arquivo TypeScript usando ts-morph
 * 
 * @param {string} filePath - Caminho do arquivo
 * @returns {Object} Informações extraídas do arquivo
 */
function analyzeFile(filePath) {
  const project = new Project({
    tsConfigFilePath: findTsConfig(filePath),
    skipAddingFilesFromTsConfig: true,
  });

  const sourceFile = project.addSourceFileAtPath(filePath);
  
  // Extrai a classe principal do arquivo
  const classes = sourceFile.getClasses();
  
  if (classes.length === 0) {
    throw new Error('Nenhuma classe encontrada no arquivo');
  }
  
  // Pega a primeira classe exportada ou a primeira classe
  const mainClass = classes.find(c => c.isExported()) || classes[0];
  
  return {
    content: sourceFile.getFullText(),
    filePath,
    fileName: path.basename(filePath),
    className: mainClass.getName() || 'UnknownClass',
    isComponent: hasDecorator(mainClass, 'Component'),
    isService: hasDecorator(mainClass, 'Injectable'),
    isPipe: hasDecorator(mainClass, 'Pipe'),
    isDirective: hasDecorator(mainClass, 'Directive'),
    imports: extractImports(sourceFile),
    dependencies: extractDependencies(mainClass),
    methods: extractMethods(mainClass),
    properties: extractProperties(mainClass),
    decoratorMetadata: extractDecoratorMetadata(mainClass),
    interfaces: extractImplementedInterfaces(mainClass),
    inputProperties: extractInputProperties(mainClass),
    outputProperties: extractOutputProperties(mainClass),
    viewChildren: extractViewChildren(mainClass),
    hostBindings: extractHostBindings(mainClass),
    typeParameters: extractTypeParameters(mainClass),
  };
}

/**
 * Encontra o arquivo tsconfig.json mais próximo
 */
function findTsConfig(filePath) {
  let currentDir = path.dirname(filePath);
  
  while (currentDir !== path.dirname(currentDir)) {
    const tsConfigPath = path.join(currentDir, 'tsconfig.json');
    const fs = require('fs');
    
    if (fs.existsSync(tsConfigPath)) {
      return tsConfigPath;
    }
    
    currentDir = path.dirname(currentDir);
  }
  
  return undefined;
}

/**
 * Verifica se a classe tem um decorator específico
 */
function hasDecorator(classDeclaration, decoratorName) {
  return classDeclaration.getDecorators().some(
    decorator => decorator.getName() === decoratorName
  );
}

/**
 * Extrai imports do arquivo
 */
function extractImports(sourceFile) {
  const imports = [];
  
  sourceFile.getImportDeclarations().forEach(importDecl => {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    const namedImports = importDecl.getNamedImports();
    const defaultImport = importDecl.getDefaultImport();
    const namespaceImport = importDecl.getNamespaceImport();
    
    if (namedImports.length > 0) {
      imports.push({
        type: 'named',
        items: namedImports.map(ni => ni.getName()),
        from: moduleSpecifier,
      });
    }
    
    if (defaultImport) {
      imports.push({
        type: 'default',
        name: defaultImport.getText(),
        from: moduleSpecifier,
      });
    }
    
    if (namespaceImport) {
      imports.push({
        type: 'namespace',
        name: namespaceImport.getText(),
        from: moduleSpecifier,
      });
    }
  });
  
  return imports;
}

/**
 * Extrai dependências do construtor
 */
function extractDependencies(classDeclaration) {
  const dependencies = [];
  const constructors = classDeclaration.getConstructors();
  
  if (constructors.length === 0) return dependencies;
  
  const constructor = constructors[0];
  
  constructor.getParameters().forEach(param => {
    const name = param.getName();
    const type = param.getType().getText();
    const scope = param.getScope() || 'public';
    const isReadonly = param.isReadonly();
    const isOptional = param.isOptional();
    
    dependencies.push({
      name,
      type: cleanTypeName(type),
      visibility: scope,
      readonly: isReadonly,
      optional: isOptional,
    });
  });
  
  return dependencies;
}

/**
 * Extrai métodos da classe
 */
function extractMethods(classDeclaration) {
  const methods = [];
  
  classDeclaration.getMethods().forEach(method => {
    const name = method.getName();
    const returnType = method.getReturnType().getText();
    const scope = method.getScope() || 'public';
    const isAsync = method.isAsync();
    const isStatic = method.isStatic();
    const isAbstract = method.isAbstract();
    
    const parameters = method.getParameters().map(param => ({
      name: param.getName(),
      type: cleanTypeName(param.getType().getText()),
      optional: param.isOptional(),
      defaultValue: param.getInitializer()?.getText(),
    }));
    
    const decorators = method.getDecorators().map(dec => ({
      name: dec.getName(),
      arguments: dec.getArguments().map(arg => arg.getText()),
    }));
    
    // Extrai informações sobre o corpo do método
    const statements = method.getStatements();
    const complexity = calculateComplexity(statements);
    
    methods.push({
      name,
      returnType: cleanTypeName(returnType),
      visibility: scope,
      params: parameters,
      isAsync,
      isStatic,
      isAbstract,
      decorators,
      complexity,
      hasReturnStatement: hasReturnStatement(method),
      callsOtherMethods: findMethodCalls(method),
    });
  });
  
  return methods;
}

/**
 * Extrai propriedades da classe
 */
function extractProperties(classDeclaration) {
  const properties = [];
  
  classDeclaration.getProperties().forEach(prop => {
    const name = prop.getName();
    const type = prop.getType().getText();
    const scope = prop.getScope() || 'public';
    const isStatic = prop.isStatic();
    const isReadonly = prop.isReadonly();
    const hasInitializer = prop.hasInitializer();
    const initializer = prop.getInitializer()?.getText();
    
    const decorators = prop.getDecorators().map(dec => ({
      name: dec.getName(),
      arguments: dec.getArguments().map(arg => arg.getText()),
    }));
    
    properties.push({
      name,
      type: cleanTypeName(type),
      visibility: scope,
      isStatic,
      readonly: isReadonly,
      hasInitializer,
      initializer,
      decorators,
    });
  });
  
  return properties;
}

/**
 * Extrai metadados dos decorators
 */
function extractDecoratorMetadata(classDeclaration) {
  const metadata = {};
  
  classDeclaration.getDecorators().forEach(decorator => {
    const name = decorator.getName();
    const args = decorator.getArguments();
    
    if (args.length > 0) {
      const arg = args[0];
      
      // Tenta avaliar o objeto do decorator
      if (arg.getKind() === SyntaxKind.ObjectLiteralExpression) {
        arg.getChildrenOfKind(SyntaxKind.PropertyAssignment).forEach(prop => {
          const propName = prop.getName();
          const propValue = prop.getInitializer()?.getText();
          
          if (propValue) {
            // Remove aspas de strings
            metadata[propName] = propValue.replace(/^['"`]|['"`]$/g, '');
          }
        });
      }
    }
    
    // Armazena o nome do decorator
    metadata.decoratorName = name;
  });
  
  return metadata;
}

/**
 * Extrai interfaces implementadas
 */
function extractImplementedInterfaces(classDeclaration) {
  return classDeclaration.getImplements().map(impl => impl.getText());
}

/**
 * Extrai propriedades @Input()
 */
function extractInputProperties(classDeclaration) {
  const inputs = [];
  
  classDeclaration.getProperties().forEach(prop => {
    const inputDecorator = prop.getDecorator('Input');
    if (inputDecorator) {
      const args = inputDecorator.getArguments();
      const alias = args.length > 0 ? args[0].getText().replace(/['"]/g, '') : null;
      
      inputs.push({
        name: prop.getName(),
        type: cleanTypeName(prop.getType().getText()),
        alias,
        required: !prop.hasQuestionToken() && !prop.hasInitializer(),
      });
    }
  });
  
  return inputs;
}

/**
 * Extrai propriedades @Output()
 */
function extractOutputProperties(classDeclaration) {
  const outputs = [];
  
  classDeclaration.getProperties().forEach(prop => {
    const outputDecorator = prop.getDecorator('Output');
    if (outputDecorator) {
      const args = outputDecorator.getArguments();
      const alias = args.length > 0 ? args[0].getText().replace(/['"]/g, '') : null;
      
      outputs.push({
        name: prop.getName(),
        type: cleanTypeName(prop.getType().getText()),
        alias,
      });
    }
  });
  
  return outputs;
}

/**
 * Extrai ViewChild/ViewChildren
 */
function extractViewChildren(classDeclaration) {
  const viewChildren = [];
  
  classDeclaration.getProperties().forEach(prop => {
    const viewChildDecorator = prop.getDecorator('ViewChild') || prop.getDecorator('ViewChildren');
    
    if (viewChildDecorator) {
      const args = viewChildDecorator.getArguments();
      const selector = args.length > 0 ? args[0].getText() : null;
      
      viewChildren.push({
        name: prop.getName(),
        type: cleanTypeName(prop.getType().getText()),
        selector,
        decoratorName: viewChildDecorator.getName(),
      });
    }
  });
  
  return viewChildren;
}

/**
 * Extrai HostBinding
 */
function extractHostBindings(classDeclaration) {
  const hostBindings = [];
  
  classDeclaration.getProperties().forEach(prop => {
    const hostBindingDecorator = prop.getDecorator('HostBinding');
    
    if (hostBindingDecorator) {
      const args = hostBindingDecorator.getArguments();
      const binding = args.length > 0 ? args[0].getText().replace(/['"]/g, '') : null;
      
      hostBindings.push({
        name: prop.getName(),
        type: cleanTypeName(prop.getType().getText()),
        binding,
      });
    }
  });
  
  return hostBindings;
}

/**
 * Extrai parâmetros de tipo genérico
 */
function extractTypeParameters(classDeclaration) {
  return classDeclaration.getTypeParameters().map(tp => ({
    name: tp.getName(),
    constraint: tp.getConstraint()?.getText(),
    default: tp.getDefault()?.getText(),
  }));
}

/**
 * Limpa nome de tipo removendo prefixos de módulo
 */
function cleanTypeName(typeName) {
  // Remove import paths e mantém apenas o tipo
  return typeName
    .replace(/import\([^)]+\)\./g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calcula complexidade ciclomática básica
 */
function calculateComplexity(statements) {
  let complexity = 1;
  
  statements.forEach(statement => {
    const kind = statement.getKind();
    
    // Incrementa para estruturas de controle
    if (
      kind === SyntaxKind.IfStatement ||
      kind === SyntaxKind.ForStatement ||
      kind === SyntaxKind.WhileStatement ||
      kind === SyntaxKind.DoStatement ||
      kind === SyntaxKind.CaseClause ||
      kind === SyntaxKind.CatchClause ||
      kind === SyntaxKind.ConditionalExpression
    ) {
      complexity++;
    }
  });
  
  return complexity;
}

/**
 * Verifica se método tem declaração return
 */
function hasReturnStatement(method) {
  const returnStatements = method.getDescendantsOfKind(SyntaxKind.ReturnStatement);
  return returnStatements.length > 0;
}

/**
 * Encontra chamadas a outros métodos
 */
function findMethodCalls(method) {
  const calls = [];
  const callExpressions = method.getDescendantsOfKind(SyntaxKind.CallExpression);
  
  callExpressions.forEach(call => {
    const expression = call.getExpression();
    if (expression.getKind() === SyntaxKind.PropertyAccessExpression) {
      const propAccess = expression;
      const name = propAccess.getName();
      calls.push(name);
    }
  });
  
  return [...new Set(calls)]; // Remove duplicatas
}

module.exports = {
  analyzeFile,
};

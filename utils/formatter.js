/**
 * Formatador de Código
 * 
 * Utilitários para formatar código TypeScript gerado
 * de forma consistente e legível.
 */

/**
 * Formata código TypeScript
 */
function formatCode(code) {
  // Remove linhas vazias duplicadas
  code = code.replace(/\n\n\n+/g, '\n\n');
  
  // Remove espaços em branco no final das linhas
  code = code.replace(/[ \t]+$/gm, '');
  
  // Garante que o arquivo termina com uma nova linha
  if (!code.endsWith('\n')) {
    code += '\n';
  }
  
  // Adiciona header do arquivo
  code = addFileHeader() + code;
  
  return code;
}

/**
 * Adiciona header padrão aos arquivos de teste
 */
function addFileHeader() {
  return `/**
 * Teste gerado automaticamente
 * 
 * Este arquivo foi gerado pelo Gerador de Testes Jest.
 * Customize conforme necessário para seu caso de uso específico.
 * 
 * Data de geração: ${new Date().toISOString()}
 */

`;
}

/**
 * Indenta código
 */
function indent(code, spaces = 2) {
  const indentation = ' '.repeat(spaces);
  return code.split('\n').map(line => indentation + line).join('\n');
}

/**
 * Remove indentação
 */
function dedent(code) {
  const lines = code.split('\n');
  
  // Encontra a menor indentação (excluindo linhas vazias)
  let minIndent = Infinity;
  lines.forEach(line => {
    if (line.trim().length > 0) {
      const match = line.match(/^(\s*)/);
      if (match) {
        minIndent = Math.min(minIndent, match[1].length);
      }
    }
  });
  
  if (minIndent === Infinity) return code;
  
  // Remove a indentação mínima de todas as linhas
  return lines.map(line => line.substring(minIndent)).join('\n');
}

/**
 * Formata bloco de imports
 */
function formatImports(imports) {
  if (!imports || imports.length === 0) return '';
  
  // Agrupa imports por fonte
  const grouped = {};
  
  imports.forEach(imp => {
    const from = imp.from || imp;
    if (!grouped[from]) {
      grouped[from] = [];
    }
    if (imp.items) {
      grouped[from].push(...imp.items);
    }
  });
  
  // Formata os imports
  const formatted = Object.keys(grouped)
    .sort((a, b) => {
      // Angular imports primeiro
      if (a.startsWith('@angular') && !b.startsWith('@angular')) return -1;
      if (!a.startsWith('@angular') && b.startsWith('@angular')) return 1;
      return a.localeCompare(b);
    })
    .map(from => {
      const items = grouped[from];
      if (items.length === 0) {
        return `import '${from}';`;
      }
      return `import { ${items.join(', ')} } from '${from}';`;
    });
  
  return formatted.join('\n');
}

/**
 * Formata comentário de documentação
 */
function formatDocComment(text, indent = 0) {
  const indentation = ' '.repeat(indent);
  const lines = text.split('\n');
  
  let formatted = `${indentation}/**\n`;
  lines.forEach(line => {
    formatted += `${indentation} * ${line}\n`;
  });
  formatted += `${indentation} */`;
  
  return formatted;
}

/**
 * Formata nome de teste (it/describe)
 */
function formatTestName(name) {
  // Converte de camelCase para frase legível
  return name
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .trim();
}

/**
 * Formata bloco describe
 */
function formatDescribe(description, content, indent = 0) {
  const indentation = ' '.repeat(indent);
  
  return `${indentation}describe('${description}', () => {
${content}
${indentation}});`;
}

/**
 * Formata bloco it/test
 */
function formatIt(description, content, isAsync = false, indent = 2) {
  const indentation = ' '.repeat(indent);
  const asyncKeyword = isAsync ? 'async ' : '';
  
  return `${indentation}it('${description}', ${asyncKeyword}() => {
${content}
${indentation}});`;
}

/**
 * Formata bloco beforeEach
 */
function formatBeforeEach(content, isAsync = false, indent = 2) {
  const indentation = ' '.repeat(indent);
  const asyncKeyword = isAsync ? 'async ' : '';
  
  return `${indentation}beforeEach(${asyncKeyword}() => {
${content}
${indentation}});`;
}

/**
 * Formata bloco afterEach
 */
function formatAfterEach(content, indent = 2) {
  const indentation = ' '.repeat(indent);
  
  return `${indentation}afterEach(() => {
${content}
${indentation}});`;
}

/**
 * Formata expectativa (assertion)
 */
function formatExpect(actual, matcher, expected = null, indent = 4) {
  const indentation = ' '.repeat(indent);
  
  if (expected === null) {
    return `${indentation}expect(${actual}).${matcher}();`;
  }
  
  return `${indentation}expect(${actual}).${matcher}(${expected});`;
}

/**
 * Formata comentário inline
 */
function formatComment(text, indent = 4) {
  const indentation = ' '.repeat(indent);
  return `${indentation}// ${text}`;
}

/**
 * Formata seção Arrange-Act-Assert
 */
function formatAAA(arrange, act, assert, indent = 4) {
  const indentation = ' '.repeat(indent);
  
  let formatted = '';
  
  if (arrange) {
    formatted += `${indentation}// Arrange\n${arrange}\n\n`;
  }
  
  if (act) {
    formatted += `${indentation}// Act\n${act}\n\n`;
  }
  
  if (assert) {
    formatted += `${indentation}// Assert\n${assert}`;
  }
  
  return formatted;
}

/**
 * Capitaliza primeira letra
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converte para camelCase
 */
function toCamelCase(str) {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, char => char.toLowerCase());
}

/**
 * Converte para PascalCase
 */
function toPascalCase(str) {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/**
 * Adiciona TODO comment
 */
function addTODO(message, indent = 4) {
  const indentation = ' '.repeat(indent);
  return `${indentation}// TODO: ${message}`;
}

module.exports = {
  formatCode,
  addFileHeader,
  indent,
  dedent,
  formatImports,
  formatDocComment,
  formatTestName,
  formatDescribe,
  formatIt,
  formatBeforeEach,
  formatAfterEach,
  formatExpect,
  formatComment,
  formatAAA,
  capitalize,
  toCamelCase,
  toPascalCase,
  addTODO,
};


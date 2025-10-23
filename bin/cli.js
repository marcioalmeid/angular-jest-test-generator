#!/usr/bin/env node

/**
 * CLI para Angular Jest Test Generator
 * 
 * Wrapper que permite usar a ferramenta globalmente após instalação via npm
 */

const path = require('path');

// Importa o gerador principal
const mainScript = path.join(__dirname, '..', 'index.js');
require(mainScript);


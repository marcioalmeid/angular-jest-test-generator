/**
 * Exemplo Simples de Componente
 * 
 * Demonstração básica para geração de testes
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple',
  template: '<h1>{{ title }}</h1>'
})
export class SimpleComponent implements OnInit {
  @Input() title: string = '';
  @Output() loaded = new EventEmitter<void>();
  
  count: number = 0;
  
  ngOnInit(): void {
    this.loaded.emit();
  }
  
  increment(): void {
    this.count++;
  }
  
  reset(): void {
    this.count = 0;
  }
}


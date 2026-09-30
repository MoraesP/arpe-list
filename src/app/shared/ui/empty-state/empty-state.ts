import { Component, input } from '@angular/core';

/** Estado vazio simples reutilizado nas listas do catálogo (anos, lotes, carrinhos). */
@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
  readonly mensagem = input('Nada por aqui ainda.');
}

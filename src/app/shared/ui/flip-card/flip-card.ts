import { Component, input } from '@angular/core';

/**
 * Container genérico que gira 3D em torno do eixo vertical para revelar
 * o conteúdo projetado em `back` (PRD § Modal do Carrinho — animação de
 * girar). Não sabe nada sobre carrinhos: só recebe `flipped` e projeta
 * `[front]` / `[back]`.
 */
@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.html',
  styleUrl: './flip-card.scss',
})
export class FlipCard {
  readonly flipped = input(false);
}

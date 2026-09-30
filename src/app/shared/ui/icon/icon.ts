import { Component, input } from '@angular/core';

export type IconName =
  | 'chevron-left'
  | 'chevron-right'
  | 'close'
  | 'share'
  | 'rotate'
  | 'star'
  | 'upload'
  | 'photo'
  | 'check'
  | 'plus'
  | 'search'
  | 'calendar'
  | 'grid'
  | 'heart';

/**
 * Ícones inline em SVG (stroke, minimalistas) usados em todo o app.
 * Centralizados aqui para não duplicar markup de SVG em cada tela.
 */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20);
}

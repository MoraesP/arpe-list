import { Component, computed, input } from '@angular/core';
import { Raridade } from '../../../core/models/carrinho.model';
import { Icon } from '../icon/icon';

const LABELS: Record<Raridade, string> = {
  normal: 'Normal',
  't-hunt': 'T-Hunt',
  'super-t-hunt': 'Super T-Hunt',
};

/** Selo de raridade do carrinho — normal, T-Hunt ou Super T-Hunt (PRD § Modelo de Dados). */
@Component({
  selector: 'app-badge-raridade',
  imports: [Icon],
  templateUrl: './badge-raridade.html',
  styleUrl: './badge-raridade.scss',
})
export class BadgeRaridade {
  readonly raridade = input.required<Raridade>();

  protected readonly label = computed(() => LABELS[this.raridade()]);
  protected readonly isSuper = computed(() => this.raridade() === 'super-t-hunt');
  protected readonly isNotable = computed(() => this.raridade() !== 'normal');
}

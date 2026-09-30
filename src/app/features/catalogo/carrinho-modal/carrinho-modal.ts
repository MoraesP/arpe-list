import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Carrinho } from '../../../core/models/carrinho.model';
import { CatalogoService } from '../../../core/services/catalogo.service';
import { BadgeRaridade } from '../../../shared/ui/badge-raridade/badge-raridade';
import { FlipCard } from '../../../shared/ui/flip-card/flip-card';
import { Icon } from '../../../shared/ui/icon/icon';

/**
 * Modal do Carrinho (PRD § Requisitos Funcionais › Modal do Carrinho):
 * foto principal em destaque, Compartilhar, Girar (revela os Detalhes,
 * sem foto) e — só quando a raridade é Super T-Hunt — Super, que troca
 * a foto exibida pela variação.
 */
@Component({
  selector: 'app-carrinho-modal',
  imports: [BadgeRaridade, FlipCard, Icon],
  templateUrl: './carrinho-modal.html',
  styleUrl: './carrinho-modal.scss',
})
export class CarrinhoModal {
  private readonly catalogo = inject(CatalogoService);

  readonly carrinho = input.required<Carrinho>();
  readonly fechar = output<void>();

  protected readonly flipped = signal(false);
  protected readonly showSuper = signal(false);

  protected readonly isSuperRaridade = computed(() => this.carrinho().raridade === 'super-t-hunt');

  protected readonly colecao = toSignal(
    toObservable(this.carrinho).pipe(switchMap((carrinho) => this.catalogo.getColecao(carrinho.colecaoId))),
    { initialValue: undefined },
  );

  constructor() {
    // Ao trocar de carrinho (sem o modal fechar), sempre volta pro estado inicial: foto de frente.
    effect(() => {
      this.carrinho();
      this.flipped.set(false);
      this.showSuper.set(false);
    });
  }

  protected girar(): void {
    this.flipped.update((valor) => !valor);
  }

  protected alternarSuper(): void {
    this.showSuper.update((valor) => !valor);
  }

  protected async compartilhar(): Promise<void> {
    const carrinho = this.carrinho();
    if (navigator.share) {
      try {
        await navigator.share({ title: carrinho.nome, text: `${carrinho.nome} · ${carrinho.numero}` });
      } catch {
        // usuário cancelou o compartilhamento — nada a fazer.
      }
      return;
    }
    // TODO: fallback quando a Web Share API não está disponível (spec 04-modal-carrinho.md § Edge cases).
    console.info('[CarrinhoModal] Web Share API indisponível neste navegador.');
  }
}

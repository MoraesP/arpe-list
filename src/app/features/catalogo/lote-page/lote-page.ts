import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { combineLatest, switchMap } from 'rxjs';
import { CatalogoService } from '../../../core/services/catalogo.service';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { Icon } from '../../../shared/ui/icon/icon';
import { CarrinhoModal } from '../carrinho-modal/carrinho-modal';

/**
 * Página do Lote — grade 2 colunas (mobile-first) com todos os carrinhos
 * do lote (PRD § Requisitos Funcionais › Página do Lote). O modal do
 * carrinho é um estado local desta tela, não uma rota separada: abre por
 * cima da grade quando um card é clicado.
 */
@Component({
  selector: 'app-lote-page',
  imports: [RouterLink, Icon, EmptyState, CarrinhoModal],
  templateUrl: './lote-page.html',
  styleUrl: './lote-page.scss',
})
export class LotePage {
  private readonly catalogo = inject(CatalogoService);
  private readonly router = inject(Router);

  /** Ligados automaticamente aos :anoId/:loteId da rota. */
  readonly anoId = input.required<string>();
  readonly loteId = input.required<string>();

  private readonly params$ = combineLatest([toObservable(this.anoId), toObservable(this.loteId)]);

  protected readonly lote = toSignal(
    this.params$.pipe(switchMap(([anoId, loteId]) => this.catalogo.getLote(anoId, loteId))),
    { initialValue: undefined },
  );

  protected readonly carrinhos = toSignal(
    this.params$.pipe(switchMap(([anoId, loteId]) => this.catalogo.listCarrinhos(anoId, loteId))),
    { initialValue: [] },
  );

  protected readonly selecionadoId = signal<string | null>(null);

  protected readonly carrinhoSelecionado = computed(() =>
    this.carrinhos().find((carrinho) => carrinho.id === this.selecionadoId()),
  );

  constructor() {
    // Lote inexistente (spec 03-pagina-lote.md): volta para a página do ano.
    effect(() => {
      if (this.lote() === undefined) {
        this.router.navigate(['/anos', this.anoId()]);
      }
    });
  }

  protected abrirCarrinho(carrinhoId: string): void {
    this.selecionadoId.set(carrinhoId);
  }

  protected fecharModal(): void {
    this.selecionadoId.set(null);
  }
}

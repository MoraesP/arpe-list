import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { Raridade } from '../../../core/models/carrinho.model';
import { Colecao } from '../../../core/models/colecao.model';
import { AdminService } from '../../../core/services/admin.service';
import { CatalogoService } from '../../../core/services/catalogo.service';
import { Icon } from '../../../shared/ui/icon/icon';

interface CarrinhoFormErros {
  ano?: string;
  lote?: string;
  nome?: string;
  numero?: string;
  colecao?: string;
  fotoPrincipal?: string;
  fotoVariacaoSuper?: string;
}

/**
 * Cadastro de Carrinho (PRD § Painel Administrativo): foto principal,
 * nome, número, coleção com autocomplete (seleciona existente ou cria
 * nova), observação e raridade — com upload extra liberado só quando a
 * raridade é Super T-Hunt. Ainda não persiste nada de verdade
 * (AdminService.salvarCarrinho é o ponto de extensão, ver docs/data-access.md).
 */
@Component({
  selector: 'app-carrinho-form',
  imports: [FormsModule, Icon],
  templateUrl: './carrinho-form.html',
  styleUrl: './carrinho-form.scss',
})
export class CarrinhoForm {
  private readonly admin = inject(AdminService);
  private readonly catalogo = inject(CatalogoService);

  protected readonly anos = toSignal(this.catalogo.listAnos(), { initialValue: [] });

  protected readonly anoId = signal<string | null>(null);
  protected readonly loteId = signal<string | null>(null);

  protected readonly lotes = toSignal(
    toObservable(this.anoId).pipe(switchMap((anoId) => (anoId ? this.catalogo.listLotes(anoId) : []))),
    { initialValue: [] },
  );

  protected readonly nome = signal('');
  protected readonly numero = signal('');
  protected readonly observacao = signal('');
  protected readonly raridade = signal<Raridade>('normal');
  protected readonly isSuper = computed(() => this.raridade() === 'super-t-hunt');

  protected readonly fotoPrincipal = signal<File | null>(null);
  protected readonly fotoVariacaoSuper = signal<File | null>(null);

  protected readonly colecaoQuery = signal('');
  protected readonly colecaoIdSelecionada = signal<string | null>(null);
  protected readonly showSugestoes = signal(false);

  protected readonly sugestoesColecao = toSignal(
    toObservable(this.colecaoQuery).pipe(
      debounceTime(150),
      switchMap((termo) => this.admin.buscarColecoes(termo)),
    ),
    { initialValue: [] as Colecao[] },
  );

  protected readonly erros = signal<CarrinhoFormErros>({});
  protected readonly salvo = signal(false);

  protected selecionarAno(anoId: string): void {
    this.anoId.set(anoId || null);
    this.loteId.set(null);
  }

  protected onColecaoInput(valor: string): void {
    this.colecaoQuery.set(valor);
    this.colecaoIdSelecionada.set(null);
    this.showSugestoes.set(true);
  }

  protected selecionarColecao(colecao: Colecao): void {
    this.colecaoQuery.set(colecao.nome);
    this.colecaoIdSelecionada.set(colecao.id);
    this.showSugestoes.set(false);
  }

  protected setRaridade(raridade: Raridade): void {
    this.raridade.set(raridade);
    if (raridade !== 'super-t-hunt') {
      this.fotoVariacaoSuper.set(null);
    }
  }

  protected onFotoPrincipal(event: Event): void {
    const arquivo = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.fotoPrincipal.set(arquivo);
  }

  protected onFotoVariacaoSuper(event: Event): void {
    const arquivo = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.fotoVariacaoSuper.set(arquivo);
  }

  protected salvar(): void {
    const erros: CarrinhoFormErros = {};
    if (!this.anoId()) erros.ano = 'Selecione um ano.';
    if (!this.loteId()) erros.lote = 'Selecione um lote.';
    if (!this.nome().trim()) erros.nome = 'Informe o nome do carrinho.';
    if (!this.numero().trim()) erros.numero = 'Informe o número.';
    if (!this.colecaoIdSelecionada() && !this.colecaoQuery().trim()) erros.colecao = 'Selecione ou crie uma coleção.';
    if (!this.fotoPrincipal()) erros.fotoPrincipal = 'A foto principal é obrigatória.';
    if (this.isSuper() && !this.fotoVariacaoSuper()) {
      erros.fotoVariacaoSuper = 'A foto da variação é obrigatória para Super T-Hunt.';
    }

    this.erros.set(erros);
    if (Object.keys(erros).length > 0) {
      return;
    }

    this.admin.salvarCarrinho({
      anoId: this.anoId()!,
      loteId: this.loteId()!,
      nome: this.nome().trim(),
      numero: this.numero().trim(),
      colecaoId: this.colecaoIdSelecionada() ?? undefined,
      colecaoNome: this.colecaoIdSelecionada() ? undefined : this.colecaoQuery().trim(),
      raridade: this.raridade(),
      observacao: this.observacao().trim() || undefined,
      fotoPrincipal: this.fotoPrincipal() ?? undefined,
      fotoVariacaoSuper: this.fotoVariacaoSuper() ?? undefined,
    });

    this.resetar();
    this.salvo.set(true);
  }

  private resetar(): void {
    this.nome.set('');
    this.numero.set('');
    this.observacao.set('');
    this.raridade.set('normal');
    this.fotoPrincipal.set(null);
    this.fotoVariacaoSuper.set(null);
    this.colecaoQuery.set('');
    this.colecaoIdSelecionada.set(null);
    this.erros.set({});
  }
}

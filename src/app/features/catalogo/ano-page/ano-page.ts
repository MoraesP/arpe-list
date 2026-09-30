import { Component, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { CatalogoService } from '../../../core/services/catalogo.service';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { Icon } from '../../../shared/ui/icon/icon';

/** Página do Ano — lista os lotes de um ano (PRD § Requisitos Funcionais › Página do Ano). */
@Component({
  selector: 'app-ano-page',
  imports: [RouterLink, Icon, EmptyState],
  templateUrl: './ano-page.html',
  styleUrl: './ano-page.scss',
})
export class AnoPage {
  private readonly catalogo = inject(CatalogoService);
  private readonly router = inject(Router);

  /** Ligado automaticamente ao :anoId da rota (ver provideRouter/withComponentInputBinding em app.config.ts). */
  readonly anoId = input.required<string>();

  private readonly anoId$ = toObservable(this.anoId);

  protected readonly ano = toSignal(this.anoId$.pipe(switchMap((id) => this.catalogo.getAno(id))), {
    initialValue: undefined,
  });

  protected readonly lotes = toSignal(this.anoId$.pipe(switchMap((id) => this.catalogo.listLotesResumo(id))), {
    initialValue: [],
  });

  constructor() {
    // Ano inexistente (spec 02-pagina-ano.md): volta para a Home.
    // Com dados síncronos (mock) o primeiro valor já é definitivo; ao trocar
    // por uma leitura assíncrona real, some um sinal de "carregando" antes disto.
    effect(() => {
      if (this.ano() === undefined) {
        this.router.navigateByUrl('/');
      }
    });
  }
}

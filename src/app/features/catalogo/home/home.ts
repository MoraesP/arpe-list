import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CatalogoService } from '../../../core/services/catalogo.service';
import { Icon } from '../../../shared/ui/icon/icon';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';

/** Home — lista os anos disponíveis (PRD § Requisitos Funcionais › Home). */
@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, EmptyState],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly catalogo = inject(CatalogoService);

  protected readonly anos = toSignal(this.catalogo.listAnosResumo(), { initialValue: [] });
}

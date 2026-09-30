import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Icon } from '../../../shared/ui/icon/icon';

/**
 * Casca do Painel Administrativo: navegação lateral + conteúdo da rota
 * ativa (PRD § Requisitos Funcionais › Painel Administrativo). Protegida
 * pelo adminGuard (ver app.routes.ts).
 */
@Component({
  selector: 'app-admin-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, Icon],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected async sair(): Promise<void> {
    await this.auth.logout();
    await this.router.navigateByUrl('/admin/login');
  }
}

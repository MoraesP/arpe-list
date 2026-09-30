import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { Icon } from '../../../shared/ui/icon/icon';

/** Cadastro de Ano — livre, sem limite de quantidade (PRD § Painel Administrativo). */
@Component({
  selector: 'app-ano-form',
  imports: [ReactiveFormsModule, Icon],
  templateUrl: './ano-form.html',
  styleUrl: './ano-form.scss',
})
export class AnoForm {
  private readonly admin = inject(AdminService);

  protected readonly numero = new FormControl<number | null>(null, {
    validators: [Validators.required, Validators.min(1900), Validators.max(2100)],
  });

  protected readonly salvo = signal(false);

  protected salvar(): void {
    if (this.numero.invalid || this.numero.value === null) {
      this.numero.markAsTouched();
      return;
    }
    this.admin.criarAno(this.numero.value);
    this.salvo.set(true);
    this.numero.reset();
  }
}

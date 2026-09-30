import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { CatalogoService } from '../../../core/services/catalogo.service';
import { Icon } from '../../../shared/ui/icon/icon';

/** Cadastro de Lote — livre, sem limite de quantidade (PRD § Painel Administrativo). */
@Component({
  selector: 'app-lote-form',
  imports: [ReactiveFormsModule, Icon],
  templateUrl: './lote-form.html',
  styleUrl: './lote-form.scss',
})
export class LoteForm {
  private readonly admin = inject(AdminService);
  private readonly catalogo = inject(CatalogoService);

  protected readonly anos = toSignal(this.catalogo.listAnos(), { initialValue: [] });

  protected readonly anoId = new FormControl<string | null>(null, { validators: [Validators.required] });
  protected readonly letra = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^[A-Za-z]$/)],
  });

  protected readonly salvo = signal(false);

  protected salvar(): void {
    if (this.anoId.invalid || this.letra.invalid || !this.anoId.value) {
      this.anoId.markAsTouched();
      this.letra.markAsTouched();
      return;
    }
    this.admin.criarLote(this.anoId.value, this.letra.value.toUpperCase());
    this.salvo.set(true);
    this.letra.reset('');
  }
}

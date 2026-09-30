import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

/** Login do admin único (ver docs/architecture.md). */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  /** Preenchido pelo adminGuard (query param) com a página que o usuário tentou abrir. */
  readonly returnUrl = input<string>();

  protected readonly form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    senha: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  protected readonly erro = signal<string | null>(null);
  protected readonly enviando = signal(false);

  protected async entrar(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.erro.set(null);
    this.enviando.set(true);
    try {
      const { email, senha } = this.form.getRawValue();
      await this.auth.login(email, senha);
      await this.router.navigateByUrl(this.destinoSeguro());
    } catch {
      this.erro.set('Email ou senha inválidos.');
    } finally {
      this.enviando.set(false);
    }
  }

  // Só aceita caminhos internos do admin, para o returnUrl não virar um redirecionamento aberto.
  private destinoSeguro(): string {
    const url = this.returnUrl();
    return url?.startsWith('/admin') && !url.startsWith('/admin/login') ? url : '/admin';
  }
}

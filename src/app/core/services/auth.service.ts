import { Injectable, signal } from '@angular/core';

/**
 * Estado de autenticação do admin único (ver docs/architecture.md).
 * Ainda simulado: qualquer email/senha preenchidos autenticam. Quando o
 * Firebase Auth for conectado, `login`/`logout` chamam
 * signInWithEmailAndPassword/signOut e `isAdmin` reflete a claim `admin`.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _isAdmin = signal(false);

  readonly isAdmin = this._isAdmin.asReadonly();

  async login(email: string, senha: string): Promise<void> {
    // TODO: signInWithEmailAndPassword(auth, email, senha) + checar a claim `admin`
    if (!email || !senha) {
      throw new Error('Credenciais inválidas.');
    }
    this._isAdmin.set(true);
  }

  async logout(): Promise<void> {
    // TODO: signOut(auth)
    this._isAdmin.set(false);
  }
}

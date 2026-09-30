import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Bloqueia /admin/* para quem não é o admin autenticado, levando ao login e voltando depois. */
export const adminGuard: CanActivateFn = (_route, state) => {
  if (inject(AuthService).isAdmin()) {
    return true;
  }
  return inject(Router).createUrlTree(['/admin/login'], { queryParams: { returnUrl: state.url } });
};

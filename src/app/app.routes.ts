import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { AdminShell } from './features/admin/admin-shell/admin-shell';
import { AnoForm } from './features/admin/ano-form/ano-form';
import { CarrinhoForm } from './features/admin/carrinho-form/carrinho-form';
import { Login } from './features/admin/login/login';
import { LoteForm } from './features/admin/lote-form/lote-form';
import { AnoPage } from './features/catalogo/ano-page/ano-page';
import { Home } from './features/catalogo/home/home';
import { LotePage } from './features/catalogo/lote-page/lote-page';

export const routes: Routes = [
  { path: '', component: Home, title: 'Catálogo Hot Wheels' },
  { path: 'anos/:anoId', component: AnoPage, title: 'Lotes do ano' },
  { path: 'anos/:anoId/lotes/:loteId', component: LotePage, title: 'Carrinhos do lote' },
  { path: 'admin/login', component: Login, title: 'Admin · Entrar' },
  {
    path: 'admin',
    component: AdminShell,
    canActivate: [adminGuard],
    canActivateChild: [adminGuard],
    children: [
      { path: '', redirectTo: 'carrinhos/novo', pathMatch: 'full' },
      { path: 'anos/novo', component: AnoForm, title: 'Admin · Novo ano' },
      { path: 'lotes/novo', component: LoteForm, title: 'Admin · Novo lote' },
      { path: 'carrinhos/novo', component: CarrinhoForm, title: 'Admin · Novo carrinho' },
    ],
  },
  { path: '**', redirectTo: '' },
];

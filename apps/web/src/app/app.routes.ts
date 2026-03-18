import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'wizard',
  },
  {
    path: 'wizard',
    loadChildren: () =>
      import('@nx-frontend-showcase/connector-wizard/feature-shell').then(
        (m) => m.WIZARD_ROUTES,
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('@nx-frontend-showcase/users/feature-shell').then(
        (m) => m.UsersPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'wizard',
  },
];

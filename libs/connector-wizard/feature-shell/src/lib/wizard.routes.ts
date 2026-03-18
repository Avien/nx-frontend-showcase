import { Routes } from '@angular/router';
import { WizardFacade } from '@nx-frontend-showcase/connector-wizard/data-access';
import { WIZARD_STEPS } from '@nx-frontend-showcase/connector-wizard/model';
import { wizardStepGuard } from '@nx-frontend-showcase/connector-wizard/util';
import { WizardShellComponent } from './wizard-shell.component';

export const WIZARD_ROUTES: Routes = [
  {
    path: '',
    component: WizardShellComponent,
    providers: [WizardFacade],
    children: [
      { path: '', pathMatch: 'full', redirectTo: WIZARD_STEPS.SERVICE },
      {
        path: WIZARD_STEPS.SERVICE,
        loadComponent: () =>
          import('@nx-frontend-showcase/connector-wizard/feature-steps/service-step').then(
            (m) => m.ServiceStepComponent,
          ),
        canActivate: [wizardStepGuard],
        data: { step: WIZARD_STEPS.SERVICE },
      },
      {
        path: WIZARD_STEPS.AUTH,
        loadComponent: () =>
          import('@nx-frontend-showcase/connector-wizard/feature-steps/auth-step').then(
            (m) => m.AuthStepComponent,
          ),
        canActivate: [wizardStepGuard],
        data: { step: WIZARD_STEPS.AUTH },
      },
      {
        path: WIZARD_STEPS.SCOPES,
        loadComponent: () =>
          import('@nx-frontend-showcase/connector-wizard/feature-steps/scopes-step').then(
            (m) => m.ScopesStepComponent,
          ),
        canActivate: [wizardStepGuard],
        data: { step: WIZARD_STEPS.SCOPES },
      },
      {
        path: WIZARD_STEPS.REVIEW,
        loadComponent: () =>
          import('@nx-frontend-showcase/connector-wizard/feature-steps/review-step').then(
            (m) => m.ReviewStepComponent,
          ),
        canActivate: [wizardStepGuard],
        data: { step: WIZARD_STEPS.REVIEW },
      },
    ],
  },
];

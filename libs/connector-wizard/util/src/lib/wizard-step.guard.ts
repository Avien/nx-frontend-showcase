import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { WizardFacade } from '@nx-frontend-showcase/connector-wizard/data-access';
import { WIZARD_STEPS, type WizardStep } from '@nx-frontend-showcase/connector-wizard/model';

export const wizardStepGuard: CanActivateFn = (route) => {
  const facade = inject(WizardFacade);
  const router = inject(Router);

  const step = route.data['step'] as WizardStep;
  facade.setCurrentStep(step);

  if (step === WIZARD_STEPS.SERVICE) return true;

  const hasService = !!facade.$vm().selectedServiceId;
  return hasService ? true : router.createUrlTree(['/wizard', WIZARD_STEPS.SERVICE]);
};

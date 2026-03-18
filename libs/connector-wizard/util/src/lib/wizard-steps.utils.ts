import { WIZARD_STEP_ORDER, type WizardStep } from '@nx-frontend-showcase/connector-wizard/model';

export function nextStep(step: WizardStep): WizardStep {
  const i = WIZARD_STEP_ORDER.indexOf(step);
  return WIZARD_STEP_ORDER[Math.min(i + 1, WIZARD_STEP_ORDER.length - 1)];
}

export function prevStep(step: WizardStep): WizardStep {
  const i = WIZARD_STEP_ORDER.indexOf(step);
  return WIZARD_STEP_ORDER[Math.max(i - 1, 0)];
}

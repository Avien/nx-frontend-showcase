import {WizardStep} from "./wizard.interface";

export const WIZARD_STEPS = {
    SERVICE: 'service',
    AUTH: 'auth',
    SCOPES: 'scopes',
    REVIEW: 'review',
} as const;

export const WIZARD_STEP_ORDER: readonly WizardStep[] = [
    WIZARD_STEPS.SERVICE,
    WIZARD_STEPS.AUTH,
    WIZARD_STEPS.SCOPES,
    WIZARD_STEPS.REVIEW,
];

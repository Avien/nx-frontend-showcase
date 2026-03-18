import {WIZARD_STEPS} from './wizard-steps.constants';

//export type WizardStep = 'service' | 'auth' | 'scopes' | 'review';
export type WizardStep = typeof WIZARD_STEPS[keyof typeof WIZARD_STEPS];

export interface WizardState {
    step: WizardStep;
    service?: string;
    scopes?: string[]
    error?: string;
}

import { WizardState } from './wizard.interface';
import { WIZARD_STEPS } from './wizard-steps.constants';

export const initialWizardState: WizardState = {
    step: WIZARD_STEPS.SERVICE,
    scopes:[]

};

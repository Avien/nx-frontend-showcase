import { WizardStep } from './wizard.interface';
import { WizardViewModel } from './wizard.view-model';
import {Signal} from "@angular/core";

export interface WizardFacadeInterface {
    readonly $vm: Signal<WizardViewModel>;

    selectService(serviceId: string): void;
    goTo(step: WizardStep): void;
    next(): void;
    back(): void;
}

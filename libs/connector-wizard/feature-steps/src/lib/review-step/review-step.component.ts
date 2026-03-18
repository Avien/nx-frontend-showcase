import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardFacade } from '@nx-frontend-showcase/connector-wizard/data-access'

@Component({
    selector: 'app-review-step',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './review-step.component.html',
    styleUrls: ['./review-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewStepComponent {
    constructor(public facade: WizardFacade) {}

    snapshot() {
        return {
            step: this.facade.$vm().step,
            selectedServiceId: this.facade.$vm().selectedServiceId,
            canProceed: this.facade.$vm().canProceed,
        };
    }
}

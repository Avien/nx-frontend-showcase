import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardFacade } from '@nx-frontend-showcase/connector-wizard/data-access'

@Component({
    selector: 'app-service-step',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './service-step.component.html',
    styleUrls: ['./service-step.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceStepComponent {
    constructor(public facade: WizardFacade) {}
}

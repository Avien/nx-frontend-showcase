import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardFacade } from '@nx-frontend-showcase/connector-wizard/data-access'

@Component({
    selector: 'app-auth-step',
    standalone: true,
    imports: [CommonModule],
    template: `
        <section class="step">
            <h2>Auth</h2>
            <p>Placeholder step. Selected service: <b>{{ facade.$vm().selectedServiceId }}</b></p>
            <p>In a real app, this step triggers OAuth / API key flow.</p>
        </section>
    `,
    styles: [`
    .step { padding: 8px 0; }
  `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthStepComponent {
    constructor(public facade: WizardFacade) {}
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardFacade } from '@nx-frontend-showcase/connector-wizard/data-access'

@Component({
    selector: 'app-scopes-step',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section class="step">
      <h2>Scopes</h2>
      <p>Placeholder step.</p>
    </section>
  `,
    styles: [`
    .step { padding: 8px 0; }
  `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScopesStepComponent {
    constructor(public facade: WizardFacade) {}
}

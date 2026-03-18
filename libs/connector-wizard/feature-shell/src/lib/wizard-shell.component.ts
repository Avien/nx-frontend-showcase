import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { WizardFacade } from '@nx-frontend-showcase/connector-wizard/data-access';

@Component({
  selector: 'app-wizard-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './wizard-shell.component.html',
  styleUrls: ['./wizard-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardShellComponent {
  constructor(public facade: WizardFacade) {}
}

import { WizardStep } from './wizard.interface';
import { ConnectorOption } from './connector-option.model';

export interface WizardViewModel {
  step: WizardStep;
  selectedServiceId: string | null;
  connectors: ConnectorOption[];
  loading: boolean;
  error: string | null;
  canProceed: boolean;
  canGoBack: boolean;
  nextLabel: string;
}

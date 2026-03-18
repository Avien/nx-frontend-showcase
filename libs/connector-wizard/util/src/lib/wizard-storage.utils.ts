import type { WizardState } from '@nx-frontend-showcase/connector-wizard/model';

const STORAGE_KEY = 'nx-frontend-showcase.wizard.v1';

export type PersistedWizardState = Pick<WizardState, 'service'>;

export function loadWizardFromStorage(): PersistedWizardState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedWizardState;
  } catch {
    return null;
  }
}

export function saveWizardToStorage(state: PersistedWizardState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage issues
  }
}

export function clearWizardStorage(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

import { Injectable, Signal, computed, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, finalize, take } from 'rxjs';

import {
  ConnectorOption,
  WIZARD_STEPS,
  WizardFacadeInterface,
  WizardState,
  WizardStep,
  WizardViewModel,
  initialWizardState,
} from '@nx-frontend-showcase/connector-wizard/model';
import {
  clearWizardStorage,
  loadWizardFromStorage,
  nextStep,
  prevStep,
  saveWizardToStorage,
} from '@nx-frontend-showcase/connector-wizard/util';
import { WizardApiService } from './wizard.api.service';

@Injectable()
export class WizardFacade implements WizardFacadeInterface {
  private readonly $state = signal<WizardState>(initialWizardState);
  private readonly $connectors = signal<ConnectorOption[]>([]);
  private readonly $loading = signal<boolean>(false);
  private readonly $error = signal<string>('');
  private readonly $servicesLoaded = signal(false);
  private servicesRequest$?: Observable<ConnectorOption[]>;

  readonly $vm: Signal<Readonly<WizardViewModel>> = computed(() => {
    const state = this.$state();
    const step = state.step;

    return {
      step,
      selectedServiceId: state.service ?? null,
      connectors: this.$connectors(),
      loading: this.$loading(),
      error: this.$error(),
      canProceed: step !== WIZARD_STEPS.SERVICE || !!state.service,
      canGoBack: step !== WIZARD_STEPS.SERVICE,
      nextLabel:
        step === WIZARD_STEPS.SERVICE
          ? 'Next'
          : step === WIZARD_STEPS.AUTH
            ? 'Next'
            : step === WIZARD_STEPS.SCOPES
              ? 'Review'
              : 'Finish',
    };
  });

  constructor(
    private readonly router: Router,
    private readonly api: WizardApiService,
  ) {
    this.restoreFromStorage();

    effect(() => {
      const service = this.$state().service;

      if (!service) {
        clearWizardStorage();
        return;
      }

      saveWizardToStorage({ service });
    });

    this.loadServices();
  }

  setCurrentStep(step: WizardStep): void {
    this.$state.update((s) => ({ ...s, step }));
  }

  selectService(serviceId: string): void {
    this.$error.set('');
    this.$state.update((s) => ({ ...s, service: serviceId }));
  }

  goTo(step: WizardStep): void {
    this.$state.update((s) => ({ ...s, step }));
    this.router.navigate(['/wizard', step]);
  }

  next(): void {
    const step = this.$state().step;
    if (step === WIZARD_STEPS.REVIEW) {
      return this.finish();
    }

    this.goTo(nextStep(step));
  }

  back(): void {
    this.goTo(prevStep(this.$state().step));
  }

  private finish(): void {
    this.$error.set('');
    this.$loading.set(true);

    const service = this.$state().service;
    const scopes = this.$state().scopes ?? [];

    if (!service) {
      this.$loading.set(false);
      this.$error.set('Please select a service first.');
      return;
    }

    this.api
      .finish({ serviceId: service, scopes })
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.$loading.set(false);
          if (res.ok) {
            this.$state.set(initialWizardState);
            clearWizardStorage();
            this.router.navigate(['/wizard', WIZARD_STEPS.SERVICE]);
          }
        },
        error: (err) => {
          this.$loading.set(false);
          this.$error.set(err.error?.message ?? 'Server error. Please try again later.');
        },
      });
  }

  private restoreFromStorage(): void {
    const persisted = loadWizardFromStorage();
    if (!persisted) return;

    this.$state.update((s) => ({
      ...s,
      service: persisted.service ?? s.service,
    }));
  }

  loadServices(opts?: { force?: boolean }): void {
    const force = opts?.force ?? false;

    if (!force && this.$servicesLoaded()) return;
    if (!force && this.servicesRequest$) return;

    this.$loading.set(true);

    this.servicesRequest$ = this.api.getServices().pipe(
      take(1),
      finalize(() => {
        this.servicesRequest$ = undefined;
      }),
    );

    this.servicesRequest$.subscribe({
      next: (services) => {
        this.$connectors.set(services);
        this.$servicesLoaded.set(true);
        this.$loading.set(false);
      },
      error: () => {
        this.$connectors.set([]);
        this.$servicesLoaded.set(false);
        this.$loading.set(false);
      },
    });
  }
}

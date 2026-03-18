import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardShellComponent } from './wizard-shell.component';

describe('WizardShellComponent', () => {
  let component: WizardShellComponent;
  let fixture: ComponentFixture<WizardShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardShellComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

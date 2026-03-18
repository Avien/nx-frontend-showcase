import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopesStepComponent } from './scopes-step.component';

describe('ScopesStepComponent', () => {
  let component: ScopesStepComponent;
  let fixture: ComponentFixture<ScopesStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScopesStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScopesStepComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

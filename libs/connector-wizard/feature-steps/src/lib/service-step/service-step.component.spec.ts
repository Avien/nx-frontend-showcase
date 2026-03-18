import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceStepComponent } from './service-step.component';

describe('ServiceStepComponent', () => {
  let component: ServiceStepComponent;
  let fixture: ComponentFixture<ServiceStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceStepComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

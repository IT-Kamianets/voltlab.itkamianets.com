import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarCalculatorComponent } from './solar-calculator.component';

describe('SolarCalculatorComponent', () => {
  let component: SolarCalculatorComponent;
  let fixture: ComponentFixture<SolarCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolarCalculatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolarCalculatorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

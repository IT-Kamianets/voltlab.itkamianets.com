import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitConverterComponent } from './unit-converter.component';

describe('UnitConverterComponent', () => {
  let component: UnitConverterComponent;
  let fixture: ComponentFixture<UnitConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitConverterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitConverterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

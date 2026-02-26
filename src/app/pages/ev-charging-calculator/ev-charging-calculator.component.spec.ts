import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvChargingCalculatorComponent } from './ev-charging-calculator.component';

describe('EvChargingCalculatorComponent', () => {
	let component: EvChargingCalculatorComponent;
	let fixture: ComponentFixture<EvChargingCalculatorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [EvChargingCalculatorComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(EvChargingCalculatorComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

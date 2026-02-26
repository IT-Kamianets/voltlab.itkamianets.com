import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePowerCalculatorComponent } from './device-power-calculator.component';

describe('DevicePowerCalculatorComponent', () => {
	let component: DevicePowerCalculatorComponent;
	let fixture: ComponentFixture<DevicePowerCalculatorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DevicePowerCalculatorComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(DevicePowerCalculatorComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-solar-calculator',
	imports: [],
	templateUrl: './solar-calculator.component.html',
	styleUrl: './solar-calculator.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolarCalculatorComponent {}

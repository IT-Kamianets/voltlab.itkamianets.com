import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ListedDevice {
	name: string;
	power: number;
	hours: number;
}

@Component({
	selector: 'app-device-power-calculator',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './device-power-calculator.component.html',
	styleUrls: ['./device-power-calculator.component.scss'],
})
export class DevicePowerCalculatorComponent {
	devicePresets = [
		{ name: 'Laptop', power: 60 },
		{ name: 'Refrigerator', power: 150 },
		{ name: 'TV', power: 100 },
		{ name: 'Microwave', power: 1000 },
		{ name: 'Light bulb', power: 10 },
	];

	selectedDeviceIndex = 0;
	customPower = 0;
	hours = 1;

	devices: ListedDevice[] = [];

	totalPower = 0;
	totalEnergy = 0;

	addDevice(): void {
		const selected = this.devicePresets[this.selectedDeviceIndex];

		const rawCustom = Number(this.customPower);
		const useCustom = Number.isFinite(rawCustom) && rawCustom > 0;
		const power = useCustom ? Math.max(0, rawCustom) : selected.power;

		const rawHours = Number(this.hours);
		const hours = Number.isFinite(rawHours) && rawHours > 0 ? rawHours : 1;

		this.devices.push({
			name: selected.name,
			power,
			hours,
		});

		this.calculateTotals();

		this.customPower = 0;
		this.hours = 1;
	}

	removeDevice(index: number): void {
		this.devices.splice(index, 1);
		this.calculateTotals();
	}

	calculateTotals(): void {
		this.totalPower = 0;
		this.totalEnergy = 0;

		for (const device of this.devices) {
			this.totalPower += device.power;
			this.totalEnergy += device.power * device.hours;
		}
	}
}

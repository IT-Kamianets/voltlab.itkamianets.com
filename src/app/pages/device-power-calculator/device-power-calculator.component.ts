import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-device-power-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './device-power-calculator.component.html',
  styleUrl: './device-power-calculator.component.scss'
})
export class DevicePowerCalculatorComponent {

  devicePresets = [
    { name: 'Laptop', power: 60 },
    { name: 'Refrigerator', power: 150 },
    { name: 'TV', power: 100 },
    { name: 'Microwave', power: 1000 },
    { name: 'Light bulb', power: 10 }
  ];

  selectedDeviceIndex = 0;
  customPower: number | null = null;
  hours = 1;

  devices: { name: string; power: number }[] = [];

  get totalPower(): number {
    return this.devices.reduce((sum, d) => sum + d.power, 0);
  }

  get totalEnergy(): number {
    return this.totalPower * this.hours;
  }

  addDevice() {
    const selected = this.devicePresets[this.selectedDeviceIndex];
    const power = this.customPower ? this.customPower : selected.power;

    this.devices.push({
      name: selected.name,
      power: power
    });

    this.customPower = null;
  }

  removeDevice(index: number) {
    this.devices.splice(index, 1);
  }

}

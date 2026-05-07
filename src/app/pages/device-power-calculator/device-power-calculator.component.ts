import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-device-power-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './device-power-calculator.component.html',
  styleUrls: ['./device-power-calculator.component.scss']
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
  customPower = 0;
  hours = 1;

  devices: any[] = [];

  totalPower = 0;
  totalEnergy = 0;

  addDevice() {

    const selected = this.devicePresets[this.selectedDeviceIndex];

    const power =
      this.customPower > 0
        ? this.customPower
        : selected.power;

    const newDevice = {
      name: selected.name,
      power: power,
      hours: this.hours
    };

    this.devices.push(newDevice);

    this.calculateTotals();

    this.customPower = 0;
    this.hours = 1;
  }

  removeDevice(index: number) {
    this.devices.splice(index, 1);
    this.calculateTotals();
  }

  calculateTotals() {

    this.totalPower = 0;
    this.totalEnergy = 0;

    for (let device of this.devices) {

      this.totalPower += device.power;

      this.totalEnergy += device.power * device.hours;
    }
  }
}
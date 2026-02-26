import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Category = 'electrical' | 'energy';

@Component({
  selector: 'app-unit-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.scss']
})
export class UnitConverterComponent {

  category: Category = 'electrical';

  // ===== ELECTRICAL =====
  voltage: number = 220;
  current: number = 1;
  power: number = 220;

  // ===== ENERGY =====
  energyValue: number = 1;
  energyFrom: 'Wh' | 'kWh' = 'Wh';
  energyTo: 'Wh' | 'kWh' = 'kWh';
  energyResult: number = 0;

  // ======================

  calculatePower() {
    if (this.voltage && this.current) {
      this.power = this.voltage * this.current;
    }
  }

  calculateCurrent() {
    if (this.voltage && this.power) {
      this.current = this.power / this.voltage;
    }
  }

  calculateVoltage() {
    if (this.current && this.power) {
      this.voltage = this.power / this.current;
    }
  }

  convertEnergy() {
    if (this.energyFrom === this.energyTo) {
      this.energyResult = this.energyValue;
      return;
    }

    if (this.energyFrom === 'Wh' && this.energyTo === 'kWh') {
      this.energyResult = this.energyValue / 1000;
    } else {
      this.energyResult = this.energyValue * 1000;
    }
  }

}
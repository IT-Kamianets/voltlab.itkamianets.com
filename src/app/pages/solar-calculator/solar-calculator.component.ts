import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

const PSH_BY_REGION = {
  kyiv: 3.5,
  'kyiv-city': 3.5,
  chernihiv: 3.3,
  sumy: 3.3,
  zhytomyr: 3.4,
  rivne: 3.4,
  volyn: 3.4,
  poltava: 3.6,
  cherkasy: 3.7,
  kirovohrad: 3.8,

  lviv: 3.4,
  ternopil: 3.5,
  'ivano-frankivsk': 3.4,
  chernivtsi: 3.6,
  zakarpattia: 3.6,
  khmelnytskyi: 3.5,
  vinnytsia: 3.7,

  kharkiv: 3.6,
  luhansk: 3.9,
  donetsk: 3.9,

  dnipropetrovsk: 3.9,
  zaporizhzhia: 4.1,
  mykolaiv: 4.2,
  odesa: 4.2,
  kherson: 4.3,
  crimea: 4.5,
  sevastopol: 4.5,
} as const;

type RegionKey = keyof typeof PSH_BY_REGION;

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

@Component({
  selector: 'app-solar-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solar-calculator.component.html',
  styleUrl: './solar-calculator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolarCalculatorComponent {
  // ===== Inputs =====
  // ✅ allow '' to show "Select region"
  region: RegionKey | '' = '';

  consumption = 0;     // kWh/day
  panelPowerW = 0;     // W
  psh = 0;             // h/day
  lossesPct = 0;       // %
  tariff = 0;          // UAH/kWh
  panelPrice = 0;      // UAH
  inverterPrice = 0;   // UAH

  // ===== Outputs =====
  outDaily = 0;
  outSystemKw = 0;
  outPanels = 0;
  outMonthly = 0;
  outYearly = 0;
  outSavings = 0;
  outPaybackYears = 0;
  outPaybackMonths = 0;

  warning = '';

  // ✅ after reload we treat PSH as "manual", so no autofill until user picks region
  private pshWasManuallyChanged = true;

  // HTML: (change)="onRegionChange()"
  onRegionChange() {
    // user picked region -> allow autofill now
    this.pshWasManuallyChanged = false;
    this.applyRegionPSH();
  }

  // HTML: (input)="onPSHManualChange()"
  onPSHManualChange() {
    this.pshWasManuallyChanged = true;
  }

  private applyRegionPSH() {
    if (this.pshWasManuallyChanged) return;
    if (!this.region) return;

    const suggested = PSH_BY_REGION[this.region];
    if (suggested != null) this.psh = suggested;
  }

  private clearOutputs() {
    this.outDaily = 0;
    this.outSystemKw = 0;
    this.outPanels = 0;
    this.outMonthly = 0;
    this.outYearly = 0;
    this.outSavings = 0;
    this.outPaybackYears = 0;
    this.outPaybackMonths = 0;
  }

  calculate() {
    const consumption = Math.max(0, Number(this.consumption) || 0);
    const panelPowerW = Math.max(0, Number(this.panelPowerW) || 0);
    const psh = Math.max(0, Number(this.psh) || 0);
    const lossesPct = clamp(Number(this.lossesPct) || 0, 0, 90);
    const tariff = Math.max(0, Number(this.tariff) || 0);
    const panelPrice = Math.max(0, Number(this.panelPrice) || 0);
    const inverterPrice = Math.max(0, Number(this.inverterPrice) || 0);

    const eff = 1 - lossesPct / 100;

    // Warning text (optional)
    this.warning = '';
    if (lossesPct >= 35) {
      this.warning =
        'Losses are very high — check wiring, tilt angle, shading, or inverter efficiency.';
    } else if (psh > 0 && psh < 2.5) {
      this.warning = 'Low PSH — double-check your region selection or PSH value.';
    } else if (consumption === 0) {
      this.warning = 'Enter your average daily consumption to get a correct estimate.';
    }

    // Essential inputs missing -> outputs = 0
    if (consumption === 0 || panelPowerW === 0 || psh === 0 || eff <= 0) {
      this.clearOutputs();
      return;
    }

    const requiredSystemKw = consumption / (psh * eff);
    const panels = Math.max(0, Math.ceil((requiredSystemKw * 1000) / panelPowerW));
    const actualSystemKw = (panels * panelPowerW) / 1000;

    const daily = actualSystemKw * psh * eff;
    const monthly = daily * 30;
    const yearly = daily * 365;

    const savings = yearly * tariff;
    const totalCost = panels * panelPrice + inverterPrice;

    const paybackYears = totalCost > 0 && savings > 0 ? totalCost / savings : 0;

    this.outDaily = daily;
    this.outSystemKw = actualSystemKw;
    this.outPanels = panels;
    this.outMonthly = monthly;
    this.outYearly = yearly;
    this.outSavings = savings;
    this.outPaybackYears = paybackYears;
    this.outPaybackMonths = paybackYears * 12;
  }

  // Reset => everything becomes 0 and region becomes "Select region"
  resetAll() {
    this.region = '';

    this.consumption = 0;
    this.panelPowerW = 0;
    this.psh = 0;
    this.lossesPct = 0;
    this.tariff = 0;
    this.panelPrice = 0;
    this.inverterPrice = 0;

    // keep PSH manual to avoid autofill until user selects region again
    this.pshWasManuallyChanged = true;

    this.warning = '';
    this.clearOutputs();
  }

  // ✅ after page reload -> everything is 0 + Select region
  ngOnInit() {
    this.resetAll();
  }
}
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

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

function toNum(raw: string): number {
  const n = Number(String(raw).replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

@Component({
  selector: 'app-solar-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solar-calculator.component.html',
  styleUrl: './solar-calculator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolarCalculatorComponent {
  region = signal<RegionKey | ''>('');

  consumption = signal(''); // kWh/day
  panelPowerW = signal(''); // W
  psh = signal(''); // h/day
  lossesPct = signal(''); // %
  tariff = signal(''); // UAH/kWh
  panelPrice = signal(''); // UAH
  inverterPrice = signal(''); // UAH

  backupHours = signal(''); // hours
  dodPct = signal(''); // % depth of discharge (e.g. 80)

  currentSystemKw = signal(''); // kW
  currentPanels = signal(''); // count

  systemType = signal<'on-grid' | 'off-grid' | 'hybrid'>('on-grid');

  outDaily = signal(0);
  outSystemKw = signal(0);
  outPanels = signal(0);
  outMonthly = signal(0);
  outYearly = signal(0);
  outSavings = signal(0);
  outPaybackYears = signal(0);
  outPaybackMonths = signal(0);

  outBatteryKwh = signal(0); // Required battery size

  outDeltaKw = signal(0); // calculated - current
  outDeltaPanels = signal(0);

  warning = signal('');

  private pshWasManuallyChanged = signal(true);

  onRegionChange() {
    this.pshWasManuallyChanged.set(false);
    this.applyRegionPSH();
  }

  onPSHManualChange() {
    this.pshWasManuallyChanged.set(true);
  }

  private applyRegionPSH() {
    if (this.pshWasManuallyChanged()) return;
    const region = this.region();
    if (!region) return;

    const suggested = PSH_BY_REGION[region];
    if (suggested != null) this.psh.set(String(suggested));
  }

  private clearOutputs() {
    this.outDaily.set(0);
    this.outSystemKw.set(0);
    this.outPanels.set(0);
    this.outMonthly.set(0);
    this.outYearly.set(0);
    this.outSavings.set(0);
    this.outPaybackYears.set(0);
    this.outPaybackMonths.set(0);
    this.outBatteryKwh.set(0);
    this.outDeltaKw.set(0);
    this.outDeltaPanels.set(0);
  }

  calculate() {
    const consumption = Math.max(0, toNum(this.consumption())); // kWh/day
    const panelPowerW = Math.max(0, toNum(this.panelPowerW())); // W
    const psh = Math.max(0, toNum(this.psh())); // h/day
    const lossesPct = clamp(toNum(this.lossesPct()), 0, 90);
    const tariff = Math.max(0, toNum(this.tariff()));
    const panelPrice = Math.max(0, toNum(this.panelPrice()));
    const inverterPrice = Math.max(0, toNum(this.inverterPrice()));

    const backupHours = clamp(toNum(this.backupHours()), 0, 168);
    const dodPct = clamp(toNum(this.dodPct()) || 0, 0, 100);

    const currentKw = Math.max(0, toNum(this.currentSystemKw()));
    const currentPanels = Math.max(0, Math.floor(toNum(this.currentPanels())));

    const eff = 1 - lossesPct / 100;

    this.warning.set('');
    if (lossesPct >= 35) {
      this.warning.set(
        'Losses are very high — check wiring, tilt angle, shading, or inverter efficiency.'
      );
    } else if (psh > 0 && psh < 2.5) {
      this.warning.set('Low PSH — double-check your region selection or PSH value.');
    } else if (consumption === 0) {
      this.warning.set('Enter your average daily consumption to get a correct estimate.');
    }

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

    let batteryKwh = 0;
    if (backupHours > 0) {
      const dod = dodPct > 0 ? dodPct / 100 : 0; // if not provided -> can't estimate
      batteryKwh = dod > 0 ? (consumption * (backupHours / 24)) / dod : 0;
    }

    const deltaKw = currentKw > 0 ? actualSystemKw - currentKw : 0;
    const deltaPanels = currentPanels > 0 ? panels - currentPanels : 0;

    this.outDaily.set(daily);
    this.outSystemKw.set(actualSystemKw);
    this.outPanels.set(panels);
    this.outMonthly.set(monthly);
    this.outYearly.set(yearly);
    this.outSavings.set(savings);
    this.outPaybackYears.set(paybackYears);
    this.outPaybackMonths.set(paybackYears * 12);

    this.outBatteryKwh.set(batteryKwh);

    this.outDeltaKw.set(deltaKw);
    this.outDeltaPanels.set(deltaPanels);
  }

  resetAll() {
    this.region.set('');

    this.consumption.set('');
    this.panelPowerW.set('');
    this.psh.set('');
    this.lossesPct.set('');
    this.tariff.set('');
    this.panelPrice.set('');
    this.inverterPrice.set('');

    this.backupHours.set('');
    this.dodPct.set('');

    this.currentSystemKw.set('');
    this.currentPanels.set('');

    this.systemType.set('on-grid');

    this.pshWasManuallyChanged.set(true);

    this.warning.set('');
    this.clearOutputs();
  }

  ngOnInit() {
    this.resetAll();
  }
}
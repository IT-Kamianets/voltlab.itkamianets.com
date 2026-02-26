import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-battery-usage',
  imports: [],
  templateUrl: './battery-usage.component.html',
  styleUrl: './battery-usage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatteryUsageComponent {}

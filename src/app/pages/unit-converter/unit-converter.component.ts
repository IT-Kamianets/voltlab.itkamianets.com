import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-unit-converter',
  imports: [],
  templateUrl: './unit-converter.component.html',
  styleUrl: './unit-converter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitConverterComponent {}

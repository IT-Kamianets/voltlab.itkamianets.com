import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((c) => c.AboutComponent),
  },
  {
    path: 'battery-usage',
    loadComponent: () =>
      import('./pages/battery-usage/battery-usage.component').then((c) => c.BatteryUsageComponent),
  },
  {
    path: 'device-power-calculator',
    loadComponent: () =>
      import('./pages/device-power-calculator/device-power-calculator.component').then(
        (c) => c.DevicePowerCalculatorComponent,
      ),
  },
  {
    path: 'ev-charging-calculator',
    loadComponent: () =>
      import('./pages/ev-charging-calculator/ev-charging-calculator.component').then(
        (c) => c.EvChargingCalculatorComponent,
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.component').then((c) => c.SettingsComponent),
  },
  {
    path: 'solar-calculator',
    loadComponent: () =>
      import('./pages/solar-calculator/solar-calculator.component').then(
        (c) => c.SolarCalculatorComponent,
      ),
  },
  {
    path: 'unit-converter',
    loadComponent: () =>
      import('./pages/unit-converter/unit-converter.component').then(
        (c) => c.UnitConverterComponent,
      ),
  },
  {
    path: 'tips',
    loadComponent: () => import('./pages/tips/tips.component').then((c) => c.TipsComponent),
  },
  {
    path: 'legal',
    loadComponent: () => import('./pages/legal/legal.component').then((c) => c.LegalComponent),
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq.component').then((c) => c.FaqComponent),
  },
  {
    path: 'glossary',
    loadComponent: () =>
      import('./pages/glossary/glossary.component').then((c) => c.GlossaryComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

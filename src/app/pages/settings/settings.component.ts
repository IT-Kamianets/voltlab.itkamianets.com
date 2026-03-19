import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppTheme, ThemeService } from '../../services/theme.service';
import {
	CurrencyCode,
	LanguageCode,
	SettingsService,
	UnitSystem,
} from '../../services/settings.service';

@Component({
	selector: 'app-settings',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './settings.component.html',
	styleUrl: './settings.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
	private readonly _settings = inject(SettingsService);
	private readonly _theme = inject(ThemeService);

	readonly unitsSig = this._settings.units;
	readonly currencySig = this._settings.currency;
	readonly languageSig = this._settings.language;
	readonly themeSig = this._theme.theme;

	private readonly _text = {
		title: { en: 'Settings', uk: 'Налаштування' },
		subtitle: {
			en: 'Personalize units, currency, language, and theme.',
			uk: 'Налаштуйте одиниці, валюту, мову та тему.',
		},
		unitsLabel: { en: 'Units', uk: 'Одиниці' },
		unitsHint: {
			en: 'Choose how values are displayed across calculators.',
			uk: 'Оберіть, як показувати значення у калькуляторах.',
		},
		currencyLabel: { en: 'Currency', uk: 'Валюта' },
		currencyHint: {
			en: 'Used for cost estimates and summaries.',
			uk: 'Використовується для оцінки вартості та підсумків.',
		},
		languageLabel: { en: 'Language', uk: 'Мова' },
		languageHint: {
			en: 'Affects UI language (where available).',
			uk: 'Впливає на мову інтерфейсу (де доступно).',
		},
		themeLabel: { en: 'Theme', uk: 'Тема' },
		themeHint: {
			en: 'Switch between light and dark mode.',
			uk: 'Перемикайте між світлою та темною темою.',
		},
		reset: { en: 'Reset to defaults', uk: 'Скинути до стандартних' },
	} as const;

	t(key: keyof typeof this._text): string {
		return this._text[key][this.languageSig()];
	}

	readonly unitOptions: ReadonlyArray<{
		value: UnitSystem;
		label: { en: string; uk: string };
		hint: { en: string; uk: string };
	}> = [
		{
			value: 'metric',
			label: { en: 'Metric', uk: 'Метрична' },
			hint: { en: 'kWh, km, °C', uk: 'кВт·год, км, °C' },
		},
		{
			value: 'imperial',
			label: { en: 'Imperial', uk: 'Імперська' },
			hint: { en: 'kWh, mi, °F', uk: 'кВт·год, милі, °F' },
		},
	];

	readonly currencyOptions: ReadonlyArray<{
		value: CurrencyCode;
		label: { en: string; uk: string };
	}> = [
		{ value: 'USD', label: { en: 'USD ($)', uk: 'USD ($)' } },
		{ value: 'EUR', label: { en: 'EUR (€)', uk: 'EUR (€)' } },
		{ value: 'UAH', label: { en: 'UAH (₴)', uk: 'UAH (₴)' } },
	];

	readonly languageOptions: ReadonlyArray<{
		value: LanguageCode;
		label: { en: string; uk: string };
	}> = [
		{ value: 'en', label: { en: 'English', uk: 'English' } },
		{ value: 'uk', label: { en: 'Ukrainian', uk: 'Українська' } },
	];

	readonly themeOptions: ReadonlyArray<{
		value: AppTheme;
		label: { en: string; uk: string };
	}> = [
		{ value: 'light', label: { en: 'Light', uk: 'Світла' } },
		{ value: 'dark', label: { en: 'Dark', uk: 'Темна' } },
	];

	onUnitsChange(value: UnitSystem): void {
		this._settings.setUnits(value);
	}

	onCurrencyChange(value: CurrencyCode): void {
		this._settings.setCurrency(value);
	}

	onLanguageChange(value: LanguageCode): void {
		this._settings.setLanguage(value);
	}

	onThemeChange(value: AppTheme): void {
		this._theme.setTheme(value);
	}

	onReset(): void {
		this._settings.reset();
		this._theme.setTheme('dark');
	}
}

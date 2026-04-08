import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type UnitSystem = 'metric' | 'imperial';
export type CurrencyCode = 'USD' | 'EUR' | 'UAH';
export type LanguageCode = 'en' | 'uk';

type SettingsState = {
	units: UnitSystem;
	currency: CurrencyCode;
	language: LanguageCode;
};

const DEFAULTS: SettingsState = {
	units: 'metric',
	currency: 'USD',
	language: 'en',
};

@Injectable({ providedIn: 'root' })
export class SettingsService {
	private readonly _doc = inject(DOCUMENT);
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _memory = new Map<string, string>();

	private readonly _keys = {
		units: 'voltlab_units',
		currency: 'voltlab_currency',
		language: 'voltlab_language',
	} as const;

	readonly units = signal<UnitSystem>(DEFAULTS.units);
	readonly currency = signal<CurrencyCode>(DEFAULTS.currency);
	readonly language = signal<LanguageCode>(DEFAULTS.language);

	constructor() {
		const saved = this._readAll();

		this.units.set(saved.units);
		this.currency.set(saved.currency);
		this.language.set(saved.language);

		this._applyLanguage(saved.language);

		this._ensurePersisted(saved);
	}

	setUnits(units: UnitSystem): void {
		this.units.set(units);
		this._write(this._keys.units, units);
	}

	setCurrency(currency: CurrencyCode): void {
		this.currency.set(currency);
		this._write(this._keys.currency, currency);
	}

	setLanguage(language: LanguageCode): void {
		this.language.set(language);
		this._applyLanguage(language);
		this._write(this._keys.language, language);
	}

	reset(): void {
		this.setUnits(DEFAULTS.units);
		this.setCurrency(DEFAULTS.currency);
		this.setLanguage(DEFAULTS.language);
	}

	private _applyLanguage(language: LanguageCode): void {
		this._doc.documentElement.lang = language;
	}

	private _readAll(): SettingsState {
		const units = this._readEnum(this._keys.units, ['metric', 'imperial'] as const);
		const currency = this._readEnum(this._keys.currency, ['USD', 'EUR', 'UAH'] as const);
		const language = this._readEnum(this._keys.language, ['en', 'uk'] as const);

		return {
			units: units ?? DEFAULTS.units,
			currency: currency ?? DEFAULTS.currency,
			language: language ?? DEFAULTS.language,
		};
	}

	private _ensurePersisted(state: SettingsState): void {
		if (!isPlatformBrowser(this._platformId)) return;

		this._writeIfMissing(this._keys.units, state.units);
		this._writeIfMissing(this._keys.currency, state.currency);
		this._writeIfMissing(this._keys.language, state.language);
	}

	private _readEnum<T extends string>(
		key: string,
		allowed: readonly T[],
	): T | null {
		if (!isPlatformBrowser(this._platformId)) return null;

		const value = this._getItem(key);
		if (!value) return null;

		return (allowed as readonly string[]).includes(value) ? (value as T) : null;
	}

	private _writeIfMissing(key: string, value: string): void {
		const existing = this._getItem(key);
		if (existing === null) this._write(key, value);
	}

	private _getItem(key: string): string | null {
		if (!isPlatformBrowser(this._platformId)) return null;

		try {
			const v = this._doc.defaultView?.localStorage?.getItem(key);
			return v ?? null;
		} catch {
			return this._memory.get(key) ?? null;
		}
	}

	private _write(key: string, value: string): void {
		if (!isPlatformBrowser(this._platformId)) return;

		try {
			this._doc.defaultView?.localStorage?.setItem(key, value);
		} catch {
			this._memory.set(key, value);
		}
	}
}

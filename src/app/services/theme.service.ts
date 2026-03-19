import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type AppTheme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
	private readonly _doc = inject(DOCUMENT);
	private readonly _platformId = inject(PLATFORM_ID);
	private readonly _key = 'voltlab_theme';

	readonly theme = signal<AppTheme>(
		isPlatformBrowser(this._platformId)
			? (localStorage.getItem(this._key) as AppTheme)
			: 'dark',
	);

	constructor() {
		const saved = this._read();
		this._set(saved ?? 'dark');
	}

	setTheme(theme: AppTheme): void {
		this._set(theme);
	}

	toggle(): void {
		this._set(this.theme() === 'dark' ? 'light' : 'dark');
	}

	private _set(theme: AppTheme): void {
		this.theme.set(theme);
		this._apply(theme);
		this._write(theme);
	}

	private _apply(theme: AppTheme): void {
		const root = this._doc.documentElement; // <html>
		root.setAttribute('data-mode', theme); // matches your global styles
		root.classList.remove('dark'); // cleanup (optional)
	}

	private _read(): AppTheme | null {
		if (!isPlatformBrowser(this._platformId)) return null;

		const v = this._doc.defaultView?.localStorage?.getItem(this._key);
		return v === 'dark' || v === 'light' ? v : null;
	}

	private _write(theme: AppTheme): void {
		if (!isPlatformBrowser(this._platformId)) return;

		localStorage.setItem(this._key, theme);
	}
}

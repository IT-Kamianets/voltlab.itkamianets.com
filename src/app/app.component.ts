import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from './services/theme.service';

type AppNavItem = {
	path: string;
	label: string;
	icon: string; // material icon name
};

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, RouterLink, RouterLinkActive],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	private readonly _router = inject(Router);

	protected readonly theme = inject(ThemeService);

	protected readonly sidebarOpen = signal(false);

	protected readonly footerItems: AppNavItem[] = [
		{ path: '/solar-calculator', label: 'Solar', icon: 'solar_power' },
		{ path: '/unit-converter', label: 'Convert', icon: 'swap_horiz' },
		{ path: '/device-power-calculator', label: 'Devices', icon: 'devices' },
		{ path: '/ev-charging-calculator', label: 'Charge', icon: 'ev_station' },
	];

	protected readonly sidebarItems: AppNavItem[] = [
		{ path: '/', label: 'Home', icon: 'home' },
		{ path: '/settings', label: 'Settings', icon: 'settings' },
		{ path: '/about', label: 'About', icon: 'info' },
		{ path: '/battery-usage', label: 'Battery usage', icon: 'battery_full' },
		{ path: '/tips', label: 'Tips', icon: 'lightbulb' },
		{ path: '/faq', label: 'Faq', icon: 'help' },
		{ path: '/glossary', label: 'Glossary', icon: 'menu_book' },
		{ path: '/legal', label: 'Legal', icon: 'gavel' },
	];

	protected readonly logoText = 'voltlab';

	protected readonly currentPath = signal<string>(this._router.url || '/');

	protected readonly pageTitle = computed(() => {
		const path = this.currentPath();

		const byFooter = this.footerItems.find((i) => this._isActive(path, i.path));
		if (byFooter) return byFooter.label;

		const bySidebar = this.sidebarItems.find((i) => this._isActive(path, i.path));
		if (bySidebar) return bySidebar.label;

		return 'voltlab';
	});

	ready = signal(false);

	constructor() {
		this._router.events
			.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
			.subscribe((e) => {
				this.currentPath.set(e.urlAfterRedirects || '/');
				this.sidebarOpen.set(false);
			});

		setTimeout(() => {
			this.ready.set(true);
		}, 1000);
	}

	protected onThemeToggle(): void {
		this.theme.toggle();
	}

	protected toggleSidebar(): void {
		this.sidebarOpen.update((v) => !v);
	}

	protected closeSidebar(): void {
		this.sidebarOpen.set(false);
	}

	private _isActive(current: string, target: string): boolean {
		const cur = (current || '/').split('?')[0].split('#')[0];
		if (target === '/') return cur === '/';
		return cur === target || cur.startsWith(`${target}/`);
	}
}

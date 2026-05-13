import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

type PanelPreset = { label: string; wM: number; hM: number };

const PRESETS: PanelPreset[] = [
	{ label: '1722 × 1134 mm (typical full-cell / half-cut)', wM: 1.722, hM: 1.134 },
	{ label: '1765 × 1048 mm', wM: 1.765, hM: 1.048 },
	{ label: '1956 × 992 mm', wM: 1.956, hM: 0.992 },
	{ label: 'Custom', wM: 0, hM: 0 },
];

function toNum(raw: string): number {
	const n = Number(String(raw).replace(',', '.'));
	return Number.isFinite(n) ? n : 0;
}

@Component({
	selector: 'app-panel-layout-calculator',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './panel-layout-calculator.component.html',
	styleUrl: './panel-layout-calculator.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelLayoutCalculatorComponent {
	readonly presets = PRESETS;

	presetIndex = signal(0);

	roofWidthM = signal('');
	roofHeightM = signal('');
	marginM = signal('0.05');

	panelWidthM = signal('1.722');
	panelHeightM = signal('1.134');
	gapHM = signal('0.02');
	gapVM = signal('0.02');

	panelWp = signal('450');

	landscapeAlongRoofWidth = signal(true);

	onPresetChange(indexStr: string): void {
		const idx = Number(indexStr);
		if (!Number.isFinite(idx) || idx < 0 || idx >= PRESETS.length) return;
		this.presetIndex.set(idx);
		const p = PRESETS[idx];
		if (p.wM > 0 && p.hM > 0) {
			this.panelWidthM.set(String(p.wM));
			this.panelHeightM.set(String(p.hM));
		}
	}

	readonly layout = computed(() => {
		const rw = toNum(this.roofWidthM());
		const rh = toNum(this.roofHeightM());
		const margin = Math.max(0, toNum(this.marginM()));
		let pw = toNum(this.panelWidthM());
		let ph = toNum(this.panelHeightM());
		const gh = Math.max(0, toNum(this.gapHM()));
		const gv = Math.max(0, toNum(this.gapVM()));
		const wpNom = Math.max(0, toNum(this.panelWp()));

		if (!this.landscapeAlongRoofWidth()) {
			[pw, ph] = [ph, pw];
		}

		const usableW = rw - 2 * margin;
		const usableH = rh - 2 * margin;

		if (usableW <= 0 || usableH <= 0 || pw <= 0 || ph <= 0) {
			return {
				ok: false as const,
				reason:
					usableW <= 0 || usableH <= 0
						? 'Check roof dimensions and setbacks: usable area must be greater than zero.'
						: 'Module dimensions must be greater than zero.',
			};
		}

		const pitchW = pw + gh;
		const pitchH = ph + gv;
		const cols = Math.max(0, Math.floor((usableW + gh) / pitchW));
		const rows = Math.max(0, Math.floor((usableH + gv) / pitchH));
		const total = cols * rows;

		const usedW = cols > 0 ? cols * pw + (cols - 1) * gh : 0;
		const usedH = rows > 0 ? rows * ph + (rows - 1) * gv : 0;

		if (total <= 0) {
			return {
				ok: false as const,
				reason:
					'No complete module fits within the usable roof area. Check roof dimensions, setbacks, module size, gaps, and orientation.',
			};
		}

		const roofArea = rw * rh;
		const usedArea = usedW * usedH;
		const coveragePct = roofArea > 0 ? (100 * usedArea) / roofArea : 0;

		const kwp = (total * wpNom) / 1000;

		const railApproxM = rows * usedW;

		return {
			ok: true as const,
			cols,
			rows,
			total,
			usedW,
			usedH,
			coveragePct,
			kwp,
			railApproxM,
			usableW,
			usableH,
			footprintW: pw,
			footprintH: ph,
		};
	});
}

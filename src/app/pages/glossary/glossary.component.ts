import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-glossary',
	imports: [],
	templateUrl: './glossary.component.html',
	styleUrl: './glossary.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlossaryComponent {}

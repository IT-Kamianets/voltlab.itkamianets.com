import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-home',
	imports: [NgFor, RouterLink],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	private readonly flipped = new Set<number>();

	readonly pages = [
		{
			title: 'Home',
			description: '',
		},
		{
			title: 'About VoltLab',
			description: 'Mission, values, and the tools available in the service.',
		},
		{
			title: 'Battery usage',
			description: 'Estimate energy consumption and battery runtime scenarios.',
		},
		{
			title: 'Power calculator',
			description: 'Calculate device consumption and total load.',
		},
		{
			title: 'EV charging',
			description: 'Estimate charging time, cost, and energy use.',
		},
		{
			title: 'Solar calculator',
			description: 'Plan a solar system and estimate potential generation.',
		},
		{
			title: 'Unit converter',
			description: 'Convert energy, power, and everyday units.',
		},
		{
			title: 'Knowledge base',
			description: 'Tips, articles, and practical guidance for energy efficiency.',
		},
		{
			title: 'FAQ',
			description: 'Answers to common questions about the service and calculations.',
		},
		{
			title: 'Glossary',
			description: 'Definitions of terms, abbreviations, and key energy concepts.',
		},
		{
			title: 'Settings',
			description: 'Personal preferences, units, and configuration options.',
		},
		{
			title: 'Legal',
			description: 'Policies, terms of use, and other legal information.',
		},
	] as const;

	toggleFlip(index: number): void {
		if (this.flipped.has(index)) {
			this.flipped.delete(index);
			return;
		}

		this.flipped.add(index);
	}

	isFlipped(index: number): boolean {
		return this.flipped.has(index);
	}

	trackByIndex(index: number): number {
		return index;
	}
}

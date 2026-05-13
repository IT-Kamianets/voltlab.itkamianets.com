import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
	selector: 'app-home',
	imports: [NgFor],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	private readonly flipped = new Set<number>();

	readonly pages = [
		{
			title: 'Home 🏠',
			description:
				'The Home page gives a brief overview of all sections of the application. It helps users quickly understand the purpose of each page and navigate to the main features of the platform.',
		},
		{
			title: 'About VoltLab 🌟',
			description:
				'Learn about VoltLab’s mission and values and discover the tools available in the service. This section explains the purpose of the platform and its main features.',
		},
		{
			title: 'Battery usage 🔋',
			description:
				'Estimate energy consumption and battery runtime for different scenarios, helping users understand how device load affects battery life',
		},
		{
			title: 'Power calculator ⚡',
			description:
				'Calculate device power consumption and estimate the total load of multiple devices. This tool helps users quickly understand how much power their equipment uses.',
		},
		{
			title: 'EV charging 🚗',
			description:
				'Estimate charging time, energy usage, and the cost of charging an electric vehicle. This tool helps users plan charging sessions and better understand energy consumption.',
		},
		{
			title: 'Solar calculator ☀️',
			description:
				'Plan a solar power system and estimate its potential energy generation. This tool helps users understand how much electricity their solar setup can produce and optimize system design.',
		},
		{
			title: 'Panel layout 📐',
			description:
				'Estimate how many modules fit in a rectangular roof zone, total DC nameplate (kWp), and approximate rail length for quotes and mounting kits.',
		},
		{
			title: 'Unit converter 🔄',
			description: 'Convert energy, power, and everyday units.',
		},
		{
			title: 'Knowledge base 📚',
			description:
				'Practical notes on watts, batteries, solar, cables, UPS, and safety—with search and categories.',
		},
		{
			title: 'FAQ ❓',
			description:
				'Find answers to common questions about the service and calculations. This section helps users quickly resolve doubts and better understand how to use the platform.',
		},
		{
			title: 'Glossary 📖',
			description: 'Definitions of terms, abbreviations, and key energy concepts.',
		},
		{
			title: 'Settings ⚙️',
			description:
				'Customize theme, language, and other app preferences where implemented.',
		},
		{
			title: 'Legal ⚖',
			description:
				'Read the platform’s policies, terms of use, and other legal information. This section ensures users understand their rights and responsibilities while using the service',
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

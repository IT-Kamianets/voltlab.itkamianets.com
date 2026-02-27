### Contributing rules

- Use **Conventional Commits**: `type(scope): subject`
- Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `style`, `chore`, `build`, `ci`, `revert`
- Subject: **imperative**, present tense, **no period**, keep it short
- One commit = **one logical change** (split big work into smaller commits)
- Prefix private class variables with an underscore (e.g. \_cache, \_token, \_state) to clearly mark internal usage and avoid accidental external access.
- In Angular templates, if the same expression (signal read, computed, or method call) is used more than once, assign it with `@let` and reuse the variable instead of calling it repeatedly. Use inline expression only when it appears once.
- Use Tailwind via BEM + @apply in component scss; keep templates readable (no long utility strings in HTML).
- Avoid hover effects that change layout (border/size/padding). Prefer non-layout effects (background tint, shadow) and always add matching :focus-visible styles.
- Keep spacing and colors consistent (use Tailwind scale + existing design tokens; avoid ad-hoc pixel values unless unavoidable).
- Document only public functions and variables with short, clear comments directly above their declarations (purpose + expected behavior).
- Angular forms: use the `signals-based forms API only`. Import from `@angular/forms/signals` (e.g. `import { form, submit } from '@angular/forms/signals';`) and avoid non-signal forms patterns in new code.
- Angular v20+ signal-first APIs: use function-based APIs instead of decorators wherever possible: input() (not @Input()), output() (not @Output()), viewChild()/viewChildren() (not @ViewChild()/@ViewChildren()), contentChild()/contentChildren() (not @ContentChild()/@ContentChildren()), and model() for two-way binding when appropriate; in templates use the new control flow (@if, @for, @switch) instead of *ngIf/*ngFor/*ngSwitch, and prefer signals with computed()/effect() for local state over manual subscription patterns unless RxJS interop is clearly needed.
- CSS variables (design tokens) first: use the tokens defined in src/styles.scss for colors, spacing, radius, shadows, motion, typography, and layout (e.g. var(--c-*), var(--sp-*), var(--radius-*), var(--shadow-*), var(--motion-*), var(--ff-base), var(--container), var(--gutter)). Do not hard-code hex colors or random pixel values in templates or SCSS; if a value is missing, extend :root instead of bypassing the system. In Tailwind, prefer mapping utilities to tokens (e.g. via config or custom classes using var(--token)) rather than scattering arbitrary values like bg-[#123456] or p-[13px]. Ensure all components remain compatible with data-mode, data-density, and data-radius, and keep Tailwind usage aligned with the global design tokens rather than overriding them ad hoc.

### Contributing rules

- Use **Conventional Commits**: `type(scope): subject`
- Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `style`, `chore`, `build`, `ci`, `revert`
- Subject: **imperative**, present tense, **no period**, keep it short
- One commit = **one logical change** (split big work into smaller commits)
- Prefix private class variables with an underscore (e.g. \_cache, \_token, \_state) to clearly mark internal usage and avoid accidental external access.
- In Angular templates, if the same expression (signal read, computed, or method call) is used more than once, assign it with `@let` and reuse the variable instead of calling it repeatedly. Use inline expression only when it appears once.
- Use Tailwind via BEM + @apply in component scss; keep templates readable (no long utility strings in HTML).
- Avoid hover effects that change layout (border/size/padding). Prefer non-layout effects (background tint, shadow) and always add matching :focus-visible styles.
- Keep spacing and colors consistent (use Tailwind scale + existing design tokens; avoid ad-hoc pixel values unless unavoidable).
- Document only public functions and variables with short, clear comments directly above their declarations (purpose + expected behavior).
- Branch names must follow: {type}/{feature}/{team}-{issueId}. Use lowercase kebab-case. type must match Conventional Commit types (e.g. feat, fix, refactor). feature is the domain name (e.g. people, events). team is the responsible team name. Always append the GitHub issue number at the end.

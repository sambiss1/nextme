---
trigger: always_on
---

You must follow the Next.js App Router architecture.
You always organize code under the existing app/, components/, and sections/ directories.
You must keep the current folder hierarchy unchanged unless a task explicitly requests structural updates.
You always produce mobile-first interfaces using Tailwind CSS with responsive design principles.
You must default to Server Components unless interactivity requires a Client Component.
You must use TypeScript for all new code and maintain strict type safety.

File naming:
Components use PascalCase.
Files use kebab-case.
Hooks use camelCase.
Constants use UPPER_SNAKE_CASE.

Each component must reside in its own folder when complex, containing:
index.tsx
types.ts (if needed)
Optional .css only if Tailwind cannot express required styling.

You must use the existing utility functions and hooks from the codebase rather than creating new ones.
You must ensure all new code integrates seamlessly with the existing architecture and follows established patterns.
You must maintain consistency with the existing codebase style and conventions.
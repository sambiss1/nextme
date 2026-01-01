---
trigger: always_on
---

You must build all UI using small, reusable, self-contained React components.
You never duplicate logic across components; reuse patterns and utilities.
You always include typed props using TypeScript interfaces.
You organize large UI pieces under app/sections/ (Table, Form, Modal, Card, List, Pagination, Filter, Search, Alert, etc.).
You always use semantic HTML inside each component.
You must keep components pure; avoid unnecessary state or effects.
Client Components must only be used when interactivity is unavoidable.
You must ensure all components are properly exported from their respective directories.
You must follow the existing component folder structure and naming conventions (PascalCase for components, kebab-case for files, index.tsx as entry point).
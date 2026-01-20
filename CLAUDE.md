# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Travel Planner is a Japanese-language travel planning web app powered by Google's Gemini AI. It generates personalized travel itineraries based on user preferences.

See [docs/architecture.md](docs/architecture.md) for detailed architecture.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm test         # Run Vitest unit tests
```

See [docs/testing.md](docs/testing.md) for more testing details.

## Coding Guidelines

### Testing

We follow a **colocation** strategy for unit tests.
- Create `*.test.ts` (or `.tsx`) files next to the source file.
- Run tests with `pnpm test`.

See [docs/testing.md](docs/testing.md) for the full strategy.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **AI**: Google Generative AI (Gemini), LangChain
- **Vector DB**: Pinecone with Google embeddings
- **Testing**: Vitest, Playwright

## Directory Structure

See [docs/coding-standards.md](docs/coding-standards.md) for full coding guidelines.

### Quick Reference

- `src/components/ui/` - Reusable UI components (no business logic)
- `src/components/common/` - Shared app components
- `src/components/features/` - Feature-specific components
- `src/lib/services/` - Business logic
- `src/lib/utils/` - Utility functions
- `src/lib/hooks/` - Custom hooks
- `src/types/` - Type definitions (centralized)

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `CategorySelector.tsx` |
| Utility | kebab-case | `http-client.ts` |
| Hook | camelCase + use | `useItinerary.ts` |
| Test | Original + .test | `Button.test.tsx` |
| Variables | camelCase | `userName` |
| Constants | SCREAMING_SNAKE | `MAX_RETRY_COUNT` |
| Types | PascalCase | `UserInput` |

### Import Order

1. React/Next.js
2. External libraries (alphabetical)
3. Type imports
4. Services/utilities
5. Hooks
6. Components
7. Relative imports

## Notes

- All user-facing content is in Japanese
- Path alias `@/*` maps to `./src/*`

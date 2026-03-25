# LMS Enterprise Frontend (Next.js 15)

Production-ready frontend for authentication and protected dashboard experiences.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript strict mode
- Tailwind CSS design tokens + dark mode
- Axios interceptor-based API client (JWT + refresh)
- Zustand (auth-only client state)
- React Hook Form + Zod
- Playwright E2E tests

## Enterprise Folder Structure

```text
app/
  (protected)/dashboard/        # authenticated dashboard module pages
api/                            # feature API modules (auth, health)
components/
  layout/                       # top-level app providers
  ui/                           # design system primitives
features/
  auth/                         # auth business logic (store, schema)
  dashboard/                    # dashboard module (shell, sidebar, topbar, nav config)
hooks/                          # reusable guards and client hooks
lib/
  api/                          # shared API client + error mapping
  query/                        # server-state hooks/provider abstraction
  auth-token.ts                 # token memory/session manager
  env.ts                        # runtime env normalization
types/                          # domain contracts
tests/e2e/                      # Playwright scenarios
```

## Architecture Decisions
1. **Feature-based modules** for scalable ownership (`features/auth`, `features/dashboard`).
2. **Separation of concerns**:
   - UI primitives in `components/ui`
   - Business orchestration in feature folders
   - API contracts in `api/*`
   - Global utilities in `lib/*`
3. **Auth security model preserved**:
   - Access token attached in interceptor
   - 401 triggers silent refresh once
   - refresh failure clears token and forces re-auth
4. **Role-aware UI foundation**:
   - navigation config includes per-role route visibility
   - guard hook supports `requiredRoles`

## Dashboard Module
- Collapsible sidebar with role-filtered navigation
- Topbar with user context + logout
- Pages:
  - `/dashboard` (overview)
  - `/dashboard/profile`
  - `/dashboard/settings`
  - `/dashboard/api-test`

## UI System
Reusable primitives now include:
- Button (variants + sizes)
- Input/Form fields
- Card
- Modal (ARIA dialog semantics)
- Table
- Skeleton

## Security + Route Protection
- Middleware checks refresh cookie for protected routes.
- Client guard handles unauthenticated redirects.
- Guard supports role checks for future RBAC rollout.

## E2E Coverage
- Login flow (mocked auth APIs)
- Protected route redirect behavior
- Refresh endpoint interaction through dashboard API test page

## Run
```bash
npm run dev
npm run lint
npm run typecheck
npm run test:e2e
```

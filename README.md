# LMS Auth Frontend (Next.js App Router)

Production-ready frontend for the LMS auth API using Next.js + TypeScript + Tailwind + Axios + React Hook Form + Zod + Zustand.

## Stack
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Axios API client with auth interceptors
- React Hook Form + Zod validation
- Zustand auth state
- React Hot Toast notifications
- Playwright E2E tests

## Folder Structure

```text
app/                 # routes/pages
api/                 # typed API modules
components/          # reusable UI and layout primitives
features/auth/       # auth-specific logic + schemas + store
hooks/               # reusable hooks
lib/                 # env, utils, token manager, error mapping
types/               # shared TypeScript contracts
tests/e2e/           # end-to-end tests
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env.local
   ```
3. Confirm backend is reachable at:
   - `https://localhost:7236`
4. Run dev server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`.

## Environment Variables
`.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=https://localhost:7236
```

## Auth Flow Explanation
1. Login sends credentials (`withCredentials: true`) to `/api/auth/login`.
2. Backend returns `{ token }` and sets refresh token cookie (httpOnly).
3. Access token is saved in memory + `sessionStorage` for tab persistence.
4. Frontend calls relative `/api/*` and `/health` paths; Next.js rewrites proxy them to `NEXT_PUBLIC_API_BASE_URL` to avoid CORS issues.
5. Protected requests auto-attach `Authorization: Bearer <token>`.
6. On 401, interceptor calls `/api/auth/refresh` with credentials once, stores new token, retries original request.
7. If refresh fails, auth state is cleared and user is redirected to login.
8. Logout calls `/api/auth/logout` with bearer token + cookie and clears local auth state.

## Run Commands
- Development: `npm run dev`
- Lint: `npm run lint`
- Type check: `npm run typecheck`
- Build: `npm run build`
- E2E tests: `npm run test:e2e`

## Endpoint Testing Checklist
Use `/api-test` page and core screens to verify each endpoint:

- [ ] `GET /health` via `/health` page
- [ ] `POST /api/auth/register` via `/register`
- [ ] `POST /api/auth/login` via `/login`
- [ ] `GET /api/auth/me` via `/dashboard` and `/api-test`
- [ ] `POST /api/auth/refresh` via `/api-test`
- [ ] `POST /api/auth/logout` via `/dashboard` / `/api-test`
- [ ] `GET /api/auth/verify-email?token=` via `/verify-email?token=<...>`
- [ ] `POST /api/auth/forgot-password` via `/forgot-password`
- [ ] `POST /api/auth/reset-password` via `/reset-password?token=<...>`

## Manual QA Checklist (Exact Steps + Expected)

### 1) Health
1. Open `/health`.
2. Click **Check health**.
3. **Expected:** response payload shown in panel.

### 2) Register
1. Open `/register`.
2. Submit empty form.
3. **Expected:** field-level validation errors.
4. Submit valid new user.
5. **Expected:** success toast and backend success message.
6. Submit same email again.
7. **Expected:** explicit 409 conflict toast.

### 3) Login + Dashboard
1. Open `/login`.
2. Enter invalid email/password format.
3. **Expected:** client validation errors.
4. Enter valid credentials.
5. **Expected:** success toast, redirect to `/dashboard`.
6. **Expected:** `/dashboard` displays `userId`, `email`, and `role` from `/me`.

### 4) Refresh behavior
1. Login successfully.
2. In backend/devtools, force access token expiry.
3. Trigger protected request (`/dashboard` reload or `/api-test` me call).
4. **Expected:** app refreshes token automatically once and retries request.
5. Remove/expire refresh cookie.
6. **Expected:** refresh fails with 401; app redirects to `/login`.

### 5) Forgot/Reset Password
1. Open `/forgot-password`, submit valid email.
2. **Expected:** generic success message.
3. Open reset link token in `/reset-password?token=...`.
4. Submit weak password.
5. **Expected:** client validation for 8..128.
6. Submit valid password.
7. **Expected:** success message.

### 6) Verify Email
1. Open `/verify-email?token=<valid-token>`.
2. **Expected:** success message.
3. Open with invalid token.
4. **Expected:** explicit 400/rate-limit-friendly error message.

### 7) Logout
1. From dashboard, click **Logout**.
2. **Expected:** success toast and redirect to `/login`.
3. Open `/dashboard` directly.
4. **Expected:** redirected to `/login` by guard/middleware.

## Backend Contract Issues
- Middleware checks for a cookie named `refreshToken`. If backend uses a different cookie name/path/domain, protected route pre-check may redirect incorrectly even when authenticated. Adjust cookie name in `middleware.ts` if needed.
- `logout` response shape is implemented as `string | { message: string }` because contract examples include plain text. Confirm exact JSON shape for strict parsing.
- Some endpoints may return framework-standard validation payloads (e.g., ASP.NET `errors` object). Error mapper currently handles message/title/string fallbacks; add parser for exact backend error DTO if available.


## Routing Note
- Visiting `/api/auth/*` in the frontend app now proxies to backend via `next.config.ts` rewrites (instead of returning Next.js 404), which makes manual endpoint checks more predictable in dev.

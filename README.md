# LeadDesk Frontend

## 1. Project Overview
LeadDesk Frontend is a modern, highly interactive React application built to capture leads and manage them through a secure administrative portal. The application provides a stunning, conversion-optimized public landing page for visitors to submit their information, and a protected, data-rich dashboard for administrators to view, filter, and track the status of those leads in real-time.

**🌍 Live Demo:** [https://leaddesk-frontend-seven.vercel.app](https://leaddesk-frontend-seven.vercel.app)
**🛡️ Admin Portal:** [https://leaddesk-frontend-seven.vercel.app/admin/login](https://leaddesk-frontend-seven.vercel.app/admin/login)

## 2. Tech Stack
* **React 19**: Core UI library utilizing the latest concurrent features.
* **Vite**: Ultra-fast build tool and development server.
* **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development and implementing the custom design system.
* **React Router DOM**: Client-side routing for navigating between the public page and admin portal.
* **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
* **Zod**: TypeScript-first schema declaration and validation library (used alongside React Hook Form).
* **Axios**: Promise-based HTTP client used with interceptors to manage secure API communication and token refreshes.
* **Lucide React**: Beautiful, consistent iconography.
* **clsx & tailwind-merge**: Utilities for dynamic and conflict-free Tailwind class construction.

## 3. Architecture
The project is structured to promote reusability, maintainability, and strict separation of concerns:
* `src/components/ui/`: Atomic, reusable UI components (Button, Input, Select) built using the custom design tokens.
* `src/components/`: Feature-specific components (LeadForm, LeadTable, HeroSection).
* `src/pages/`: Top-level route components acting as layout wrappers (Home, Login, Dashboard).
* `src/context/`: React Context providers for global state management (Auth, Theme, Toast).
* `src/lib/`: Core utilities, including the configured Axios API instance.
* `src/schemas/`: Zod validation schemas shared across forms.

## 4. Pages & Routes

| Route | Page Component | Access | Description |
|---|---|---|---|
| `/` | `Home` | Public | The main landing page featuring the hero section and the lead capture form. |
| `/admin/login` | `Login` | Public | Admin authentication portal. Redirects to dashboard if already logged in. |
| `/admin/dashboard` | `Dashboard` | **Protected** | The core administrative view containing the paginated data table and metrics. |
| `*` | `NotFound` | Public | 404 Catch-all page with a fallback redirect to the home page. |

## 5. Key Components

| Component | Purpose | Key Props |
|---|---|---|
| `Button` | Standardized interactive element with variants (primary, secondary, outline, ghost, danger) and sizes. | `variant`, `size`, `isLoading`, `children` |
| `Input` | Styled text input with built-in error message display. | `error` (string), standard input props |
| `Modal` | Accessible dialog window for confirmations (e.g., deleting a lead). Uses glassmorphic backdrops. | `isOpen`, `onClose`, `title`, `children` |
| `Pagination` | Client-side pagination control with smart truncation for large datasets. | `currentPage`, `totalPages`, `onPageChange` |
| `LeadTable` | Complex data table handling status toggles, deletion triggers, and empty states. | `leads`, `onStatusChange`, `onDelete` |

## 6. Auth Flow
The frontend implements a highly secure, cookie-based authentication flow managed by `AuthContext.tsx`:
1. **Login**: User submits credentials. On success, the backend sets `HttpOnly` access and refresh cookies. `AuthContext` is updated to `isAuthenticated: true`.
2. **Protection**: The `ProtectedRoute` component wraps all `/admin/*` routes. If a user attempts to access the dashboard while `isAuthenticated` is false, they are immediately redirected to `/admin/login`.
3. **Session Check**: On initial app load, the `AuthContext` fires a silent `/api/leads` request to determine if valid cookies exist, resolving the loading state accordingly.
4. **Token Security**: Tokens are *never* stored in `localStorage` or React state, completely preventing XSS extraction.

## 7. Form Validation
Forms are managed using **React Hook Form** paired with **Zod** resolvers. 
* Schemas are defined in `src/schemas/` (e.g., `lead.schema.ts`).
* The `useForm({ resolver: zodResolver(schema) })` hook binds the validation directly to the inputs.
* This provides instant, localized error messages (e.g., "Invalid email", "Required") without needing to manage complex `useState` logic or manual `onChange` handlers, resulting in extremely clean and performant form components.

## 8. Theme System
The application features a robust Light/Dark mode toggle managed by `ThemeContext.tsx`.
* It detects the user's OS system preference by default using `window.matchMedia('(prefers-color-scheme: dark)')`.
* User overrides are saved to `localStorage` under the `theme` key.
* The context physically injects or removes the `.dark` class on the `<html>` root element, which triggers Tailwind's `dark:` modifiers and swaps all CSS variable tokens in `index.css`.

## 9. API Integration
All network requests are routed through a configured Axios instance (`src/lib/api.ts`).
* **Base Configuration**: Sets `withCredentials: true` globally so secure cookies are always attached to requests.
* **Response Interceptor**: Acts as the engine for silent authentication. If any API request returns a `401 Unauthorized`, the interceptor automatically pauses the request, attempts to call `/api/auth/refresh`, and if successful, perfectly replays the original failed request without the user ever noticing. If the refresh fails, it redirects to the login page.

## 10. Environment Variables
Create a `.env` file in the root of the frontend directory:

| Variable | Description | Example Value |
|---|---|---|
| `VITE_API_URL` | The base URL of the backend server. | `http://localhost:8000` (Local) or `https://api.domain.com` (Prod) |

## 11. Local Setup

Run these exact commands to set up the frontend locally:

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd leaddesk-frontend

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit the .env file and set VITE_API_URL to your local backend URL

# 4. Start the Vite development server
npm run dev
```

## 12. Design System
The frontend implements a premium, "Linear-inspired" aesthetic utilizing custom CSS variables defined in `src/index.css`. 
* **Colors**: Uses a custom brand purple (`#5E6AD2`) mapped to `var(--brand-primary)`. Backgrounds utilize subtle off-blacks (`#0A0A0A`) in dark mode to reduce eye strain.
* **Glassmorphism**: Modals, navbars, and cards use `backdrop-filter: blur()` combined with semi-transparent backgrounds to create a modern frosted glass effect.
* **Micro-interactions**: Buttons and inputs feature subtle scaling (`active:scale-[0.98]`), dynamic focus rings, and smooth hover state transitions for a highly tactile feel.

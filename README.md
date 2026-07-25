# LeadDesk Frontend

This is the beautiful, modern client-side application for LeadDesk. Built with a focus on premium user experience, it features a custom glassmorphic design system and smooth micro-interactions.

## 🚀 Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (v4) with custom CSS properties for theme variables
- **Routing**: React Router DOM (v7)
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context (Auth, Toast, Theme)
- **Icons**: Lucide React

## 🛠 Prerequisites
- Node.js (v18+)
- Backend API running locally (or deployed)

## ⚙️ Environment Variables
Create a `.env` file in the root of the frontend directory:

```env
# URL of your deployed backend API (or localhost)
VITE_API_URL=https://leaddesk-backend-86ze.onrender.com
```
*Note: Vite requires custom environment variables to be prefixed with `VITE_`.*

## 📦 Scripts

- `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles the TypeScript code and bundles the app for production.
- `npm run preview`: Locally previews the production build.

## 🌐 Deploying to Vercel

This frontend is configured for seamless deployment on [Vercel](https://vercel.com/). A `vercel.json` file is included to ensure React Router's client-side routing works correctly without throwing `404 Not Found` errors when refreshing pages.

### Deployment Steps:
1. Push this code to a GitHub repository.
2. Log in to Vercel and click **Add New Project**.
3. Import your GitHub repository.
4. Configure the Project:
   - **Framework Preset**: Vercel should automatically detect **Vite**.
   - **Root Directory**: If you are using a monorepo, set this to `Frontend`. Otherwise, leave default.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**: Add `VITE_API_URL` and set it to your deployed backend URL (e.g., `https://leaddesk-backend-86ze.onrender.com`).
6. Click **Deploy**!

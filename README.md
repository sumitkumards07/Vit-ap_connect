
# VIT-AP Connect (Student Bumble Clone)

This is a React matching app for VIT-AP students, built with Vite and Tailwind CSS.

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## Deployment Instructions

### 1. Push to GitHub

1.  This project is set up with git. Push your changes to GitHub:

    ```bash
    git add .
    git commit -m "Prepare for Railway deployment"
    git push origin main
    ```

### 2. Deploy to Vercel

1.  Log in to [Vercel.com](https://vercel.com).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository (`Vit-ap_connect`).
4.  Vercel will detect `Vite`. The default settings match perfectly (`npm run build`, output `dist`).
5.  **Environment Variables:**
    *   Expand the **Environment Variables** section.
    *   Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
6.  Click **Deploy**.

That's it! Vercel handles the build and hosting automatically. I've included a `vercel.json` to ensure routing works correctly on refresh.

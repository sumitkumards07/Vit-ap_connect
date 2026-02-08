
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

### 2. Deploy to Railway

1.  Log in to [Railway.app](https://railway.app).
2.  Click **New Project** -> **Deploy from GitHub repo**.
3.  Select your repository (`Vit-ap_connect`).
4.  Railway will automatically detect the Node.js app and build it using `npm run build`.
5.  It will use the `npm start` command (which runs `serve -s dist`) to serve the app.

### Environment Variables

**Crucial:** You must add your Supabase keys in Railway for the app to work.

1.  Go to your project on Railway.
2.  Click on the service card.
3.  Go to the **Variables** tab.
4.  Add the following variables (get values from your local `.env` or Supabase dashboard):
    *   `VITE_SUPABASE_URL`
    *   `VITE_SUPABASE_ANON_KEY`
    *   `PORT` (Optional, Railway sets this automatically, `serve` uses 3000 by default but respects `$PORT` if passed correctly. Our command `-l 3000` sets it to 3000, but Railway exposes on a dynamic port often. If deployed as static site, this is fine, but for Node service, use `serve -s dist -l $PORT` if possible, or just `-l 3000`. Railway routes traffic to the exposed port.)

**Note on Port:** If the deployment fails due to port issues, change the start script to:
`"start": "serve -s dist -l $PORT"`
(I have set it to 3000 for simplicity as Railway usually detects 3000).

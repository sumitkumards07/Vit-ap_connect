
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

1.  Create a new repository on GitHub (e.g., `student-bumble`).
2.  Run the following commands in your terminal (inside the `student-bumble` folder):

    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/student-bumble.git
    git branch -M main
    git push -u origin main
    ```

### 2. Deploy to Render

1.  Log in to [Render.com](https://render.com).
2.  Click **New +** -> **Static Site**.
3.  Connect your GitHub repository (`student-bumble`).
4.  Use the following settings:
    -   **Build Command:** `npm run build`
    -   **Publish Directory:** `dist`
5.  Click **Create Static Site**.

Your app will be live in a few minutes!

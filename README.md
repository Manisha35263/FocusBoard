# FocusBoard

A responsive single-user task dashboard built with React, Vite and CSS for the FocusBoard frontend trainee assignment.

## Run locally

1. Install Node.js (LTS) from https://nodejs.org/.
2. Extract this project ZIP and open the `FocusBoard` folder in VS Code.
3. Open the VS Code terminal in this folder.
4. Run `npm install`.
5. Run `npm run dev` and open the local URL printed in the terminal (usually http://localhost:5173).
6. Run `npm run build` to create the production build in `dist/`.

## Features

- Responsive dashboard layout for desktop, tablet and mobile.
- Six starter tasks with unique IDs, title, description, category, status, priority and due date.
- Create and edit tasks with required-title validation.
- Delete tasks with a browser confirmation prompt.
- Cycle status by clicking the checkbox: To do → In progress → Completed.
- Case-insensitive search across task title, description and category.
- Status tabs and priority filter work together.
- Dashboard statistics and completion percentage are derived from task state.
- Three-slide Focus Notes carousel with previous/next controls and indicators.
- Task data persists in browser localStorage after refresh.

## State management

The application uses React `useState` as the single source of truth for task data and UI state, `useMemo` for derived statistics and filtered tasks, and `useEffect` to persist task data to localStorage. Task updates use immutable array operations (`map`, `filter`, and spread syntax). Starter data is used only when no saved task data exists, so it does not overwrite saved work.

## Deployment

Deploy this repository with Vercel or Netlify. For Vercel, import the GitHub repository and use the default Vite settings: build command `npm run build`, output directory `dist`.

Live URL: Add your deployed URL here after deployment.

## Notes / limitations

- This is a frontend-only single-user demo; it does not use a backend, account login or cloud database, as permitted by the assignment.
- The Focus Notes wording is original sample content. Compare and adjust it against the live Figma reference before final submission.
- The visual layout is an independent implementation based on the written assignment scope. Review the live Figma frames and refine spacing, typography, colors and content before submitting if exact pixel fidelity is expected.

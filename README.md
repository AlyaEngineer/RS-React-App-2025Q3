# <h1 align="center">🔎 Rick & Morty Explorer</h1>

**[Live Demo](https://alyaengineer-react2025q3-search-panel.netlify.app/en)**

## 📝 Description

A web application for searching and browsing characters from the Rick and Morty universe using the official public [Rick and Morty API](https://rickandmortyapi.com/).

The app provides a fast and user-friendly way to explore characters with detailed profiles, pagination, multilingual support, and optimized data fetching.

[![Netlify Status](https://api.netlify.com/api/v1/badges/0b5fd53d-2a54-42f7-ab36-580e0b5debfb/deploy-status)](https://app.netlify.com/projects/alyaengineer-react2025q3-search-panel/deploys)

[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-white?logo=tailwindcss)](https://tailwindcss.com/)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?logo=reactquery&logoColor=white)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?logo=react)](https://zustand-demo.pmnd.rs/)
[![Prettier](https://img.shields.io/badge/Prettier-BD89C0?logo=prettier&logoColor=white)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Husky](https://img.shields.io/badge/Husky-000000?logo=github)](https://www.npmjs.com/package/husky)

This application provides the following features:

- Search characters by name

- Paginated character list for smooth navigation

- Character details page with full information

- Multilingual interface - English & Russian

- Cached API requests with TanStack Query for high performance

## 💻⚙️ Install and Run the Application

- Using terminal to go to the directory in which you want to install the application, for example:

  ```bash
  cd C/Users/yourname/apps
  ```

- Clone the repository from GitHub:

  ```bash
  git clone https://github.com/AlyaEngineer/RS-React-App-2025Q3.git
  ```

- Go to the project directory:

  ```bash
  cd RS-React-App-2025Q3
  ```

- Switch to `nextjs-ssr` branch:

  ```bash
  git switch nextjs-ssr
  ```

- Install the dependencies with `npm i`:

  ```bash
  npm i
  ```

- Create a `.env` file in the root directory of the project. You can use the provided `.env.example` as a template:

  ```bash
  cp .env.example .env
  ```

- Open the `.env` file and fill in the required environment variables:

  ```bash
  PUBLIC_API_BASE_URL=<url>
  ```

- Start the local server using `npm run dev`:

  ```bash
  npm run dev
  ```

The server runs on port `3000`.

You can also use `yarn` or `pnpm` instead of `npm`, depending on your package manager.

## 📜 Available Scripts

In the project directory, you can:

- Run the app in the development mode, opening `port 3000` (<http://localhost:3000>) to view the app in the browser:

  ```bash
  npm run dev
  ```

- Build the project for production:

  ```bash
  npm run build
  ```

- Start the app in the production mode locally after build:

  ```bash
  npm run start
  ```

- Format all the files according to the defined style rules running `Prettier`:

  ```bash
  npm run format:fix
  ```

- Lint the codebase using `ESLint`, analyzing code for errors and violations of standards:

  ```bash
  npm run lint
  ```

- Automatically fix any linting issues found in the codebase, using `ESLint`:

  ```bash
  npm run lint:fix
  ```

- Initialize `Husky` hooks for Git pre-commit, pre-push, and other hooks:

  ```bash
  npm run prepare
  ```

- Run TypeScript's type-checking to check for type errors without generating any output files:

  ```bash
  npm run typecheck
  ```

## 📁 Project Structure

```
 src/
 ├─ app/            # Next.js App Router
 ├─ config/         # Сonfigs, constants
 ├─ features/       # Features
 ├─ hooks/          # Custom hooks
 ├─ i18n/           # Internationalization
 ├─ libs/           # Utilities
 ├─ providers/      # Providers
 └─ store/          # Global state (Zustand)
```

## 📄 License

This project is for educational and portfolio purposes.

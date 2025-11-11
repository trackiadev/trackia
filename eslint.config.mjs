import { defineConfig } from 'eslint/config';

export default defineConfig({
  root: true,
  parser: '@typescript-eslint/parser', // pour TypeScript
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // pour React
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended', // règles de base ESLint
    'plugin:@typescript-eslint/recommended', // règles TypeScript
    'plugin:react/recommended', // règles React
    'plugin:react-hooks/recommended',
    'prettier', // pour ne pas entrer en conflit avec Prettier
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect', // détecte automatiquement la version de React
    },
  },
  rules: {
    // ici tu peux ajouter tes règles custom
    'react/react-in-jsx-scope': 'off', // Next.js n'a pas besoin de React import
  },
});

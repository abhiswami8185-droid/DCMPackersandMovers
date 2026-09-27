import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ command }) => {
  // Base path for GitHub Pages client demo (https://abhiswami8185-droid.github.io/DCMPackersandMovers/)
  // Supports VITE_BASE_PATH override, defaults to '/DCMPackersandMovers/' for production builds,
  // and '/' for local development server.
  const base = process.env.VITE_BASE_PATH || (command === 'build' ? '/DCMPackersandMovers/' : '/');

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

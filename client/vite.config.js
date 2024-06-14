// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    root: 'src',
  plugins: [react()],
  resolve: {
    alias: {

    },
  },
  server: {
    host: 'localhost',
    port: 8000,
    proxy: {
      // Si vous avez besoin de configurer un proxy pour les requêtes API, vous pouvez le faire ici
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    outDir: 'build', // Le répertoire de sortie pour la commande `vite build`
  },
})
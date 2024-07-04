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
      '/trees': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/register': 'http://localhost:3000',
      '/logsPlayer': 'http://localhost:3000',
      '/logsAdmin': 'http://localhost:3000',
      '/score': 'http://localhost:3000',
      '/user': 'http://localhost:3000',
      '/user/admin': 'http://localhost:3000',
      '/alluser': 'http://localhost:3000',
      '/profile': 'http://localhost:3000',
      '/logout': 'http://localhost:3000',
      '/settings': 'http://localhost:3000',
      '/userTrees': 'http://localhost:3000',
      '/userLeafs': 'http://localhost:3000',
      '/userLocks': 'http://localhost:3000',
      '/refresh': 'http://localhost:3000',

    },
  },
  build: {
    outDir: 'build', // Le répertoire de sortie pour la commande `vite build`
  },
})
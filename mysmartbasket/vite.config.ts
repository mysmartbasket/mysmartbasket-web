import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

// Vite's dev server answers `/blog/` with the SPA's index.html, whereas GitHub
// Pages serves public/blog/index.html. Mirror the production behaviour so the
// static pages can be previewed locally through their real URLs.
const servePublicDirectoryIndexes = () => ({
  name: 'serve-public-directory-indexes',
  configureServer(server: import('vite').ViteDevServer) {
    server.middlewares.use((req, _res, next) => {
      const pathname = (req.url ?? '').split('?')[0];
      if (pathname.length > 1 && pathname.endsWith('/') &&
          fs.existsSync(path.join(__dirname, 'public', pathname, 'index.html'))) {
        req.url = `${pathname}index.html${req.url!.slice(pathname.length)}`;
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), servePublicDirectoryIndexes()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Vendor code changes far less often than app code, so splitting it
        // into its own chunk lets browsers cache it across deploys instead
        // of re-downloading it every time src/App.tsx changes.
        manualChunks: {
          vendor: ['react', 'react-dom', 'motion'],
        },
      },
    },
  },
});

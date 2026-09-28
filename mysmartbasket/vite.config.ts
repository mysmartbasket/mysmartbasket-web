import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
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

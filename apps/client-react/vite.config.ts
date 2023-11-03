import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // svgr options
      },
    }),
  ],
});

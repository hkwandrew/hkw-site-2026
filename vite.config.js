import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [
    react({
      devTarget: 'es2022',
      plugins: [
        ['@swc/plugin-styled-components', {
          displayName: true,
          pure: true,
          fileName: true,
          meaninglessFileNames: ['index', 'styles'],
        }],
      ],
    }),
    svgr({
      svgrOptions: {
        icon: false,
      }
    })
  ],
  optimizeDeps: {
    // SVGR-transformed modules import react/jsx-runtime, which isn't always
    // discovered during the initial scan before a lazy route loads.
    include: ['react/jsx-runtime'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath } from 'url'
import { ghPages } from 'vite-plugin-gh-pages'

export default defineConfig(({ command, mode }) => {
  const shouldPublishGhPages = command === 'build' && mode === 'deploy'

  return {
    base: '/hkw-site-2026/',
    plugins: [
      ...(shouldPublishGhPages ? [ghPages()] : []),
      react({
        devTarget: 'es2022',
        parserConfig(id) {
          const modulePath = id.split('?')[0]

          if (modulePath.includes('/node_modules/')) {
            return undefined
          }

          if (modulePath.endsWith('.styles.js')) {
            return {
              syntax: 'ecmascript',
              jsx: false,
            }
          }

          if (modulePath.endsWith('.tsx')) {
            return {
              syntax: 'typescript',
              tsx: true,
            }
          }

          if (modulePath.endsWith('.ts') || modulePath.endsWith('.mts')) {
            return {
              syntax: 'typescript',
              tsx: false,
            }
          }

          if (modulePath.endsWith('.jsx') || modulePath.endsWith('.mdx')) {
            return {
              syntax: 'ecmascript',
              jsx: true,
            }
          }

          return undefined
        },
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
  }
})

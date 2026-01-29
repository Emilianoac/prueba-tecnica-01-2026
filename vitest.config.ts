import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),

      include: [
        'src/__tests__/_unit/**/*.{test,spec}.ts',
        'src/__tests__/_integration/**/*.{test,spec}.ts'
      ],
      globals: true,
      setupFiles: []
    },
  }),
)

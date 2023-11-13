import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@icons': path.resolve(__dirname, './src/components/icons')
    }
    // [
    //   {
    //     find: '@',
    //     replacement: fileURLToPath(new URL('./src', import.meta.url))
    //   },
    //   {
    //     find: '@icons',
    //     replacement: fileURLToPath(
    //       new URL('./src/components/icons', import.meta.url)
    //     )
    //   }
    // ]
    // '@icons': path.resolve(__dirname, './src/components/icons')
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.startsWith('ion-') // (return true)
          }
        }
      }
    })
  ]
})

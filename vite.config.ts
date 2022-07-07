import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    // 自动引入
    AutoImport({
        imports: ["vue"],
        // resolvers: [ElementPlusResolver()],
        resolvers: [],
    }),
    Components({
        resolvers: [
            NaiveUiResolver()
        ],
    })],
    resolve: {
      alias: {
          '@': '/src', // 导入别名
      },
  }
})

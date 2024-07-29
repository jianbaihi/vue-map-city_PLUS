import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

export default defineConfig(({command,mode})=>{
  const {VITE_BASE_MAP,VITE_BASE_CITY,VITE_BASE_GEO} = loadEnv(mode, process.cwd())
  return{
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server:{
      proxy:{
        '/map':{
          target:VITE_BASE_MAP,
          changeOrigin:true,
          rewrite:path=>{
            return path.replace(/^\/map/, '')
          }
        },
        '/cities':{
          target:VITE_BASE_CITY,
          changeOrigin:true,
          rewrite:path=>{
            return path.replace(/^\/cities/, '')
          }
      },
        '/geo':{
          target:VITE_BASE_GEO,
          changeOrigin:true,
          rewrite:path=>{
            return path.replace(/^\/geo/, '')
          }
        }
    }
  }
}
})

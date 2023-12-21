import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      injectManifest: {
        swSrc: 'public/sw.js'
      },
      includeAssets: [
        'icons/*.png'
      ],
      manifest: {
        "short_name": "TODO",
        "name": "TODO: What i need to do?",
        "icons": [
          {
              "src": "/icons/pwa-64x64.png",
              "type": "image/png",
              "sizes": "64x64"
          },
          {
              "src": "/icons/pwa-192x192.png",
              "type": "image/png",
              "sizes": "192x192"
          },
          {
              "src": "/icons/pwa-512x512.png",
              "type": "image/png",
              "sizes": "512x512"
          },
          {
              "src": "/icons/maskable-icon-512x512.png",
              "type": "image/png",
              "sizes": "512x512",
              "purpose": "maskable"
          },
          {
              "src": "/icons/apple-touch-icon-180x180.png",
              "type": "image/png",
              "sizes": "180x180"
          }
      ],
        "id": "/index.html",
        "start_url": "/",
        "background_color": "#3367D6",
        "display": "standalone",
        "scope": "/",
        "theme_color": "#3367D6",
        "description": "TODO project",
      },
    })
  ],
})

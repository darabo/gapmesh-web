import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching and parallel loading
        manualChunks: (id) => {
          // Vendor chunk for core dependencies
          if (id.includes('node_modules')) {
            // Heavy markdown dependencies only for privacy page
            if (id.includes('react-markdown') || id.includes('remark')) {
              return 'markdown-vendor';
            }
            // GSAP animations in separate chunk
            if (id.includes('gsap')) {
              return 'gsap-vendor';
            }
            // i18n in separate chunk
            if (id.includes('i18next')) {
              return 'i18n-vendor';
            }
            // React Router in separate chunk
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            // Lucide icons
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            // Separate react and react-dom for better caching
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'react-vendor';
            }
            // Other node_modules
            return 'vendor';
          }
        },
        // Optimize asset file names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          } else if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'], // Remove specific console methods
      },
    },
    // Source map for debugging (can be disabled for smaller builds)
    sourcemap: false,
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'gsap',
      'gsap/ScrollTrigger',
      '@gsap/react',
    ],
  },
})

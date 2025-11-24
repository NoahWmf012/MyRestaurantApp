import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
    const envVar = loadEnv(mode, process.cwd(), '')
    return defineConfig({
        plugins: [react(), tailwindcss()],
        base: envVar['VITE_BASE_URL'] || '/',
        server: {
            proxy: {
                '/api': {
                    target: envVar['VITE_BACKEND_URL'],
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        build: {
            // Optimize chunk splitting
            rollupOptions: {
                output: {
                    manualChunks: {
                        // Separate vendor chunks to improve caching
                        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                        'redux-vendor': ['@reduxjs/toolkit', 'react-redux', 'redux'],
                        'form-vendor': ['react-hook-form', '@hookform/resolvers', 'yup'],
                        'bootstrap-vendor': ['bootstrap'],
                    },
                },
            },
            // Warn for chunks over 1MB
            chunkSizeWarningLimit: 1000,
            // Use esbuild for faster builds (default in Vite)
            minify: 'esbuild',
            // Enable source maps for production debugging (optional)
            sourcemap: false,
        },
        // Pre-bundle dependencies
        optimizeDeps: {
            include: ['react', 'react-dom', 'react-router-dom'],
        },
    })
}

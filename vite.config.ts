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
    })
}

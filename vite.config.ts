
import type { ConfigEnv } from 'vite'
import path from 'path';
import { defineConfig, loadEnv } from 'vite'

export default ({ mode, command }: ConfigEnv) => {
    const env = loadEnv(mode, process.cwd())
    return defineConfig({
        build: {
            // target: 'node16',
            assetsDir: './',
            lib: {
                entry: path.resolve(__dirname, './src/index.ts'),
                formats: ['es', 'cjs'],
                // fileName: 'index'
            },
            // sourcemap: true,
            // rollupOptions: {
            //     input: path.resolve(__dirname, './src/index.ts'),
            //     // format: 'es',
            //     output: {
            //         // dir: 'a',
            //         // format: 'es'
            //     },
            //     // bundle: {
            //     //   path: `a/es`,
            //     // },
            // }
        },
    })
}

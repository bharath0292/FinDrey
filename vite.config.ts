import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import path from 'node:path';

const config = defineConfig({
	plugins: [devtools(), tsconfigPaths({ projects: ['./tsconfig.json'] }), tailwindcss(), tanstackStart(), viteReact()],
	server: {
		port: 5173,
		open: true,
		proxy: {
			// Simple proxy
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			'@findrey': path.resolve(__dirname, './src'),
		},
	},
});

export default config;

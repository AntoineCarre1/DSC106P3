import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// vite.config.js
	build: {
		// Add topojson-client as an external dependency
		rollupOptions: {
		  external: ['topojson-client'],
		},
	  },
	plugins: [sveltekit()]
});

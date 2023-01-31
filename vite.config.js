import path from 'path';
import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { dependencies } from './package.json';

export default defineConfig({
  preview: {
    host: 'localhost',
    port: 3008,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    react(),
    federation({
      name: 'myModule',
      filename: 'remoteEntry.js',
      exposes: {
        './testValue': './src/testValue',
        './TestComponent': './src/TestComponent',
      },
      shared: {
        react: {
          generate: false,
          version: dependencies.react,
          requiredVersion: dependencies.react,
        },
      },
    }),
  ],
});

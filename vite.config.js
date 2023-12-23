import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  esbuild: {
    loader: '',

    include: [
      // Add these lines to allow all .js files to contain JSX
      'src/**/*.js',
      'node_modules/**/*.js',

      // Add these lines to allow all .ts files to contain JSX
      'src/**/*.ts',
      'node_modules/**/*.ts',
    ],
  },
  plugins: [react()],


});

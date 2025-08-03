import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import packageJson from './package.json';


const getPackageName = () => {
  return packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, char => char[1].toUpperCase());
  }
  catch {
    throw new Error('Name property in package.json is missing.');
  }
};

const fileName = {
  es: 'main.js',
  iife: 'main.iife.js',
};

const formats = Object.keys(fileName) as Array<keyof typeof fileName>;


export default defineConfig({
  build: {
    outDir: './dist',
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: getPackageNameCamelCase(),
      formats,
      fileName: format => fileName[format],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@@': resolve(__dirname),
    },
  },
  plugins: [
    dts(), // Generates .d.ts files for TypeScript
  ],
});

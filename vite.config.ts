import react from '@vitejs/plugin-react';
import { readdirSync } from 'fs';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: 'src/__tests__/setup/setupTests.ts',
  },
  resolve: {
    alias: getAbsolutePathAliases(),
  },
});

function getAbsolutePathAliases() {
  const absolutePathAliases: { [key: string]: string } = {};
  // Root resources folder
  const srcPath = path.resolve('./src/');
  // Adjust the regex here to include .js, .jsx, etc.. files from the resources/ folder
  const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) =>
    dirent.name.replace(/(\.ts){1}(x?)/, ''),
  );

  srcRootContent.forEach((directory) => {
    absolutePathAliases[directory] = path.join(srcPath, directory);
  });

  return absolutePathAliases;
}

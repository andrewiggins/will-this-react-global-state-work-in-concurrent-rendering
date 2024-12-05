import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const srcDir = path.resolve(__dirname, 'src');
/** @type {Record<string, string>} */
const entryPoints = {
  index: path.resolve(__dirname, 'index.html'),
};

const template = fs.readFileSync(
  path.resolve(__dirname, 'src', 'template.html'),
  'utf-8',
);

const libraries = fs
  .readdirSync(srcDir, { withFileTypes: true })
  .filter((dir) => dir.isDirectory())
  .map((dir) => dir.name);

libraries.forEach((folder) => {
  const folderPath = path.resolve(srcDir, folder);

  if (fs.lstatSync(folderPath).isDirectory()) {
    const htmlPath = path.resolve(folderPath, 'index.html');
    const html = template
      .replace('<!-- TITLE -->', folder)
      .replace(
        '<div id="app"></div>',
        `<div id="app"></div>\n<script src="./index.jsx" type="module"></script>`,
      );

    fs.writeFileSync(htmlPath, html);

    entryPoints[folder] = htmlPath;
  }
});

const rootIndexHtml = template
  .replace(
    '<!-- TITLE -->',
    'Will this React global state work in concurrent rendering',
  )
  .replace(
    '<div id="app"></div>',
    '<ul>\n' +
      libraries
        .map((name) => {
          return `<li><a href="/src/${name}/index.html">${name}</a></li>`;
        })
        .join('\n') +
      '\n</ul>',
  );

fs.writeFileSync('index.html', rootIndexHtml, 'utf8');

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    modulePreload: false,
    minify: false,
    rollupOptions: {
      input: entryPoints,
    },
  },
  server: {
    hmr: false,
    port: 8080,
  },
});

import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    // 🔹 базовый путь для GitHub Pages
    base: '/goit-js-hw-11/',

    // 🔹 корень проекта
    root: 'src',

    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },

    build: {
      sourcemap: true,
      // 🔹 куда складывать билд
      outDir: '../dist',
      emptyOutDir: true,

      rollupOptions: {
        // 🔹 все html в src
        input: glob.sync('*.html'),

        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },

    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});

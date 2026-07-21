import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import legacy from "@vitejs/plugin-legacy";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isDev = mode === "development";

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ["babel-plugin-react-compiler"],
            [
              "babel-plugin-transform-react-remove-prop-types",
              { removeImport: true },
            ],
          ],
        },
      }),

      !isDev &&
        viteCompression({
          algorithm: "brotliCompress",
          ext: ".br",
          threshold: 1024,
          compressionOptions: { level: 11 },
          deleteOriginFile: false,
        }),
      !isDev &&
        viteCompression({
          algorithm: "gzip",
          ext: ".gz",
          threshold: 1024,
          deleteOriginFile: false,
        }),

      !isDev &&
        VitePWA({
          registerType: "autoUpdate",
          includeAssets: [
            "favicon.svg",
            "favicon.ico",
            "robots.txt",
            "apple-touch-icon.png",
          ],
          manifest: {
            name: "SIGA Website",
            short_name: "SIGA",
            description: "SIGA Website",
            theme_color: "#ffffff",
            background_color: "#ffffff",
            display: "standalone",
            start_url: "/",
            icons: [
              {
                src: "/siga-fav.png",
                sizes: "192x192",
                type: "image/png",
              },
              {
                src: "siga-fav.png",
                sizes: "512x512",
                type: "image/png",
              },
              {
                src: "siga-fav.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable",
              },
            ],
          },
          workbox: {
            globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
            runtimeCaching: [
              {
                urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
                handler: "CacheFirst",
                options: {
                  cacheName: "images",
                  expiration: {
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                  },
                },
              },
            ],
          },
        }),
      !isDev &&
        legacy({
          targets: ["defaults", "not IE 11"],
          modernPolyfills: true,
          renderLegacyChunks: false,
        }),
      createHtmlPlugin({
        minify: !isDev,
        inject: {
          data: {
            title: "SIGA Website",
            description: "SIGA Website",
            keywords: "siga, industry, services,garments",
          },
        },
      }),

      mode === "analyze" &&
        visualizer({
          filename: "dist/stats.html",
          open: false,
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),
    resolve: {
      dedupe: ["react", "react-dom"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@redux": path.resolve(__dirname, "./src/redux"),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    },
    build: {
      minify: isDev ? false : "terser",
      terserOptions: isDev
        ? {}
        : {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            router: ["react-router-dom"],
            ui: ["@reduxjs/toolkit", "react-redux"],
            utils: ["axios", "moment"],
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: ({ name }) => {
            if (/\.(css)$/.test(name ?? ""))
              return "assets/css/[name]-[hash][extname]";
            return "assets/[name]-[hash][extname]";
          },
        },
      },
      assetsInlineLimit: 4096,
      cssCodeSplit: !isDev,
      sourcemap: isDev,

      chunkSizeWarningLimit: 800,
      reportCompressedSize: false,
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@reduxjs/toolkit",
        "react-redux",
        "axios",
      ],
      exclude: ["@gsap/react", "framer-motion", "swiper"],
    },
    server: {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  };
});

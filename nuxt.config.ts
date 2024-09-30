import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  vite: {
    optimizeDeps: {
      // Don't optimize these packages as they contain web workers and WASM files.
      // https://github.com/vitejs/vite/issues/11672#issuecomment-1415820673
      exclude: ["@journeyapps/wa-sqlite", "@powersync/web"],
      include: ["@powersync/web > js-logger"],
    },
    worker: {
      format: "es",
      plugins: () => [wasm(), topLevelAwait()],
    },
  },
});

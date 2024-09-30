import { createPowerSyncPlugin } from "@powersync/vue";
import { PowerSyncDatabase } from "@powersync/web";
import { AppSchema } from "~/library/powersync/AppSchema";

export default defineNuxtPlugin((nuxtApp) => {
  const powerSync = new PowerSyncDatabase({
    database: {
      dbFilename: "vue-nuxt.db",
    },
    flags: {
      useWebWorker: false,
    },
    schema: AppSchema,
  });

  const powerSyncPlugin = createPowerSyncPlugin({
    database: markRaw(powerSync),
  });
  nuxtApp.vueApp.use(powerSyncPlugin);
});

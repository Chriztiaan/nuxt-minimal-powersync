<template>
  <div>{{ waiting }} <br /><br />{{ data }}</div>
</template>

<script setup lang="ts">
// import Logger from 'js-logger';
import { usePowerSync, useQuery } from "@powersync/vue";
import { SupabaseConnector } from "@/library/powersync/SupabaseConnector";
const powerSync = usePowerSync();
const waiting = ref("waiting");
// For console testing purposes
(window as any)._powersync = powerSync;

const supabase = new SupabaseConnector();

powerSync.value.init();
supabase.registerListener({
  sessionStarted: () => {
    console.log("sessionStarted");
    powerSync.value.connect(supabase);
  },
});

await supabase.client.auth.signOut();
await powerSync.value.disconnectAndClear();

(async () => {
  await powerSync.value.waitForFirstSync();
  waiting.value = "done";
})();

await supabase.login("9@9.com", "9@9.com");
console.log(1);

// powerSync.value.execute(
// "insert into lists (id, name) values ('00000', 'test')"
// );
const { data } = useQuery("select * from lists");
</script>

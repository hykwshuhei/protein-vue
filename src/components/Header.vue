<script lang="ts">
import { supabase } from "../supabase";
export default {
  name: "HeaderCom",
  data() {
    return {
      session: {} as object | null,
    };
  },
  created: async function () {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    console.log(session);
    this.session = session;
  },
};
</script>

<template>
  <header class="text-white bg-blue-400">
    <div class="container mx-auto flex flex-wrap p-5 items-center">
      <span class="text-xl pt-2 mx-auto">
        <RouterLink
          :to="{
            name: 'list',
          }"
          class="text-white hover:bg-blue-400 ml-9"
          v-if="session"
        >
          Rakutein
        </RouterLink>
        <RouterLink
          :to="{
            name: 'list',
          }"
          class="text-white hover:bg-blue-400"
          v-else
        >
          Rakutein
        </RouterLink>
      </span>
      <span class="text-xs pt-3" v-show="session">
        <img
          alt="purchaseHistory"
          class="h-11 w-11"
          src="/images/IconPurchaseHistrory2.png"
        />
        <RouterLink
          :to="{
            name: 'history',
          }"
          class="text-white hover:bg-blue-400"
        >
          購入履歴
        </RouterLink>
      </span>
    </div>
  </header>
</template>

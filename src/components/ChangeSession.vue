<script lang="ts">
import { supabase } from "../supabase";
import type { MetaData } from "../../types/type";

export default {
  name: "ChangeSession",
  data() {
    return {
      user_metadata: {} as MetaData,
    };
  },
  methods: {
    signOut() {
      supabase.auth.signOut();
      alert("ログアウトしました");
    },
  },
  created: function () {
    (async () => {
      //ユーザのsessionデータをuser_metadataに格納する処理
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      console.log(session);
      console.log(this.user_metadata);
      if (session) {
        this.user_metadata = session.user.user_metadata as MetaData;
        console.log(this.user_metadata);
      }
    })();
  },
};
</script>

<template>
  <HeaderCom class="-mb-11" />
  <section v-if="user_metadata.firstName">
    <div class="flex pt-1 flex-row-reverse">
      <nav class="flex text-base">
        <div class="hover:bg-white">
          <button
            @click="signOut()"
            class="py-1 text-sm text-gray-500 font-bold rounded"
          >
            <RouterLink
              to="/login"
              class="hover:bg-white text-sm text-gray-500 font-bold"
            >
              ログアウト 〉
            </RouterLink>
          </button>
        </div>
      </nav>
    </div>
  </section>
  <section v-else>
    <div class="flex pt-1 flex-row-reverse">
      <nav class="flex text-base">
        <div class="hover:bg-white">
          <button class="py-1 text-sm text-gray-500 font-bold rounded">
            <RouterLink
              to="/login"
              class="hover:bg-white text-sm text-gray-500 font-bold"
            >
              ログイン 〉
            </RouterLink>
          </button>
        </div>
      </nav>
    </div>
  </section>
</template>

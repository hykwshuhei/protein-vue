<script lang="ts">
import HeaderCom from "../components/Header.vue";
import ChangeSession from "../components/ChangeSession.vue";
import { supabase } from "../supabase";
import type { Item } from "../../types/type";

export default {
  name: "ListItem",
  components: {
    HeaderCom,
    ChangeSession,
  },
  data() {
    return {
      items: [] as Array<Item> | null,
    };
  },
  created: function () {
    (async () => {
      let { data, error } = await supabase.from("items").select("*");
      this.items = data;
      // console.log(data);
      // console.log(error);
    })();
  },
  methods: {
    modStr(item: Item) {
      const str = item.description.substring(0, 23) + "...";
      return str;
    },
  },
};
</script>

<template>
  <div class="min-h-screen w-screen pb-16">
    <HeaderCom class="w-screen" />
    <ChangeSession class="pr-16" />
    <div class="w-11/12 mx-auto">
      <div class="flex flex-wrap">
        <div v-for="item in items" :key="item.id">
          <section class="text-gray-600 mt-14 flex flex-wrap">
            <div
              class="border-2 border-gray-200 border-opacity-60 rounded-lg w-72"
            >
              <img
                class="w-72 h-72 object-fill"
                :src="item.imageUrl"
                alt="itemImageUrl"
              />
              <div class="p-6 h-60">
                <h2
                  class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                >
                  商品名
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-1">
                  {{ item.name }}
                </h1>
                <h2 class="title-font font-medium text-gray-900 mb-2">
                  ¥ {{ item.price }}円(税込)
                </h2>
                <p class="leading-relaxed mb-3">{{ modStr(item) }}</p>
                <div class="flex items-center flex-wrap">
                  <RouterLink
                    v-bind:to="{
                      name: 'detail',
                      params: { id: item.id },
                    }"
                    class="hover:bg-white"
                  >
                    詳細ページ
                  </RouterLink>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

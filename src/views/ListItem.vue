<script lang="ts">
import HeaderCom from "../components/Header.vue";
import { supabase } from "../supabase";

interface Item {
  category: string;
  content: string;
  description: string;
  flavor: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export default {
  name: "ListItem",
  components: {
    HeaderCom,
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
      console.log(data);
      console.log(error);
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
  <HeaderCom />
  <div class="md:flex md:flex-wrap md:mx-auto">
    <div class="md:w-1/2" v-for="item in items" :key="item.id">
      <section class="text-gray-600 container pt-14 pb-4 flex flex-wrap">
        <div
          class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden mx-auto"
        >
          <img
            class="lg:h-48 md:h-36 max-w-md block object-contain mx-auto"
            :src="item.imageUrl"
            alt="blog"
          />
          <div class="p-6">
            <h2
              class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
            >
              商品名
            </h2>
            <h1
              class="title-font text-lg font-medium text-gray-900 mb-1 md:w-full"
            >
              {{ item.name }}
            </h1>
            <h2 class="title-font font-medium text-gray-900 mb-2">
              ¥ {{ item.price }}円
            </h2>
            <p class="leading-relaxed mb-3">{{ modStr(item) }}</p>
            <div class="flex items-center flex-wrap">
              <!-- <a
                  class="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0"
                  href="/"
                  > -->
              <RouterLink
                v-bind:to="{
                  name: 'detail',
                  params: { id: item.id },
                }"
                class="hover:bg-white"
              >
                詳細ページ
              </RouterLink>
              <!-- </a> -->
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

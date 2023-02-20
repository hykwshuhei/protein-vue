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
  <div class="md:w-full">
    <HeaderCom />
    <ChangeSession />
    <div class="md:flex md:flex-wrap md:mx-auto">
      <div class="lg:w-full" v-for="item in items" :key="item.id">
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
  <!-- <HeaderCom />
  <ChangeSession />

  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">
        Customers also purchased
      </h2>

      <div
        class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <div class="group relative">
          <div
            class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80"
          >
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
              alt="Front of men&#039;s Basic Tee in black."
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a href="#">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  Basic Tee
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">Black</p>
            </div>
            <p class="text-sm font-medium text-gray-900">$35</p>
          </div>
        </div>

      </div>
    </div>
  </div> -->
</template>

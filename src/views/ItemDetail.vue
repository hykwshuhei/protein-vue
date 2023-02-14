<script>
import HeaderCom from "../components/Header.vue";
import { supabase } from "../supabase";
export default {
  name: "ItemDetail",
  components: {
    HeaderCom,
  },
  props: {
    id: String,
  },
  data() {
    return {
      item: [],
      flavor: [],
      countity: 1,
      price: "",
      itemName: "",
      flavorSelected: "",
    };
  },
  watch: {
    countity() {
      this.price = this.item[0].price;
      this.price *= this.countity;
    },
  },
  created: function () {
    (async () => {
      let { data: item, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", `${this.id}`);
      this.item = item;
      console.log(item);
      console.log(error);

      const i = await this.item[0];
      const fla = await i.flavor.replace(/{|"|\\|}|/g, "");
      const arrFlavor = await fla.split(",");
      this.flavor = await arrFlavor;
      console.log(this.flavor);
      console.log(this.item);

      this.price = item[0].price;

      this.itemName = item[0].name;

      this.flavorSelected = arrFlavor[0];
    })();
  },
};
</script>

<template>
  <HeaderCom class="-mb-11" />
  <section class="text-gray-600 body-font">
    <div class="container px-5 mt-20 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img
          alt="ecommerce"
          class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
          :src="item[0].imageUrl"
        />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest mb-1">
            商品名
          </h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium">
            {{ item[0].name }}
          </h1>
          <h2 class="text-gray-900 text-xl title-font font-medium mt-3">
            ¥ {{ item[0].price }}円
          </h2>
          <div class="flex mb-4"></div>
          <p class="leading-relaxed">{{ item[0].description }}</p>
          <div
            class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"
          >
            <div class="flex items-center">
              <span class="mr-3">フレーバー</span>
              <div class="relative">
                <select
                  v-model="flavorSelected"
                  class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10"
                >
                  <option>{{ flavor[0] }}</option>
                  <option>{{ flavor[1] }}</option>
                </select>
                <span
                  class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>
            <div class="flex items-center">
              <span class="mr-3 ml-3">数量</span>
              <div class="relative">
                <select
                  v-model="countity"
                  class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <span
                  class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div class="flex">
            <span class="title-font font-medium text-2xl text-gray-900"
              >合計：{{ price }}円</span
            >
            <button
              @click="
                () =>
                  $router.push({
                    name: 'purchase',
                    query: {
                      id: `${id}`,
                      itemName: `${itemName}`,
                      price: `${price}`,
                      countity: `${countity}`,
                      flavor: `${flavorSelected}`,
                    },
                  })
              "
              class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
            >
              <!-- <RouterLink
                  v-bind:to="{
                    name: 'purchase',
                    params: {
                      id: id,
                      // item: item,
                      // flavor: flavor,
                      // countity: countity,
                      // price: price,
                    },
                  }"
                  class="text-white"
                > -->
              購入する
              <!-- </RouterLink> -->
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

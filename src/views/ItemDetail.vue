<script lang="ts">
import HeaderCom from "../components/Header.vue";
import { supabase } from "../supabase";
import type { MetaData, Item } from "../../types/type";

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
      items: [] as Array<Item>,
      flavor: [] as Array<String>,
      countity: 1,
      price: 0,
      itemName: "",
      flavorSelected: "",
      user_metadata: {} as MetaData,
      msgNeedlogin1: "",
      msgNeedlogin2: "",
    };
  },
  watch: {
    countity() {
      if (!this.items) {
        console.error("予期せぬ挙動");
      } else {
        this.price = this.items[0].price;
        this.price *= this.countity;
      }
    },
  },
  created:
    //商品データをsupabaseから持ってくる処理
    function () {
      (async () => {
        let { data } = await supabase
          .from("items")
          .select("*")
          .eq("id", `${this.id}`);

        if (!data) {
          console.error("予期せぬ挙動");
        } else {
          this.items = data;
          const i = await this.items[0];
          const fla = await i.flavor.replace(/{|"|\\|}|/g, "");
          const arrFlavor = await fla.split(",");
          this.flavor = await arrFlavor;
          console.log(this.flavor);

          this.price = i.price;

          this.itemName = i.name;

          this.flavorSelected = arrFlavor[0];
        }

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
  methods: {
    signOut() {
      supabase.auth.signOut();
      alert("ログアウトしました");
    },
    purchse() {
      if (!this.user_metadata.firstName) {
        this.msgNeedlogin1 = "ログイン後に購入可能となります。";
        this.msgNeedlogin2 =
          "画面右上のログインボタンからログインページへお進み下さい。";
      } else {
        this.$router.push({
          name: "purchase",
          query: {
            id: `${this.id}`,
            itemName: `${this.itemName}`,
            price: `${this.price}`,
            countity: `${this.countity}`,
            flavor: `${this.flavorSelected}`,
          },
        });
      }
    },
  },
};
</script>

<template>
  <HeaderCom />
  <section v-if="user_metadata.firstName">
    <div class="flex pt-1 flex-row-reverse mt-10">
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
    <div class="flex pt-1 flex-row-reverse mt-10">
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
  <section class="text-gray-600 body-font">
    <!-- v-if -->
    <div v-if="user_metadata.firstName" class="container px-5 mt-10 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img
          alt="ecommerce"
          class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
          :src="items[0].imageUrl"
        />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest mb-1">
            商品名
          </h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium">
            {{ items[0].name }}
          </h1>
          <h2 class="text-gray-900 text-xl title-font font-medium mt-3">
            ¥ {{ items[0].price }}円
          </h2>
          <div class="flex mb-4"></div>
          <p class="leading-relaxed">{{ items[0].description }}</p>
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
              @click="purchse()"
              class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
            >
              購入する
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- v-else -->
    <div v-else class="container px-5 mt-10 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img
          alt="ecommerce"
          class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
          :src="items[0].imageUrl"
        />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest mb-1">
            商品名
          </h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium">
            {{ items[0].name }}
          </h1>
          <h2 class="text-gray-900 text-xl title-font font-medium mt-3">
            ¥ {{ items[0].price }}円
          </h2>
          <div class="flex mb-4"></div>
          <p class="leading-relaxed">{{ items[0].description }}</p>
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
              @click="purchse()"
              class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
            >
              購入する
            </button>
          </div>
          <p class="text-right text-red-500 text-lg">
            {{ msgNeedlogin1 }}<br />{{ msgNeedlogin2 }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { supabase } from "../supabase";
// import { Session } from "@supabase/supabase-js";
import HeaderCom from "../components/Header.vue";
import type { MetaData } from "../../types/type";
import route from "../router";

export default {
  name: "PurchaseItem",
  components: {
    HeaderCom,
  },
  data() {
    return {
      user_metadata: {} as MetaData,
      userUid: "",
      itemId: "",
      flavor: "",
      countity: "",
    };
  },
  created: async function () {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    console.log(session);
    if (session) {
      this.user_metadata = session.user.user_metadata as MetaData;
      this.userUid = session.user.id;
      console.log(this.user_metadata);
    }
    // 型ガードして、data()に代入
    if (
      typeof this.$route.query.id === "string" &&
      typeof this.$route.query.flavor === "string" &&
      typeof this.$route.query.countity === "string"
    ) {
      this.itemId = this.$route.query.id;
      this.flavor = this.$route.query.flavor;
      this.countity = this.$route.query.countity;
    }
  },
  methods: {
    purchase(e: Event) {
      e.preventDefault();
      let userUid = this.userUid;
      let itemId = this.itemId;
      let flavor = this.flavor;
      let countity = this.countity;
      (async () => {
        await supabase
          .from("vuePurchaseHistories")
          .insert({ userUid, itemId, flavor, countity });
      })();
    },
  },
};
</script>

<template>
  <div class="min-h-screen w-screen">
    <HeaderCom class="w-screen" />
    <h1 class="text-center text-2xl mt-12">ご注文内容確認</h1>
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-12 mx-auto">
        <div class="mx-auto flex flex-wrap">
          <div class="md:w-full mx-auto mb-6 lg:w-4/5">
            <div class="flex mb-4">
              <div
                class="flex-grow text-blue-400 border-b-2 border-blue-400 py-2 text-md px-1"
              >
                配送先住所
              </div>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">姓名</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {{ user_metadata.firstName }}&nbsp;&nbsp;{{
                      user_metadata.lastName
                    }}
                  </dd>
                </div>
                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">郵便番号</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    〒&nbsp;{{ user_metadata.postCode }}
                  </dd>
                </div>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    都道府県・市区町村
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {{ user_metadata.city }}{{ user_metadata.municipalities }}
                  </dd>
                </div>
                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">町域・番地</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {{ user_metadata.address }}
                  </dd>
                </div>
                <div
                  v-if="user_metadata.building"
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    建物名・部屋番号
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {{ user_metadata.building }}
                  </dd>
                </div>
                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dd
                    class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                  ></dd>
                </div>
              </dl>
            </div>

            <div
              class="flex-grow text-blue-400 border-b-2 border-blue-400 py-2 text-md px-1"
            >
              ご注文内容
            </div>

            <div class="flex border-t border-gray-200 py-2">
              <span class="text-gray-500">商品名</span>
              <span class="ml-auto text-gray-900">{{
                $route.query.itemName
              }}</span>
            </div>
            <div class="flex border-t border-gray-200 py-2">
              <span class="text-gray-500">フレーバー</span>
              <span class="ml-auto text-gray-900">{{
                $route.query.flavor
              }}</span>
            </div>
            <div class="flex border-t border-b mb-12 border-gray-200 py-2">
              <span class="text-gray-500">数量</span>
              <span class="ml-auto text-gray-900"
                >{{ $route.query.countity }}個</span
              >
            </div>
            <div class="flex">
              <span class="title-font font-medium text-2xl text-gray-900"
                >合計：{{ $route.query.price }}円</span
              >
              <button
                @click="purchase"
                class="flex ml-auto text-white bg-blue-400 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded mr-3"
              >
                <RouterLink
                  :to="{
                    name: 'purchased',
                  }"
                  class="text-white"
                >
                  代引き決済
                </RouterLink>
              </button>
              <button
                class="bg-gray-300 border-0 py-2 px-3 focus:outline-none hover:bg-gray-400 rounded"
              >
                <a @click="$router.back()" class="text-white"> キャンセル </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

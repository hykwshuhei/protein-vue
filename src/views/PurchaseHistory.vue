<script lang="ts">
import HeaderCom from "../components/Header.vue";
import { supabase } from "../supabase";

export default {
  neme: "PurchaseHistory",
  components: {
    HeaderCom,
  },
  data() {
    return {
      userUid: "",
      purchaseHistories: [] as any,
      items: [] as any,
    };
  },
  created:
    // セッションデータ(userUid)取得
    function () {
      (async () => {
        let {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        console.log(session);
        if (session) {
          console.log(session.user.id);
          this.userUid = session.user.id;
          // 購入商品データ取得
          let { data, error } = await supabase
            .from("vuePurchaseHistories")
            .select("*")
            .eq("userUid", this.userUid);
          console.log(data);
          this.purchaseHistories = data;
          // 商品idから商品名、商品画像URL、商品価格データ取得
          this.items = await Promise.all(
            this.purchaseHistories.map(async (i: any) => {
              let { data } = await supabase
                .from("items")
                .select("*")
                .eq("id", i.itemId);
              console.log(data[0]);
              i.itemImgUrl = data[0].imageUrl;
              i.itemName = data[0].name;
              i.itemPrice = data[0].price;
              console.log(i);
              return i;
            })
          );
          console.log(this.items);
        }
      })();
    },
};
</script>

<template>
  <div class="min-h-screen w-screen">
    <HeaderCom class="w-screen" />

    <section class="text-gray-600 body-font mt-24">
      <div class="container mx-auto">
        <div
          class="text-blue-400 border-b-2 border-blue-400 py-2 text-lg px-auto mx-auto"
        >
          ご購入履歴
        </div>

        <div
          class="lg:w-2/3 mx-auto flex flex-wrap"
          v-for="item in items"
          :key="items.id"
        >
          <img
            alt="ecommerce"
            class="lg:w-1/2 w-2/3 lg:h-auto h-2/3 object-cover object-center rounded mx-auto md:mt-6 lg:mt:3 md:mb-1 lg:mb-6 mt-3"
            :src="item.itemImgUrl"
          />

          <div class="lg:w-1/2 w-full lg:pl-10 mt-6 lg:my-auto">
            <dl>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">商品名</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {{ item.itemName }}
                </dd>
              </div>
              <div
                class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">フレーバー</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {{ item.flavor }}
                </dd>
              </div>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">数量</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {{ item.countity }}個
                </dd>
              </div>
              <div
                class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">合計</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {{ item.itemPrice * item.countity }}円（1商品あたり{{
                    item.itemPrice
                  }}円)
                </dd>
              </div>

              <div
                class="bg-white px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dd
                  class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                ></dd>
              </div>
              <div
                class="border-b-2 border-blue-400 px-auto mx-auto lg:hidden"
              ></div>
            </dl>
          </div>
        </div>
        <div class="border-b-2 border-blue-400 px-auto mx-auto"></div>
      </div>
    </section>
  </div>
</template>

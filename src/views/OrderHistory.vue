<script setup lang="ts">
import HeaderCom from "../components/Header.vue";
import { supabase } from "../supabase";

let {
  data: { session },
  error,
} = await supabase.auth.getSession();
console.log(session);
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

        <div class="lg:w-2/3 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            class="lg:w-1/2 w-2/3 lg:h-auto h-2/3 object-cover object-center rounded mx-auto"
          />

          <div class="lg:w-1/2 w-full lg:pl-10 lg:pt-6 mt-6 lg:mt-0">
            <dl>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">商品名</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {{}}&nbsp;&nbsp;{{}}
                </dd>
              </div>
              <div
                class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">フレーバー</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  〒&nbsp;{{}}
                </dd>
              </div>
              <div
                class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">数量</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {{}}個
                </dd>
              </div>
              <div
                class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt class="text-sm font-medium text-gray-500">合計</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {{}}円（1商品あたり{{  }}円)
                </dd>
              </div>

              <div
                class="bg-white px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dd
                  class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                ></dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="border-b-2 border-blue-400 px-auto mx-auto"></div>
      </div>
    </section>
  </div>
</template>

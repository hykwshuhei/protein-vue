<script setup lang="ts">
import HeaderCom from "../components/Header.vue";
import { supabase } from "../supabase";
</script>

<template>
  <div class="min-h-screen w-screen">
    <HeaderCom class="w-screen" />

    <section class="text-gray-600 body-font">
      <div class="container px-5 mt-10 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            class="lg:w-1/2 w-2/3 lg:h-auto h-2/3 object-cover object-center rounded mx-auto"
          />
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest mb-1">
              商品名
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium">
              {{}}
            </h1>
            <h2 class="text-gray-900 text-xl title-font font-medium mt-3">
              ¥ {{}}円
            </h2>
            <div class="flex mb-4"></div>
            <p class="leading-relaxed">{{}}</p>
            <div
              class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"
            >
              <div class="flex items-center">
                <span class="mr-3">フレーバー</span>
                <div class="relative">
                  <select
                    class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10"
                  >
                    <option>{{}}</option>
                    <option>{{}}</option>
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
                >合計：{{}}円</span
              >
              <button
                class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
              >
                購入する
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

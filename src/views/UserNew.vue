<script lang="ts">
import { supabase } from "../supabase";
import HeaderCom from "../components/Header.vue";
import axios from "axios";
export default {
  name: "UserNew",
  components: {
    HeaderCom,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPass: "",
      postCode: "",
      postMessage: "",
      city: "",
      municipalities: "",
      address: "",
      building: "",
      appeaPostCode: "",
      appeaPass: "",
    };
  },
  // appeaPostCode() {
  //   const regPostCode = /^[0-9]{3}-[0-9]{4}$|^[0-9]{3}[0-9]{4}$/;
  //   return regPostCode.test(this.postCode)
  //     ? { disabled: true }
  //     : { disabled: false };
  // },
  // },
  methods: {
    checkPass() {
      if (this.password !== this.confirmPass) {
        this.appeaPass = "パスワードと確認用パスワードが不一致です";
      } else {
        this.appeaPass = "";
      }
    },
    async search(e: Event) {
      const regPostCode = /^[0-9]{3}-[0-9]{4}$|^[0-9]{3}[0-9]{4}$/;
      if (regPostCode.test(this.postCode)) {
        let url = "http://zipcloud.ibsnet.co.jp/api/search?zipcode=";
        e.preventDefault();
        const { data } = await axios.get(url + this.postCode);
        if (data.results === null) {
          this.postMessage = "存在しない郵便番号です";
        } else {
          this.city = data.results[0].address1;
          this.municipalities = data.results[0].address2;
          this.address = data.results[0].address3;
        }
      } else {
        e.preventDefault();
        this.appeaPostCode =
          "郵便番号は〇〇〇-〇〇〇〇もしくは〇〇〇〇〇〇〇の形式で入力してください";
      }
    },
    async submitForm(e: Event) {
      const regPostCode = /^[0-9]{3}-[0-9]{4}$|^[0-9]{3}[0-9]{4}$/;
      if (!regPostCode.test(this.postCode)) {
        e.preventDefault();
        this.appeaPostCode =
          "郵便番号は〇〇〇-〇〇〇〇もしくは〇〇〇〇〇〇〇の形式で入力してください";
      }
      const { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
        options: {
          data: {
            firstName: this.firstName,
            lastName: this.lastName,
            postCode: this.postCode,
            city: this.city,
            municipalities: this.municipalities,
            address: this.address,
            building: this.building,
          },
        },
      });
      if (!this.$options.data) {
        alert("入力内容に不備があります");
        // XXX
        console.error("入力欄に不備あり");
      } else {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.confirmPass = "";
        this.postCode = "";
        this.postMessage = "";
        this.city = "";
        this.municipalities = "";
        this.address = "";
        this.building = "";
        this.appeaPostCode = "";
        this.appeaPass = "";
        // FIXME
        // Object.assign(this.$data, this.$options.data.call(this));
        await this.$router.push({ name: "login" });
        alert(
          "入力されたメールアドレスへ認証のためのURLを送りました。URLを開くことによって認証が完了します。"
        );
      }
      console.log(data);
      console.log(error);
    },
  },
};
</script>

<template>
  <div class="min-h-screen w-screen">
    <HeaderCom class="mb-7 w-screen" />
    <div class="w-1/2 mx-auto">
      <div>
        <main>
          <div
            class="container mx-auto flex flex-wrap px-5 pb-5 pt-1 flex-col md:flex-row items-center"
          >
            <nav
              class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"
            >
              <div>
                <button
                  class="px-3 py-1 text-sm text-gray-500 font-bold rounded"
                >
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
        </main>
      </div>

      <form class="w-full mb-5 mx-auto" @submit.prevent="submitForm">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-firstName"
            >
              姓*
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-first-name"
              type="text"
              placeholder="山田"
              v-model="firstName"
              required
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              名*
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="太郎"
              v-model="lastName"
              required
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              メールアドレス*
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              type="email"
              placeholder="1234@example.com"
              v-model="email"
              required
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              パスワード*
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="******************"
              v-model="password"
              required
              pattern=".{8,16}"
              title="半角英数字で8文字以上16文字以下"
            />
            <p class="text-gray-600 text-xs italic">
              半角英数字で8文字以上16文字以内で設定してください
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              確認用パスワード*
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="******************"
              v-model="confirmPass"
              required
              pattern=".{8,16}"
              title="半角英数字で8文字以上16文字以下"
              @change="checkPass"
            />
            <p class="text-red-500 text-xs">
              {{ appeaPass }}
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-zip"
            >
              郵便番号*
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="123-4567"
              v-model="postCode"
              required
            />
            <p class="text-red-500 text-xs">
              {{ appeaPostCode }}
            </p>
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0 md:ml-0 scale-30">
            <button
              @click="search"
              class="px-2 md:mt-3 ml-3 text-indigo-500 border border-indigo-500 font-semibold rounded hover:bg-indigo-100"
            >
              住所検索 〉
            </button>
            <p class="text-red-500 text-xs">&nbsp;{{ postMessage }}</p>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              都道府県
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="〇〇県"
              v-model="city"
              required
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              市区町村
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-municipalities"
              type="text"
              placeholder="〇〇市 〇〇区等"
              v-model="municipalities"
              required
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              町域・番地
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-address"
              type="text"
              placeholder="1-1"
              v-model="address"
              required
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-city"
            >
              建物名・部屋番号
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-building"
              type="text"
              placeholder="〇〇ビル2F 101"
              v-model="building"
            />
          </div>
        </div>
        <button
          class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          登録
        </button>
      </form>
    </div>
  </div>
</template>

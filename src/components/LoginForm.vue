<script lang="ts">
import { supabase } from "../supabase";
// import HeaderCom from "../components/Header.vue";
export default {
  name: "LoginForm",
  //   components: {
  //     HeaderCom,
  //   },
  data() {
    return {
      email: "",
      password: "",
      messageAlert: "",
    };
  },
  methods: {
    async submitForm() {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });
      if (error) {
        this.messageAlert =
          "メールアドレス または パスワード が正しくありません";
        //   } else {
        //     this.$router.push({
        //       name: "list",
        //     });
        //   }
      }
    },
  },
};
</script>

<template>
  <div class="min-h-screen w-screen">
    <!-- <HeaderCom class="mb-7 w-screen" /> -->
    <div class="w-5/6 mx-auto">
      <div>
        <main>
          <div
            class="container mx-auto flex flex-wrap px-5 pb-5 pt-3 flex-col md:flex-row items-center"
          >
            <nav
              class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"
            >
              <div>
                <button
                  class="px-3 py-1 text-sm text-gray-500 font-bold rounded"
                >
                  <RouterLink
                    to="/new"
                    class="hover:bg-white text-sm text-gray-500 font-bold"
                  >
                    新規会員登録 〉
                  </RouterLink>
                </button>
              </div>
            </nav>
          </div>
        </main>
      </div>

      <form class="w-full max-w-lg mb-5 mx-auto" @submit.prevent="submitForm">
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
              required
              v-model="email"
              data-email
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
              required
              pattern=".{8,16}"
              title="半角英数字で8文字以上16文字以下"
              v-model="password"
              data-password
            />
            <p class="text-gray-600 text-xs italic">
              半角英数字で8文字以上16文字以下
            </p>
          </div>
        </div>

        <p id="message" class="text-red-500 mb-5">
          {{ messageAlert }}
        </p>

        <button
          class="flex mx-auto mt-15 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          type="submit"
        >
          ログイン
        </button>
      </form>
    </div>
  </div>
</template>

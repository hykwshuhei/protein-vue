import { shallowMount } from "@vue/test-utils";
import LoginForm from "../views/LoginForm.vue";

test("メアド、パスワード入力後の動作テスト", async () => {
  const wrapper = shallowMount(LoginForm);

  await wrapper.setData({
    email: "hykwshuhei@gmail.com",
    password: "Vaga7326",
  });

  expect(wrapper.vm.messageAlert).toBe("");
});
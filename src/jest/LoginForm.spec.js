import { shallowMount } from "@vue/test-utils";
import LoginForm from "../views/LoginForm.vue";

describe("メアド、パスワード入力後の動作テスト", () => {
  test("登録済みのメアド、パスワード入力", async () => {
    const wrapper = shallowMount(LoginForm);

    await wrapper.setData({
      email: "hykwshuhei@gmail.com",
      password: "Vaga7326",
    });

    expect(wrapper.vm.messageAlert).toBe("");
  });

  test("未登録のメアド、パスワード入力", (done) => {
    const wrapper = shallowMount(LoginForm);

    wrapper.setData({
      email: "notRegist@gmail.com",
      password: "notRegist",
    });

    wrapper.find("form").trigger("submit.prevent");

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.messageAlert).toBe(
        "メールアドレス または パスワード が正しくありません"
      );
      done();
    });
  }, 9000);
});

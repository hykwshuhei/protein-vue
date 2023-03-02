//下記はテストがしっかり通っていない
import { shallowMount } from "@vue/test-utils";
import LoginForm from "../views/LoginForm.vue";
import flushPromises from "flush-promises";

describe("メアド、パスワード入力後の動作テスト", () => {
  test("登録済みのメアド、パスワード入力", async () => {
    const wrapper = shallowMount(LoginForm);

    await wrapper.setData({
      email: "hykwshuhei@gmail.com",
      password: "Vaga7326",
    });

    expect(wrapper.vm.messageAlert).toBe("");
  });

  //未完 setValueでv-modelを使う<input>の値を設定する
  test("未登録のメアド、パスワード入力", async () => {
    const wrapper = shallowMount(LoginForm);

    // wrapper.setData({
    //   email: "notRegist@gmail.com",
    //   password: "notRegist",
    // });

    wrapper.find("[data-email]").setValue("notRegist@gmail.com");
    wrapper.find("[data-password]").setValue("notRegist");

    wrapper.find("form").trigger("submit.prevent");

    await flushPromises();

    expect(wrapper.find("#message").text()).toBe(
      "メールアドレス または パスワード が正しくありません"
    );
  });
});

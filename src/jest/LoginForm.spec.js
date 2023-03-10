import { mount, shallowMount } from "@vue/test-utils";
import LoginForm from "../views/LoginForm.vue";
import LoginFormCom from "../components/LoginForm.vue";
import { supabase } from "../supabase";

//Pass
describe("../views/LoginForm.vueのテスト", () => {
  it("メアド・パスワード空。エラーアラート表示の確認", async () => {
    const wrapper = mount(LoginForm);
    await wrapper.vm.submitForm();

    expect(wrapper.vm.messageAlert).toBe(
      "メールアドレス または パスワード が正しくありません"
    );
  });
});

//Pass
describe("../components/LoginForm.vueのテスト", () => {
  jest.mock("../supabase", () => {
    return {
      supabase: {
        auth: {
          signInWithPassword: jest.fn(),
        },
      },
    };
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(LoginFormCom);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("登録済みメアド・パスワード。ログインできるかの確認", async () => {
    const mockSignInWithPassword = jest.spyOn(
      supabase.auth,
      "signInWithPassword"
    );
    mockSignInWithPassword.mockResolvedValue({ data: {}, error: null });
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    const form = wrapper.find("form");

    emailInput.setValue("hykwshuhei@gmail.com");
    passwordInput.setValue("Vaga7326");
    await form.trigger("submit");

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "hykwshuhei@gmail.com",
      password: "Vaga7326",
    });
  });
});

// テスト Pass
import { mount, RouterLinkStub } from "@vue/test-utils";
import Purchased from "../views/Purchased.vue";

describe("Purchased.vue", () => {
  test("購入履歴ボタンの遷移先を確認", async () => {
    const wrapper = mount(Purchased, {
      global: {
        components: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const historyLink = wrapper.findAllComponents(RouterLinkStub).at(2);

    expect(historyLink.props().to).toEqual({
      name: "history",
    });
  });
});

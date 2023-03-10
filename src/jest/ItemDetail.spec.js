// Pass
import { shallowMount } from "@vue/test-utils";
import ItemDetail from "../views/ItemDetail.vue";

describe("ItemDetail", () => {
  it("セッションデータが無い時に表示されるメッセージの確認", async () => {
    const wrapper = shallowMount(ItemDetail, {
      propsData: {
        id: "example_id",
      },
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
      data() {
        return {
          items: [
            {
              price: 1000,
              name: "example item name",
              imageUrl: "https://example.com/example_image.jpg",
            },
          ],
          user_metadata: {},
          msgNeedlogin1: "",
          msgNeedlogin2: "",
        };
      },
      created() {
        // モック関数にすることでログを出力してテスト可能
        this.$options.methods.signOut = jest.fn();
      },
    });

    await wrapper.vm.purchase();

    expect(wrapper.vm.msgNeedlogin1).toBe("ログイン後に購入可能となります。");
    expect(wrapper.vm.msgNeedlogin2).toBe(
      "画面右上のログインボタンからログインページへお進み下さい。"
    );
  });
});

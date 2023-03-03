import { shallowMount } from "@vue/test-utils";
import ListItem from "../views/ListItem.vue";

//未完
// test("Supabaseから商品データ取得できているかのテスト", async () => {
//   const wrapper = shallowMount(ListItem);

//   await wrapper.vm.$nextTick();

//   expect(wrapper.vm.items).toHaveLength(18);
// });

// HTML出力のテスト
describe("ListItem", () => {
  // コンポーネントがマウントされ、ラッパが作成されます。
  const wrapper = shallowMount(ListItem);

  it("renders the correct markup", () => {
    expect(wrapper.html()).toContain(
      '<div class="min-h-screen w-screen pb-16">'
    );
  });

  // it("has a button", () => {
  //   expect(wrapper.find("#name").text()).toBe("商品名");
  // });
});

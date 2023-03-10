import { shallowMount } from "@vue/test-utils";
import ListItem from "../views/ListItem.vue";

// HTML出力のテストPass
describe("ListItemのHTML出力確認", () => {
  // コンポーネントがマウントされ、ラッパが作成されます。
  const wrapper = shallowMount(ListItem);

  it("レンダリングされたマークアップの確認", () => {
    expect(wrapper.html()).toContain(
      '<div class="min-h-screen w-screen pb-16">'
    );
  });
});

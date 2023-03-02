//未完
import { shallowMount } from "@vue/test-utils";
import ListItem from "../views/ListItem.vue";

test("Supabaseから商品データ取得できているかのテスト", async () => {
  const wrapper = shallowMount(ListItem);

  await wrapper.vm.$nextTick();

  expect(wrapper.vm.items).toHaveLength(18);
});

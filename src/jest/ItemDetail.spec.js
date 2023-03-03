// 動作しない
import { shallowMount } from "@vue/test-utils";
import ItemDetail from "../views/ItemDetail.vue";

it("button click", () => {
  const wrapper = shallowMount(ItemDetail);
  expect(wrapper.vm.msgNeedlogin1).toBe("");
  const button = wrapper.find("#purchase");
  button.trigger("click");
  expect(wrapper.vm.msgNeedlogin1).toBe("ログイン後に購入可能となります。");
});
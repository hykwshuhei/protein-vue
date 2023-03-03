import { shallowMount } from "@vue/test-utils";
import Purchase from "../views/Purchase.vue";

// it("button click should back to the previous page", () => {
//   const wrapper = shallowMount(Purchase);
//   const button = wrapper.find("#back");
//   button.trigger("click");
//   expect(window.location.href).toBe("http://localhost:5173/detail/*");
//   wrapper.unmount();
// });

const wrapper = shallowMount(Purchase);

it("has a button", () => {
  expect(wrapper.contains("button")).toBe(true);
});

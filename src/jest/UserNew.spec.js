//エラー：wrapper.vm.contains is not a function
import { mount } from "@vue/test-utils";
import UserNew from "../views/UserNew.vue";

describe("UserNew", () => {
  const wrapper = mount(UserNew);
  it("button要素の存在を確認", () => {
    expect(wrapper.contains("button")).toBe(true);
  });
});

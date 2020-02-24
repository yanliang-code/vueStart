import { mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

// describe测试集
describe("HelloWorld.vue", () => {
    // 每个it都是测试的最小集
  it("renders props.msg when passed", () => {
    const msg = "new message";
    // 浅渲染
    const wrapper = mount(HelloWorld, {
        // 给被测试的组件传递props属性
      propsData: { msg }
    });
    // 断言
    // 期望text()返回值与msg变量值一致
    expect(wrapper.text()).toMatch(msg);
  });
});

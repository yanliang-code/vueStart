import { mount } from "@vue/test-utils";
import Counter from "@/components/Counter.vue";
import sinon from "sinon";

describe("Counter.vue", () => {
  const change = sinon.spy();
  const wrapper = mount(Counter, {
    listeners: {
      change
    }
  });
  it("renders counter html", () => {
    // 输出最终渲染出的html快照
    // 每次修改都可执行此方法进行前后比对
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("count++", () => {
    // 找到组件中的按钮
    const button = wrapper.find("button");
    // 点击按钮
    button.trigger("click");
    // 比较响应式数据是否变成期望值
    expect(wrapper.vm.count).toBe(1);
    expect(change.called).toBe(true);
    button.trigger("click");
    // emit触发change函数两次
    expect(change.callCount).toBe(2);
  });
});

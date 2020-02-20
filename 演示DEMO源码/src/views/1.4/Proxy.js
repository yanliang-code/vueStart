const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true
};
//目标对象,临时对象,目标对象的指定属性
export default function proxy(target, temp, key) {
  // 当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象
  sharedPropertyDefinition.get = function proxyGetter() {
    return temp[key];
  };
  // 当属性值修改时，触发执行该方法
  sharedPropertyDefinition.set = function proxySetter(val) {
    temp[key] = val;
    // 此标志位就是vue底层维护的,用于判断否则在子组件修改父组件的值
    if (!window.isUpdatingChildComponent) {
      console.error(`不可以直接更改: ${key}`);
    }
    window.isUpdatingChildComponent = false;
  };
  //  目标对象,目标对象的指定属性,set\get方法
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

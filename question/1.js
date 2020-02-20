const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true
};

// target:目标对象
// temp:临时变量
// key:目标对象的属性
export default function proxy(target, temp, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return temp[key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    temp[key] = val;
    if (!window.isUpdatingChildComponent) {
        // 警告
      console.error(`不可以直接更改: ${key}`);
    }

    window.isUpdatingChildComponent = false;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

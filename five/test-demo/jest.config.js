module.exports = {
    // 指定测试的文件类型
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
//   类似webpack中的loader
  transform: {
    //   通过vue-jest去处理.vue文件
    "^.+\\.vue$": "vue-jest",
    // 通过jest-transform-stub去处理指定的css、less、svg等这些文件
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
//   忽略node_modules中的文件
  transformIgnorePatterns: ["/node_modules/"],
//   给指定的路径列别名为@,下次用@就可以快速访问到
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
//   生成快照 ？？？
  snapshotSerializers: ["jest-serializer-vue"],
//   匹配文件的规则
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
//   最终的测试还是要再浏览器的环境运行，需要指定个浏览器路径
  testURL: "http://localhost/"
};

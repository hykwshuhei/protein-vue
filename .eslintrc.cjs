/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    //testやexpectがエラーにならないよう追記
    "plugin:jest/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    node: true, // <- 追加
  },
};

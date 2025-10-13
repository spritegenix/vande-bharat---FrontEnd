import pkg from "@next/eslint-plugin-next";
const { flatConfig } = pkg;
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  flatConfig.recommended,
  flatConfig.coreWebVitals,
  eslintConfigPrettier, // Must come last to override conflicting rules
];

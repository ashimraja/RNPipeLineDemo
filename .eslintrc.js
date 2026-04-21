module.exports = {
  root: true,
  extends: [
    "@react-native",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    // Enforce consistent code style
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "prefer-const": "error",
    "eqeqeq": ["error", "always"],
  },
  env: {
    "react-native/react-native": true,
    jest: true,
    node: true,
  },
  ignorePatterns: [
    "node_modules/",
    "android/",
    "ios/",
    "*.config.js",
  ],
};

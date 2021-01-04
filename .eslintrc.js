const eslintrc = {
  extends: [
    "eslint:recommended",
    "plugin:import/warnings",
    "plugin:import/errors",
    "plugin:promise/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "react-app",
    "standard",
    "airbnb",
    "prettier",
    "prettier/react",
    "prettier/standard",
  ],
  globals: {
    gapi: "readonly",
  },
  rules: {
    "arrow-body-style": ["error", "always"],
    curly: ["error", "all"],
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
        },
        groups: ["builtin", "external", "parent", "sibling"],
        "newlines-between": "always",
      },
    ],
    "no-nested-ternary": "off",
    "no-param-reassign": [
      "error",
      {
        props: false,
      },
    ],
    "node/handle-callback-err": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-danger": "off",
  },
};

module.exports = process.env.DISABLE_ESLINT ? {} : eslintrc;

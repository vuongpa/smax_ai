/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "prettier"
  ],
  plugins: ["prettier", "simple-import-sort", "unused-imports"],
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, "")],
        extensions: [".js", ".ts"]
      },
      typescript: {
        project: path.resolve(__dirname, "./tsconfig.json")
      }
    }
  },
  env: {
    node: true
  },
  rules: {
    // Override pettier rules
    "prettier/prettier": [
      1,
      {
        arrowParens: "always",
        semi: true,
        trailingComma: "none",
        tabWidth: 2,
        endOfLine: "auto",
        useTabs: false,
        printWidth: 100
      }
    ],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }
    ]
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ["*.js", "*.ts"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              ["^@?\\w"],
              // Internal packages.
              ["^(@|components)(/.*|$)"],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"]
            ]
          }
        ]
      }
    }
  ]
};

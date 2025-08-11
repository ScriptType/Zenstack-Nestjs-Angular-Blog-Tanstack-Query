// eslint.config.mjs
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";

// Angular
import angularPlugin from "@angular-eslint/eslint-plugin";
import angularTemplatePlugin from "@angular-eslint/eslint-plugin-template";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  {
    ignores: [
      "**/dist/**",
      "**/.turbo/**",
      "**/node_modules/**",
      "**/coverage/**",
    ],
  },

  // Base JS rules
  js.configs.recommended,

  // Base TS rules
  ...tseslint.configs.recommended,

  // ---------- NestJS ----------
  {
    files: ["apps/nestjs/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],
      "@typescript-eslint/require-await": "off",
      "prettier/prettier": "error",
    },
  },

  // ---------- Angular TS ----------
  {
    files: ["apps/angular/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@angular-eslint": angularPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      "@angular-eslint/component-class-suffix": [
        "error",
        { suffixes: ["Component"] },
      ],
      "@angular-eslint/directive-class-suffix": [
        "error",
        { suffixes: ["Directive"] },
      ],
      "@angular-eslint/no-host-metadata-property": "error",
      "@angular-eslint/prefer-standalone": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-empty-function": [
        "warn",
        { allow: ["private-constructors"] },
      ],
      "prettier/prettier": "error",
    },
  },

  // ---------- Angular Templates ----------
  {
    files: ["apps/angular/**/*.html"],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      "@angular-eslint/template": angularTemplatePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "@angular-eslint/template/no-negated-async": "error",
      "@angular-eslint/template/banana-in-box": "error",
      "@angular-eslint/template/no-inline-styles": "off",
      "prettier/prettier": "off",
    },
  },

  // ---------- Tests ----------
  {
    files: [
      "apps/nestjs/**/*.spec.ts",
      "apps/nestjs/**/*.test.ts",
      "apps/angular/**/*.spec.ts",
      "apps/angular/**/*.test.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
];

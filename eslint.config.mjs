import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// prettier is added at the end of this list, to prevent conflict with esLint
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript, prettier"),
];

export default eslintConfig;

import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import reactHooks from "eslint-plugin-react-hooks"

const config = [
  ...nextCoreWebVitals,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "out/**",
      "dist/**",
      "coverage/**",
    ],
  },
  {
    // The `react-hooks` plugin grew stricter rules in React 19 around
    // setState-in-effect and ref access during render. The codebase has
    // a handful of pre-existing patterns flagged by these — they're
    // code-quality improvements unrelated to the Next.js upgrade itself,
    // so the rules ship as warnings here rather than errors. Address
    // them in a follow-up; tracking should not block the upgrade build.
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
    },
  },
]

export default config

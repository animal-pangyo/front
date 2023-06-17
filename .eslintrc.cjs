module.exports = {
  env: { browser: true, es2020: true }, // 브라우저 환경에서 실행되며 ECMAScript 2020 표준을 사용합니다.
  extends: [
    'eslint:recommended', // ESLint에서 권장하는 기본 규칙을 사용합니다.
    'plugin:@typescript-eslint/recommended', // @typescript-eslint 플러그인의 권장 규칙을 사용합니다.
    'plugin:react-hooks/recommended', // React Hooks 관련 규칙을 사용합니다.
  ],
  parser: '@typescript-eslint/parser', // TypeScript 구문을 분석하는 파서를 사용합니다.
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }, // 최신 ECMAScript 버전 및 모듈 형식을 사용합니다.
  plugins: ['react-refresh'],  // react-refresh 플러그인을 사용합니다. 
  rules: {
    'react-refresh/only-export-components': 'warn',  // react-refresh에서 경고 수준으로 컴포넌트만 내보내도록 설정합니다.
  },
}

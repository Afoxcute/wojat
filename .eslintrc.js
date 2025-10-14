module.exports = {
  extends: [
    'next/core-web-vitals'
  ],
  rules: {
    // Disable some strict rules that might cause build issues
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'next/no-img-element': 'warn'
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  }
};

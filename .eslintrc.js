module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-promise-executor-return': 'off',
  },
};

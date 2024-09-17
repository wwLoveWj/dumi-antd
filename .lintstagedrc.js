module.exports = {
  // Run type-check for all code
  'src/**/*.ts?(x)': () => 'npm run lint:type',
  'src/**/*.(ts|js)?(x)': (filenames) =>
    `eslint --fix ${filenames.map((each) => '"' + each + '"').join(' ')}`,
  'src/**/*.(js|ts|jsx|tsx|css|less|json)': (filenames) =>
    `prettier --write ${filenames.map((each) => '"' + each + '"').join(' ')}`,
};

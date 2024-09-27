import { defineConfig } from 'father';
import path from 'path';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: {
    output: 'lib/esm',
    ignores: [
      'src/**/__demo__/**', // 避免打包demo文件到npm包里面
      'src/docs/**',
    ],
  },
  cjs: {
    output: 'lib/cjs',
    ignores: [
      'src/**/__demo__/**', // 避免打包demo文件到npm包里面
      'src/docs/**',
    ],
  },
  alias: {
    '@magical-components': './src',
    '@magical-components/hooks': path?.join(__dirname, './src/hooks'),
    '@magical-components/utils': path?.join(__dirname, './src/utils'),
  },
});

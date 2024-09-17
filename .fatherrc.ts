import { defineConfig } from 'father';
import path from 'path';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: {
    output: 'dist',
    ignores: [
      'src/**/__demo__/**', // 避免打包demo文件到npm包里面
    ],
  },
  alias: {
    '@dumi-umi-ww': './src',
    '@dumi-umi-ww/hooks': path?.join(__dirname, './src/hooks'),
    '@dumi-umi-ww/utils': path?.join(__dirname, './src/utils'),
  },
});

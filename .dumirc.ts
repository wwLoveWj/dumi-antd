import { defineConfig } from 'dumi';
import path from 'path';

const repo = 'dumi-antd';
export default defineConfig({
  title: repo,
  outputPath: 'docs',
  hash: true,
  alias: {
    '@dumi-umi-ww': path?.join(__dirname, 'src'),
    '@dumi-umi-ww/hooks': path?.join(__dirname, 'src/hooks'),
    '@dumi-umi-ww/utils': path?.join(__dirname, 'src/utils'),
  },
  themeConfig: {
    name: 'dumi-umi-ww',
    logo: 'https://avatars.githubusercontent.com/u/10192406?s=200&v=4',
    footer: 'MIT Licensed | Copyright © 2024-present dumi-umi-ww',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '设计', link: '/design' },
      { title: '快速上手', link: '/start' },
      { title: '组件', link: '/components' }, // components会默认自动对应到src文件夹
      { title: '更新记录', link: '/version/changelog' },
    ],
  },
  // github page
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  styles: [
    `.dumi-default-header-left {
      width: 220px !important;
   }`,
  ],
  resolve: {
    docDirs: ['src/docs', './CHANGELOG.md'],
    atomDirs: [{ type: 'component', dir: 'src/components' }],
  },
});

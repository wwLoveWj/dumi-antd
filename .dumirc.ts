import { defineConfig } from 'dumi';
import path from 'path';

const repo =
  process.env.NODE_ENV === 'production' ? 'dumi-antd' : 'magical-components';
export default defineConfig({
  favicons: ['/favicon.ico'],
  title: repo,
  outputPath: 'docs',
  hash: true,
  alias: {
    '@magical-components': path?.join(__dirname, 'src'),
    '@magical-components/hooks': path?.join(__dirname, 'src/hooks'),
    '@magical-components/utils': path?.join(__dirname, 'src/utils'),
  },
  themeConfig: {
    name: 'magical-components',
    // logo: 'https://avatars.githubusercontent.com/u/10192406?s=200&v=4',
    // logo: '/yyds.png',
    footer: 'MIT Licensed | Copyright © 2024-present magical-components',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '设计', link: '/design' },
      { title: '规范', link: '/standard' },
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
    `.dumi-vite-doc-layout{
      margin: 0 20px !important;}`,
    `.dumi-vite-header-content{
     margin: 0 20px !important;
    }`,
  ],
  resolve: {
    docDirs: ['src/docs', './CHANGELOG.md'],
    atomDirs: [
      { type: 'component', dir: 'src/components' },
      { type: 'component', dir: 'src/hooks' },
      { type: 'component', dir: 'src/design' },
      { type: 'component', dir: 'src/utils' },
    ],
  },
  plugins: ['umi-plugin-keep-alive'],
});

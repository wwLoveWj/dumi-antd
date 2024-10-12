import { defineConfig } from 'dumi';
import path from 'path';

const repo =
  process.env.NODE_ENV === 'production' ? 'dumi-antd' : 'magical-antd-ui';
export default defineConfig({
  favicons: ['/favicon.ico'],
  title: repo,
  outputPath: 'docs',
  hash: true,
  alias: {
    '@magical-antd-ui': path?.join(__dirname, 'src'),
    '@magical-antd-ui/hooks': path?.join(__dirname, 'src/hooks'),
    '@magical-antd-ui/utils': path?.join(__dirname, 'src/utils'),
  },
  themeConfig: {
    name: 'magical-antd-ui',
    // logo: 'https://avatars.githubusercontent.com/u/10192406?s=200&v=4',
    // logo: '/yyds.png',
    footer: 'MIT Licensed | Copyright © 2024-present magical-antd-ui',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '设计', link: '/design' },
      { title: '规范', link: '/standard' },
      { title: '快速上手', link: '/start' },
      { title: '组件', link: '/components' }, // components会默认自动对应到src文件夹
      { title: '更新记录', link: '/version/changelog' },
    ],
  },
  // theme: {
  //   '@ant-prefix': 'magical-antd-ui',
  // },
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
    `/* ---滚动条默认显示样式-- */
    ::-webkit-scrollbar {
      width: 9px;
      height: 9px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(157, 165, 183, 0.5);
      background-clip: padding-box;
      border-color: transparent;
      border-style: dashed;
      border-width: 2px;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: rgba(157, 165, 183, 0.8);
      background-clip: border-box;
    }
    /*---滚动框背景样式--*/
    ::-webkit-scrollbar-track-piece {
      background-color: #fff;
      -webkit-border-radius: 0;
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

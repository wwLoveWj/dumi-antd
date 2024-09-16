import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'dumi-umi-ww',
    nav: [
      { title: '介绍', link: '/guide' },
      { title: '设计', link: '/design' },
      { title: '快速上手', link: '/start' },
      { title: '组件', link: '/components' }, // components会默认自动对应到src文件夹
      { title: '更新记录', link: '/version/changelog' },
    ],
  },
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

// 通知发布notify
const notifier = require('node-notifier'); //在 Node.js 中发送跨平台通知的工具
// const msg = `${process.env.npm_package_name}@${process.env.npm_package_version} 发布成功`;
notifier.notify({
  title: '发布成功~',
  message: '项目发布成功了，哈哈哈~',
  sound: 'Submarine',
  closeLabel: 'CANCEL',
  actions: 'OK',
});

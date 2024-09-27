/**
 * 创建通知
 *
 * 此函数尝试在浏览器中创建一个桌面通知如果之前已经获得了用户的许可，
 * 则直接创建通知如果未获得许可，则请求许可一旦获得许可，再创建通知
 *
 * @param title 通知的标题
 * @param {Object} options - 通知的选项，包括正文、图标等
 * @param {string} options.body - 一个表示通知正文的字符串，显示在标题下方，默认值是一个空字符串。
 * @param {number} options.data - 任意你想要与通知关联的数据。它可以是任何可结构化克隆的数据类型。默认值为 null。
 * @param {number} options.dir - 显示通知的方向。它默认为 auto
 * @param {number} options.icon - 一个包含要在通知中显示的图标的 URL 的字符串
 * @param {number} options.image - 一个包含要在通知中显示的图像的 URL 的字符串。
 * @param {number} options.tag - 一个表示通知的识别标签的字符串，默认值是一个空字符串。
 * @param {number} options.timestamp -一个以毫秒为单位表示为 Unix 时间的时间戳，表示与通知相关的时间。当通知用于发送由于设备离线而无法立即发送的消息时，
 * 该时间戳可能是过去的时间，或者用于即将开始的会议的未来时间。
 * @param {number} options.renotify -指定在新通知替换旧通知后是否应通知用户。默认值为 false，
 * 这意味着用户不会收到通知。如果该值被指定为 true，那么必须同时设置 tag 参数。
 * @param {number} options.silent - 一个布尔值，指定通知是否静音（不发出声音或振动），无论设备设置如何。默认值 null 表示使用设备默认值。
 * 如果被设置为 true，那么不能同时存在 vibrate 参数。
 * @param {number} options.vibrate - 一个表示通知应振动的毫秒数数组。默认值为 null，表示不振动。当该值被指定时，silent 参数不得设置为 true。
 * @description API文档链接：https://developer.mozilla.org/zh-CN/docs/Web/API/Notifications_API/Using_the_Notifications_API
 */
export function createNotification(
  title: string,
  options: {
    body?: string;
    data?: any;
    dir?: 'auto' | 'ltr' | 'rtl';
    icon?: string;
    image?: string;
    lang?: string; //指定通知的语言
    renotify?: boolean;
    tag?: string;
    timestamp?: number;
    silent?: boolean;
  } = {},
) {
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notifications.');
    return;
  }
  // 检查是否已经获得了显示通知的权限
  /*
    default
    用户还未被询问是否授权，所以通知不会被显示。
    granted
    表示之前已经询问过用户，并且用户已经授予了显示通知的权限。
    denied
    用户已经明确地拒绝了显示通知的权限。*/
  if (Notification.permission === 'granted') {
    // 如果已经获得权限，直接创建通知
    new Notification(title, options);
    // } else if (Notification.permission === 'denied') {
  } else {
    // 如果没有获得权限，请求权限
    Notification.requestPermission()
      .then(function (permission) {
        // 如果用户授予了权限，创建通知
        if (permission === 'granted') {
          new Notification(title, options);
        }
      })
      .catch((error) => {
        // 如果请求权限失败，输出错误信息
        console.error('Failed to request notification permission:', error);
      });
  }
}

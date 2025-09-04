// 10.计算文本宽度
export function calcTextWidth(
  str: string = '',
  fontSize = '12px',
  removeNode = false,
) {
  let width = 0;
  if (str === '') {
    return width;
  }

  // 验证 fontSize
  const isValidFontSize = /^(\d+(\.\d+)?)(px|em|rem|%)$/i.test(fontSize);
  if (!isValidFontSize) {
    throw new Error('Invalid fontSize format');
  }

  let span = document.querySelector('.calc-text-width') as HTMLSpanElement;
  if (!span) {
    span = document.createElement('span');
    span.className = 'calc-text-width';
    span.style.cssText = `
        position: absolute;
        z-index: -1;
        left: 0;
        top: 0;
        opacity: 0;
        white-space: nowrap;
      `;
    document.querySelector('body')!.appendChild(span);
  }
  span.style.fontSize = fontSize;
  // 处理换行符
  const newStr = str.replace(/[\r\n]+/g, '');
  span.innerText = newStr;
  width = span.offsetWidth;

  // 如果包含字母数字内容宽度需要+1（兼容浏览器）
  if (/\w+/g.test(newStr)) {
    width += 1;
  }

  // 根据removeNode决定是否移除节点
  if (removeNode) {
    span.remove();
  }

  return width;
}

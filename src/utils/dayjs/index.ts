// src/formatTime/index.ts

/**
  格式化时间戳
  @param timestamp 时间戳，单位为毫秒
  @param format 时间格式，如YYYY-MM-DD hh:mm:ss
  @returns 返回格式化后的时间字符串
*/
export function formatTime(
  timestamp: number,
  format = 'YYYY-MM-DD hh:mm:ss',
): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const map: { [key: string]: string } = {
    YYYY: String(year),
    MM: month,
    DD: day,
    hh: hours,
    mm: minutes,
    ss: seconds,
  };
  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, (matched) => map[matched]);
}

// 只有一位数字时添加“0”
const checkTime = function (i: number) {
  let resukt = '';
  if (i < 10) {
    if (i < 0) {
      resukt = '00';
    } else {
      resukt = '0' + i;
    }
  } else {
    resukt = i.toString();
  }

  return resukt;
};
/**
 * 获取当前时间
 */
export const getCurrentTime = function () {
  let myDate = new Date();
  let year = myDate.getFullYear();
  let monthCur = myDate.getMonth() + 1;
  let dayCur = myDate.getDate();
  let hourCur = myDate.getHours();
  let minuteCur = myDate.getMinutes();
  let secondCur = myDate.getSeconds();

  let month = checkTime(monthCur).toString();
  let day = checkTime(dayCur).toString();
  let hour = checkTime(hourCur).toString();
  let minute = checkTime(minuteCur).toString();
  let second = checkTime(secondCur).toString();

  return (
    year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  );
};

const formatTime = (val: string) => {
  let date = new Date(Number(val) * 1000);
  let YY = date.getFullYear() + '-';
  let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD + " " + hh + mm + ss;
}

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  let k = 1024,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
}

const getCookie = (name: string) => {
  const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  const arr = document.cookie.match(reg);

  if (arr) {
    return (arr[2]);
  }
  return '';
}

const delCookie = () => {
  document.cookie = "sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export {
  formatTime,
  formatSize,
  delCookie,
  getCookie,
}
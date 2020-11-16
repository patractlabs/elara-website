const time = (vla) => {
  let date = new Date(Number(vla) * 1000);
  let YY = date.getFullYear() + '-';
  let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD + " " + hh + mm + ss;
}

const statusActive = (val) => {
  if (val === 'Active') {
    return "运行中"
  }
  return "暂停"
}

const getCookie = (name) =>
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return (arr[2]);
    else
        return null;
}

const delCookie = () => {
  document.cookie = "sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const  bytesToSize = (bytes) => {
  if (bytes === 0) return '0 B';
  let k = 1024,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
}

export {
  time,
  statusActive,
  delCookie,
  getCookie,
  bytesToSize
}
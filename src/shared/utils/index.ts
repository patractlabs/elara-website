const time = (val: string) => {
  let date = new Date(Number(val) * 1000);
  let YY = date.getFullYear() + '-';
  let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD + " " + hh + mm + ss;
}

const getCookie = (name: string) => {
  const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  const arr = document.cookie.match(reg);

  if (arr) {
    return (arr[2]);
  }
  return null;
}

const delCookie = () => {
  document.cookie = "sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const bytesToSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  let k = 1024,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
}


// 数组去重
const combineObjectInList = (arr: any[], item: string, list: any[]) => { //数组去除重复，item为重复判定项，list为重复记录需要累加的值的数组
  let obj: { [key: string]: any } = {};
  let a = [];
  for (let i in arr) {
    if (!obj[arr[i][item]]) {
      obj[arr[i][item]] = copyObj(arr[i]); //数组克隆
    } else if (!!obj[arr[i][item]]) {
      for (let j in list) {
        obj[arr[i][item]][list[j]] = obj[arr[i][item]][list[j]] + parseFloat(arr[i][list[j]]);
      }
    }
  }
  for (let k in obj) {
    a.push(obj[k]);
  }
  return a.sort(sortId);

}
const copyObj = (obj: any[]) => { //obj arr 对象的克隆（区分于指针赋值）
  if (obj.constructor === Array) {
    let a: any[] = [];
    for (let i in obj) {
      a.push(obj[i]);
    }
    return a;
  } else {
    let o: { [key: string]: any } = {}
    for (let i in obj) {
      o[i] = obj[i];
    }
    return o;
  }

}

const sortId = (a: any, b: any) => {
  return b.value - a.value
}


// var data={
//   '20201116':{
//       'method':{
//           'state_getKeysPaged': "59",
//           'chain_getBlock': "3"
//       }
//   },
//   '20201117':{
//       'method':{
//           'author_pendingExtrinsics': "15",
//           'chain_getBlock': "36"
//       }
//   }
// }

// let o={}
// for( day in data){
//   if( data[day].method){
//       for( m in data[day].method){
//           if(o[m]){
//               o[m]+=parseInt(data[day].method[m])
//           }
//           else{
//               o[m]=parseInt(data[day].method[m])
//           }
//       }
//   }
// }

// console.log(o)

export {
  time,
  delCookie,
  getCookie,
  bytesToSize,
  combineObjectInList
}
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

const getCookie = (name) => {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if (arr = document.cookie.match(reg))

    return (arr[2]);
  else
    return null;
}

const delCookie = () => {
  document.cookie = "sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const bytesToSize = (bytes) => {
  if (bytes === 0) return '0 B';
  let k = 1024,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
}


// 数组去重
let combineObjectInList = (arr, item, list) => { //数组去除重复，item为重复判定项，list为重复记录需要累加的值的数组
  let obj = {};
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
  return a;

}
let copyObj = function (obj) { //obj arr 对象的克隆（区分于指针赋值）
  if (obj.constructor == Array) {
    let a = [];
    for (let i in obj) {
      a.push(obj[i]);
    }
    return a;
  } else {
    let o = {}
    for (let i in obj) {
      o[i] = obj[i];
    }
    return o;
  }

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
  statusActive,
  delCookie,
  getCookie,
  bytesToSize,
  combineObjectInList
}
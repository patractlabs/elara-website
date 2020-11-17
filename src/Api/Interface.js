import {httpPost,httpGet} from './http'
import {URL_ACCOUNT,URL_STAT} from '@/Config/origin'


/**
 * 获取首页列表
 */
const getArticleList=()=>{
  return new Promise((resolve, reject) => {
    // httpGet(baseURL_STAT+'/stat/chasin').then(res => {
    //   resolve (res);
    // },err => {
    //   console.log("网络异常~",err);
    //   reject(err)
    // })
    httpGet(URL_ACCOUNT+'/stat/chain', {})
      .then(res => {
        resolve (res);
      })
      .catch(err => {
        reject(err)
      })
  }) 
}

/**
 * 登陆
 */
const login=()=>{
  return new Promise((resolve, reject) => {
    httpGet(URL_ACCOUNT+'/auth/login', {})
      .then(res => {
        resolve (res);
      })
      .catch(err => {
        reject(err)
      })
  }) 
}

/**
 * 控制台获取数据
 */
const projects=()=>{
  return new Promise((resolve, reject) => {
    httpGet(URL_ACCOUNT+'/project/list', {})
      .then(res => {
        resolve (res);
      })
      .catch(err => {
        reject(err)
      })
  }) 
}

/**
 * 新建数据
 */
const project =(data)=> {
  return new Promise((resolve, reject) => {
    httpPost(URL_ACCOUNT + '/project/create', data)
      .then(res => {
        resolve (res);
      })
      .catch(err => {
        reject(err)
      })
  }) 
}

/**
 * 控制台详情七天数据
 */
const weekDetails =(id)=>{
  return new Promise((resolve, reject) => {
    httpGet('/easydoc' +'/p/88409737/INA1Adqh')
      .then(res => {
        resolve (res);
      })
      .catch(err => {
        reject(err)
      })
  }) 
}

/**
 * 控制台项目详情
 */
const projectDetails =(id)=>{
  return new Promise((resolve, reject) => {
    httpGet('/easydoc' +'/p/88409737/xKEzQCsU')
      .then(res => {
        resolve (res);
      })
      .catch(err => {
        reject(err)
      })
  }) 
}

/**
 * 控制台详情项目当天统计数据
 */
const projectDayDetails =(id)=>{
  return new Promise((resolve, reject) => {
    httpGet('/easydoc' +'/p/88409737/ZEMb7CVj')
      .then(res => {
        resolve (res);
      })
      .catch(err => {
        reject(err)
      })
  }) 
}

/**
 * 退出登陆
 */
const logout =()=>{
  return new Promise((resolve, reject) => {
    httpGet(URL_ACCOUNT + '/auth/logout')
      .then(res => {
        resolve (res);
      })
      .catch(err => {
        reject(err)
      })
  }) 
}


export {
  getArticleList,
  login,
  projects,
  project,
  weekDetails,
  projectDetails,
  projectDayDetails,
  logout
}

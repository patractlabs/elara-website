import axios from 'axios'
// import { Modal } from 'antd'

// const baseURL =
//     process.env.NODE_ENV === 'development' ? 'http://3.15.85.91:18066' : 'https://pro-live.wink.org'

// 创建axios实例
const service = axios.create({
  // baseURL,
  timeout: 15000,
  withCredentials: true,
})

service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    console.log('请求错误拦截：', err)
    Promise.reject(err)
  },
)
service.interceptors.response.use(
  response => {
    return Promise.resolve(response.data)
  },
  err => {
    console.log('响应错误拦截：', err)
    Promise.reject(err)
  },
)

export function httpGet(url, params = {}) {
  return service({
    method: 'get',
    url,
    params,
  })
}

export function httpPost(url, data = {}, headers = {}) {
  return service({
    method: 'post',
    url,
    data,
    headers,
  })
}

export function httpPut(url, data = {}, headers = {}) {
  return service({
    method: 'put',
    url,
    data,
    headers,
  })
}

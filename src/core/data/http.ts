import { Res } from './../types/dto/response';
import axios, { AxiosResponse } from 'axios'
import i18n from '../../i18n';
import { APIError, APIErrorType } from '../types/classes/error';

// import { Modal } from 'antd'

// const baseURL =
//     process.env.NODE_ENV === 'development' ? 'http://3.15.85.91:18066' : 'https://pro-live.wink.org'

// 创建axios实例
const service = axios.create({
  // baseURL,
  timeout: 15000,
  withCredentials: false,
})

service.interceptors.request.use(
  config => config,
  err => {
    console.log('请求错误拦截：', err)
    const apiErr: APIError = {
      type: APIErrorType.original,
      err: err,
      msg: i18n.t('tip.fail'),
    };
    return Promise.reject(apiErr);
  },
)
service.interceptors.response.use(
  (response: AxiosResponse<Res<any>>) => {
    if (response.data && response.data.code === 0) {
      return Promise.resolve(response.data.data);
    }
    const err: APIError = {
      type: APIErrorType.business,
      err: null,
      msg: response.data.message,
    };
    return Promise.reject(err);
  },
  err => {
    console.log('响应错误拦截：', err)
    const apiError = {
      type: APIErrorType.original,
      err,
      msg: i18n.t('tip.fail'),
    };
    return Promise.reject(apiError);
  },
)

export function httpGet<T>(
  url: string,
  params: any = {},
) {
  return service.get(
    url,
    params,
  ) as Promise<T>;
}

export function httpPost<T>(
  url: string,
  data: any = {},
  headers: any = {},
) {
  return service.post(
    url,
    data,
    { headers },
  ) as Promise<T>;
}

export function httpPut<T>(
  url: string,
  data: any = {},
  headers: any = {},
) {
  return service.put(
    url,
    data,
    { headers },
  ) as Promise<T>;
}

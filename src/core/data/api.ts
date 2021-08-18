import { User } from './../types/classes/user'
import { ProjectCreatDto } from './../types/dto/project-create'
import {
  Project,
  RangeChartData,
  InvalidTableDataExt,
  CallMethodsDataExt,
} from '../types/classes/project'
import { Menu } from '../types/classes/chain'
import { httpPost, httpGet } from './http'
import { API_DOMAIN } from '../../config/origin'
import {
  StatT,
} from '../types/classes/stat'
import axios from 'axios'

/**
 * 登陆
 */
export const apiLogin = async (): Promise<User> => {
  const res = await httpGet<{
    projectNum: number
    user: {
      id: string
      name: string
      status: string
      level: string
      limit: { projectNum: number }
    }
  }>(`${API_DOMAIN}/auth/login`)

  return {
    id: res.user.id,
    name: res.user.name,
    level: res.user.level,
    maxProjectNum: res.user.limit.projectNum,
    projectNum: res.projectNum,
  }
}

/**
 * logout'
 */
export const apiLogout = async () =>
  await httpGet<undefined>(`${API_DOMAIN}/auth/logout`)

/**
 * create project
 */
export const apiCreateProject = async (data: ProjectCreatDto) =>
  await httpPost<Project>(`${API_DOMAIN}/project/create`, data)

/**
 * project delete 
 */
export const apiDelProject = async (data: {
  id: string
}) => await httpPost<unknown>(`${API_DOMAIN}/project/delete`, data)

/**
 * total requests on homepage
 */
export const apiGetTotalStatics = async () =>
  await httpGet<{ bindwidth: number; request: number }>(
    `${API_DOMAIN}/public/stat`
  )

/**
 * requests by recent 30 days 
 */
export const apiGetLast30DaysRequests = async () =>
  await httpPost<{ stats: { request: number; bandwidth: number }[]; timeline: string[] }>(
    `${API_DOMAIN}/public/days`,
    { days: 30 }
  )

/**
 * 控制台菜单数据
 */
export const apiFetchMenuList = async (id: string) =>
  await httpPost<Menu>(`${API_DOMAIN}/chain/list`, { userId: id })

/**
 * 用户数据概览 dashboard card
 */
export const apiGetUserDailyStatics = async (id: string) =>
  await httpPost<StatT>(`${API_DOMAIN}/user/detail/statistic`, { userId: id })

/**
 * 控制台用户project table数据
 */
export const apiFetchProjectList = async (
  id: string,
  chain?: string
): Promise<Project[]> => {
  let res = await httpPost<any[]>(`${API_DOMAIN}/project/list`, {
    userId: id,
    chain,
  })
  res = res.map((item) => ({ ...item, ...item.stat }))
  return res
}

/**
 * project特定小时内的数据统计
 */
export const apiFetchProjectStaticsOfRange = async (
  data: {
    chain: string
    pid: string
    hours?: number
    days?: number
  },
  types: string
) => await httpPost<RangeChartData>(`${API_DOMAIN}/stat/project/${types}`, data)

/**
 * project methods statics
 */
export const apiFetchProjectMethodsStatics = async (data: {
  pid: string
  chain: string
}) =>
  await httpPost<CallMethodsDataExt>(`${API_DOMAIN}/stat/project/rank`, data)

/**
 * project无效请求表格数据
 */
export const apiFetchProjectErrorStatics = async (data: {
  size: number
  page: number
  chain: string
  pid: string
}) =>
  await httpPost<InvalidTableDataExt>(`${API_DOMAIN}/stat/project/error`, data)

/**
 * project name 更新
 */
export const apiUpdateProjectName = async (data: {
  userId: string
  chain: string
  id: string
  name: string
}) => await httpPost<unknown>(`${API_DOMAIN}/project/update/name`, data)

/**
 * project limit 更新
 */
export const apiUpdateProjectLimit = async (data: {
  id: string
  reqSecLimit: number
  reqDayLimit: number
}) => await httpPost<unknown>(`${API_DOMAIN}/project/update/limit`, data)

/**
 * 订阅邮箱
 */
export const apiSubscribe = async ({
  email,
  emailType = 'subscribe',
}: {
  email: string
  emailType?: string
}) => {
  const service = axios.create({
    timeout: 15000,
    withCredentials: false,
  })
  await service.post<void>(
    'https://blog.patract.io/members/api/send-magic-link/',
    { email, emailType }
  )
}

import { ProjectStatus, RequestType } from '../../enum'
// import {StatT} from './stat'

export class Project {
  name: string
  createdAt: string
  team: string
  chain: string
  status: keyof typeof ProjectStatus
  id: string
  pid: string
  secret: string
  reqCnt: number
  bw: number
  delay: number
  inReqCnt: number
  reqSecLimit: number
  reqDayLimit: number
  bwDayLimit: number
}
export interface RangeChartData {
  timeline: string[]
  stats: { request: number; bandwidth: number }[]
}
export interface InvalidTableData {
  proto: string
  method: string
  code: number
  delay: number
  time: string
}

export interface InvalidTableDataExt {
  total: number
  size: number
  page: number
  pages: number
  list: InvalidTableData[]
}

export interface CountryData {
  country: string
  request: string
  percentage: string
}

export interface CountryTableDataExt {
  total: number
  size: number
  page: number
  pages: number
  list: CountryData[]
}

export interface CallMethodsData {
  total: number
  list: { method: string; value: number }[]
}

export type CallMethodsDataExt = Record<
  keyof typeof RequestType,
  CallMethodsData
>

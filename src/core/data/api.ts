import { User } from './../types/classes/user';
import { ProjectCreatDto } from './../types/dto/project-create';
import { Project } from '../types/classes/project';
import { httpPost, httpGet } from './http'
import { URL_ACCOUNT } from '../../config/origin';
import { ChainStats, StatDay, StatMonth, StatWeek } from '../types/classes/stat';

/**
 * 登陆
 */
export const apiLogin =
  async () => await httpGet<User>(`${URL_ACCOUNT}/auth/login`);

/**
 * 退出登录
 */
export const apiLogout =
  async () => await httpGet<undefined>(`${URL_ACCOUNT}/auth/logout`);

/**
 * 新建数据
 */
export const apiCreateProject =
  async (data: ProjectCreatDto) => await httpPost<Project>(`${URL_ACCOUNT}/project/create`, data);

/**
 * 控制台获取数据
 */
export const apiGetProjectList =
  async () => await httpGet<Project[]>(`${URL_ACCOUNT}/project/list`);

/**
 * 控制台项目详情
 */
export const apiGetProjectDetail =
  async (id: string) => await httpGet<Project>(`${URL_ACCOUNT}/project/${id}`);

/**
 * 获取首页列表
 */
export const apiGetChainStats =
  async () => await httpGet<ChainStats>(`${URL_ACCOUNT}/stat/chain`);

/**
 * 控制台详情七天数据
 */
export const apiGetWeekDetails =
  async (id: string) => await httpGet<StatWeek>(`${URL_ACCOUNT}/stat/week/${id}`);


/**
 * 控制台详情30天数据
 */
export const apiGetMonthDetails =
  async (id: string) => await httpGet<StatMonth>(`${URL_ACCOUNT}/stat/month/${id}`);

/**
 * 控制台详情项目当天统计数据
 */
export const apiGetDayDetail =
  async (id: string) => await httpGet<StatDay>(`${URL_ACCOUNT}/stat/day/${id}`);


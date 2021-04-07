import { User } from './../types/classes/user';
import { ProjectCreatDto } from './../types/dto/project-create';
import { Project } from '../types/classes/project';
import { httpPost, httpGet } from './http'
import { API_DOMAIN } from '../../config/origin';
import { ChainStats, StatDay, StatMonth, StatWeek } from '../types/classes/stat';
import axios from 'axios';

/**
 * 登陆
 */
export const apiLogin =
  async () => await httpGet<User>(`${API_DOMAIN}/auth/login`);

/**
 * 退出登录
 */
export const apiLogout =
  async () => await httpGet<undefined>(`${API_DOMAIN}/auth/logout`);

/**
 * 新建数据
 */
export const apiCreateProject =
  async (data: ProjectCreatDto) => await httpPost<Project>(`${API_DOMAIN}/project/create`, data);

/**
 * 控制台获取数据
 */
export const apiGetProjectList =
  async () => await httpGet<Project[]>(`${API_DOMAIN}/project/list`);

/**
 * 控制台项目详情
 */
export const apiGetProjectDetail =
  async (id: string) => await httpGet<Project>(`${API_DOMAIN}/project/${id}`);

/**
 * 获取首页列表
 */
export const apiGetChainStats =
  async () => await httpGet<ChainStats>(`${API_DOMAIN}/stat/chain`);

/**
 * 控制台详情七天数据
 */
export const apiGetWeekDetails =
  async (id: string) => await httpGet<StatWeek>(`${API_DOMAIN}/stat/week/${id}`);


/**
 * 控制台详情30天数据
 */
export const apiGetMonthDetails =
  async (id: string) => await httpGet<StatMonth>(`${API_DOMAIN}/stat/month/${id}`);

/**
 * 控制台详情项目当天统计数据
 */
export const apiGetDayDetail =
  async (id: string) => await httpGet<StatDay>(`${API_DOMAIN}/stat/day/${id}`);


/**
 * 订阅邮箱
 */
export const apiSubscribe =
  async ({
    email,
    emailType = 'subscribe',
  }: {
    email: string;
    emailType?: string;
  }) => {
    const service = axios.create({
      timeout: 15000,
      withCredentials: false,
    })
    await service.post<void>('https://blog.patract.io/members/api/send-magic-link/', { email, emailType });
  }

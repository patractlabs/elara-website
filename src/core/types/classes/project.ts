import { ProjectStatus } from '../../enum';

export class Project {
  id: string;
  status: ProjectStatus;
  chain: string;
  name: string;
  uid: string;
  secret: string;
  createtime: string;
  lasttime: string;
  allowlist: string;
}
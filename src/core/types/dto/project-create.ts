export class ProjectCreatDto {
  userId: string
  chain: string
  name: string
  team: string
  reqSecLimit?: number
  reqDayLimit?: number
  bwDayLimit?: number
}

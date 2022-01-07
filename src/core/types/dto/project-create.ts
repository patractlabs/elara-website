export class ProjectCreatDto {
  userId: number
  chain: string
  name: string
  team: string
  reqSecLimit?: number
  reqDayLimit?: number
  bwDayLimit?: number
}

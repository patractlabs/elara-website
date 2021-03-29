import { StatDay } from './stat';

export class StatWeek {
  [ key: string ]: StatDay;
}

export class StatMonth extends StatWeek {}
export interface Res<T> {
  code?: number;
  msg: string;
  data: T;
}
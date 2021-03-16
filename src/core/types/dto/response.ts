export interface Res<T> {
  code?: number;
  message: string;
  data: T;
}
export enum APIErrorType {
  business = 'business',
  original = 'original',
}

export class APIError {
  type: APIErrorType;
  err: any;
  msg: string;
}
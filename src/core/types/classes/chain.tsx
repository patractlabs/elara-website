
export interface Chain {
  name: string;
  title: string;
  img: any;
  count: number;
  networkType?: 'live' | 'test' | 'kusamaPara';
}
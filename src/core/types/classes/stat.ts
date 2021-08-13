export class ChainStats {
  [ key: string ]: string;
}

export class StatDay {
  request: string;
  updatetime: string;
  method: {
    [ key: string ]: string;
  };
  bandwidth: string;
  code: {
    [ key: string ]: string;
  };
  agent: {
    [ key: string ]: string;
  };
  origin: {
    [ key: string ]: string;
  };
  timeout: string;
  delay: string;
}

export class StatWeek {
  [ key: string ]: StatDay;
}

export interface StatT {
  // bandwidth: number
  // request: number
  bw: number
  delay: number
  inReqCnt: number
  reqCnt: number
}


export class StatMonth extends StatWeek {}
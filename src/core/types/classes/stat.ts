export class ChainStats {
  [ key: string ]: string;
}

export class StatDay {
  request: number;
  updatetime: number;
  method: {
    [ key: string ]: number;
  };
  bandwidth: number;
  code: {
    [ key: string ]: string;
  };
  agent: {
    [ key: string ]: string;
  };
  origin: {
    [ key: string ]: string;
  };
  timeout: number;
  delay: number;
}

export class StatWeek {
  [ key: string ]: StatDay;
}

export class StatMonth extends StatWeek {}
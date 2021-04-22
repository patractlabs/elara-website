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

export class StatMonth extends StatWeek {}
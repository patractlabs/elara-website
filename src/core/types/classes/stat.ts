export class ChainStats {
  [ key: string ]: string;
  // polkadot: string;
  // kusama: string;
  // jupiter: string;
  // rococo: string;
  // darwinia: string;
  // dock: string;
  // edgeware: string;
  // kulupu: string;
  // nodle: string;
  // plasm: string;
  // stafi: string;
  // mandala: string;
  // chainx: string;
}

export class StatDay {
  request: number;
  updatetime: number;
  method: {
    [ key: string ]: string;
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
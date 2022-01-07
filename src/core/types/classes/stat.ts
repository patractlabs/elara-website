export interface StatT {
  // bandwidth: number
  // request: number
  bw: number
  delay: number
  inReqCnt: number
  reqCnt: number
}

export interface LimitData {
  projectNum: number
  bwDayLimit: number
}

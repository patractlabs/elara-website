// const URL_ACCOUNT =
//   process.env.NODE_ENV === 'development' ? '/accountApi' : 'https://pro-live.wink.org'

//   // http://8.210.110.126:7002
// const URL_STAT =
//   process.env.NODE_ENV === 'development' ? '/statApi' : 'https://pro-live.wink.org'

let URL_ACCOUNT = ''
let URL_STAT = ''

if (process.env.NODE_ENV === 'development') {
  URL_ACCOUNT = '/accountApi'
  URL_STAT = '/statApi'
} else if (process.env.NODE_ENV === 'test') {
  URL_ACCOUNT = 'http://8.210.110.126:7001'
  URL_STAT = 'http://8.210.110.126:7002'
} else if (process.env.NODE_ENV === 'production') {
  URL_ACCOUNT = 'https://elara.patract.io'
  URL_STAT = 'https://elara.patract.io'
}


export {
  URL_ACCOUNT,
  URL_STAT
}
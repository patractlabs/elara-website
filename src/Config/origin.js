const URL_ACCOUNT =
  process.env.NODE_ENV === 'development' ? '/accountApi' : 'https://pro-live.wink.org'
    
  // http://8.210.110.126:7002
const URL_STAT =
  process.env.NODE_ENV === 'development' ? '/statApi' : 'https://pro-live.wink.org'

export {
  URL_ACCOUNT,
  URL_STAT
  }
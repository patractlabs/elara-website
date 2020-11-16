let URL_ACCOUNT = ''
let URL_STAT = ''

if (process.env.NODE_ENV === 'development') {
  URL_ACCOUNT = '/accountApi'
} else if (process.env.NODE_ENV === 'test') {
  URL_ACCOUNT = 'https://test-elara.patract.io'
} else if (process.env.NODE_ENV === 'production') {
  URL_ACCOUNT = 'https://elara.patract.io'
  // URL_STAT = 'https://elara.patract.io'
}

export {
  URL_ACCOUNT,
  URL_STAT
}



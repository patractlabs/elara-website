let URL_ACCOUNT = ''
let URL_STAT = ''

let ENDPOINTS_URL = ''
let WSS_ENDPOINTS_URL = ''

if (process.env.NODE_ENV === 'development') {
  URL_ACCOUNT = '/accountApi'

  ENDPOINTS_URL = "https://test-elara.patract.io"
  WSS_ENDPOINTS_URL = "wss://test-elara.patract.io"
} else if (process.env.NODE_ENV === 'test') {
  URL_ACCOUNT = 'https://test-elara.patract.io'

  ENDPOINTS_URL = "https://test-elara.patract.io"
  WSS_ENDPOINTS_URL = "wss://test-elara.patract.io"
} else if (process.env.NODE_ENV === 'production') {
  URL_ACCOUNT = 'https://elara.patract.io'

  ENDPOINTS_URL = "https://elara.patract.io"
  WSS_ENDPOINTS_URL = "wss://elara.patract.io"
}

export {
  URL_ACCOUNT,
  URL_STAT,
  ENDPOINTS_URL,
  WSS_ENDPOINTS_URL
}
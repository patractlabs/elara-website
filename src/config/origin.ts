let API_DOMAIN = '';
let ENDPOINTS_URL = '';
let WSS_ENDPOINTS_URL = '';
console.log('process.env.REACT_APP_NODE_ENV', process.env.REACT_APP_NODE_ENV);
if (process.env.REACT_APP_NODE_ENV === 'development') {
  API_DOMAIN = '/accountApi/api';
  // API_DOMAIN = 'https://elara.patract.io';

  ENDPOINTS_URL = "https://api.elara.patract.io";
  WSS_ENDPOINTS_URL = "wss://api.elara.patract.io";
} else if (process.env.REACT_APP_NODE_ENV === 'pre-production') {
  API_DOMAIN = 'https://test-elara2.patract.cn/api'

  ENDPOINTS_URL = 'https://test-service.elara2.patract.cn'
  WSS_ENDPOINTS_URL = 'wss://test-service.elara2.patract.cn'
} else if (process.env.REACT_APP_NODE_ENV === 'production') {
  API_DOMAIN = 'https://elara.patract.io/api'

  ENDPOINTS_URL = 'https://service.elara.patract.io'
  WSS_ENDPOINTS_URL = 'wss://service.elara.patract.io'
}

export {
  API_DOMAIN,
  ENDPOINTS_URL,
  WSS_ENDPOINTS_URL
}
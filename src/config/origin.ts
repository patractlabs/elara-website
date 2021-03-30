let LOGIN_DOMAIN = ''
let API_DOMAIN = '';
let ENDPOINTS_URL = '';
let WSS_ENDPOINTS_URL = '';
console.log('process.env.REACT_APP_NODE_ENV', process.env.REACT_APP_NODE_ENV);
if (process.env.REACT_APP_NODE_ENV === 'development') {
  LOGIN_DOMAIN = '/accountApi';
  API_DOMAIN = '/accountApi';

  ENDPOINTS_URL = "https://test-api.elara.patract.io";
  WSS_ENDPOINTS_URL = "wss://test-api.elara.patract.io";
} else if (process.env.REACT_APP_NODE_ENV === 'pre-production') {
  LOGIN_DOMAIN = 'https://test-elara.patract.io';
  // LOGIN_DOMAIN = 'https://elara-website-git-xyl-dev-patract.vercel.app';
  API_DOMAIN = 'https://test-elara.patract.io';

  ENDPOINTS_URL = "https://test-api.elara.patract.io";
  WSS_ENDPOINTS_URL = "wss://test-api.elara.patract.io";
} else if (process.env.REACT_APP_NODE_ENV === 'production') {
  LOGIN_DOMAIN = 'https://elara.patract.io';
  API_DOMAIN = 'https://elara.patract.io';

  ENDPOINTS_URL = "https://api.elara.patract.io";
  WSS_ENDPOINTS_URL = "wss://api.elara.patract.io";
}

export {
  LOGIN_DOMAIN,
  API_DOMAIN,
  ENDPOINTS_URL,
  WSS_ENDPOINTS_URL
}
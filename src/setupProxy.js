const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(
    '/accountApi',
    proxy.createProxyMiddleware({
      target: 'https://elara.patract.io',
      changeOrigin: true,
      pathRewrite: {
        '^/accountApi': ''
      }
    })
  );
};
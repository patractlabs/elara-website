const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(
    '/statApi',
    proxy.createProxyMiddleware({
      target: 'http://8.210.110.126:7002',
      changeOrigin: true,
      pathRewrite: {
        '^/statApi': ''
      }
    })
  );

  app.use(
    '/accountApi',
    proxy.createProxyMiddleware({
      target: 'http://8.210.110.126:7001',
      changeOrigin: true,
      pathRewrite: {
        '^/accountApi': ''
      }
    })
  );
};
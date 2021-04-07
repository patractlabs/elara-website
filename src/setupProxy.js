const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(
    '/accountApi',
    proxy.createProxyMiddleware({
      target: 'https://test-elara.patract.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/accountApi': ''
      }
    })
  );

  // app.use(
  //   '/easydoc',
  //   proxy.createProxyMiddleware({
  //     target: 'https://easydoc.xyz/mock/jQBwURUE',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/easydoc': ''
  //     }
  //   })
  // );
};
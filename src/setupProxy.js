const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    '/accountApi',
    proxy.createProxyMiddleware({
      // target: "https://elara.patract.io",
      // target: 'http://120.26.70.42:7000',
      target:'http://47.111.179.222:7000',
      changeOrigin: true,
      pathRewrite: {
        '^/accountApi': '',
      },
    })
  )
};

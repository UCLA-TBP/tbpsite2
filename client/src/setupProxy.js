// development only proxies
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8000',
      // target: 'https://tbpsite.onrender.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '/' },
    })
  );
};

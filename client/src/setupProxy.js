const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};

// module.exports = function(app){
//   app.use(
//     '/socket',
//     createProxyMiddleware({
//       target: 'http://localhost:5555',
//       changeOrigin: true,
//     })
//   );
// };
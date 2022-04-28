const { createProxyMiddleware } = require('http-proxy-middleware');

//배포환경
const URL = process.env.NODE_ENV ? 'http://3.36.133.116:5000' : 'http://localhost:5000';

// 로컬환경
// const URL = "http://localhost:5000"

module.exports = function(app) {

  app.use(
    '/api',
    createProxyMiddleware({
      target: URL,
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
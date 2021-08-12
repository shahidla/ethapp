const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/ml*", { target: "http://mlservice:3050","changeOrigin": true }));
  app.use(proxy("/ml/file", { target: "http://mlservice:3050","changeOrigin": true }));
};

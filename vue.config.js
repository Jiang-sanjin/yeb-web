/**
 * vue代理  解决跨域问题 访问后台
 */

 //新建代理对象
 let proxyObj = {}

  proxyObj['/'] = {
    //WebSocket是双向的，在客户端-服务器通信的场景中使用的全双工协议
    ws: false,
    //目标地址
      target: 'http://localhost:8081',
    //发送请求头中host会设置成target
      changeOrigin: true,
    //不重写请求地址
      pathRewrite: {
        '^/': '/'
      }
  }
 

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}

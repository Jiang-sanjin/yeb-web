/**
 *  下载工具类
 */

import axios from 'axios'

const service = axios.create({
  responseType: 'arraybuffer'
})
// 请求拦截器
service.interceptors.request.use(config => {
  config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
  return config
}, error => {
  console.log(error)
});
// 响应拦截器
service.interceptors.response.use(
  resp => {
    // 获取相应头部信息
    const headers = resp.headers;
    let reg = RegExp(/application\/json/);
    if (headers['content-type'].match(reg)) {
      resp.data = uintToString(resp.data);
    } else {
      let fileDownload = require('js-file-download');
      let fileName = headers["content-disposition"].split(";")
        [1].split("filename=")[1];
      let contentType = headers["content-type"];
      fileName = decodeURIComponent(fileName);
      fileDownload(resp.data, fileName, contentType)
    }
  },error => {
    console.log(error);
    
  }
);
let base = '';
export const downloadRequest = (url, params) => {
  return service({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}
function uintToString(uintArray) {
  // json格式转换
  let encodedString = String.fromCharCode.apply(null, new
    Uint8Array(uintArray)),
    decodedString = decodeURIComponent(escape(encodedString));
  return JSON.parse(decodedString);
}
export default service

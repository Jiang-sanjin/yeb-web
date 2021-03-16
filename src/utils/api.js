/**
 * 配置全局的拦截器
 */

import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router'



// 请求拦截器
axios.interceptors.request.use(config => {
  if (window.sessionStorage.getItem('tokenStr')) {
    //请求携带自定义token
    config.headers['Authorization'] =
      window.sessionStorage.getItem('tokenStr');
  }
  return config
}, error => {
  console.log(error);
})




// 响应拦截器
// 调用接口成功会获得响应码200    但是后端返回数据响应可能为业务逻辑错误需要判断
//接口访问成功，服务器内部出错
axios.interceptors.response.use(success => {

  //业务逻辑错误
  if (success.status && success.status == 200) {
    // 所有的失败信息
    if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
      Message.error({ message: success.data.message });
      return;
    }
    //成功信息
    if (success.data.message) {
      Message.success({ message: success.data.message });
    }
  }
  return success.data;


}, error => {
  //接口都无法访问
  if (error.response.code == 504 || error.response.code == 404) {
    Message.error({ message: '服务器被吃了o(╯□╰)o' });
  } else if (error.response.code == 403) {
    Message.error({ message: '权限不足，请联系管理员！' });
  } else if (error.response.code == 401) {
    Message.error({ message: '尚未登录，请登录' });
    router.replace('/');
  } else {
    //判断响应是否有信息
    if (error.response.data.message) {
      Message.error({ message: error.response.data.message });
    } else {
      Message.error({ message: '未知错误！' });
    }
  }
  return;

})



// 传送json格式的post请求

let base = ''; //用于添加请求的前置路径  用于区分

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })

  
}

//传递json的put请求
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
}
//传递json的get请求
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}
//传递json的delete请求
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    data: params
  })
}
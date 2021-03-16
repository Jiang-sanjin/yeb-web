import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

Vue.use(ElementUI,{size:'samll'});

import { postRequest } from "./utils/api";
import { putRequest } from "./utils/api";
import { getRequest } from "./utils/api";
import { deleteRequest } from "./utils/api";
import { initMenu } from './utils/menus'
import { downloadRequest} from './utils/download'

//插件形式使用请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.downloadRequest = downloadRequest;

//路由守卫   类似拦截器   禁止未登录访问
router.beforeEach((to, from, next) => {
  if (window.sessionStorage.getItem("tokenStr")) {
    //获取菜单信息  待用menus.js
    initMenu(router, store);
    if (!window.sessionStorage.getItem("user")) {
      return getRequest('/admin/info').then(resp => {
        if (resp) {
          // alert(resp);
          //存入用户信息
          window.sessionStorage.setItem("user", JSON.stringify(resp));
          store.commit('INIT_CURRENTAdmin',resp);
          next();
        }
      });
    }
    next();
  } else {
    if (to.path == '/') {
      next();
    } else {
      next('/?redirect=' + to.path);
    }
  }


})
// to:将要访问的路径
// from:从哪里访问的路径，将要离开的路径
// next:之后要做的任务，是一个函数
// next（）放行， next（’/URL’）强制跳转的路径。

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

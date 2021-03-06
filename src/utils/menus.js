/**
 * 封装菜单请求
 */

import {getRequest} from "./api";

//初始化菜单
export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {   //判断vuex是否有数据
    return;
  }
  getRequest("/system/cfg/menu").then(data => {
    if (data) {
      //格式化router
      let fmtRoutes = formatRoutes(data);
      //添加到router
      router.addRoutes(fmtRoutes);
      //将数据存入vuex   initRoutes
      store.commit('initRoutes', fmtRoutes);
      //连接websocket
      store.dispatch('connect');
    }
  })
}

//存放菜单数据
export const formatRoutes = (routes) => {
  let fmRoutes = [];

  // 设置routers
  routes.forEach(router => {
    let {
      path,
      component,  //组件名称
      name,
      meta,
      iconCls,
      children,
    } = router;
    if (children && children instanceof Array) {   //instanceof Array 属于数组
//递归
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      name: name,
      meta: meta,
      iconCls: iconCls,
      children: children,
      component(resolve) {
        //判断组件根据相应目录查找
        if (component.startsWith("Home")) {
          require(['../views/' + component + '.vue'], resolve);
        } else if (component.startsWith("Emp")) {
          require(['../views/emp/' + component + '.vue'], resolve);
        } else if (component.startsWith("Per")) {
          require(['../views/per/' + component + '.vue'], resolve);
        } else if (component.startsWith("Sal")) {
          require(['../views/sal/' + component + '.vue'], resolve);
        } else if (component.startsWith("Sta")) {
          require(['../views/sta/' + component + '.vue'], resolve);
        } else if (component.startsWith("Sys")) {
          require(['../views/sys/' + component + '.vue'], resolve);
        }
      }
    }
    //存放
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}

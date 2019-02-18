import Vue from 'vue';
import ElementUI from 'element-ui'; // 组件文件（js）
import 'element-ui/lib/theme-chalk/index.css'; // 样式文件
import App from './App.vue';
import axios from 'axios';


import { Message } from 'element-ui';

import router from './router';

import '@/style/common.less';
Vue.use(ElementUI);
Vue.prototype.axios = axios;

//设置全局路由守卫


router.beforeEach((to,from,next)=>{
let token=window.localStorage.getItem('token')

if (token) {
  next()
}else {

if (to.path==='/login') {
  
  next()
}else {
  Message.error('请登录以后再操作！')

  return next('/login')
}

}



})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

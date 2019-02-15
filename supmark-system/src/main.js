import Vue from 'vue';
import ElementUI from 'element-ui'; // 组件文件（js）
import 'element-ui/lib/theme-chalk/index.css'; // 样式文件
import App from './App.vue';
import axios from 'axios';

import router from './router';

import '@/style/common.less';
Vue.use(ElementUI);
Vue.prototype.axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

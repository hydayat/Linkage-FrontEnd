import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios' // 从node_modules导包
import qs from 'qs';

axios.defaults.withCredentials=true;
Vue.prototype.$qs = qs;

Vue.prototype.$axios=axios // 将对象挂载到vue对象中, 习惯插件左边加个 $ 符号
Vue.use(ViewUI)
Vue.config.productionTip = false

import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'yoyoo-ddr/dist/yoyoo-ddr.css'
import VueDragResize from 'vue-drag-resize'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component('vue-drag-resize', VueDragResize)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//axios
import axios from 'axios'
axios.defaults.headers.post['Content-type'] = 'application/json'
Vue.prototype.$axios=axios
//Mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/font/fonts.js'
import './assets/font/fonts.css'
Vue.use(Mint)
//mui
import './assets/mui/css/reset.css'
import './assets/mui/css/mui.css'
import mui from './assets/mui/js/mui.min.js'
import './assets/mui/fonts/mui.ttf'
Vue.prototype.mui = mui

//全局组件
import Novel from './components/Novel/Novel.vue'
Vue.component('Novel', Novel)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import VueI18n from "vue-i18n"
import i18n from './lang/index.js'
import apiFun from "@/plugins/api.js"

Vue.config.productionTip = false
Vue.prototype.$apiFun = apiFun

App.mpType = 'app'

const app = new Vue({
    ...App,
	store,
	i18n
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
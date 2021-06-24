import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

const instance = require('axios').default

const axios = instance.create({
  baseURL: `${
      process.env.NODE_ENV === "production"
          ? "http://vn346.net:3030"
          : "http://localhost:3030"
  }/api`,
});

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import VueFormWizard from 'vue-form-wizard'
import Vuelidate from 'vuelidate'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'


Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueFormWizard)


new Vue({
  el: '#app',
  render: h => h(App)
})

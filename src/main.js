import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import { router } from './router'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import 'bootstrap';
import './validate';

Vue.config.productionTip = false
import './assets/scss/main.scss'

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')

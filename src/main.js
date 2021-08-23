/*!

=========================================================
* Vue Argon Dashboard - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-argon-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vue-argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";
import axios from '@/router/interceptors'
import VueAxios from 'vue-axios'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const Store = require('secure-webstore').Store

const store = new Store('db', process.env.VUE_APP_STORE_KEY)

const appInstance = createApp(App);

store.init().then(() => {    
    appInstance.config.globalProperties.$db = store
    appInstance.use(router);
    appInstance.use(ArgonDashboard);
    appInstance.mount("#app");
    appInstance.use(VueAxios, axios)
    appInstance.use(Toast)
    appInstance.provide('$idb', store)
})

export default appInstance

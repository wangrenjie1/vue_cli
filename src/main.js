import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from "./store/index.js";

import AjaxService from "./core/tool/fetch-install.js";
import LeComponents from "@CoreUILib/le-components.min.js";
// import LeComponents from "@myCoreUILib/leComponents.js";
Vue.use(AjaxService);
Vue.use(LeComponents);

router.afterEach(function(to, from, next){

});

export default new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

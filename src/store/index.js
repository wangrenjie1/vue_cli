import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);

import login_store from "@store/modules/login.js";
import menus_store from "@store/modules/menu.js";

export default new Vuex.Store({
    namespaced:true,
    modules:{
        login_store,
        menus_store,
    }
})
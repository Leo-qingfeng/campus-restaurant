import { createStore } from "vuex";
import axios from "../plugins/axios";
import router from "../router"

export default createStore({
  state: {
    role: '',
    isLogin: false
  },
  mutations: {
    changeIsLogin(state, view) {
      state.isLogin = view
    },
    changeRole(state,value){
      state.role=value
    }
  },
  actions: {
    async checkIsLogin(commit) {
      await axios.get('/islogin').then(res => {
        const {
          data
        } = res;
        const {
          isLogin
        } = data
        if (isLogin) router.push('/login');
      })
      commit('changeIsLogin', false)
    }
  },
  modules: {},
});

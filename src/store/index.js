import { createStore } from "vuex";

export default createStore({
   state: {
      user: {
         name: "",
         userId: null,
         isLogged: false,
         isModerator: false,
      },
   },
   getters: {},

   mutations: {
      LOGIN(state, userId) {
         state.user.userId = userId;
         state.user.isLogged = true;
      },
      LOGOUT(state) {
         state.user.userId = null;
         state.user.isLogged = false;
      },
   },
   actions: {
      signup({ commit }, user) {
         localStorage.setItem("token", "token");
         commit("LOGIN", "userId");
      },
      login(context, email, password) {
         localStorage.setItem("token", "token");
         context.commit("LOGIN", "userId");
      },
      logout({ commit }) {
         localStorage.removeItem("token");
         commit("LOGOUT");
      },
   },
   modules: {},
});

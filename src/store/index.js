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
   },
   actions: {
      signup({ commit }, user) {
         commit("LOGIN", "userId");
      },
      login(context, email, password) {
         context.commit("LOGIN", "userId");
      },
   },
   modules: {},
});

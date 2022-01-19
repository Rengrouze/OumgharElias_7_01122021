import { createStore } from "vuex";

export default createStore({
   state: {
      user: "Elias",
      age: 25,
      isLogged: false,
   },
   getters: {
      getUser(state) {
         return state.user + " " + state.age + " " + state.isLogged;
      },
   },

   mutations: {
      INCREMENT_AGE(state) {
         state.age++;
      },
   },
   actions: {},
   modules: {},
});

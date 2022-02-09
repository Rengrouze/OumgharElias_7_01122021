import { createStore } from "vuex";

const apiUrl = "http://localhost:3003/api";
var Authorization = "token " + localStorage.getItem("token");

export default createStore({
   state: {
      token: localStorage.getItem("token"),
      user: {
         userId: null,
         firstName: "",
         lastName: "",
         workPlace: "",
         mediaurl: "",
         mod: false,
      },
      posts: null,
   },
   getters: {},

   mutations: {
      UPDATE_POSTS(state, data) {
         state.posts = data;
      },
      SET_USER(state, data) {
         state.user.userId = data.userId;
         state.user.firstName = data.userFirstName;
         state.user.lastName = data.userLastName;
         state.user.workPlace = data.userWorkplace;
         state.user.mediaurl = data.userMediaUrl;
         state.user.mod = data.mod;
         console.log(state.user);

         localStorage.setItem("user", JSON.stringify(state.user));
      },
      DELETE_USER(state) {
         state.user.userId = null;
         state.user.firstName = "";
         state.user.lastName = "";
         state.user.workPlace = "";
         state.user.mediaurl = "";
         state.user.mod = false;
         localStorage.removeItem("user");
      },
      UPDATE_USER(state, data) {
         state.user.userId = data.userId;
         state.user.firstName = data.userFirstName;
         state.user.lastName = data.userLastName;
         state.user.workPlace = data.userWorkplace;
         state.user.mediaurl = data.userMediaUrl;
         state.user.mod = data.mod;
         console.log(state.user);
         // if the data in localstorage differs from the data in the state
         // then update the localstorage
         if (JSON.stringify(state.user) !== localStorage.getItem("user")) {
            localStorage.setItem("user", JSON.stringify(state.user));
         }
      },
      GET_USER(state) {
         //get the user from localstorage
         var user = JSON.parse(localStorage.getItem("user"));
         // if the user is not null
         if (user !== null) {
            // set the state to the user
            state.user.userId = user.userId;
            state.user.firstName = user.firstName;
            state.user.lastName = user.lastName;
            state.user.workPlace = user.workPlace;
            state.user.mediaurl = user.mediaurl;
            state.user.mod = user.mod;
         }
      },
   },
   actions: {
      async signup({ commit }, form) {
         const response = await fetch("http://localhost:3003/api/auth/signup", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
         });
         const data = await response.json();
         console.log(data);
         if (response.status !== 201) {
            throw new Error(data.error);
         }
         localStorage.setItem("token", data.token);
         localStorage.setItem("user", JSON.stringify(data));
         commit("SET_USER", data);

         return data;
      },

      deleteUser({ commit }) {
         commit("DELETE_USER");
      },
      updateUser({ commit }, data) {
         commit("UPDATE_USER", data);
      },
      getUser({ commit }) {
         commit("GET_USER");
      },
      async getPosts({ commit }) {
         // Appel vers API
         const response = await fetch(`${apiUrl}/posts`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization,
            },
         });
         const data = await response.json();
         commit("UPDATE_POSTS", Object.values(data.posts));
         return data.posts;
      },
   },
   modules: {},
});

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
   getters: {
      userLikedPost: (state) => (postId) => {
         const post = state.posts.find((post) => postId == post.id);
         const currentUserLike = post.liked_post.find((liked) => liked.user__id == state.user.userId);
         console.log(currentUserLike);
         return !!(currentUserLike ? currentUserLike.liked : 0);
      },
      userReportedPost: (state) => (postId) => {
         const post = state.posts.find((post) => postId == post.id);
         const currentUserReport = post.reported_post.find((reported) => reported.user__id == state.user.userId);
         console.log(currentUserReport);
         return !!(currentUserReport ? currentUserReport.reported : 0);
      },

      reportedPosts: (state) => {
         return state.posts.filter((post) => post.reported_post.length > 0);
      },
   },

   mutations: {
      UPDATE_POSTS(state, data) {
         state.posts = data;
      },
      CLEAR_POSTS(state) {
         state.posts = null;
      },

      /*  UPDATE_LIKE(state, data) {
         // find the post in the state then update the like if it does not exist then add itconst post = state.posts.find((post) => post.id == data.postId);
         const post = state.posts.find((post) => post.id == data.postId);
         const currentUserLike = post.liked_post.find((liked) => liked.user__id == state.user.userId);
         console.log(currentUserLike);
         currentUserLike.liked = data.signal;
      }, 
      UPDATE_REPORT(state, data) {
         // find the post in the state then update the like
         const post = state.posts.find((post) => post.id == data.postId);
         const currentUserReport = post.reported_post.find((reported) => reported.user__id == state.user.userId);
         console.log(currentUserReport);
         currentUserReport.reported = data.signal;
      },*/
      DELETE_POST(state, data) {
         //find the post in the state then delete it
         const index = state.posts.findIndex((post) => post.id == data);
         state.posts.splice(index, 1);
      },
      DELETE_COMMENT(state, data) {
         //find the comment in the post in the state then delete it
         const post = state.posts.find((post) => post.comment.find((comment) => comment.id == data));
         const index = post.comment.findIndex((comment) => comment.id == data);
         post.comment.splice(index, 1);
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
         const response = await fetch(`${apiUrl}/auth/signup`, {
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
      async login({ commit }, form) {
         const response = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
         });
         const data = await response.json();
         console.log(data);
         if (response.status !== 200) {
            throw new Error(data.error);
         }
         localStorage.setItem("token", data.token);
         localStorage.setItem("user", JSON.stringify(data));
         commit("SET_USER", data);
         return data;
      },
      async updateUser({ commit }, form) {
         console.log("connard");
         const formData = new FormData();
         for (const data in form) {
            formData.append(data, form[data]);
         }
         const response = await fetch(`${apiUrl}/auth/update`, {
            method: "PUT",
            headers: {
               Authorization,
            },
            body: formData,
         });
         console.log(formData);
         const data = await response.json();
         console.log("connard");
         if (response.status !== 201) {
            throw new Error(data.error);
         } else {
            localStorage.setItem("user", JSON.stringify(data));
            commit("UPDATE_USER", data);
            return data;
         }
      },

      deleteUser({ commit }) {
         commit("DELETE_USER");
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
      async createPost({ commit }, form) {
         const formData = new FormData();
         for (const data in form) {
            formData.append(data, form[data]);
         }
         const response = await fetch(`${apiUrl}/posts/newpost`, {
            method: "POST",
            headers: {
               Authorization,
            },
            body: formData,
         });
         const data = await response.json();
         if (response.status !== 201) {
            throw new Error(data.error);
         }

         return data;
      },
      clearPosts({ commit }) {
         commit("CLEAR_POSTS");
      },

      async like({ commit }, checker) {
         const response = await fetch(`${apiUrl}/posts/like`, {
            method: "POST",
            headers: {
               Authorization,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(checker),
         });
         const data = await response.json();
         if (response.status !== 200) {
            throw new Error(data.error);
         }
         commit("UPDATE_LIKE", checker);
         return data;
      },
      async report({ commit }, checker) {
         const response = await fetch(`${apiUrl}/posts/report`, {
            method: "POST",
            headers: {
               Authorization,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(checker),
         });
         const data = await response.json();
         if (response.status !== 200) {
            throw new Error(data.error);
         }

         return data;
      },

      async supressPost({ commit }, checker) {
         const response = await fetch(`${apiUrl}/posts/supressPost`, {
            method: "PUT",
            headers: {
               Authorization,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(checker),
         });
         const data = await response.json();
         if (response.status !== 200) {
            throw new Error(data.error);
         }
         const id = checker.postId;
         commit("DELETE_POST", id);
         console.log.id;
         return data;
      },
      async reportComment({ commit }, checker) {
         const response = await fetch(`${apiUrl}/posts/reportComment`, {
            method: "POST",
            headers: {
               Authorization,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(checker),
         });
         const data = await response.json();
         if (response.status !== 200) {
            throw new Error(data.error);
         }
         return data;
      },
      async supressComment({ commit }, checker) {
         const response = await fetch(`${apiUrl}/posts/supressComment`, {
            method: "PUT",
            headers: {
               Authorization,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(checker),
         });
         const data = await response.json();
         if (response.status !== 200) {
            throw new Error(data.error);
         }
         const id = checker.commentId;
         commit("DELETE_COMMENT", id);
         console.log.id;
         return data;
      },
      async createComment({ commit }, form) {
         const formData = new FormData();
         for (const data in form) {
            formData.append(data, form[data]);
         }
         const response = await fetch(`${apiUrl}/posts/newcomment`, {
            method: "POST",
            headers: {
               Authorization,
            },
            body: formData,
         });
         const data = response.json();
         if (response.status !== 201) {
            throw new Error(data);
         }
         return data;
      },
   },
   modules: {},
});

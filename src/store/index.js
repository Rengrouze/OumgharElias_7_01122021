import { createStore } from "vuex";

const apiUrl = "http://localhost:3003/api";

export default createStore({
   state: {
      token: localStorage.getItem("token"),
      user: {
         userId: null,
         firstName: "",
         lastName: "",
         workPlace: "",
         mediaurl: "/src/assets/icon.png",
         mod: false,
      },
      posts: null,
      token: null,
   },
   getters: {
      userLikedPost: (state) => (postId) => {
         // check if the user has liked the post
         const post = state.posts.find((post) => postId == post.id);
         const currentUserLike = post.liked_post.find((liked) => liked.user__id == state.user.userId);
         console.log(currentUserLike);
         return !!(currentUserLike ? currentUserLike.liked : 0);
      },
      userReportedPost: (state) => (postId) => {
         // check if the user has reported the post
         const post = state.posts.find((post) => postId == post.id);
         const currentUserReport = post.reported_post.find((reported) => reported.user__id == state.user.userId);
         console.log(currentUserReport);
         return !!(currentUserReport ? currentUserReport.reported : 0);
      },

      reportedPosts: (state) => {
         // get all the posts that has been reported
         return state.posts.filter((post) => post.reported_post.length > 0);
      },
      Authorization: (state) => {
         return "token " + state.token;
      },
   },

   mutations: {
      SET_TOKEN(state, token) {
         state.token = token;
      },
      UPDATE_POSTS(state, data) {
         state.posts = data;
      },
      CLEAR_POSTS(state) {
         state.posts = null;
      },
      ADD_POST(state, post) {
         if (!state.posts) {
            state.posts = [];
         }
         console.log(state.posts);
         console.log(post);
         state.posts.unshift(post);
      },
      ADD_COMMENT(state, comment) {
         console.log(comment);
         state.posts.find((post) => post.id == comment.post__id).comment.push(comment);
      },
      UPDATE_LIKE(state, data) {
         // search the like array in the post and directly unshift the new like
         var post = state.posts.find((post) => post.id == data.postId).liked_post.find((liked) => liked.user__id == data.userId);
         var like = data.signal;
         var user = data.userId;

         var payload = {
            liked: like,
            user__id: user,
         };

         if (!post) {
            state.posts.find((post) => post.id == data.postId).liked_post.push(payload);
         } else {
            state.posts.find((post) => post.id == data.postId).liked_post.find((liked) => liked.user__id == data.userId).liked =
               data.signal;
         }
      },

      UPDATE_REPORT(state, data) {
         // search the like array in the post and directly unshift the new report (same method as the like)
         var post = state.posts.find((post) => post.id == data.postId).reported_post.find((reported) => reported.user__id == data.userId);
         var report = data.signal;
         var user = data.userId;

         var payload = {
            reported: report,
            user__id: user,
         };
         console.log(payload);
         if (!post) {
            state.posts.find((post) => post.id == data.postId).reported_post.push(payload);
         }
         state.posts.find((post) => post.id == data.postId).reported_post.find((reported) => reported.user__id == data.userId).reported =
            data.signal;
      },

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
         //set the user data in the state
         state.user.userId = data.userId;
         state.user.firstName = data.userFirstName;
         state.user.lastName = data.userLastName;
         state.user.workPlace = data.userWorkplace;
         state.user.mod = data.mod;
         if (!data.userMediaUrl) {
            state.user.mediaurl = "/src/assets/icon.png";
         } else {
            state.user.mediaurl = data.userMediaUrl;
         }

         console.log(state.user);

         localStorage.setItem("user", JSON.stringify(state.user));
      },
      DELETE_USER(state) {
         // called when the user logs out
         state.user.userId = null;
         state.user.firstName = "";
         state.user.lastName = "";
         state.user.workPlace = "";
         state.user.mediaurl = "";
         state.user.mod = false;
         localStorage.removeItem("user");
      },
      UPDATE_USER(state, data) {
         // update the user data in the state
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
      //action names are explicit
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
         commit("SET_TOKEN", data.token);
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
         commit("SET_TOKEN", data.token);
         localStorage.setItem("user", JSON.stringify(data));
         commit("SET_USER", data);
         return data;
      },
      async updateUser({ commit }, form) {
         var Authorization = this.getters.Authorization;
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
            commit("CLEAR_POSTS");
            return data;
         }
      },
      async deleteAccount({ commit }, user) {
         var Authorization = this.getters.Authorization;
         const response = await fetch(`${apiUrl}/auth/delete`, {
            method: "PUT",
            headers: {
               Authorization,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
         });
         const data = await response.json();
         if (response.status !== 200) {
            throw new Error(data.error);
         } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            commit("DELETE_USER");
            commit("CLEAR_POSTS");
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
         var Authorization = this.getters.Authorization;
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
         var Authorization = this.getters.Authorization;
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

         commit("ADD_POST", data.post);
         if (response.status !== 201) {
            throw new Error(data.error);
         }

         return data;
      },
      clearPosts({ commit }) {
         commit("CLEAR_POSTS");
      },

      async like({ commit }, checker) {
         var Authorization = this.getters.Authorization;
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
         var Authorization = this.getters.Authorization;
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
         commit("UPDATE_REPORT", checker);
         return data;
      },

      async supressPost({ commit }, checker) {
         var Authorization = this.getters.Authorization;
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

      async createComment({ commit }, form) {
         var Authorization = this.getters.Authorization;
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
         const data = await response.json();
         console.log(data);
         commit("ADD_COMMENT", data.comment);
         if (response.status !== 201) {
            throw new Error(data);
         }

         return data;
      },
      async supressComment({ commit }, checker) {
         var Authorization = this.getters.Authorization;
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
   },
   modules: {},
});

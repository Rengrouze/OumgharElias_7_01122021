<template>
   <Header>
      <template v-slot:demiurge
         ><p>
            <router-link to="/symes" v-if="this.$store.state.user.mod == 1">Mode Modération</router-link>
         </p></template
      >
   </Header>
   <div class="home w-full flex justify-center h-auto">
      <div id="feed" class="flex h-auto w-10/12 mt-12 border-l-2 border-r-2 pr-3 pl-3 flex-col items-center">
         <!-- social media posts -->
         <NewPost />

         <post
            :visible="post.enable"
            reported="false"
            :profile-pic-url="post.user.profilepicurl"
            :id="post.id"
            :mediaurl="post.mediaurl"
            v-for="post in posts"
            :key="post.id"
         >
            <template v-slot:op-name>
               {{ post.user.name + " " + post.user.surname }}
            </template>
            <template v-slot:op-work> {{ " " + post.user.workplace }}</template>
            <template v-slot:timedate> Posté le {{ post.date }} à {{ post.time }} </template>
            <template v-slot:text>{{ post.text }}</template>
            <template v-slot:commentsnumber>{{ post.commentsnumber }}</template>
            <template v-slot:likesnumber>{{ post.like }}</template>
         </post>
      </div>
   </div>
</template>
<script>
// @ is an alias to /src

import Header from "../components/Header.vue";
import post from "../components/Post.vue";
import NewPost from "../components/NewPost.vue";

export default {
   data() {
      return {};
   },
   computed: {
      posts() {
         return this.$store.state.posts;
      },
   },
   created() {
      if (!this.posts) {
         this.$store.dispatch("getPosts");
      }
   },
   beforeRouteEnter(to, from, next) {
      if (!localStorage.getItem("token")) {
         if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
         }
         next("/");
      } else {
         next();
      }
   },

   name: "Home",
   components: {
      Header,
      post,
      NewPost,
   },
   methods: {},
};
</script>

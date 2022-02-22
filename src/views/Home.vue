<template>
   <!-- home page -->
   <div>
      <Header>
         <template v-slot:demiurge
            ><p class="md:block hidden">
               <router-link to="/symes" v-if="this.$store.state.user.mod == 1">Mode Modération</router-link>
            </p></template
         >
      </Header>
      <div class="home w-full flex justify-center h-auto">
         <div id="feed" class="flex h-auto md:w-10/12 w-full mt-12 border-l-2 border-r-2 pr-3 pl-3 flex-col items-center">
            <!-- social media posts -->
            <NewPost />

            <post
               :visible="post.enable"
               :profile-pic-url="post.user.profilepicurl"
               :id="post.id"
               :mediaurl="post.mediaurl"
               v-for="post in posts"
               :key="post.id"
            >
               <template v-slot:op-name>
                  <p>{{ post.user.name + " " + post.user.surname }}</p>
               </template>

               <template v-slot:op-work> {{ " " + post.user.workplace }}</template>
               <template v-slot:timedate
                  ><p class="hidden md:block text-xs pt-2 text-slate-600">Posté le {{ post.date }} à {{ post.time }}</p>
                  <p class="block md:hidden text-xs pt-2 text-slate-600">{{ post.date }} - {{ post.time }}</p></template
               >
               <template v-slot:text>{{ post.text }}</template>
            </post>
         </div>
      </div>
   </div>
</template>
<script>
import Header from "../components/Header.vue";
import post from "../components/Post.vue";
import NewPost from "../components/NewPost.vue";

export default {
   computed: {
      posts() {
         return this.$store.state.posts;
      },
   },
   data() {
      return {};
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

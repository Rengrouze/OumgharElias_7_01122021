<template>
   <div>
      <Header>
         <template v-slot:demiurge
            ><p class="text-blue-500">
               <router-link to="/home" v-if="this.$store.state.user.mod == 1">Revenir en mode normal</router-link>
            </p></template
         >
      </Header>
      <div class="home w-full flex justify-center h-auto">
         <div class="flex h-auto w-10/12 mt-12 border-l-2 border-r-2 pr-3 pl-3 flex-col items-center">
            <!-- social media posts -->
            <p class="text-xl mb-4">Désormais vous ne voyez que les posts qui ont été signalés</p>

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
// @ is an alias to /src

import Header from "../components/Header.vue";

import post from "../components/Post.vue";

export default {
   beforeRouteEnter(to, from, next) {
      if (!localStorage.getItem("token")) {
         if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
         }
         next("/");
      } else {
         next();
      }
      if (this.$store.state.user.mod !== 1) {
         next("/home");
      }
   },
   computed: {
      posts() {
         return this.$store.getters.reportedPosts;
      },
   },
   created() {
      if (!this.$store.state.posts) {
         this.$store.dispatch("getPosts");
      }
   },
   data() {
      return {
         stuffToModerate: false,
      };
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
   name: "Moderation",
   components: {
      Header,
      post,
   },
   methods: {},
};
</script>

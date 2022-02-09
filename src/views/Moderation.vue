<template>
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
         <NewPost />
      </div>
   </div>
</template>
<script>
// @ is an alias to /src

import Header from "../components/Header.vue";
import NewPost from "../components/NewPost.vue";
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
   name: "Moderation",
   components: {
      Header,
      post,
      NewPost,
   },
   methods: {},
};
</script>

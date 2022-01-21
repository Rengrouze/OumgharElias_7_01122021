<template>
   <Header />
   <div class="home w-full flex justify-center h-screen">
      <Feed />
   </div>
</template>
<script>
// @ is an alias to /src

import Header from "../components/Header.vue";
import Feed from "../components/Feed.vue";

export default {
   beforeRouteEnter(to, from, next) {
      if (!localStorage.getItem("token")) {
         next("/");
      } else {
         next();
      }
   },
   name: "Home",
   components: {
      Header,
      Feed,
   },
   methods: {},
};
</script>

<template>
   <Header />
   <div class="about">
      <Feed />
   </div>
   <button @click="logout">log out</button>
</template>
<script>
// @ is an alias to /src

import Header from "../components/Header.vue";

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
   },
   methods: {
      logout() {
         this.$store.dispatch("logout");
         this.$router.push("/");
      },
   },
};
</script>

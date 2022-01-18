<!-- Contains the feed section -->

<template>
   <Header />
   <div class="home">
      <Feed />
   </div>
</template>

<script>
// @ is an alias to /src
import Feed from "../components/Feed.vue";
import Header from "../components/Header.vue";

export default {
   name: "Home",
   components: {
      Feed,
      Header,
   },
};
</script>

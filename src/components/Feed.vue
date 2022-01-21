<template>
   <!-- feed section -->
   <div class="flex h-auto w-10/12 mt-12 border-l-2 border-r-2 pr-3 pl-3 flex-col items-center">
      <!-- social media posts -->
      <Post />
   </div>
</template>

<script>
import Post from "../components/Post.vue";

export default {
   name: "Feed",
   components: {
      Post,
   },
   methods: {},
};
</script>

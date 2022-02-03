<template>
   <Header>
      <template v-slot:demiurge
         ><p><router-link to="/symes" v-if="this.$store.state.user.mod == 1">Mode Modération</router-link></p></template
      >
   </Header>
   <div class="home w-full flex justify-center h-auto">
      <div id="feed" class="flex h-auto w-10/12 mt-12 border-l-2 border-r-2 pr-3 pl-3 flex-col items-center">
         <!-- social media posts -->
         <Post visible="true" reported="false" profile-pic-url="rien" id="post_5" media-url="rien" liked="false">
            <template v-slot:op-name>duca connard</template>
            <template v-slot:op-work> emotional Damage</template>
            <template v-slot:timedate>Posté le 01/15/1258 à 12:00</template>
            <template v-slot:text>i have emotional Damage</template>
            <template v-slot:commentsnumber>0</template>
            <template v-slot:likesnumber>0</template>
         </Post>
      </div>
   </div>
</template>
<script>
// @ is an alias to /src

import Header from "../components/Header.vue";
import Post from "../components/Post.vue";

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
   },
   beforeMount() {
      async () => {
         try {
            const response = await fetch("http://localhost:3003/api/posts/", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
               },
            });
            const data = await response.json();
            //get the op data of the post
            data.forEach((Post) => {
               (async () => {
                  try {
                     const response = await fetch("http://localhost:3003/api/auth/" + Post.op, {
                        method: "GET",
                        headers: {
                           "Content-Type": "application/json",
                           Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                     });
                     const data = await response.json();
                     Post.op = data;
                     document.getElementById(
                        "feed"
                     ).innerHTML += `<Post visible="${Post.enable}" reported="false" profile-pic-url="rien" id="post_${Post.id}" media-url="${Post.mediaurl}" liked="false">
                        <template v-slot:op-name>${Post.op.userFirstName} ${Post.op.userLastName} </template>
                        <template v-slot:op-work>${Post.op.userWorkplace}</template>
                        <template v-slot:timedate>Posté le ${Post.date} à ${Post.time}</template>
                        <template v-slot:text>${Post.text}</template>
                        <template v-slot:commentsnumber>${Post.commentsnumber}</template>
                        <template v-slot:likesnumber>${Post.like}</template>`;
                  } catch (error) {
                     console.log(error);
                  }
               })();
            });
         } catch (error) {
            console.log(error);
         }
      };
   },
   name: "Home",
   components: {
      Header,
      Post,
   },
   methods: {},
};
</script>

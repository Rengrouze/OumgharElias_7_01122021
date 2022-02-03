<template>
   <Header>
      <template v-slot:demiurge
         ><p><router-link to="/symes" v-if="this.$store.state.user.mod == 1">Mode Modération</router-link></p></template
      >
   </Header>
   <div class="home w-full flex justify-center h-auto">
      <div id="feed" class="flex h-auto w-10/12 mt-12 border-l-2 border-r-2 pr-3 pl-3 flex-col items-center">
         <!-- social media posts -->
         <Post visible="1" reported="false" profile-pic-url="rien" id="post_5" media-url="rien">
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
   },
   beforeCreate() {
      (async () => {
         console.log("du coup");
         try {
            const response = await fetch("http://localhost:3003/api/posts/", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
               },
            });
            const data = await response.json();

            //target the posts array in the json file
            const postsJson = data.posts;

            //convert the posts array to a js array
            var posts = Object.values(postsJson);

            posts.forEach((post) => {
               console.log("je lance une nouvelle requete pour récupérer les infos de l'op");
               console.log(post.op);
               (async () => {
                  try {
                     const response = await fetch("http://localhost:3003/api/auth/user" + post.op, {
                        method: "GET",
                        headers: {
                           "Content-Type": "application/json",
                           Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                     });
                     const data = await response.json();
                     post.op = data;
                     console.log(post);

                     document.getElementById("feed").innerHTML += `
                        <Post
                           visible="${post.enable}"
                           reported="false"
                           profile-pic-url="${post.op.profilepicurl}"
                           id="post_${post.id}"
                           media-url="${post.op.userMediaUrl}"
                        >
                           <template v-slot:op-name>
                              ${post.op.userFirstName} ${post.op.userLastName}{" "}
                           </template>
                           <template v-slot:op-work> ${post.op.userWorkplace}</template>
                           <template v-slot:timedate>
                              Posté le ${post.date} à ${post.time}
                           </template>
                           <template v-slot:text>${post.text}</template>
                           <template v-slot:commentsnumber>${post.commentsnumber}</template>
                           <template v-slot:likesnumber>${post.like}</template>
                        </Post>`;

                     console.log("j'ai fini");
                  } catch (error) {
                     console.log(error);
                  }
               })();
            });
         } catch (error) {
            console.log(error);
         }
      })();
   },
   name: "Home",
   components: {
      Header,
      post,
   },
   methods: {},
};
</script>

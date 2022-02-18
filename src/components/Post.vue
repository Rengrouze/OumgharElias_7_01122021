<script>
import comment from "./Comment.vue";
import NewComment from "./NewComment.vue";
export default {
   name: "post",
   components: {
      comment,
      NewComment,
   },
   props: {
      visible: Number,

      profilePicUrl: String,
      id: Number,
      mediaurl: String,
   },
   data() {
      return {
         comments: null,

         seeComments: false,
         noImage: false,

         likeChecker: {
            postId: this.id,
            userId: this.$store.state.user.userId,
            signal: null,
         },
         reportChecker: {
            postId: this.id,
            userId: this.$store.state.user.userId,
            signal: null,
         },
         suppressChecker: {
            postId: this.id,
            signal: null,
         },
      };
   },
   beforeMount() {
      if (this.mediaurl == "") {
         this.noImage = true;
      }
   },
   computed: {
      specifiedPost() {
         return this.$store.state.posts.filter((post) => post.id == this.id);
      },
      isop() {
         if (this.specifiedPost[0].op == this.$store.state.user.userId) {
            return true;
         } else {
            return false;
         }
      },
      liked() {
         return this.$store.getters.userLikedPost(this.id);
      },
      reported() {
         return this.$store.getters.userReportedPost(this.id);
      },
      numLikes() {
         return this.specifiedPost[0].liked_post.filter((liked_post) => liked_post.liked === 1).length; // get number of likes;
      },
      numComments() {
         return this.specifiedPost[0].comment.filter((comment) => comment.enable === 1).length;
      },
   },
   created() {
      this.comments = this.specifiedPost[0].comment;
      if (this.specifiedPost[0].op == this.$store.state.user.userId) {
         this.isOp = true;
      } else {
         this.isOp = false;
      }
   },

   methods: {
      displayComments() {
         this.seeComments = !this.seeComments;
      },
      imageWithDirectLink() {
         this.newComment.mediaurl = "";
         this.directLink = !this.directLink;
         // unload input file
         this.imgFile = "Importer depuis mon pc";
         document.getElementById(this.id + "imageWithFile").value = null;
         document.getElementById(this.id + "imageWithFile").innerHTML = this.imgFile;
      },

      imageWithFile() {
         if (this.directLink == true) {
            this.directLink = false;
         }

         this.imgFile = this.$refs.imgFile.value;
         // only keep the name of the file
         this.newComment.mediaurl = this.imgFile;
         this.imgFileShort = this.imgFile.split("\\").pop();
         document.getElementById(this.id + "imageWithFile").innerHTML = this.imgFileShort;
      },
      like() {
         if (this.liked) {
            this.likeChecker.signal = 0;
         } else {
            this.likeChecker.signal = 1;
         }
         this.$store.dispatch("like", this.likeChecker).then(() => {
            this.likeChecker.signal = null;
            this.liked = false;
         });
      },
      report() {
         if (this.reported) {
            this.reportChecker.signal = 0;
            alert("Vous avez annulé votre signalement");
         } else {
            this.reportChecker.signal = 1;
            alert("Vous avez signalé ce post");
         }
         this.$store.dispatch("report", this.reportChecker).then(() => {
            this.reportChecker.signal = null;
         });
      },
      supressPost() {
         //ask user if he really want to supress the post
         var supress = confirm("Vous êtes sur le point de supprimer ce post, êtes vous sûr ?");
         if (!supress) {
            return;
         }

         if (!this.visible) {
            this.suppressChecker.signal = 1;
         } else {
            this.suppressChecker.signal = 0;
         }
         this.$store.dispatch("supressPost", this.suppressChecker).then(() => {
            this.suppressChecker.signal = null;
         });
         //supp the post in the store
      },
   },
};
</script>
<template>
   <!-- Example of a Post -->

   <div v-if="visible" :id="id" class="flex flex-col lg:w-7/12 w-full justify-center items-center mb-10">
      <div class="flex flex-col h-auto border-2 w-full shadow-xl rounded-xl justify-center items-center">
         <!-- header section with the profile pic, name, workplace, report button-->
         <div class="flex w-full h-auto p-6 justify-between items-center">
            <!-- Op section -->
            <div class="flex w-3/4 items-center flex-1">
               <img
                  :src="profilePicUrl || '/src/assets/icon.png'"
                  class="md:h-16 md:w-16 h-8 w-8 rounded-full border-2 md:border-4 border-[#D1515A] overflow-hidden object-cover"
               />

               <div class="flex flex-col items-start ml-4 pt-2 text-ellipsis whitespace-nowrap overflow-hidden">
                  <slot name="op-name"></slot>
                  <p class="md:block hidden"><i class="far fa-building"></i><slot name="op-work"></slot></p>
                  <slot name="timedate"></slot>
               </div>
            </div>
            <!-- Report button -->
            <div v-if="this.$store.state.user.mod == 0 && !this.isop">
               <button @click="report()" v-if="!reported" class="text-red-500 font-bold py-2 px-4 rounded-full">
                  <i class="far fa-flag"></i>
               </button>
               <button @click="report()" v-if="reported" class="text-red-500 font-bold py-2 px-4 rounded-full">
                  <i class="fas fa-flag"></i>
               </button>
            </div>
            <div v-if="this.$store.state.user.mod == 1 || this.isop == 1">
               <button @click="supressPost()" class="text-red-500 font-bold py-2 px-4 rounded-full">
                  <i class="fas fa-trash-alt"></i>
               </button>
            </div>
         </div>
         <!-- separator -->
         <div class="h-1 w-11/12 rounded-xl bg-[#2D6991]"></div>

         <!-- Content of the post (image/gif/text) -->
         <div class="p-5 w-8/12 h-auto">
            <p class="h-auto whitespace-pre-wrap"><slot name="text"></slot></p>
            <img v-if="!this.noImage" :src="mediaurl" class="w-full h-auto pt-5 pb-5" />
         </div>
         <!-- separator -->
         <div class="h-1 w-11/12 rounded-xl bg-[#2D6991]"></div>
         <!-- interaction section -->
         <div class="flex w-full justify-evenly p-2">
            <div class="text-[#091F43] flex flex-row justify-center items-center w-2/4">
               <div @click="displayComments()" class="flex relative h-4 w-4 mr-1 cursor-pointer">
                  <i class="far fa-comment relative top-0 -z-10"></i
                  ><i v-show="this.seeComments" class="fas fa-comment absolute top-0 left-0 right-0 bottom-0 z-0"></i>
               </div>
               <div class="cursor-default">{{ numComments }}</div>
            </div>
            <div class="h-full w-2 border-l-2 border-[#2D6991]"></div>
            <div class="text-[#D1515A] flex flex-row justify-center items-center w-2/4">
               <div @click="like()" class="flex relative h-4 w-4 mr-1 cursor-pointer">
                  <i class="far fa-heart relative top-0 -z-10"></i
                  ><i v-show="this.liked" class="fas fa-heart absolute top-0 left-0 right-0 bottom-0 z-0"></i>
               </div>
               <div class="cursor-default">{{ numLikes }}</div>
            </div>
         </div>
      </div>
      <div class="w-full flex justify-center">
         <div
            class="flex flex-col bg-slate-400 h-auto p-2 w-10/12 border-r-2 border-l-2 border-b-2 shadow-xl rounded-b-xl justify-center items-center"
         >
            <!-- comment section -->
            <div v-if="seeComments == true" class="flex flex-col justify-center items-center w-full h-full">
               <comment
                  v-for="comment of comments"
                  :key="comment.id"
                  :visibleComment="comment.enable"
                  :reportedComment="false"
                  :idComment="comment.id"
                  :idUser="comment.user.id"
                  :idPost="comment.post__id"
               >
                  <template v-slot:userName>{{ comment.user.name + " " + comment.user.surname }}</template>
                  <template v-slot:profilePic
                     ><img
                        :src="comment.user.profilepicurl || '/src/assets/icon.png'"
                        class="object-cover rounded-full border-2 border-[#D1515A] overflow-hidden h-10 w-10 mr-2"
                  /></template>
                  <template v-slot:date>{{ comment.date }}</template>
                  <template v-slot:time>{{ comment.time }}</template>
                  <template v-slot:text>{{ comment.text }}</template>
                  <template v-slot:media><img :src="comment.mediaurl" class="w-60 h-auto pt-5 pb-5" /></template>
               </comment>

               <!-- add a new comment -->
               <NewComment :postId="id"></NewComment>
               <!-- display comments section -->
            </div>
            <div class="flex flex-col justify-center">
               <div
                  @click="displayComments()"
                  v-if="this.seeComments == true"
                  class="flex rounded-full bg-slate-300 w-5 h-5 justify-center items-center hover:bg-slate-100 hover:scale-125 transition-all active:scale-150"
               >
                  <i class="fas fa-chevron-up"></i>
               </div>
               <div
                  @click="displayComments()"
                  v-if="this.seeComments == false"
                  class="flex rounded-full bg-slate-300 w-5 h-5 justify-center items-center hover:bg-slate-100 hover:scale-125 transition-all active:scale-150"
               >
                  <i class="fas fa-chevron-down"></i>
               </div>
            </div>

            <!-- new comment section -->
         </div>
      </div>
   </div>
</template>

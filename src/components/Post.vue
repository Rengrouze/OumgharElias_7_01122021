<script>
import Comment from "./Comment.vue";
export default {
   name: "post",
   components: {
      Comment,
   },
   props: {
      visible: Boolean,
      reported: Boolean,

      name: String,
      firstName: String,
      work: String,
      profilePicUrl: String,

      id: String,
      text: String,
      mediaurl: String,
      date: String,
      time: String,

      likesNumber: Number,
      commentsNumber: Number,
   },
   beforeMount() {
      if (this.mediaurl == "") {
         this.noImage = true;
      }
   },

   data() {
      return {
         liked: false,
         supressConfirm: false,
         seeComments: false,
         noImage: false,
         newComment: {
            op: "",
            text: "",
            mediaurl: "",
            date: "",
            time: "",
         },
         errorMessage: "",
         directLink: false,
         imgFile: "", // image file name
         imgFileShort: "", // image short file name
         newCommentText: "", // new comment text
      };
   },
   methods: {
      supressPost() {
         this.visible = false;
      },

      liked() {
         this.content.liked = !this.content.liked;
         if (this.content.liked) {
            this.content.liked = true;
            this.content.likesNumber++;
         } else {
            this.content.liked = false;
            this.content.likesNumber--;
         }
      },
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
   },
};
</script>
<template>
   <!-- Example of a Post -->

   <div v-if="visible" :id="id" class="flex flex-col w-10/12 lg:w-8/12 justify-center items-center mb-10">
      <div class="flex flex-col h-auto border-2 w-full shadow-xl rounded-xl justify-center items-center">
         <!-- header section with the profile pic, name, workplace, report button-->
         <div class="flex w-full h-auto p-6 justify-between items-center">
            <!-- Op section -->
            <div class="flex w-3/4 items-center flex-1">
               <img :src="profilePicUrl" class="h-16 w-16 rounded-full border-4 border-[#D1515A] overflow-hidden object-cover" />

               <div class="flex flex-col items-start ml-4 pt-2 text-ellipsis whitespace-nowrap overflow-hidden">
                  <p><slot name="op-name"></slot></p>
                  <p><i class="far fa-building"></i><slot name="op-work"></slot></p>
                  <p class="text-xs pt-2 text-slate-600"><slot name="timedate"></slot></p>
               </div>
            </div>
            <div v-if="this.$store.state.user.mod == 0">
               <div v-if="reported == false" class="group text-2xl relative pr-5">
                  <i class="fas fa-bars transition-opacity duration-300 group-hover:opacity-0 -z-10 absolute"></i>
                  <div
                     @click="reported = true"
                     class="opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 text-red-600 active:text-red-300 cursor-pointer"
                  >
                     Signaler
                  </div>
               </div>
            </div>
            <div v-if="this.$store.state.user.mod == 1 && supressConfirm == false">
               <div class="group text-2xl relative pr-5">
                  <i class="fas fa-bars transition-opacity duration-300 group-hover:opacity-0 -z-10 absolute"></i>
                  <div
                     @click="supressConfirm = true"
                     class="opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 text-red-600 active:text-red-300 cursor-pointer"
                  >
                     Supprimer ?
                  </div>
               </div>
            </div>

            <div v-if="reported == true && this.$store.state.user.mod == 0">Vous avez signalé ce post</div>
            <div
               @click="supressPost()"
               v-if="supressConfirm == true && this.$store.state.user.mod == 1"
               class="text-red-600 active:text-red-300 cursor-pointer"
            >
               Veuillez cliquez à nouveaux pour confirmer la supression
            </div>
         </div>
         <!-- separator -->
         <div class="h-1 w-11/12 rounded-xl bg-[#2D6991]"></div>

         <!-- Content of the post (image/gif/text) -->
         <div class="p-5 w-8/12 h-auto">
            <p><slot name="text"></slot></p>
            <img v-if="!noImage" :src="mediaurl" class="w-full h-auto pt-5 pb-5" />
         </div>
         <!-- separator -->
         <div class="h-1 w-11/12 rounded-xl bg-[#2D6991]"></div>
         <!-- interaction section -->
         <div class="flex w-full justify-evenly p-2">
            <div class="text-[#091F43] flex flex-row justify-center items-center w-2/4">
               <div @click="displayComments()" class="flex relative h-4 w-4 mr-1 cursor-pointer">
                  <i class="far fa-comment relative top-0 -z-10"></i
                  ><i v-show="addNewComment" class="fas fa-comment absolute top-0 left-0 right-0 bottom-0 z-0"></i>
               </div>
               <div class="cursor-default"><slot name="commentsnumber"></slot></div>
            </div>
            <div class="h-full w-2 border-l-2 border-[#2D6991]"></div>
            <div class="text-[#D1515A] flex flex-row justify-center items-center w-2/4">
               <div @click="liked()" class="flex relative h-4 w-4 mr-1 cursor-pointer">
                  <i class="far fa-heart relative top-0 -z-10"></i
                  ><i v-show="liked" class="fas fa-heart absolute top-0 left-0 right-0 bottom-0 z-0"></i>
               </div>
               <div class="cursor-default"><slot name="likesnumber"></slot></div>
            </div>
         </div>
      </div>
      <div class="w-full flex justify-center">
         <div
            class="flex flex-col bg-slate-400 h-auto p-2 w-10/12 border-r-2 border-l-2 border-b-2 shadow-xl rounded-b-xl justify-center items-center"
         >
            <!-- comment section -->
            <div v-if="seeComments == true" class="flex flex-col justify-center items-center w-full h-full">
               <Comment :visibleComment="true" :reportedComment="false" idComment="1">
                  <template v-slot:userName>Elias Oumghar</template>
                  <template v-slot:profilePic
                     ><img
                        src="/src/assets/test.jpg"
                        class="object-cover rounded-full border-2 border-[#091F43] overflow-hidden h-10 w-10 mr-2"
                  /></template>
                  <template v-slot:date> 21/12/2012 </template>
                  <template v-slot:time> 15:30 </template>
                  <template v-slot:text> je compatis </template>
                  <template v-slot:media
                     ><img src="https://c.tenor.com/rRPLWc1ON7cAAAAM/forever-alone-sponge-bob.gif" class="w-60 h-auto pt-5 pb-5"
                  /></template>
               </Comment>
               <Comment :visibleComment="true" :reportedComment="true" idComment="2">
                  <template v-slot:userName>Elias Oumghar</template>
                  <template v-slot:profilePic
                     ><img
                        src="/src/assets/testmoi.jpg"
                        class="object-cover rounded-full border-2 border-[#091F43] overflow-hidden h-10 w-10 mr-2"
                  /></template>
                  <template v-slot:date> 21/12/2012 </template>
                  <template v-slot:time> 15:30 </template>
                  <template v-slot:text> *tousse* </template>
                  <template v-slot:media
                     ><img src="https://c.tenor.com/GCpJBUm3YBQAAAAS/umm-confused.gif" class="w-60 h-auto pt-5 pb-5"
                  /></template>
               </Comment>
               <!-- add a new comment -->
               <div
                  class="flex flex-col p-2 border border-gray-300 rounded-xl bg-gray-50 shadow-xl mb-2 w-full justify-center items-center"
               >
                  <label for="NewComment" class="text-gray-700 text-sm">Ajouter un commentaire</label>
                  <input
                     type="text"
                     id="NewComment"
                     v-model="newComment.text"
                     class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl"
                     placeholder="Votre commentaire ici"
                  />
                  <div class="flex flex-col w-full justify-center items-center">
                     <p class="mt-4"><i class="far fa-smile"></i> Vous voulez ajoutez une image ou un gif ?</p>
                     <div class="flex flex-row justify-evenly w-full">
                        <button
                           @click="imageWithDirectLink()"
                           class="mt-4 mb-2 border-2 border-[#2D6991] bg-[#2D6991] rounded-lg text-sky-50 p-1 cursor-pointer"
                        >
                           Avec un lien Direct
                        </button>
                        <label
                           for="file"
                           class="mt-4 mb-2 border-2 border-[#2D6991] bg-[#2D6991] rounded-lg text-sky-50 font-normal p-1 cursor-pointer"
                           :id="id + 'imageWithFile'"
                        >
                           Importer depuis mon pc</label
                        >
                     </div>
                     <div class="w-full">
                        <input
                           type="file"
                           id="file"
                           class="inputfile opacity-0 w-0 h-0 absolute"
                           accept="image/*"
                           @change="imageWithFile()"
                           ref="imgFile"
                        />
                        <input
                           v-if="directLink"
                           type="url "
                           class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl"
                           placeholder="Exemple : https://c.tenor.com/x8eBbUiF4RYAAAAS/yes-sweet.gif "
                           v-model="newComment.mediaurl"
                        />
                     </div>
                  </div>
                  <p class="text-red-500 text-xs italic">
                     {{ errorMessage }}
                  </p>
                  <button
                     @click="postNewComment()"
                     class="mt-4 mb-2 border-2 border-[#2D6991] bg-[#2D6991] rounded-lg text-sky-50 p-1 font-bold cursor-pointer"
                  >
                     Envoyer
                  </button>
               </div>
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

<script>
export default {
   name: "NewPost",
   data() {
      return {
         newPost: {
            user: this.$store.state.user,
            content: {
               text: "",
               mediaurl: "",
            },
         },
         errorMessage: "",
         directLink: false,
         imgFile: "", // image file name
         imgFileShort: "Importer depuis mon pc", // image short file name
         newCommentText: "", // new comment text
      };
   },
   methods: {
      imageWithDirectLink() {
         this.newPost.content.mediaurl = "";
         this.directLink = !this.directLink;
         // unload input file
         this.imgFile = "Importer depuis mon pc";
         document.getElementById(newPost).value = null;
         document.getElementById(newPost).innerHTML = this.imgFile;
      },

      imageWithFile() {
         if (this.directLink == true) {
            this.directLink = false;
         }

         this.imgFile = this.$refs.imgFile.value;
         // only keep the name of the file
         this.newComment.mediaurl = this.imgFile;
         this.imgFileShort = this.imgFile.split("\\").pop();
         document.getElementById(newPost).innerHTML = this.imgFileShort;
      },
   },
};
</script>
<template>
   <div class="flex flex-col p-2 border border-gray-300 rounded-xl bg-gray-50 shadow-xl mb-2 w-8/12 justify-center items-center">
      <label for="NewPost" class="text-gray-700 text-sm">Ajouter un post</label>
      <input type="text" id="NewPost" class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl" placeholder="Votre post ici" />
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
               :id="newPost"
            >
               {{ imgFileShort }}</label
            >
         </div>
         <div class="w-full">
            <input
               @change="imageWithFile()"
               type="file"
               id="file"
               class="inputfile opacity-0 w-0 h-0 absolute"
               accept="image/*"
               ref="imgFile"
            />
            <input
               v-if="directLink"
               type="url"
               class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl"
               placeholder="Exemple : https://c.tenor.com/x8eBbUiF4RYAAAAS/yes-sweet.gif "
            />
         </div>
      </div>
      <p class="text-red-500 text-xs italic">
         {{ errorMessage }}
      </p>
      <button class="mt-4 mb-2 border-2 border-[#2D6991] bg-[#2D6991] rounded-lg text-sky-50 p-1 font-bold cursor-pointer">Envoyer</button>
   </div>
</template>

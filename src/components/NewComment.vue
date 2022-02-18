<script>
export default {
   name: "newcomment",
   props: {
      postId: {
         type: Number,
         required: true,
      },
   },

   data() {
      return {
         newComment: {
            post: this.postId,
            op: this.$store.state.user.userId,
            text: "",
            mediaurl: "",
            file: "",
         },
         noImage: true,
         preview: "",
         message: "",
         directLink: false,
         imgFile: "", // image file name
         imgFileShort: "Importer depuis mon pc", // image short file name
         newCommentText: "", // new comment text
      };
   },
   methods: {
      displayForm() {
         this.display = !this.display;
      },
      imageWithDirectLink() {
         this.newComment.mediaurl = "";
         this.directLink = !this.directLink;
         // unload input file
         this.imgFile = "Importer depuis mon pc";
         document.getElementById(this.postId + "imageWithFile").value = null;
         document.getElementById(this.postId + "imageWithFile").innerHTML = this.imgFile;
         this.newComment.file = null;
      },

      imageWithFile() {
         if (this.directLink == true) {
            this.directLink = false;
         }

         this.imgFile = this.$refs.imgFile.value;
         // only keep the name of the file

         this.imgFileShort = this.imgFile.split("\\").pop();
         this.newComment.file = this.$refs.imgFile.files[0];
         document.getElementById(this.postId + "imageWithFile").innerHTML = this.imgFileShort;
      },
      postNewComment() {
         // clear error message
         this.message = "";
         // check empty form
         if (this.newComment.text == "") {
            this.message = "Vous ne pouvez pas poster un message vide";
            return;
         }

         this.$store
            .dispatch("createComment", this.newComment)
            .then(() => {
               this.newComment.text = "";
               this.newComment.mediaurl = "";
               this.newComment.file = "";
               this.display = false;
            })
            .catch((error) => {
               this.message = error.message;
            });
      },
   },
};
</script>
<template>
   <div class="flex flex-col p-2 border border-gray-300 rounded-xl bg-gray-50 shadow-xl mb-2 w-full justify-center items-center">
      <label for="NewComment" class="text-gray-700 text-sm">Ajouter un commentaire</label>
      <textarea
         type="text"
         id="NewComment"
         v-model="newComment.text"
         class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl"
         placeholder="Votre commentaire ici"
      />
      <div class="flex flex-col w-full justify-center items-center">
         <p class="mt-4"><i class="far fa-smile"></i> Vous voulez ajoutez une image ou un gif ?</p>
         <div class="flex md:flex-row flex-col justify-evenly w-full">
            <button
               @click="imageWithDirectLink()"
               class="mt-4 mb-2 border-2 border-[#2D6991] bg-[#2D6991] rounded-lg text-sky-50 p-1 cursor-pointer"
            >
               Avec un lien Direct
            </button>
            <input
               v-if="directLink"
               type="url "
               class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl md:hidden block"
               placeholder="Exemple : https://c.tenor.com/x8eBbUiF4RYAAAAS/yes-sweet.gif "
               v-model="newComment.mediaurl"
            />
            <label
               for="file"
               class="mt-4 mb-2 border-2 border-[#2D6991] bg-[#2D6991] rounded-lg text-sky-50 font-normal p-1 cursor-pointer"
               :id="postId + 'imageWithFile'"
            >
               Importer depuis mon pc</label
            >
         </div>
         <div class="w-full">
            <input
               type="file"
               id="file"
               name="file"
               class="inputfile opacity-0 w-0 h-0 absolute"
               accept="image/*"
               @change="imageWithFile()"
               ref="imgFile"
            />
            <input
               v-if="directLink"
               type="url "
               class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl md:block hidden"
               placeholder="Exemple : https://c.tenor.com/x8eBbUiF4RYAAAAS/yes-sweet.gif "
               v-model="newComment.mediaurl"
            />
         </div>
      </div>
      <p class="text-red-500 text-xs italic">
         {{ message }}
      </p>
      <button
         @click="postNewComment()"
         class="mt-4 mb-2 border-2 border-[#2D6991] bg-[#2D6991] rounded-lg text-sky-50 p-1 font-bold cursor-pointer"
      >
         Envoyer
      </button>
   </div>
</template>

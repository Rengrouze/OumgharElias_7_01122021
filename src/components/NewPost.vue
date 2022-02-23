<script>
export default {
   name: "NewPost",
   data() {
      return {
         // you remember the form data in the "ModifyProfileForm" component?
         // it's nearly the same type of form data as the one in the "ModifyProfileForm" component
         display: false,
         newPost: {
            op: this.$store.state.user.userId,
            text: "",
            mediaurl: "",
            file: "",
         },
         errorMessage: "",
         directLink: false,
         imgFile: "", // image file name
         imgFileShort: "Importer depuis mon pc", // image short file name
         newCommentText: "", // new comment text
      };
   },
   methods: {
      displayForm() {
         // display the form on command
         this.display = !this.display;
      },
      imageWithDirectLink() {
         this.newPost.mediaurl = "";
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

         this.imgFileShort = this.imgFile.split("\\").pop();
         this.newPost.file = this.$refs.imgFile.files[0];
         document.getElementById(newPost).innerHTML = this.imgFileShort;
      },
      createNewPost() {
         // clear error message
         this.errorMessage = "";
         // check empty form
         if (this.newPost.text == "") {
            this.errorMessage = "Vous ne pouvez pas poster un message vide";
            return;
         }
         this.$store
            .dispatch("createPost", this.newPost)
            .then(() => {
               this.newPost.text = "";
               this.newPost.mediaurl = "";
               this.newPost.file = "";
               this.display = false;
            })
            .catch((error) => {
               this.errorMessage = error.message;
            });
      },
   },
};
</script>
<template>
   <!-- still a basic form with a submit button -->
   <div class="flex w-full items-center justify-center flex-col">
      <div
         v-if="!display"
         @click="displayForm()"
         class="flex justify-center items-center border-2 w-11 rounded-full mb-5 h-11 text-3xl cursor-pointer hover:scale-110 transition-all active:scale-125"
      >
         +
      </div>
      <div
         v-if="display"
         @click="displayForm()"
         class="flex justify-center items-center border-2 w-11 rounded-full mb-5 h-11 text-3xl cursor-pointer hover:scale-110 transition-all active:scale-125"
      >
         -
      </div>

      <div
         v-if="display"
         class="flex flex-col p-2 border-2 rounded-xl bg-gray-50 shadow-xl w-full xs:w-8/12 justify-center items-center mb-10"
      >
         <label for="NewPost" class="text-gray-700 text-sm">Ajouter un post</label>
         <textarea
            type="text"
            v-model="newPost.text"
            id="NewPost"
            class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl"
            placeholder="Votre post ici"
         />
         <div class="flex flex-col w-full justify-center items-center">
            <p class="mt-4"><i class="far fa-smile"></i> Vous voulez ajoutez une image ou un gif ?</p>
            <div class="flex md:flex-row flex-col justify-evenly w-2/4 md:w-full">
               <button
                  @click="imageWithDirectLink()"
                  class="mt-4 mb-2 border-2 border-[#2D6991] bg-[#2D6991] rounded-lg text-sky-50 p-1 cursor-pointer hover:scale-105 transition-all"
               >
                  Avec un lien Direct
               </button>
               <input
                  v-if="directLink"
                  v-model="newPost.mediaurl"
                  type="url"
                  class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl md:hidden block"
                  placeholder="Exemple : https://c.tenor.com/x8eBbUiF4RYAAAAS/yes-sweet.gif "
               />
               <label
                  for="file"
                  class="mt-4 mb-2 border-2 border-[#2D6991] bg-[#2D6991] rounded-lg text-sky-50 font-normal p-1 cursor-pointer hover:scale-105 transition-all"
                  id="newPost"
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
                  name="file"
               />
               <input
                  v-if="directLink"
                  v-model="newPost.mediaurl"
                  type="url"
                  class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl md:block hidden"
                  placeholder="Exemple : https://c.tenor.com/x8eBbUiF4RYAAAAS/yes-sweet.gif "
               />
            </div>
         </div>

         <p class="text-red-500 text-xs italic">
            {{ errorMessage }}
         </p>
         <button
            @click="createNewPost()"
            class="mt-4 mb-2 border-2 border-[#2D6991] bg-[#2D6991] rounded-lg text-sky-50 p-1 font-bold cursor-pointer hover:scale-105 transition-all"
         >
            Envoyer
         </button>
      </div>
   </div>
</template>

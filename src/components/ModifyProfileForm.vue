<script>
export default {
   name: "ModifyProfileForm",

   data() {
      return {
         userUpdate: {
            userId: this.$store.state.user.userId,
            firstName: "",
            lastName: "",
            workPlace: "",
            mediaurl: "",
            mod: this.$store.state.user.mod,
            file: "",
         },

         errorMessage: "",
         directLink: false,
         imgFile: "", // image file name
         imgFileShort: "", // image short file name
         secretInput: false,
         secretCode: "",
      };
   },

   methods: {
      imageWithDirectLink() {
         this.userUpdate.mediaurl = "";
         this.directLink = !this.directLink;
         // unload input file
         this.imgFile = "Importer depuis mon pc";
         document.getElementById("imageWithFile").value = null;
         document.getElementById("imageWithFile").innerHTML = this.imgFile;
      },

      imageWithFile() {
         if (this.directLink == true) {
            this.directLink = false;
         }

         this.imgFile = this.$refs.imgFile.value;
         this.userUpdate.file = this.$refs.imgFile.files[0];
         // only keep the name of the file
         this.userUpdate.mediaurl = this.imgFile;
         this.imgFileShort = this.imgFile.split("\\").pop();
         document.getElementById("imageWithFile").innerHTML = this.imgFileShort;
      },
      updateProfile() {
         //clear errormesage
         this.errorMessage = "";
         //check empty form and ingnore if empty
         if (this.userUpdate.firstName == "") {
            this.userUpdate.firstName = this.$store.state.user.firstName;
         }
         if (this.userUpdate.lastName == "") {
            this.userUpdate.lastName = this.$store.state.user.lastName;
         }
         if (this.userUpdate.workPlace == "") {
            this.userUpdate.workPlace = this.$store.state.user.workPlace;
         }
         if (this.userUpdate.mediaurl == "") {
            this.userUpdate.mediaurl = this.$store.state.user.mediaurl;
         }
         // check if there is numbers in the firstname
         if (/\d/.test(this.userUpdate.firstName)) {
            this.errorMessage = "Votre prénom ne doit pas contenir de chiffres";
            return;
         }
         // check if there is numbers in the lastname
         if (/\d/.test(this.userUpdate.lastName)) {
            this.errorMessage = "Votre nom ne doit pas contenir de chiffres";
            return;
         }

         //check if user has checked the checkbox and answered the secret question
         if (this.userUpdate.mod == false) {
            if (this.secretInput == true && this.secretCode == "" && this.secretCode == "Orwell") {
               this.errorMessage = "Veuillez donner le code secret ou décocher la case 'modérateur'";
               return;
            }
            //
            if (this.secretInput == true && this.secretCode == "Orwell") {
               this.userUpdate.mod = 1;
            } else {
               this.userUpdate.mod = 0;
            }
         }

         // send the user data to the server and the file if there is one
         (async () => {
            try {
               const formData = new FormData();
               for (const data in this.userUpdate) {
                  formData.append(data, this.userUpdate[data]);
               }
               const response = await fetch("http://localhost:3003/api/auth/update", {
                  method: "POST",
                  headers: {
                     Authorization: "Token " + localStorage.getItem("token"),
                  },
                  body: formData,
               });
               const data = await response.json();
               if (data.error) {
                  this.errorMessage = data.error;
                  console.log(data.error);
               } else {
                  this.$store.dispatch("updateUser", data);
                  this.errorMessage = "Modification prise en compte";
               }
            } catch (error) {
               this.errorMessage = "erreur";
            }
         })();
      },
   },
};
</script>
<template>
   <div class="flex flex-col w-4/12 justify-center items-center">
      <div class="flex flex-col w-full m-4">
         <label for="userfirstname" class="text-gray-700 text-sm">Prénom</label>
         <input
            type="text"
            id="userfirstname"
            v-model="userUpdate.firstName"
            placeholder="Prénom"
            class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl"
         />
      </div>
      <div class="flex flex-col w-full m-4">
         <label for="userlastname" class="text-gray-700 text-sm">Nom</label>
         <input
            type="text"
            id="userlastname"
            v-model="userUpdate.lastName"
            placeholder="Nom"
            class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl"
         />
      </div>
      <div class="flex flex-col w-full m-4">
         <label for="userworkplace" class="text-gray-700 text-sm">Poste</label>
         <input
            type="text"
            id="userworkplace"
            v-model="userUpdate.workPlace"
            placeholder="Poste"
            class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl"
         />
      </div>
      <div class="flex flex-col w-full justify-center items-center">
         <p class="mt-4"><i class="far fa-smile"></i> Envie de changer de Photo ?</p>
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
               id="imageWithFile"
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
               name="file"
            />
            <input
               v-if="directLink"
               type="url "
               class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl mt-2"
               placeholder="Exemple : https://c.tenor.com/x8eBbUiF4RYAAAAS/yes-sweet.gif "
               v-model="userUpdate.mediaurl"
            />
         </div>
         <p v-if="userUpdate.mod == true">Vous êtes modérateur :)</p>
         <div v-if="userUpdate.mod == false" class="flex w-full flex-col items-center">
            <label for="isamod"> Vous êtes Modérateur ?</label>
            <input id="isamod" type="checkbox" v-model="secretInput" class="checked:bg-blue-500" />
            <div v-if="secretInput" class="flex flex-col w-full justify-center items-center">
               <label for="secretCode" class="text-gray-700 text-sm"> Code secret</label>
               <input
                  if="secretCode"
                  v-model="secretCode"
                  type="text"
                  placeholder="Si vous êtes modérateur, entrez le code secret"
                  class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl"
               />
            </div>
         </div>
         <p class="text-red-500 text-xs italic">
            {{ errorMessage }}
         </p>

         <button
            @click="updateProfile()"
            class="mt-4 mb-2 border-2 border-[#2D6991] bg-[#2D6991] rounded-lg text-sky-50 p-1 font-bold cursor-pointer"
         >
            Envoyer
         </button>
      </div>
   </div>
</template>

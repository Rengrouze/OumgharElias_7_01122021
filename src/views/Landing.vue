<!-- Contains the feed section -->

<template>
   <div class="flex flex-col items-center w-4/12 ml-auto mr-auto">
      <div class="flex flex-col items-center mt-40 w-full h-6/12">
         <div class="h-36">
            <img class="h-36" src="/src/assets/icon-above-font.svg" />
         </div>
         <form id="landingForm" class="flex flex-col w-full">
            <div class="flex flex-col">
               <label for="logName">Email</label>
               <input class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl" type="mail" id="logName" required v-model="form.email" />
            </div>

            <div class="flex flex-col w-full">
               <label for="logPass">Mot de passe</label>
               <input
                  class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl"
                  type="password"
                  id="logPass"
                  required
                  v-model="form.password"
               />
            </div>

            <div class="animate-fade opacity-1" v-if="showSignupForm == true">
               <div class="flex flex-col w-full">
                  <label for="logPassConfirm">Confirmer le mot de passe</label>
                  <input
                     class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl"
                     type="password"
                     id="logPassConfirm"
                     required
                     v-model="passwordConfirm"
                  />
               </div>
               <div class="flex flex-col w-full">
                  <label for="name">Nom</label>
                  <input class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl" type="text" id="name" required v-model="form.name" />
               </div>
               <div class="flex flex-col w-full">
                  <label for="firstName">Prénom</label>
                  <input
                     class="w-full h-10 p-2 border-2 border-[#091F43] rounded-xl"
                     type="text"
                     id="firstName"
                     required
                     v-model="form.surName"
                  />
               </div>
            </div>
         </form>
         <div class="text-red-600 pt-3">{{ message }}</div>
         <div class="flex flex-row justify-between mt-10 w-full">
            <button
               @click="showSignupForm = true"
               v-if="showSignupForm == false"
               class="border-2 border-blue-400 rounded w-32 hover:bg-blue-400 hover:text-white transition-all"
            >
               S'inscrire
            </button>
            <button
               @click="showSignupForm = false"
               v-if="showSignupForm == true"
               class="border-2 border-blue-400 rounded w-32 hover:bg-blue-400 hover:text-white transition-all"
            >
               Retour
            </button>
            <button @click="login" v-if="showSignupForm == false" class="border-2 border-blue-800 bg-blue-400 text-white rounded w-32">
               Connexion
            </button>
            <button v-if="showSignupForm == true" @click="signup" class="border-2 border-blue-800 bg-blue-400 text-white rounded w-32">
               Confirmer
            </button>
         </div>
      </div>
   </div>
</template>

<script>
// @ is an alias to /src

export default {
   // check before created if the user is already logged in
   beforeRouteEnter(to, from, next) {
      if (localStorage.getItem("user") && !localStorage.getItem("token")) {
         localStorage.removeItem("user");
      }
      if (localStorage.getItem("token")) {
         next("/home");
      } else {
         next();
      }
   },
   name: "Landing",
   components: {},
   data() {
      return {
         message: "",
         showSignupForm: false,
         form: {
            email: "",
            password: "",
            name: "",
            surName: "",
         },
         passwordConfirm: "",
      };
   },
   methods: {
      signup() {
         //check empty form
         //reset message
         this.message = "";
         if (
            this.form.email == "" ||
            this.form.password == "" ||
            this.form.passwordConfirm == "" ||
            this.form.name == "" ||
            this.form.surName == ""
         ) {
            this.message = "Veuillez remplir tous les champs";
            return;
         }

         if (this.form.password !== this.passwordConfirm) {
            this.message = "Les mots de passe ne correspondent pas";
            return;
         }
         // check if email is valid
         if (!this.form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            this.message = "Votre email n'est pas valide";
            return;
         }
         //check if there is number in name and firstname
         if (this.form.name.match(/\d/) || this.form.surName.match(/\d/)) {
            this.message = "Votre nom et prénom ne doivent pas contenir de chiffres";
            return;
         }

         this.$store
            .dispatch("signup", this.form)
            .then(() => {
               this.$router.push("/home");
            })
            .catch((error) => {
               this.message = error.message;
            });
      },

      login() {
         //check empty form
         //reset message
         this.message = "";
         if (this.form.email == "" || this.form.password == "") {
            this.message = "Veuillez remplir tous les champs";
            return;
         }
         // check if email is valid
         if (!this.form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            this.message = "Votre email n'est pas valide";
            return;
         }

         // call the api
         this.$store
            .dispatch("login", this.form)
            .then(() => {
               this.$router.push("/home");
            })
            .catch((error) => {
               this.message = error.message;
            });
      },
   },
};
</script>

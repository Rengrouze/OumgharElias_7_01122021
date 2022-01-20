<!-- Contains the feed section -->

<template>
   <div class="flex flex-col items-center w-4/12 ml-auto mr-auto">
      <div class="flex flex-col items-center mt-40 w-full h-6/12">
         <div @click="showSignupForm = false" class="h-36">
            <img class="h-36" src="/src/assets/icon-above-font.svg" />
         </div>
         <form id="landingForm" class="flex flex-col w-full">
            <div class="flex flex-col">
               <label for="logName">Email</label>
               <input class="border-2 border-black rounded-sm" type="mail" id="logName" required v-model="form.email" />
            </div>

            <div class="flex flex-col w-full">
               <label for="logPass">Mot de passe</label>
               <input class="border-2 border-black rounded-sm" type="password" id="logPass" required v-model="form.password" />
            </div>

            <div class="animate-fade opacity-1" v-if="showSignupForm == true">
               <div class="flex flex-col w-full">
                  <label for="logPassConfirm">Confirmer le mot de passe</label>
                  <input
                     class="border-2 border-black rounded-sm"
                     type="password"
                     id="logPassConfirm"
                     required
                     v-model="form.passwordConfirm"
                  />
               </div>
               <div class="flex flex-col w-full">
                  <label for="name">Nom</label>
                  <input class="border-2 border-black rounded-sm" type="text" id="name" required v-model="form.name" />
               </div>
               <div class="flex flex-col w-full">
                  <label for="firstName">Prénom</label>
                  <input class="border-2 border-black rounded-sm" type="text" id="firstName" required v-model="form.firstName" />
               </div>
            </div>
         </form>
         <div class="text-red-600 pt-3">{{ message }}</div>
         <div class="flex flex-row justify-between mt-10 w-full">
            <button
               @click="showSignupForm = true"
               class="border-2 border-blue-400 rounded w-32 hover:bg-blue-400 hover:text-white transition-all"
               to="/about"
            >
               S'inscrire
            </button>
            <router-link v-if="showSignupForm == false" class="border-2 border-blue-800 bg-blue-400 text-white rounded w-32" to="/about"
               >Connexion</router-link
            >
            <button
               v-if="showSignupForm == true"
               @click="signup"
               class="border-2 border-blue-800 bg-blue-400 text-white rounded w-32"
               to="/about"
            >
               Confirmer
            </button>
         </div>
      </div>
   </div>
</template>

<script>
// @ is an alias to /src

export default {
   name: "Landing",
   components: {},
   data() {
      return {
         message: "",
         showSignupForm: false,
         form: {
            email: "",
            password: "",
            passwordConfirm: "",
            name: "",
            firstName: "",
         },
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
            this.form.firstName == ""
         ) {
            this.message = "Veuillez remplir tous les champs";
            return;
         }
         // check weak password (special characters and numbers)
         if (this.form.password.length < 8) {
            this.message = "Votre mot de passe est trop faible";
            return;
         }

         if (this.form.password !== this.form.passwordConfirm) {
            this.message = "Les mots de passe ne correspondent pas";
            return;
         }
         // check if email is valid
         if (!this.form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            this.message = "Votre email n'est pas valide";
            return;
         }
         //check if there is number in name and firstname
         if (this.form.name.match(/\d/) || this.form.firstName.match(/\d/)) {
            this.message = "Votre nom et prénom ne doivent pas contenir de chiffres";
            return;
         }

         this.$store.dispatch("signup", this.form);

         if (this.$store.state.user.isLogged) {
            this.$router.push("/about");
         } else {
            this.message = "Une erreur est survenue";
         }
      },
   },
};
</script>

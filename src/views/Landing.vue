<!-- Contains the feed section -->

<template>
   <div class="flex flex-col items-center w-4/12 ml-auto mr-auto">
      <div class="flex flex-col items-center mt-40 w-full h-6/12">
         <div class="h-36">
            <img class="h-36" src="/src/assets/icon-above-font.svg" />
         </div>
         <div class="flex flex-col w-full">
            <div class="flex flex-col mb-10">
               <label for="logName">Identifiant</label>
               <input class="border-2 border-black rounded-sm" type="text" id="logName" required v-model="message" />
            </div>
            <div class="flex flex-col w-full">
               <label for="logPass">Mot de passe</label>
               <input class="border-2 border-black rounded-sm" type="password" id="logPass" required v-model="message" />
            </div>
            <div class="flex flex-row justify-between mt-10">
               <router-link class="border border-blue-400 rounded w-3/12" to="/about">S'inscrire</router-link>
               <router-link class="border border-blue-800 bg-blue-400 text-white rounded w-3/12" to="/about">Connexion</router-link>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
// @ is an alias to /src

export default {
   name: "Landing",
   components: {},
};
</script>

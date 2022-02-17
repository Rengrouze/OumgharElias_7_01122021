<template>
   <Header>
      <template v-slot:demiurge
         ><p class="text-blue-500 md:block hidden"><router-link to="/home">Revenir à l'accueil</router-link></p></template
      >
   </Header>
   <div class="home w-full flex justify-center h-auto">
      <div class="flex h-auto w-10/12 mt-12 border-l-2 border-r-2 pr-3 pl-3 flex-col items-center">
         <ModifyProfileForm />
         <router-link to="/home" class="text-blue-500 mt-5 md:hidden block">Revenir à l'accueil</router-link>
      </div>
   </div>
</template>
<script>
import Header from "../components/Header.vue";
import ModifyProfileForm from "../components/ModifyProfileForm.vue";

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
   name: "Profile",
   components: {
      Header,
      ModifyProfileForm,
   },
   methods: {},
};
</script>

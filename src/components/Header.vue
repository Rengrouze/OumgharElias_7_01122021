<script>
import ProfileCard from "./ProfileCard.vue";
import { mapState } from "vuex";
export default {
   beforeMount() {
      // if the user is not set in the state, get it from the local storage
      if (localStorage.getItem("token") && this.$store.state.user.userId == null) {
         this.$store.dispatch("getUser");
      }
   },
   name: "Header",
   components: {
      ProfileCard,
   },
   computed: {
      ...mapState(["user"]),
   },
   methods: {
      logout() {
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         this.$store.dispatch("deleteUser");
         this.$router.push("/");
      },
   },
};
</script>
<template>
   <header class="bg-[#E1DFE4] flex justify-between items-center top-0 p-5 shadow-lg h-auto">
      <div>
         <!-- profile card is a component where we display the user info -->
         <ProfileCard>
            <template v-slot:userProfilePic>
               <img
                  class="md:w-20 md:h-20 w-16 h-16 object-cover rounded-full overflow-hidden border-2 border-[#D1515A] md:border-4"
                  alt="profilepic"
                  :src="user.mediaurl"
               />
            </template>
            <template v-slot:userFullName> {{ user.firstName + " " + user.lastName }} </template>
            <template v-slot:userWorkPlace> {{ " " + user.workPlace }} </template>
         </ProfileCard>
         <!-- log out button -->
         <button class="mt-4 text-red-600 font-bold text-xl hover:underline" @click="logout">Déconnexion</button>
      </div>
      <div class="w-6/12 lg:w-3/12 relative">
         <!-- button to go back to the home page -->
         <router-link to="/home"
            ><img src="../assets/glogb.svg" class="md:opacity-100 opacity-0 hover:scale-105 transition-all" alt="Logo de Groupomania" />
            <img
               src="../assets/icon.svg"
               alt="Logo de Groupomania"
               class="md:opacity-0 opacity-100 w-20 h-20 absolute object-cover rounded-full right-5 -top-6 hover:scale-105 transition-all active:scale-105"
         /></router-link>
         <!-- special section that allows me to redirect to the moderation page or the home page -->
         <slot name="demiurge"></slot>
      </div>
   </header>
</template>

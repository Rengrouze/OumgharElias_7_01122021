<script>
import ProfileCard from "./ProfileCard.vue";
import { mapState } from "vuex";
export default {
   beforeMount() {
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

         <button class="mt-4 text-red-600 font-bold text-xl" @click="logout">Déconnexion</button>
      </div>
      <div class="w-6/12 lg:w-3/12 relative">
         <router-link to="/home"
            ><img src="../assets/glogb.svg" class="md:opacity-100 opacity-0" />
            <img src="../assets/icon.svg" class="md:opacity-0 opacity-100 w-20 h-20 absolute object-cover rounded-full right-5 -top-6"
         /></router-link>

         <slot name="demiurge"></slot>
      </div>
   </header>
</template>

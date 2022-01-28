<script>
import ProfileCard from "./ProfileCard.vue";
export default {
   name: "Header",
   components: {
      ProfileCard,
   },
   methods: {
      logout() {
         this.$store.dispatch("logout");
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
                  class="w-20 h-20 object-cover rounded-full overflow-hidden border-4 border-[#2D6991]"
                  alt="profilepic"
                  src="../assets/testmoi.jpg"
               />
            </template>
            <template v-slot:userFullName> Elias Oumghar </template>
            <template v-slot:userWorkPlace> It departement </template>
         </ProfileCard>

         <button class="mt-4 text-red-600 font-bold text-xl" @click="logout">Déconnexion</button>
      </div>
      <div class="w-6/12 lg:w-3/12">
         <router-link to="/home"><img src="../assets/glogb.svg" /></router-link>
      </div>
   </header>
</template>

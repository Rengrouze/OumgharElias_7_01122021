<template>
   <div class="flex h-full">
      <!-- background -->
      <div>
         <!-- feed section -->

         <div>
            <!--feed frame-->
            <div>
               Utilisateur connecté "{{ getUser }}" Ut elit deserunt qui aliqua laborum cupidatat deserunt Lorem. Reprehenderit ullamco sit
               fugiat excepteur occaecat consectetur laborum esse.
            </div>
            <button class="bg-slate-300 border-2 border-red-700 rounded-full" @click="incrementAge">Un an de plus</button>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   name: "Feed",
   computed: {
      ...mapGetters(["getUser"]),
   },
   methods: {
      incrementAge() {
         this.$store.commit("INCREMENT_AGE");
      },
   },
};
</script>

<script>
export default {
   name: "Header",
};
</script>
<template>
   <header class="bg-[#F1F2F6] flex justify-between items-center top-0 p-5 shadow-lg h-auto">
      <div class="w-20 h-full rounded-full overflow-hidden border-4 border-[#091F43]">
         <router-link to="/about"><img class="h-full m-0" alt="profilepic" src="../assets/testmoi.jpg" /></router-link>
      </div>
      <div class="w-6/12 lg:w-3/12">
         <router-link to="/"><img src="../assets/glogb.svg" /></router-link>
      </div>
   </header>
</template>

<script>
export default {
   name: "Header",
};
</script>
<template>
   <header class="bg-[#F1F2F6] flex top-0 p-5 shadow-lg">
      <div class="w-20 rounded-full overflow-hidden border-4 border-[#091F43]">
         <router-link to="/about"><img class="h-full" alt="profilepic" src="../assets/testmoi.jpg" /></router-link>
      </div>
      <div class="flex-auto m-auto">
         <router-link to="/"><img src="../assets/glog.png" /></router-link>
      </div>
   </header>
</template>

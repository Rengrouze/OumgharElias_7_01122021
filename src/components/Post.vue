<script>
export default {
   name: "Post",
};
</script>
<template>
   <div class="flex flex-col h-auto border w-10/12 justify-center items-center">
      <!-- header section -->
      <div class="flex w-full h-auto p-6 justify-between">
         <!-- Op section -->
         <div class="flex w-full">
            <div class="h-24 rounded-full border-4 border-emerald-300 overflow-hidden">
               <img src="/src/assets/testmoi.jpg" class="w-full h-full" />
            </div>
            <div class="flex flex-col items-start ml-4 pt-2">
               <p>Elias Oumghar</p>
               <p><i class="far fa-building"></i> IT Department</p>
               <p class="text-xs pt-2 text-slate-600">Posté le 20/10/2019</p>
            </div>
            <!-- media info section -->
         </div>
         <div class="flex items-center text-2xl pr-5"><i class="fas fa-bars"></i></div>
      </div>
      <!-- separator -->
      <div class="h-1 w-11/12 bg-slate-200"></div>

      <!-- Content of the post -->
      <div class="p-5 w-8/12 h-auto">
         <p>Quand j'oublie ce que je dois coder pour que tout marche</p>
         <img src="https://c.tenor.com/bVh8C-q-TG4AAAAM/interstellar-cost.gif" class="w-full h-full pt-5 pb-5" />
      </div>
      <!-- separator -->
      <div class="h-1 w-11/12 bg-slate-200"></div>
      <!-- interation section -->
      <div class="flex w-full p-2 justify-evenly">
         <div><i class="far fa-comment"></i> 10</div>
         <div class="h-full w-2 border-l-2 border-slate-300"></div>
         <div><i class="far fa-heart"></i> 50</div>
      </div>
   </div>
</template>

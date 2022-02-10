<script>
export default {
   name: "comment",
   props: {
      idComment: String,

      visibleComment: {
         type: Boolean,
         default: true,
      },

      reportedComment: {
         type: Boolean,
         default: false,
      },
   },
   methods: {
      supressComment() {
         this.$props.visibleComment = false;
      },
   },
   data() {
      return {
         supressCommentConfirm: false,
      };
   },
};
</script>

<template>
   <div v-if="visibleComment == true" class="flex flex-col p-2 border border-gray-300 rounded-xl bg-gray-50 shadow-xl mb-2 w-full">
      <div class="flex flex-col items-center w-full" :id="'comment' + idComment">
         <div class="flex w-full flex-row justify-between">
            <div class="flex flex-row items-center">
               <slot name="profilePic"></slot>
               <p class="flex-wrap pb-4"><slot name="userName"></slot></p>
            </div>

            <p class="text-xs text-slate-600">Posté le <slot name="date"></slot> à <slot name="time"></slot></p>
            <div v-if="this.$store.state.user.mod == 0">
               <div v-if="reportedComment == false" class="group text-2xl relative">
                  <i class="fas fa-bars transition-opacity opacity-100 duration-300 group-hover:opacity-0 group-hover:-z-10 absolute"></i>
                  <div
                     @click="reportedComment = true"
                     class="opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 text-red-600 active:text-red-300 cursor-pointer"
                  >
                     Signaler
                  </div>
               </div>
            </div>
            <div v-if="this.$store.state.user.mod == 1">
               <div v-if="supressCommentConfirm == false" class="group text-2xl relative">
                  <i class="fas fa-bars transition-opacity opacity-100 duration-300 group-hover:opacity-0 group-hover:-z-10 absolute"></i>
                  <div
                     @click="supressCommentConfirm = true"
                     class="opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 text-red-600 active:text-red-300 cursor-pointer"
                  >
                     Supprimer ?
                  </div>
               </div>
            </div>

            <div v-if="reportedComment == true && this.$store.state.user.mod == 0">Post signalé</div>
            <div @click="supressComment()" v-if="supressCommentConfirm == true && this.$store.state.user.mod == 1">
               Veuillez cliquez à nouveau pour confirmer
            </div>
         </div>
         <div class="h-1 w-10/12 -mt-1 rounded-xl bg-[#2D6991]"></div>
         <div class="flex flex-col mt-5 justify-center items-center">
            <p><slot name="text"></slot></p>
            <slot name="media"></slot>
         </div>

         <!-- media info section -->
      </div>
   </div>
</template>

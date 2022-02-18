<script>
export default {
   name: "comment",
   props: {
      idComment: Number,
      idPost: Number,

      idUser: Number,

      visibleComment: {
         type: Boolean,
         default: true,
      },
   },
   created() {
      if (this.idUser == this.$store.state.user.userId) {
         this.isOp = true;
      } else {
         this.isOp = false;
      }
   },
   computed: {
      specifiedComment() {
         //get the post in the state then find the comment
         return this.$store.state.posts.find((post) => post.id == this.idPost).comment.find((comment) => comment.id == this.idComment);
      },
      reported() {
         return this.specifiedComment.report;
      },
      isOp() {
         return this.specifiedComment.user.id == this.$store.state.user.userId;
      },
   },
   methods: {
      supressComment() {
         var supress = confirm("Voulez-vous vraiment supprimer ce commentaire ?");
         if (!supress) {
            return;
         }
         if (!this.visibleComment) {
            this.suppressChecker.signal = 1;
         } else {
            this.suppressChecker.signal = 0;
         }
         this.$store.dispatch("supressComment", this.suppressChecker).then(() => {
            this.suppressChecker.signal = 0;
         });
      },
   },
   data() {
      return {
         suppressChecker: {
            commentId: this.idComment,
            signal: null,
         },
      };
   },
};
</script>

<template>
   <div v-if="visibleComment == true" class="flex flex-col p-2 border border-gray-300 rounded-xl bg-gray-50 shadow-xl mb-2 w-full">
      <div class="flex flex-col items-center w-full" :id="'comment' + idComment">
         <div class="flex w-full lg:flex-row flex-col justify-between">
            <div class="flex flex-row items-center justify-between">
               <div class="flex flex-row items-center">
                  <slot name="profilePic"></slot>
                  <p class="flex-wrap pb-4 pt-2"><slot name="userName"></slot></p>
               </div>

               <div class="lg:hidden block" v-if="this.$store.state.user.mod == 1 || this.isOp == 1">
                  <button @click="supressComment()" class="text-red-500 font-bold py-2 px-4 rounded-full">
                     <i class="fas fa-trash-alt"></i>
                  </button>
               </div>
            </div>

            <p class="text-xs text-slate-600 pt-2">Posté le <slot name="date"></slot> à <slot name="time"></slot></p>

            <div class="hidden lg:block" v-if="this.$store.state.user.mod == 1 || this.isOp == 1">
               <button @click="supressComment()" class="text-red-500 font-bold py-2 px-4 rounded-full">
                  <i class="fas fa-trash-alt"></i>
               </button>
            </div>
         </div>
         <div class="h-1 w-10/12 rounded-xl mt-5 lg:mt-0 bg-[#2D6991]"></div>
         <!-- media info section -->
         <div class="flex flex-col mt-5 justify-center items-center">
            <p class="h-auto whitespace-pre-wrap"><slot name="text"></slot></p>
            <slot name="media"></slot>
         </div>
      </div>
   </div>
</template>

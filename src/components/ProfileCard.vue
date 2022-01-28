<script>
export default {
   name: "ProfileCard",
};
</script>
<template>
   <div class="flex items-center flex-1">
      <router-link to="/home"><slot name="userProfilePic"></slot></router-link>

      <div class="flex flex-col items-start ml-4 pt-2 text-ellipsis whitespace-nowrap overflow-hidden">
         <p><slot name="userFullName"></slot></p>
         <p><i class="far fa-building"></i><slot name="userWorkPlace"></slot></p>
         <router-link to="/Profile" class="text-xs pt-2 text-slate-600">Modifier profil</router-link>
      </div>
   </div>
</template>

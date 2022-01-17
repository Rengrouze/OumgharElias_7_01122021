import { createRouter, createWebHistory } from "vue-router";
import Header from "./components/Header.vue";

export default createRouter({
   history: createWebHistory(),
   routes: [
      {
         path: "/",
         component: Header,
      },
      {
         path: "/about",
         component: Header,
      },
   ],
});

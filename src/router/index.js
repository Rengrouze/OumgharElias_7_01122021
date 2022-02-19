import { createRouter, createWebHashHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Moderation from "../views/Moderation.vue";

const routes = [
   {
      // Landing page
      path: "/",
      name: "Landing",
      component: Landing,
   },
   {
      // Home page
      path: "/home",
      name: "home",
      component: Home,
   },
   {
      // Profile page
      path: "/Profile",
      name: "Profile",
      component: Profile,
   },
   {
      // Moderation page
      path: "/symes",
      name: "symes",
      component: Moderation,
   },
];

const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

export default router;

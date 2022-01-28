import { createRouter, createWebHashHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
const routes = [
   {
      path: "/",
      name: "Landing",
      component: Landing,
   },
   {
      path: "/home",
      name: "home",
      component: Home,
   },
   {
      path: "/Profile",
      name: "Profile",
      component: Profile,
   },
];

const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

export default router;

import { createRouter, createWebHashHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Home from "../views/Home.vue";

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
];

const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

export default router;

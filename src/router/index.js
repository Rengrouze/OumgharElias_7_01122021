import { createRouter, createWebHashHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import About from "../views/About.vue";

const routes = [
   {
      path: "/",
      name: "Landing",
      component: Landing,
   },
   {
      path: "/about",
      name: "About",
      component: About,
   },
];

const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

export default router;

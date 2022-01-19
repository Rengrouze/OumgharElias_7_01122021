import { createRouter, createWebHashHistory } from "vue-router";
import Landing from "../views/Landing.vue";

const routes = [
   {
      path: "/",
      name: "Landing",
      component: Landing,
   },
   {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
         return import(/* webpackChunkName: "about" */ "../views/About.vue");
      },
   },
];

const router = createRouter({
   history: createWebHashHistory(),
   routes,
});

export default router;

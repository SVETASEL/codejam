import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/reservas",
    name: "reservas",
    component: () => import("../views/ReservaView.vue"),
    // meta: {
    //   login: true,
    // },
  },
  {
    path: "/mis-reservas",
    name: "mis-reservas",
    component: () => import("../views/MisReservasView.vue"),
    // meta: {
    //   login: true,
    // },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/confirmacion",
    name: "confirmacion",
    component: () => import("../views/ConfirmacionView.vue"),
    // meta: {
    //   login: true,
    // },
  },
  {
    path: "/update",
    name: "update",
    component: () => import("../views/UpdateReservaView.vue"),
    // meta: {
    //   login: true,
    // },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.login) {
//     if (store.state.user) {
//       next();
//     } else {
//       alert("Usted no puede acceder a esta vista, necesita estar autenticado");
//       next("/login");
//     }
//   } else {
//     next();
//   }
// });
export default router;

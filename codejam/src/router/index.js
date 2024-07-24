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
  },
  {
    path: "/mis-reservas",
    name: "mis-reservas",
    component: () => import("../views/MisReservasView.vue"),
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
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

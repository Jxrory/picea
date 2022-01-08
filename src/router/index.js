import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login"),
  },
  {
    path: "/todo",
    name: "TODO",
    component: () => import("@/views/todo"),
  },
  {
    path: "/config",
    name: "Config",
    component: () => import("@/views/config"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

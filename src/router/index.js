import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/todo",
  },
  {
    path: "/todo",
    name: "TODO",
    component: () => import("@/views/todo"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

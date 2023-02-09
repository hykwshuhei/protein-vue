import { createRouter, createWebHistory } from "vue-router";
import UserNew from "../views/UserNew.vue";
import LoginForm from "../views/LoginForm.vue";
import ListItem from "../views/ListItem.vue";
import ItemDetail from "../views/ItemDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "list",
      component: ListItem,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/new",
      name: "new",
      component: UserNew,
    },
    {
      path: "/login",
      name: "login",
      component: LoginForm,
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: ItemDetail,
      props: true,
    },
  ],
});

export default router;

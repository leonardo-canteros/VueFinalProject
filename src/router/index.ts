import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/products",
      name: "products",
      component: () => import("../views/ProductsListView.vue"),
    },
    {
      path: "/product/:id(\\d+)",
      name: "productId",
      component: () => import("../components/products/ProductDetails.vue"),
    },
    {
      path: "/ProductCreate",
      name: "ProductCreate",
      component: () => import("../views/ProductCreateView.vue"),
    },
    {
      path: "/edit-product/:id(\\d+)",
      name: "ProductUpdateForm",
      component: () => import("../components/products/ProductUpdateForm.vue"),
    },
    {
      path: "/ProductUpdate",
      name: "ProductUpdate",
      component: () => import("../views/ProductUpdateView.vue"),
    },
    {
      path: "/ProductDelete/:id(\\d+)",
      name: "ProductDelete",
      component: () => import("../components/products/ProductDelete.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersListView.vue')
    },
  ],
});

export default router;

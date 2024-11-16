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
      path: "/products",
      name: "products",
      component: () => import("../views/ProductsView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      // /:orderId -> matches only numbers
      path: "/product/:id(\\d+)",
      name: "productId",
      component: () => import("../views/ProductDetailsView.vue"),
    },
    {
      path: "/AddProduct",
      name: "AddProduct",
      component: () => import("../views/AddProductView.vue"),
    },
    {
      path: "/UpdateFormProduct",
      name: "UpdateFormProduct",
      component: () => import("../components/products/UpdateFormProduct.vue"),
    },
    {
      path: "/TestView",
      name: "TestView",
      component: () => import("../views/TestView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersListView.vue')
    },
  ],
});

export default router;

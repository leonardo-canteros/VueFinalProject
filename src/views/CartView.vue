<template>
    <v-container class="d-flex flex-column justify-center">
      <h1 class="my-2">Mi Carrito</h1>
  
      <v-list v-if="cartProducts.length > 0" dense>
      <ProductDetails/>
      </v-list>
  
      <v-alert v-else type="info">Tu carrito está vacío</v-alert>
  
      <CartSuma :products = "cartProducts" />
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { useCartStore } from "@/stores/cart";
  import { useAuthStore } from "@/stores/auth";
  

  import { storeToRefs } from "pinia";
  import { onMounted } from "vue";
  import ProductDetails from "@/components/products/ProductDetails.vue";
  import CartSuma from "@/components/products/CartSuma.vue";
  
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const { cartProducts } = storeToRefs(cartStore);
  
  // Cargar el carrito del usuario cuando se monta la vista
  onMounted(() => {
    if (authStore.isLoggedIn) {
      const userId = authStore.userId;
      cartStore.fetchCartProducts(userId);
    }
  });
  </script>
  
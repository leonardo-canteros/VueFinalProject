<template>
  <v-container class="d-flex flex-column justify-center">
    <h1 class="my-2">Mi Carrito</h1>

    <!-- Solo muestra los productos si cartProducts tiene productos -->
    <v-list v-if="cartProducts.order_products.length > 0" dense>
      <CartItem
        v-for="product in cartProducts.order_products"
        :key="product.id"
        :product="product"
      />
    </v-list>
    
    <!-- Si no hay productos en el carrito, muestra un mensaje -->
    <v-alert v-else type="info">Tu carrito está vacío</v-alert>

    <!-- Aquí pasamos solo el arreglo de productos -->
    <CartSuma :product="cartProducts.order_products" />
  </v-container>
</template>

<script setup lang="ts">
import CartSuma from "@/components/products/CartSuma.vue";
import CartItem from "@/components/products/cartItem.vue";
import { useCartStore } from "@/stores/cart";
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const store = useCartStore();
const cartProducts = store.cartProducts;    
const userId = authStore.getUserId();

console.log("ID del usuario:", userId);

onMounted(() => {
  store.fetchCartProducts(userId);
});


</script>

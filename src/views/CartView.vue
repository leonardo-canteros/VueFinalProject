<template>
  <v-container class="d-flex flex-column justify-center">
    <h1 class="my-2">Mi Carrito</h1>

    <v-list v-if="cartProducts.order_products.length > 0" dense>
      <CartItem
        v-for="products in cartProducts.order_products"
        :key="products.product_id"
        :product="products"
      />
    </v-list>

    <v-alert v-else type="info">Tu carrito está vacío</v-alert>

    <!-- Muestra la suma de los productos -->
    <CartSuma :product ="cartProducts.order_products" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CartSuma from "@/components/products/CartSuma.vue";
import CartItem from "@/components/products/cartItem.vue";


// Simula productos estáticos para el carrito
const cartProducts = ref({
  customer_id: "12345",  // ID del cliente
  order_products: [
    { product_id: "1", price: 100, quantity: 2, name: "Producto 1", image: "https://via.placeholder.com/80" },
    { product_id: "2", price: 200, quantity: 1, name: "Producto 2", image: "https://via.placeholder.com/80" },
    { product_id: "3", price: 150, quantity: 3, name: "Producto 3", image: "https://via.placeholder.com/80" }
  ],
  status: "shopping", // Estado del carrito
  id: "order-12345"  // ID del carrito o pedido
});

const authStore = { isLoggedIn: true };  // Establecer como true para simular que el usuario está autenticado
</script>

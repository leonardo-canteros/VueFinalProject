<template >
  <v-container class="d-flex flex-column justify-center">
    <h1 class="my-2">Mi Carrito</h1>
    
    <!-- Solo muestra los productos si cartProducts tiene productos -->
    <v-list v-if="cartProducts.order_products.length > 0" dense>
      <CartItem v-for="product in cartProducts.order_products"
       :key="product.product_id" :product="product" />
    </v-list>

    <!-- Si no hay productos en el carrito, muestra un mensaje -->
    <v-alert v-else="cartProducts.order_products.length === 0" type="info">Tu carrito está vacío</v-alert>

    <!-- Aquí pasamos solo el arreglo de productos -->
    <CartSuma :product="cartProducts.order_products" />
  </v-container>
</template>

<script setup lang="ts">
import CartSuma from "@/components/products/CartSuma.vue";
import CartItem from "@/components/products/cartItem.vue";
import { useCartStore } from "@/stores/cart";
import type { Orders01 } from "@/stores/cart";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const store = useCartStore();  

const cartProducts = ref<Orders01>({
    customer_id: "",
    order_products: [],
    status: "",
    id: "",
  });

console.log("cartProducts:", cartProducts.value);
console.log("cartProducts.order_products.length", cartProducts.value.order_products.length);


// onMounted para inicializar el carrito
try {
    onMounted(async () => {
        const userId = authStore.getUserId();
        console.log("userId", userId);
        const response = await store.fetchCartProducts(userId);
        console.log("Respuesta del carrito:", response);
        cartProducts.value = response;
        console.log("cartProducts.value", cartProducts.value);
        return response;
    })
  } catch (error) {
      console.error("Error al cargar los productos del carrito:", error);
    }
  
</script>

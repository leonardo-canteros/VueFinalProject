<template >
  <v-container class="d-flex flex-column justify-center">
    <h1 class="my-2">My Cart</h1>
    
    <!-- Solo muestra los productos si cartProducts tiene productos -->
    <v-list v-if="cartProducts.order_products.length > 0" dense>
      <CartItem v-for="product in cartProducts.order_products"
       :key="product.product_id" 
       :product="product"
       @cartUpdated="reloadCart" 
        />
    </v-list>

    <!-- Si no hay productos en el carrito, muestra un mensaje -->
    <v-alert v-else="cartProducts.order_products.length === 0" type="info"> Your cart is empty</v-alert>

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
// Función para cargar el carrito
const loadCart = async () => {
  const customer_id = authStore.getUserId();
  const response = await useCartStore().fetchCartProducts(customer_id);
  cartProducts.value = response;
};

// Función para recargar el carrito después de un cambio
const reloadCart = async () => {
  await loadCart();
};

onMounted(loadCart);
</script>

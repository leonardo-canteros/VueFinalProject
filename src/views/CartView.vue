<template >
  <v-container class="d-flex flex-column justify-center">
    <h1 class="my-2">My Cart</h1>

    <!-- Si no hay productos en el carrito, muestra un mensaje -->
    <v-alert v-if="cartProducts.order_products.length === 0" type="info"> Your cart is empty</v-alert>
    
    <!-- Solo muestra los productos si cartProducts tiene productos -->
    <v-list v-if="cartProducts.order_products.length > 0" dense>
      <CartItem v-for="product in cartProducts.order_products"
       :key="product.product_id" 
       :product="product"
       @cartUpdated="reloadCart" 
        />
    </v-list>

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
const userId = authStore.getUserId();

const cartProducts = ref<Orders01>({
    customer_id: "",
    order_products: [],
    status: "",
    id: "",
  });
  
  // Función para cargar el carrito
  const loadCart = async () => {
  const customer_id = authStore.getUserId();
  const response = await useCartStore().fetchCartProducts(customer_id);
  // Valida que response no sea undefined o null
  if (!response) {
        console.warn("Carrito no encontrado, asignando un carrito vacío");
        cartProducts.value = {
        customer_id: userId,
        order_products: [],
        status: "",
        id: "",
          };
        } else {
         cartProducts.value = response;
         }
      console.log("cartProducts.value", cartProducts.value);
   };

// Función para recargar el carrito después de un cambio
const reloadCart = async () => {
  await loadCart();
};

console.log("cartProducts:", cartProducts.value);
console.log("cartProducts.order_products.length", cartProducts.value.order_products.length);

// onMounted para inicializar el carrito
    onMounted(async () => {
        const userId = authStore.getUserId();
        console.log("userId", userId);
        const response = await store.fetchCartProducts(userId);
        console.log("Respuesta del carrito:", response);
        // Valida que response no sea undefined o null
        if (!response) {
        console.warn("Carrito no encontrado, asignando un carrito vacío");
        cartProducts.value = {
        customer_id: userId,
        order_products: [],
        status: "",
        id: "",
          };
        } else {
         cartProducts.value = response;
         }
      console.log("cartProducts.value", cartProducts.value);
    })

</script>

<template>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ product.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ product.price  }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
      <!-- Redirigir al detalle del producto cuando el usuario hace clic en el botón -->
     <RouterLink :to="{ name: 'productId', params: { id: product.id } }"></RouterLink>
        <v-btn>Ver Detalles</v-btn>
        <v-btn @click="removeFromCart" color="red">Eliminar</v-btn>
        <RouterLink :to="`/product/${product.id}`">
          <v-btn>Ver Detalles</v-btn>
        </RouterLink>
      </v-list-item-action>
    </v-list-item>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { useCartStore } from "@/stores/cart";
  import { useAuthStore } from "@/stores/auth";
  
  const props = defineProps({
    product: {
      type: Object,
      required: true
    }
  });
  
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  
  const removeFromCart = async () => {
    if (authStore.isLoggedIn) {
      const userId = authStore.userId;
      await cartStore.removeProductFromCart(props.product.id, userId);
    }
  };
  </script>
  
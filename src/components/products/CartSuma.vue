<template>
    <v-sheet class="pa-4 mt-4" elevation="2">
      <v-row>
        <v-col>
          <v-subheader>Total:</v-subheader>
          <v-row justify="space-between">
            <v-col>
              <span>${{ totalPrice }} </span>
            </v-col>
            <v-col>
              <v-btn style="background-color: #f46568; color: #ffffff" type="submit">Proceder al Pago</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>
  </template>
  
<script setup lang="ts">

import { defineProps } from 'vue';

import { computed,  } from 'vue';
import type { Orders02 } from "@/stores/cart";

// Cambiar el tipo para que sea un array de productos
const props = defineProps({
  product: {
    type: Array as () => Orders02["order_products"], 
    required: true,
  }
});

// Calcular el precio total usando el estado global del carrito (en este caso, pasando los productos como props)
const totalPrice = computed(() => {
  return props.product.reduce((sum: number, product: { price: number; quantity: number }) => {
    return sum + (product.price * product.quantity);
  }, 0);
});

</script>

  
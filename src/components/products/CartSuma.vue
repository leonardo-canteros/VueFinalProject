<template>
    <v-sheet class="pa-4 mt-4" elevation="2">
      <v-row>
        <v-col>
          <h2>Total:</h2>
          <v-row justify="space-between">
            <v-col>
              <span>${{ totalPrice }} </span>
            </v-col>
            <v-col>
              <v-btn
              style="background-color: #f46568; color: #ffffff"
              @click="showDialog = true"
            >
              Proceed to Payment
            </v-btn>

            <v-dialog v-model="showDialog" max-width="400">
              <v-card>
                <v-card-title>Feature Coming Soon</v-card-title>
                <v-card-text>
                  The payment system is currently under development. Stay tuned for updates!
                </v-card-text>
                <v-card-actions>
                  <v-btn style="background-color: #f46568; color: #ffffff" @click="showDialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>
  </template>
  
<script setup lang="ts">

import { defineProps } from 'vue';
import { ref } from 'vue';
import { computed,  } from 'vue';
import type { Orders01 } from "@/stores/cart";

const showDialog = ref(false);

// Cambiar el tipo para que sea un array de productos
const props = defineProps({
  product: {
    type: Array as () => Orders01["order_products"], 
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

  
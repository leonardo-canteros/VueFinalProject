<template>
    <v-sheet class="pa-4 mt-4" elevation="2">
      <v-row>
        <v-col>
          <v-subheader>Total</v-subheader>
          <v-row justify="space-between">
            <v-col>
              <span>{{ totalPrice }}</span>
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
  import { computed } from 'vue';
  
  interface Product {
  id: string;      
  name: string;
  price: number;
  quantity: number;
  image: string;
}

  const props = defineProps({
    products: {
      type: Array as () => Product[], 
      required: true,
    }
  });
  
  // Calcular el precio total
  const totalPrice = computed(() => {
  return props.products.reduce((sum, product) => sum + product.price, 0);
});

  </script>
  
<template>

  <div>
    <h1>{{ title }}</h1>
  </div>
  <div class="d-flex flex-wrap justify-center">
    <div v-for="product in listProduct" :key="product.id">
      <v-card class="product-card ma-2 pa-2">
        <v-img
          class="align-end text-white"
          height="300px"
          :src="product.image"
          cover
        >
        </v-img>

        <v-card-title class="product-name">
          {{ product.name }}
        </v-card-title>
        <v-card-subtitle class="pt-4 product-species">
          {{ product.species }}
        </v-card-subtitle>
        <v-card-text>
          <div class="product-info">Description</div>
          <div class="product-info">
            {{ product.status }}
          </div>
        </v-card-text>

        <v-card-actions class="justify-center">
          <ButtonComponent>BUY</ButtonComponent>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">

import ButtonComponent from "@/components/ButtonComponent.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Product Catalog",
  },
  listProduct: {
    type: Array,
    default: [],
  },
});

</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 300px;
  max-width: 300px;
}
.product-info {
  padding: 1rem;
}
.product-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2f4f4f;
}
.product-species {
  font-size: 1rem;
  color: #32cd32;
}
</style>

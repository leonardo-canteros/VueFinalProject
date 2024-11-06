<template>
  <div class="d-flex flex-wrap justify-center">
    <div v-for="product in listProduct" :key="product.id">

      <RouterLink :to="{ name: 'productId', params: { id: product.id } }">

        <v-card class="product-card ma-2 pa-2">
          <v-img class="align-end text-white" height="300px" :src="product.image" cover>
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

      </RouterLink>
      
    </div>
  </div>
</template>

<script setup lang="ts">

//Router
import { RouterLink } from 'vue-router';

//components
import ButtonComponent from "@/components/ButtonComponent.vue";

const props = defineProps({
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

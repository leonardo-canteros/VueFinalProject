<template>
  <!-- Search bar -->
    <SearchForm></SearchForm>

  <!-- Product list -->
  
  <BaseSlot class="d-flex flex-wrap justify-center">
    <template v-slot:productsData="myProps">
      <v-card class="product-card ma-2 pa-2">
        <v-img class="align-end text-white" height="300px" :src="myProps.myProps.image" cover>
        </v-img>

        <v-card-title class="product-name">
          {{ myProps.myProps.name }}
        </v-card-title>
        <v-card-subtitle class="pt-4 product-species">
          {{ myProps.myProps.species }}
        </v-card-subtitle>
        <v-card-text>
          <div class="product-info">Description</div>
          <div class="product-info">
            {{ myProps.myProps.status }}
          </div>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn class="text-none mb-4" color="indigo-darken-3" size="large" variant="flat" block>
            BUY
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </BaseSlot>

</template>

<script setup lang="ts">

import BaseSlot from "@/components/products/BaseSlot.vue";
import SearchForm from "@/components/products/SearchForm.vue"
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

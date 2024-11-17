<template>
  <v-container>
    <div class="d-flex flex-wrap justify-center ga-5">
      <v-card
        flat
        class="border-thin"
        style="width: 320px"
        v-for="product in listProduct"
        :key="product.id"
      >
        <RouterLink :to="{ name: 'productId', params: { id: product.id } }">
          <v-img
            class="align-end text-white"
            height="300px"
            :src="product.image"
            cover
          ></v-img>

          <v-card-title class="text-center font-weight-medium mt-3 text-black">
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle class="text-center text-h4 text-grey mt-2">
            {{ product.price }}
          </v-card-subtitle>

          <v-card-text>
            <div>
              <p class="quantity text-center text-overline">
                Quantity: {{ product.quantity }}
              </p>
            </div>
          </v-card-text>

          <v-card-actions class="justify-center">
            <ButtonComponent>BUY NOW</ButtonComponent>
          </v-card-actions>
        </RouterLink>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
//Router
import { RouterLink } from "vue-router";

//components
import ButtonComponent from "@/components/common/ButtonComponent.vue";


const props = defineProps({
  listProduct: {
    type: Array,
    default: [],
  },
});
</script>

<style scoped>


.quantity {
  color: #3949ab;
  padding-top: 1rem;
}

/* .product-card {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 300px;
  max-width: 300px;
  height: 600px;
}

.info-title {
  font-size: 1rem;
  font-weight: bolder;
}

.product-info {
  padding: 1rem;
}

.product-name {
  font-size: 1.3rem;
  color: #000000;
}

.product-price {
  font-size: 1.75rem;
  color: #000000;
}

.quantity {
  color: #3949ab;
  padding-top: 1rem;
} */
</style>

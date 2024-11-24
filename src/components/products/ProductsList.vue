<template>
  <v-container>
    <div class="d-flex flex-wrap justify-center ga-5">
      <v-card
        style="width: 320px"
        v-for="product in paginatedProducts"
        :key="product.id"
        hover
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
    <div>
      <v-pagination
        @input="updatePagProducts"
        v-model="page"
        :length="14"
        :total-visible="4"
      ></v-pagination>
    </div>
  </v-container>
</template>


<script setup lang="ts">

import { RouterLink } from "vue-router";
import ButtonComponent from "@/components/common/ButtonComponent.vue";
import type { Product } from "@/helpers/products.model";
import { ref } from "vue";
import { watch } from "vue";


const props = defineProps({
  listProduct: {
    type: Array as () => Product[],
    default: () => [],
  },
});

const itemsPage = 9;
const page = ref(1);
const paginatedProducts = ref<Product[]>([]);

const updatePagProducts = () => {
  const startIndex = (page.value - 1) * itemsPage;
  const endIndex = startIndex + itemsPage;
  paginatedProducts.value = 
  props.listProduct.slice(startIndex, endIndex);
};

watch([page, () => props.listProduct], 
       updatePagProducts,
       { immediate: true });

</script>

<style scoped>
.quantity {
  color: #3949ab;
  padding-top: 1rem;
}
</style>

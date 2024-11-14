<template>
  <div class="pageview">
    <div v-if="productRetrieve">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-carousel>
              <v-carousel-item :key="0" :src="productRetrieve.image"></v-carousel-item>
            </v-carousel>
          </v-col>

          <v-col cols="12" md="6">
            <v-card>
              <v-card-text>Product ID: {{ $route.params.id }}</v-card-text>
              <v-card-title>{{ productRetrieve.name }}</v-card-title>
              <v-card-subtitle class="text-h6">{{
                productRetrieve.price
              }}</v-card-subtitle>
              <v-card-actions>
                <v-btn icon>
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <span>{{ quantity }}</span>
                <v-btn icon>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="mx-auto mt-2 py-6 add-to-cart-btn" min-width="230"
                  style="background-color: #f46568; color: #ffffff" type="submit" block>Add to cart</v-btn>

              </v-card-actions>
            </v-card>

            <v-card class="mt-4">
              <v-card-title>More information:</v-card-title>
              <v-card-text>
                <p>{{ productRetrieve.description }}</p>
                <v-list>
                  <v-list-item-group>
                    <v-list-item v-for="(feature, index) in productRetrieve.features" :key="index">
                      <v-list-item-content>{{ feature }}</v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <p v-else>Loading...</p>
  </div>
</template>

<script setup lang="ts">

import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useProductsListStore } from "@/stores/ProductsStore";

const route = useRoute();
const productRetrieve = ref();
const store = useProductsListStore();


onMounted(async () => {
  const productId = route.params.id;
  productRetrieve.value = await store.getProductId(productId);
});


</script>

<style scoped></style>

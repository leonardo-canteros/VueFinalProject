<template>
  <div>
    <div v-if="productRetrieve" :key="productId">
      <v-container>
        <v-row>
            
            <v-col cols="12" md="6">
                <v-carousel>
                  <v-carousel-item :key="0" :src="productRetrieve.image"></v-carousel-item>
                </v-carousel>
            </v-col>
            
            <v-col cols="12" md="6">
                <v-card>
                  <v-card-title>{{ productRetrieve.name }}</v-card-title>
                  <v-card-subtitle class="text-h6">{{productRetrieve.price}}</v-card-subtitle>
                
                    <v-card-actions>
                      <v-btn icon>
                        <v-btn icon @click="decreaseQuantity">
                        <v-icon>mdi-minus</v-icon>
                        </v-btn><span>{{ quantity }}</span><v-btn icon @click="increaseQuantity">
                        <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-btn>
                      
                      <v-spacer></v-spacer>
                      
                      <ButtonComponent
                        class="mx-auto text-uppercase add-to-cart-btn"
                        type="submit"
                        >Add to cart
                      </ButtonComponent>
                   </v-card-actions>
                </v-card>
              
              <v-card class="mt-4">
                <v-card-title>More information:</v-card-title>
                  <v-card-text>
                    <p>{{ productRetrieve.description }}</p>
                    <v-list>
                        <v-list-item v-for="(feature, index) in productRetrieve.features" :key="index">
                          <v-list-item-title>{{ feature }}</v-list-item-title>
                        </v-list-item>
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
import ButtonComponent from "@/components/common/ButtonComponent.vue";


const route = useRoute();
const productRetrieve = ref();
const store = useProductsListStore();
const productId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const quantity = ref(1); 

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};




onMounted(async () => {
  const productId = route.params.id;
  productRetrieve.value = await store.getProductId(productId);
 
});
</script>

<style scoped></style>
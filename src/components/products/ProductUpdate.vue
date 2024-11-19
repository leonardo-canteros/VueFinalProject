<template>
  <div>
    <v-container>
      <div class="ma-4">
        <h1>Manage Your Products</h1>
      </div>
      <v-card
        flat
        v-for="product in listProduct"
        :key="product.id"
        class="pa-3 border"
      >
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="6">
            <div class="text-caption title-color">Product name</div>

            <div class="text-body-1 mt-1">{{ product.name }}</div>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <div class="text-caption title-color">User</div>

            <div class="text-body-1 mt-1"></div>
          </v-col>
          <v-col cols="6" sm="2" md="2">
            <div class="text-caption title-color">Update</div>
            <div class="text-body-1 mt-1">
              <RouterLink
                :to="{ name: 'ProductUpdateForm', params: { id: product.id } }"
              >
                <v-btn color="primary" icon="mdi-update" size="small"></v-btn>
              </RouterLink>
            </div>
          </v-col>
          <v-col cols="6" sm="2" md="2">
            <div class="text-caption title-color">Delete</div>
            <div class="text-body-1 mt-1">
              <RouterLink
                :to="{ name: 'ProductDelete', params: { id: product.id } }"
              >
                <v-btn color="red" icon="mdi-delete" size="small"></v-btn>
              </RouterLink>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

import type { Product } from "@/helpers/products.model"; 

const props = defineProps({
  listProduct: {
    type: Array as () => Product[],
    default: () => [], 
  },
});

</script>

<style scoped>
.title-color {
  color: #757575;
}
</style>

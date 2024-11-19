<template>
  <v-container class="d-flex flex-column justify-center">
      <v-sheet class="pa-4 border rounded">

        <h1 class="my-2">Product Management</h1>

          <v-row no-gutters class="d-flex justify-space-around">

            <v-col cols="auto">
              <RouterLink :to="`/ProductCreate`">
                <v-btn
                  v-if="authStore.isLoggedIn && authStore.role === 'admin'"
                  class="mt-1 py-6"
                  min-width="230"
                  style="background-color: #f46568; color: #ffffff"
                  type="submit"
                  block
                  >Add</v-btn
                >
              </RouterLink>
            </v-col>

            <v-col cols="auto">
              <RouterLink :to="`/ProductUpdate`">
                <v-btn
                  v-if="authStore.isLoggedIn && authStore.role === 'admin'"
                  class="mt-1 py-6"
                  min-width="230"
                  style="background-color: #f46568; color: #ffffff"
                  type="submit"
                  block
                  >Update</v-btn
                >
              </RouterLink>
            </v-col>
            <v-col cols="auto">
              <RouterLink :to="`/ProductUpdate`">
                <v-btn
                  v-if="authStore.isLoggedIn && authStore.role === 'admin'"
                  class="mt-1 py-6"
                  min-width="230"
                  style="background-color: #f46568; color: #ffffff"
                  type="submit"
                  block
                  >Delete</v-btn
                >
              </RouterLink>
            </v-col>
          </v-row>
      </v-sheet>

    <ProductSearchBar
      :listProduct="listProducts"
      @filterProduct="filterProducts"
    ></ProductSearchBar>

    <ProductsList
      :listProduct="listProducts"
    ></ProductsList>
  </v-container>
</template>

<script setup lang="ts">
import ProductsList from "@/components/products/ProductsList.vue";
import ProductSearchBar from "@/components/products/ProductSearchBar.vue";

import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";
import { useProductsListStore } from "@/stores/ProductsStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = useProductsListStore();
const { listProducts } = storeToRefs(store);

const authStore = useAuthStore();

onMounted(() => {
  store.fetchAllProducts();
});

const filterProducts = (searchQuery: String) => {
  store.filterListProduct(searchQuery);
};
</script>

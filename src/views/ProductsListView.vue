<template>
  <v-container class="d-flex flex-column justify-center">
    <!--     v-if="authStore.isLoggedIn && (authStore.role === 'admin' || authStore.role === 'seller')"
 -->
    <v-sheet class="rounded bg-grey-lighten-4 ma-0"
    

    >
      <v-sheet class="rounded bg-grey-lighten-2 py-2">
        <p class="text-h mb-2 ml-8">All Products</p>
      </v-sheet>
      <v-row no-gutters class="d-flex justify-space-around">
        <!--               v-if="authStore.isLoggedIn && (authStore.role === 'admin' || authStore.role === 'seller')"
-->
        <v-col cols="auto">
          <RouterLink :to="`/product-create`">
            <v-btn

              class="mt-1 py-6"
              min-width="230"
              style="background-color: #f46568; color: #ffffff"
              type="submit"
              block
            >
              <v-icon icon="mdi-plus" start></v-icon>Add New</v-btn
            >
          </RouterLink>
        </v-col>
        <!--               v-if="authStore.isLoggedIn && (authStore.role === 'admin' || authStore.role === 'seller')"
-->
        <v-col cols="auto">
          <RouterLink :to="`/product-update`">
            <v-btn

              class="mt-1 py-6"
              min-width="230"
              color="#3949ab"
              type="submit"
              block
              ><v-icon icon="mdi-update" start></v-icon>Update</v-btn
            >
          </RouterLink>
        </v-col>
<!--                v-if="authStore.isLoggedIn && (authStore.role === 'admin' || authStore.role === 'seller')"
-->
        <v-col cols="auto">
          <RouterLink :to="`/product-update`">
            <v-btn
 
              class="mt-1 py-6"
              min-width="230"
              color="red"
              type="submit"
              block
              ><v-icon icon="mdi-delete" start></v-icon>Delete</v-btn
            >
          </RouterLink>
        </v-col>
      </v-row>
    </v-sheet>

    <ProductSearchBar
      :listProduct="listProducts"
      @filterProduct="filterProducts"
    ></ProductSearchBar>

    <ProductsList :listProduct="listProducts"></ProductsList>
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

<style scoped>
.text-h {
  font-size: 1.8rem;
}

@media (max-width: 600px) {
  .text-h {
    font-size: 1.4rem;
    text-align: center;
    margin-left: 0 !important;
  }
}
</style>

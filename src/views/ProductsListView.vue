<template>
  <v-container>
    <div class="pa-4 my-6 border rounded">
      <v-sheet class="mx-auto">
        <h1 class="my-2">Add product</h1>

        <RouterLink :to="`/ProductCreate`">
          <v-btn
            v-if="authStore.isLoggedIn && authStore.role === 'admin'"
            class="mt-2 py-6"
            min-width="230"
            style="background-color: #f46568; color: #ffffff"
            type="submit"
            block
            >Add product</v-btn
          >
        </RouterLink>

        <RouterLink :to="`/ProductUpdate`">
          <v-btn
            v-if="authStore.isLoggedIn && authStore.role === 'admin'"
            class="mt-2 py-6"
            min-width="230"
            style="background-color: #f46568; color: #ffffff"
            type="submit"
            block
            >Update Product</v-btn
          >
        </RouterLink>
      </v-sheet>
    </div>

    <ProductSearchBar
      :listProduct="listProducts"
      @filterProduct="filterProducts"
    ></ProductSearchBar>

    <ProductsList
      title="List of Products"
      :listProduct="listProducts"
    ></ProductsList>
  </v-container>
</template>

<script setup lang="ts">
//components
import ProductsList from "@/components/products/ProductsList.vue";
import ProductSearchBar from "@/components/products/ProductSearchBar.vue";

//vue
import { onMounted } from "vue";
import { useRouter } from "vue-router";

// store
import { useProductsListStore } from "@/stores/ProductsStore";
import { storeToRefs } from "pinia";

const store = useProductsListStore();
const { listProducts } = storeToRefs(store);

//auth
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

onMounted(() => {
  store.fetchAllProducts();
});

//filter
const filterProducts = (searchQuery) => {
  store.filterListProduct(searchQuery);
};

const router = useRouter();

/* //button
const goToForm = () => {
  router.push("/ProductCreate");
}; */

/* //button
const goToUpdateProduct = () => {
  router.push("/ProductUpdate");
};
 */
</script>

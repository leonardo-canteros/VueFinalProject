<template>
  <v-container class="pageview">
    <div class="pa-4 my-6 border rounded">
      <v-sheet class="mx-auto">
        <h1 class="my-2">Add product</h1>

        <v-btn
          class="mt-2 py-6"
          min-width="230"
          @click="goToForm"
          style="background-color: #f46568; color: #ffffff"
          type="submit"
          block
          >Add product</v-btn
        >
      </v-sheet>
    </div>

    <SearchProducts
      :listProduct="listProducts"
      @filterProduct="filterProducts"
    />

    <ListProducts
      title="List of Products"
      :listProduct="listProducts"
    ></ListProducts>

    <!--     <ButtonComponent @click="clearList()">Clear</ButtonComponent>
 -->
  </v-container>
</template>

<script setup lang="ts">
import ListProducts from "@/components/products/ListProducts.vue";
import SearchProducts from "@/components/products/SearchProducts.vue";
import ButtonComponent from "@/components/common/ButtonComponent.vue";

import { onMounted, ref } from "vue";
import { getUserAll } from "@/helpers/products.model";
import { useRouter } from "vue-router";
import { useProductsListStore } from "@/stores/ProductsStore";
import { storeToRefs } from "pinia";

const store = useProductsListStore();

const { listProducts } = storeToRefs(store);

onMounted(async () => {
  const result = await getUserAll();
  if (result.status === 200) {
    store.setProducts(result.data.response);
  }
});

//clear
const clearList = () => {
  store.clearProducts();
};

//filter
const filterProducts = async (searchQuery) => {
  await store.filterListProduct(searchQuery);
};

//add product
const router = useRouter();

//button
const goToForm = () => {
  router.push("/AddProduct");
};
</script>

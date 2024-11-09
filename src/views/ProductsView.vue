<template>
  <v-container class="pageview">
    <div class="pa-4 my-6 border rounded">
      <h1>Add product</h1>
      <button class="bg-indigo rounded pa-2 my-6" @click="goToForm">
        Add product
      </button>
    </div>

    <SearchProducts
      :listProduct="listProducts"
      @filterProduct="filterProducts"
    />

    <ListProducts
      title="List of Products"
      :listProduct="listProducts"
    ></ListProducts>

    <ButtonComponent @click="clearList()">Clear</ButtonComponent>
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

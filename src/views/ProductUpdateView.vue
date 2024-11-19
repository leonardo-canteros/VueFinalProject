<template>
  <div>
    <UpdateProduct :listProduct="listProducts"></UpdateProduct>
  </div>
</template>

<script setup lang="ts">

import UpdateProduct from "@/components/products/ProductUpdate.vue";
import { onMounted } from "vue";
import { useProductsListStore } from "@/stores/ProductsStore";
import { storeToRefs } from "pinia";

const store = useProductsListStore();
const { listProducts } = storeToRefs(store);

onMounted(() => {
  store.fetchAllProducts();
});

</script>

<style scoped></style>

<template>
  <div>
    <UpdateProduct :listProduct="listProducts"></UpdateProduct>
  </div>
</template>

<script setup lang="ts">
import UpdateProduct from "@/components/products/UpdateProducts.vue";

//vue
import { onMounted } from "vue";

// store
import { useProductsListStore } from "@/stores/ProductsStore";
import { storeToRefs } from "pinia";

const store = useProductsListStore();
const { listProducts } = storeToRefs(store);

onMounted(() => {
  store.fetchAllProducts();
});
</script>

<style scoped></style>

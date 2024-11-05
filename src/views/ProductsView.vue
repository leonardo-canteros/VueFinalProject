<script setup lang="ts">
import ListProducts from "@/components/products/ListProducts.vue";
import SearchProducts from "@/components/products/SearchProducts.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";


import { onMounted, ref } from "vue";
import { getUserAll } from "@/helpers/users.model";



const listProducts = ref([]);


onMounted(async () => {
  const result = await getUserAll();
  if (result.status === 200) {
    listProducts.value = result.data.results;
  }
});


const clearList = () => {
  listProducts.value = [];
};


const filterListProduct = async (searchQuery) => {
  if (searchQuery.trim() === "") {
    const result = await getUserAll();
    if (result.status === 200) {
      listProducts.value = result.data.results;
    }
    return;
  }

  listProducts.value = listProducts.value.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
};

</script>

<template>
  <v-container>

    <SearchProducts
      :listProduct="listProducts"
      @filterProduct="filterListProduct"
    />

    <ListProducts
      title="List of Products"
      :listProduct="listProducts"
    ></ListProducts>

    <ButtonComponent @click="clearList()">Clear</ButtonComponent>

  </v-container>
</template>

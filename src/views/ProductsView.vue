<template>
  <v-container class="pageview">

    <div class="pa-4 my-6 border rounded">
       <h1>Add product</h1>
       <button class="bg-indigo rounded pa-2 my-6" @click="goToForm">Add product</button>
    </div>

    

    <SearchProducts :listProduct="listProducts" @filterProduct="filterListProduct" />

    <ListProducts title="List of Products" :listProduct="listProducts"></ListProducts>

    <ButtonComponent @click="clearList()">Clear</ButtonComponent>

  </v-container>
</template>

<script setup lang="ts">

import ListProducts from "@/components/products/ListProducts.vue";
import SearchProducts from "@/components/products/SearchProducts.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";


import { onMounted, ref } from "vue";
import { getUserAll } from "@/helpers/products.model";
import { useRouter } from "vue-router";


//list products
const listProducts = ref([]);


onMounted(async () => {
  const result = await getUserAll();
  if (result.status === 200) {
    listProducts.value = result.data.response;
  }
});


//clear

const clearList = () => {
  listProducts.value = [];
};


//filter
const filterListProduct = async (searchQuery) => {
  if (searchQuery.trim() === "") {
    const result = await getUserAll();
    if (result.status === 200) {
      listProducts.value = result.data.response;
    }
    return;
  }

  listProducts.value = listProducts.value.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
};


//add product

const router = useRouter();

//button
const goToForm = () => {
  router.push('/AddProduct')
}


</script>

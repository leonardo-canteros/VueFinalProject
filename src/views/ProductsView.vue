<template>
  <v-container>
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
          @filterProduct="filterProducts"/>

    <ListProducts
      title="List of Products"
      :listProduct="listProducts"
        
    ></ListProducts>

    <!--     <ButtonComponent @click="clearList()">Clear</ButtonComponent>
 -->
  </v-container>
</template>

<script setup lang="ts">

//components
import ListProducts from "@/components/products/ListProducts.vue";
import SearchProducts from "@/components/products/SearchProducts.vue";

//vue
import { onMounted } from "vue";
import { useRouter } from "vue-router";

// store
import { useProductsListStore } from "@/stores/ProductsStore";
import { storeToRefs } from "pinia";

const store = useProductsListStore();
const { listProducts } = storeToRefs(store);


onMounted(() => {
  store.fetchAllProducts();
});


//clear
const clearList = () => {
  store.clearProducts();
};

 //filter
const filterProducts = (searchQuery) => {
   store.filterListProduct(searchQuery);
};

//add product
const router = useRouter();

//button
const goToForm = () => {
  router.push("/AddProduct");
};
</script>

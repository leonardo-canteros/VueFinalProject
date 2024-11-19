<template>
  <v-card title="Hey!" class="ma-auto" style="width: 300px">
    <v-card-text> "Are you sure you want to delete this product?" </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text="Back" @click="goToUpdate"></v-btn>

      <v-btn text="Delete" @click="deleteItemList(productId)"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useProductsListStore } from "@/stores/ProductsStore";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useProductsListStore();
const productId = route.params.id;



const deleteItemList = async (id: any) => {
  try {
    await store.deleteProduct(id);

    console.log("Product delete: ", productId);
  } catch (error) {
    console.error("Error deleting post: ", error);
  }
};

//button
const goToUpdate = () => {
  router.push("/ProductUpdate");
};
</script>

<style scoped></style>

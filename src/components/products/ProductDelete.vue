<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6" sm="6">
        <v-card hover title="Hey!" class="ma-auto mt-4">
          <v-card-text class="text-h5 mt-4">
            Are you sure you want to delete this product?</v-card-text
          >
          <v-card-actions class="mt-10">
            <ButtonComponent
              @click="goToUpdate"
              hover
              class="mx-auto text-uppercase bg-indigo rounded"
              ><v-icon icon="mdi-arrow-left" start></v-icon
              >Back</ButtonComponent
            >
            <ButtonComponent
              @click="deleteItemList(productId)"
              class="mx-auto text-uppercase bg-red rounded"
              type="submit"
              >Delete</ButtonComponent
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useProductsListStore } from "@/stores/ProductsStore";
import { useRoute, useRouter } from "vue-router";
import ButtonComponent from "@/components/common/ButtonComponent.vue";

const router = useRouter();
const route = useRoute();
const store = useProductsListStore();
const productId = route.params.id;

const deleteItemList = async (id: any) => {
  try {
    await store.deleteProduct(id);

    router.push("/product-update");
  } catch (error) {
    console.error("Error deleting post: ", error);
  }
};


const goToUpdate = () => {
  router.push("/product-update");
};
</script>

<style scoped></style>

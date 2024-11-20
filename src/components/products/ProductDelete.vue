<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="6" sm="6">
        <v-card hover title="Hey!" class="ma-auto mt-4">
          <v-card-text class="text-h4 mt-4">
            "Are you sure you want to delete this product?"</v-card-text
          >

          <v-card-actions class="mt-10">
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-btn
                  @click="goToUpdate"
                  class="mx-auto py-6"
                  min-width="230"
                  style="background-color: #3949ab; color: #ffffff"
                  type="submit"
                  block
                >
                  Back
                  <v-icon icon="mdi-checkbox-marked-circle" end></v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" sm="6">
                <v-btn
                  @click="deleteItemList(productId)"
                  class="mx-auto py-6"
                  min-width="230"
                  style="background-color: red; color: #ffffff"
                  type="submit"
                  block
                >
                  Delete
                  <v-icon icon="mdi-checkbox-marked-circle" end></v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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

    router.push("/ProductUpdate");
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

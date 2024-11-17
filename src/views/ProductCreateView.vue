<template>
  <v-container>
    <div>
      <h1>New product</h1>
    </div>

    <v-sheet class="mx-auto ma-4" width="350px">
      <v-form fast-fail @submit.prevent="saveData">
        <v-text-field label="Name" v-model="formData.name" required></v-text-field>

        <v-text-field label="Price" v-model="formData.price" type="number" required></v-text-field>

        <v-text-field label="Quantity" v-model="formData.quantity" type="number" required></v-text-field>

        <v-textarea label="Description" v-model="formData.description" required></v-textarea>

        <v-text-field label="Image URL" v-model="formData.image" required></v-text-field>

        <v-select label="Category" :items="categories" v-model="formData.category" required></v-select>

        <v-btn class="mx-auto mt-2 py-6" min-width="230" style="background-color: #f46568; color: #ffffff" type="submit"
          block>Enter product</v-btn>
      </v-form>
    </v-sheet>

    {{ listProducts }}

  </v-container>
</template>

<script setup lang="ts">

import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useProductsListStore } from "@/stores/ProductsStore";
import { storeToRefs } from "pinia";

const router = useRouter();

const store = useProductsListStore();
const { listProducts } = storeToRefs(store);


// reactive with objects
const formData = reactive({
  name: "",
  price: 0,
  quantity: 0,
  description: "",
  image: "",
  category: "",
  seller_id: "",
});

const categories = ref([
  "Electronic",
  "Percussion",
  "Wind",
  "String",
  "Keyboard",
  "Brass"
]);


const saveData = async () => {
  console.log("Form data:", formData);

  try {
    await store.addProduct(formData);

    console.log("Product added.");
  } catch (error) {
    console.error("Failed to add product:", error);
  }
};


</script>

<style scoped></style>

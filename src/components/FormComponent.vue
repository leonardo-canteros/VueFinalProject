<template>
  <v-sheet class="mx-auto" width="300">
    <v-form fast-fail @submit.prevent="submitProduct">
      <v-text-field label="Name" v-model="product.name" required></v-text-field>

      <v-text-field
        label="Price"
        v-model="product.price"
        type="number"
        required
      ></v-text-field>

      <v-text-field
        label="Quantity"
        v-model="product.quantity"
        type="number"
        required
      ></v-text-field>

      <v-textarea
        label="Description"
        v-model="product.description"
        required
      ></v-textarea>

      <v-text-field
        label="Image URL"
        v-model="product.image"
        required
      ></v-text-field>

      <v-select
        label="Category"
        :items="categories"
        v-model="product.category"
        required
      ></v-select>

      <v-text-field
        label="Seller ID"
        v-model="product.seller_id"
        required
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block>Enter product</v-btn>

    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">

import { ref, reactive } from "vue";

const product = reactive({
  name: "",
  price: 0,
  quantity: 0,
  description: "",
  image: "",
  category: "",
  seller_id: "",
});

const categories = ref([
  "Percussion",
  "String",
  "Woodwind",
  "Brass",
  "Keyboard",
]);

const submitProduct = () => {
  console.log(product);
};
</script>

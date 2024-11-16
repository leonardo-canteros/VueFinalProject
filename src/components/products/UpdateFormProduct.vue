<template>
  <v-container>
    <v-sheet class="mx-auto ma-4" width="350px">
      <v-form fast-fail @submit.prevent="">
        <v-text-field label="Name" v-model="name" required></v-text-field>

        <v-text-field
          label="Price"
          v-model="price"
          type="number"
          required
        ></v-text-field>

        <v-text-field
          label="Quantity"
          v-model="quantity"
          type="number"
          required
        ></v-text-field>

        <v-textarea
          label="Description"
          v-model="description"
          required
        ></v-textarea>

        <v-text-field label="Image URL" v-model="image" required></v-text-field>

        <v-select
          label="Category"
          :items="categories"
          v-model="category"
          required
        ></v-select>

        <v-text-field
          label="Seller ID"
          v-model="seller_id"
          required
        ></v-text-field>

        <v-btn
          class="mx-auto mt-2 py-6"
          min-width="230"
          style="background-color: #f46568; color: #ffffff"
          type="submit"
          block
          >Enter product <v-icon icon="mdi-checkbox-marked-circle" end></v-icon
        ></v-btn>

        <v-btn
          class="mx-auto mt-2 py-6 text-white"
          color="#3949ab"

          min-width="230"
          type="submit"
          @click="goToBack"
          block
        >
          <v-icon icon="mdi-arrow-left" start></v-icon>Back</v-btn
        >
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
//button
const goToBack = () => {
  router.back();
};


</script>

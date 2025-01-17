<template>
  <v-container>
    <v-sheet class="mx-auto" max-width="400px">
      <v-form fast-fail @submit.prevent="updateData">
        <v-text-field
          label="Name"
          v-model="formData.name"
          required
        ></v-text-field>
        <v-text-field
          label="Price"
          v-model="formData.price"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          label="Quantity"
          v-model="formData.quantity"
          type="number"
          required
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="formData.description"
          required
        ></v-textarea>
        <v-text-field
          label="Image URL"
          v-model="formData.image"
          required
        ></v-text-field>
        <v-select
          label="Category"
          :items="categories"
          v-model="formData.category"
          required
        ></v-select>
        <ButtonComponent
          class="mx-auto mt-2 text-white text-uppercase"
          type="submit"
          >Update
        </ButtonComponent>
        <ButtonComponent
          @click="goToBack"
          class="mx-auto mt-2 text-white text-uppercase"
          color="indigo"
          ><v-icon icon="mdi-arrow-left" start></v-icon>Back</ButtonComponent
        >
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/common/ButtonComponent.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import { useProductsListStore } from "@/stores/ProductsStore";

import type { FormData } from "@/helpers/products.model";

const router = useRouter();
const route = useRoute();
const store = useProductsListStore();
const productLoaded = ref();
const productId = route.params.id;

const formData = reactive<FormData>({
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
  "Brass",
]);

const goToBack = () => {
  router.back();
};

onMounted(async () => {
  productLoaded.value = await store.getProductId(productId);
  formData.name = productLoaded.value.name;
  formData.price = productLoaded.value.price;
  formData.quantity = productLoaded.value.quantity;
  formData.category = productLoaded.value.category;
});

const updateData = async () => {
  try {
    await store.updateProduct(productId, formData);
    console.log("Product added.");
    router.push("/products");
  } catch (error) {
    console.error("Failed to add product:", error);
  }
};
</script>

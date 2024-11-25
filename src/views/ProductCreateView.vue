<template>
  <v-container class="d-flex flex-column justify-center">
    <v-row>
      <v-col cols="12">
        <p class="text-h mt-4 mb-2 text-center">Create a New Product</p>
      </v-col>
      <v-col cols="12">
        <v-sheet class="mx-auto" max-width="400px">
          <v-form fast-fail @submit.prevent="saveData">
            <v-text-field
              :rules="inputRules('name')"
              label="Name"
              v-model="formData.name"
              required
            ></v-text-field>
            <v-text-field
              :rules="inputRules('price')"
              label="Price"
              v-model="formData.price"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              :rules="inputRules('quantity')"
              label="Quantity"
              v-model="formData.quantity"
              type="number"
              required
            ></v-text-field>
            <v-textarea
              :rules="inputRules('description')"
              label="Description"
              v-model="formData.description"
              required
            ></v-textarea>
            <v-text-field
              :rules="inputRules('image')"
              label="Image URL"
              v-model="formData.image"
              required
            ></v-text-field>
            <v-select
              :rules="inputRules('category')"
              label="Category"
              :items="categories"
              v-model="formData.category"
              required
            ></v-select>
            <ButtonComponent
              type="submit"
              class="mx-auto text-white text-uppercase"
              >Enter</ButtonComponent
            >
            <ButtonComponent
              @click="goToProductsList"
              class="mx-auto mt-2 text-white text-uppercase"
              color="indigo"
            >
              <v-icon icon="mdi-arrow-left" start></v-icon>Back
            </ButtonComponent>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useProductsListStore } from "@/stores/ProductsStore";
import { storeToRefs } from "pinia";
import ButtonComponent from "@/components/common/ButtonComponent.vue";
import type { FormData } from "@/helpers/products.model";

const router = useRouter();
const store = useProductsListStore();
const { listProducts } = storeToRefs(store);

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  deactivated_at: string | null;
}

const formData = reactive<Product>({
  id: "",
  name: "",
  price: 0,
  quantity: 0,
  description: "",
  image: "",
  category: "",
  deactivated_at: null
});

const categories = ref([
  "Electronic",
  "Percussion",
  "Wind",
  "String",
  "Keyboard",
  "Brass",
]);

const goToProductsList = () => {
  router.push("/products");
};

const saveData = async () => {
  try {
    await store.addProduct(formData);
    console.log("¡Product added!");
  } catch (error) {
    console.error("Failed to add product:", error);
  }
};

type ValidationRule = (value: any) => boolean | string;

type FieldName = "name" | "price" | "quantity" | "description" | "image" | "category";


function inputRules(field: FieldName) {
  const rules: Record<FieldName, ValidationRule[]> = {
    name: [
      (v: string) => !!v || "Name is required",
      (v: string) => (v && v.length >= 3) || "Minimum 4 characters",
    ],
    price: [
      (v: number) => !!v || "Price is required",
      (v: number) => v > 0 || "Price must be greater than 0",
    ],
    quantity: [
      (v: number) => !!v || "Quantity is required",
      (v: number) => v > 0 || "Quantity must be greater than 0",
    ],
    description: [
      (v: string) => !!v || "Description is required",
      (v: string) =>
        (v && v.length >= 10) || "Description must be at least 10 characters",
    ],
    image: [
      (v: string) => !!v || "Image URL is required",
      (v: string) => !!v || "This field is required",
    ],
    category: [(v: string) => !!v || "Category is required"],
  };
  return rules[field] || [];
}
</script>

<style scoped>
.text-h {
  font-size: 1.8rem;
}
</style>

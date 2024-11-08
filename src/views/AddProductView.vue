<template>
  <v-container>

    <div>
      <h1>New product</h1>
    </div>

    <v-sheet class="mx-auto ma-4" width="350px">

      <v-form fast-fail @submit.prevent="procesarForm">
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

        <v-text-field
          label="Seller ID"
          v-model="formData.seller_id"
          required
        ></v-text-field>

        <v-btn class="mt-2" type="submit" block>Enter product</v-btn>

        {{ formData }}
      </v-form>
    </v-sheet>
  </v-container>

</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";



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
  "Percussion",
  "String",
  "Woodwind",
  "Brass",
  "Keyboard",
]);


//const submitProduct = () => {
//  console.log(formData);
//};

const router = useRouter();

const loading = ref(false);

const apiUrl = "https://upper-serena-fastapi-ecommerce-6026090d.koyeb.app/api";

const procesarForm = async() => {
    loading.value = true;
    await fetch(`${apiUrl}/products/`,{
      method: 'POST',
      body: JSON.stringify({
        name: formData.name, 
        price: formData.price, 
        quantity: formData.quantity,
        description: formData.description,
        image: formData.image,
        category: formData.category,
        seller_id: formData.seller_id
        }),

      headers: {
        'Content-Type': 'application/json'
      }  
    })
    loading.value = false;
    router.back();
} 



</script>

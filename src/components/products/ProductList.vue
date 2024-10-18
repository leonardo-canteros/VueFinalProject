<template>
    <v-card class="mx-auto" max-width="300">

        <v-list lines="two">
            <v-list-item v-for="product in products" 
                            :key="product.id" 
                            :title="product.title"
                            ></v-list-item>
        </v-list>
    </v-card>
</template>


<script setup lang="ts">

import { onMounted, ref } from 'vue';
import axios from 'axios';


interface Product {
    id: number,
    title: string
}

const products = ref<Product[]>([]);


onMounted(() => {
    axios.get("https://dummyjson.com/products/")
        .then(response => products.value = response.data)
        .catch(error => {
            console.error("Error fetching data:", error);
        });
})

</script>



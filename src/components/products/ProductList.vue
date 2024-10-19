<template>
    <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Id
        </th>
        <th class="text-left">
          Title
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in products"
        :key="item.title"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
      </tr>
    </tbody>
  </v-table>
</template>


<script setup lang="ts">

import { onMounted, ref } from 'vue';
import axios from 'axios';


interface Product {
    id: number,
    title: string
}

const products = ref<Product[]>([]);


const getData = async()=> {

    try{
       const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
       if(response.status==200){
          products.value = response.data
       }else{
          console.log("Not found.")
       }
    } catch(error)
    {
      console.log(error)
    }
}

onMounted(() => {
    getData()
})

</script>



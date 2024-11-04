<template>
  <div>
    <div v-for="user in users" :key="user.id">
            <slot name="productsData" :myProps="user"></slot>
    </div>
  </div>
</template>


<script setup lang="ts">

import { onMounted, ref } from 'vue';
import axios from "axios";


const apiUrl = "https://rickandmortyapi.com/api/";
const getUserAll = async function () {
  return await axios.get(`${apiUrl}character`);
};

const users = ref([]);

onMounted(async () => {
  const result = await getUserAll()
  if (result.status === 200) { users.value = result.data.results }
})

</script>


<style scoped>

</style>
<template>
  <v-sheet class="mx-auto" width="900">
    <v-form @submit.prevent>

      <v-text-field 
        type="text" 
        placeholder="Search"
        v-model="searchQuery"
        @input="$emit('filterProduct', searchQuery)"

        ></v-text-field>

      <v-btn class="mt-2" 
            type="submit"
            @click="$emit('searchProducts')" 
            block
        >Search</v-btn
      >
    </v-form>
  </v-sheet>
</template>



<script setup lang="ts">

import { ref } from 'vue';


const props = defineProps({
  listProduct: Array,
  setFunction: Function
});

const searchQuery = ref('');

</script>

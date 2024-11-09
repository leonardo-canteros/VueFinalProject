<template>
  <v-sheet class="mx-auto" width="900">
    <v-form @submit.prevent="emitSearch">
      <v-row>
        
        <v-col cols="12" md="8" lg="9">
          <v-text-field 
            type="text" 
            placeholder="Search"
            v-model="searchQuery"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" lg="3">
          <v-btn class="mt-2" 
                 style="background-color:#f46568; color: #ffffff;"
                 type="submit"
                 block
          >Search</v-btn>
        </v-col>
      </v-row>
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

//emits
const emit = defineEmits(['filterProduct']);


const emitSearch = () => {
  emit('filterProduct', searchQuery.value)
}

</script>

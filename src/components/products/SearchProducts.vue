<template>
  <v-sheet class="mx-auto" width="100%">
    <v-form @submit.prevent="emitSearch">
      <v-text-field
        type="text"
        placeholder="Search"
        v-model="searchQuery"
      ></v-text-field>

      <v-btn
        class="mt-2 py-6"
        style="background-color: #f46568; color: #ffffff"
        type="submit"
        block
        >Search</v-btn
      >
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  listProduct: Array,
  setFunction: Function,
});

const searchQuery = ref("");

//emits
const emit = defineEmits(["filterProduct"]);

const emitSearch = () => {
  emit("filterProduct", searchQuery.value);
  searchQuery.value = ""; 
};

//watch
watch(searchQuery, (newValue) => {
  emit("filterProduct", newValue);
});

</script>

<template>
  <v-container>
    <v-sheet class="mx-auto" width="100%">
      <v-form @submit.prevent="emitSearch" class="mt-2">
        <v-row no-gutters>
          <v-col cols="9">
            <v-text-field
              type="text"
              placeholder="Search"
              v-model="searchQuery"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn
              class="ml-2 py-7"
              style="background-color: #f46568; color: #ffffff"
              type="submit"
              block
            >
              Search
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  listProduct: Array,
  setFunction: Function,
});

const searchQuery = ref("");

const emit = defineEmits(["filterProduct"]);

const emitSearch = () => {
  emit("filterProduct", searchQuery.value);
  searchQuery.value = "";
};

watch(searchQuery, (newValue) => {
  emit("filterProduct", newValue);
});
</script>

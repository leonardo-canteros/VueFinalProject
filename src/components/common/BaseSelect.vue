<template>
  <v-select
    v-model="model"
    outlined
    color="primary"
    variant="outlined"
    density="compact"
  ></v-select>
</template>

<script setup lang="ts">
const model = defineModel();
</script>

<style scoped></style>

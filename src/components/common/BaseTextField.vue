<template>
  <v-text-field
    v-model="model"
    outlined
    color="primary"
    variant="outlined"
    density="compact"
  ></v-text-field>
</template>

<script setup lang="ts">
const model = defineModel();
</script>

<style scoped></style>

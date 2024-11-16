<template>
  <v-btn class="mb-8" color="blue" size="large" variant="tonal" block>
    {{ label }}
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>

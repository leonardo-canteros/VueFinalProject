<template>
  <a
    class="text-blue text-decoration-none"
    href="#"
    rel="noopener noreferrer"
    target="_blank"
    v-bind="$attrs"
  >
    {{ label }} <v-icon v-if="icon" :icon="icon"></v-icon>
  </a>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
});
</script>

<style scoped></style>

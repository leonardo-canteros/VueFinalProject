<template>
  <div>
    <div
      class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
    >
      {{ label }}
      <slot></slot>
    </div>

    <v-text-field
      :prepend-inner-icon="icon"
      variant="outlined"
      density="compact"
      v-bind="$attrs"
      v-model="model"
    >
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  label: String,
  icon: String,
});

const model = defineModel();
</script>

<style scoped></style>

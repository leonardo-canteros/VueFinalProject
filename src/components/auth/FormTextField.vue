<template>
  <div>
    <div
      class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
    >
      {{ label }}
      <slot></slot>
    </div>

    <base-text-field
      :prepend-inner-icon="icon"
      v-bind="$attrs"
      v-model="model"
    ></base-text-field>
  </div>
</template>

<script setup lang="ts">
import BaseTextField from "@/components/common/BaseTextField.vue";
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

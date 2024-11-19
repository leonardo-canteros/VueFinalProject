<template>
  <div>
    <div
      class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
    >
      {{ label }}
      <slot></slot>
    </div>

    <BaseSelect
      :prepend-inner-icon="icon"
      v-bind="$attrs"
      v-model="model"
    ></BaseSelect>
  </div>
</template>

<script setup lang="ts">
import BaseSelect from "@/components/common/BaseSelect.vue";
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

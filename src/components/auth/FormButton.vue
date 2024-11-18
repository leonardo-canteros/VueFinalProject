<template>
  <ButtonComponent
    :min-width="null"
    class="mb-8"
    size="large"
    variant="tonal"
    block
  >
    {{ label }}
  </ButtonComponent>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/common/ButtonComponent.vue";
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>

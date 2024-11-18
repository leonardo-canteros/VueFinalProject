<template>
  <div>
    <v-btn
      @click="$emit('click')"
      min-width="230"
      class="v-btn--slim v-theme--light v-btn--density-default v-btn--size-large v-btn--variant-flat text-none v-btn--block"
      style="background-color: #f46568; color: #ffffff"
      v-bind="$attrs"
    >
      <slot></slot>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
defineEmits(["click"]);
</script>

<style scoped></style>

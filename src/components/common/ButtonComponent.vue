<template>
  <div>
    <v-btn
      @click="$emit('click')"
      class="v-btn--slim v-theme--light v-btn--density-default v-btn--size-large v-btn--variant-flat text-none mb-4 v-btn--block"
      style="background-color: #f46568; color: #ffffff"
    >
      <slot></slot>
    </v-btn>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.custom-btn {
  margin-top: 1rem;
}
</style>

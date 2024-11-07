<template>
  <div>
    <v-btn @click="$emit('click')"
      class="v-btn--slim v-theme--light bg-indigo-darken-3 v-btn--density-default v-btn--size-large v-btn--variant-flat text-none mb-4 v-btn--block"
    >
      <slot></slot>
    </v-btn>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

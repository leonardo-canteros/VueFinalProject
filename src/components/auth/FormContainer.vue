<template>
  <v-container fluid>
    <v-form @submit.prevent="$emit('submit', $event)">
      <h3 class="mb-4 text-center">{{ title }}</h3>
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <slot></slot>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
defineEmits(["submit"]);
defineProps({
  title: {
    type: String,
  },
});
</script>

<style scoped></style>

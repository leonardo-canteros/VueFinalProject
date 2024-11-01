<template>

  <v-footer class="d-flex flex-column mt-2">
    <div class="bg-blue d-flex w-100 align-center px-4">
        Get connected with Us on social networks!
      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        size="small"
        variant="plain"
      ></v-btn>
    </div>
    <div class="px-4 py-2 bg-black text-center w-100">
      ©  {{ currentYear }} App Store Music. All rights reserved.
    </div>
  </v-footer>

</template>

<script setup lang="ts">

import { ref, computed } from 'vue';

const icons = ref([
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-github',
])

const currentYear = computed(() => new Date().getFullYear())

</script>

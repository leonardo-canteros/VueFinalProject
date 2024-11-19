<template>
  <v-footer class="d-flex flex-column mt-2">
    <div class="d-flex w-100 align-center px-4 text-footer">
        Get connected with Us on social networks!
      <v-spacer></v-spacer>

      <v-btn
        v-for="(icon, index) in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        size="small"
        variant="plain"

        :href="urls[index]"
        target="_blank"
      ></v-btn>
    </div>
    <div class="px-4 py-2 bg-black text-center w-100 brand-footer">
      ©  {{ currentYear }} More Than Sound. All rights reserved.
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
]);


const urls = ref([
  'https://www.facebook.com/',
  'https://twitter.com/',
  'https://www.linkedin.com/',
  'https://github.com/',       
]);

const currentYear = computed(() => new Date().getFullYear())

</script>


<style scoped>

.text-footer {
  background-color: #CFD8DC;
}

@media (max-width: 600px) {
  .text-footer {
    font-size: 0.8rem; 
  }

  .brand-footer {
    font-size: 0.9rem; 
  }
}

</style>

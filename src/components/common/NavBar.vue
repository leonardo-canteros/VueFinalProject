<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <v-toolbar image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" dark prominent>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>App Store Music</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn>
      <RouterLink to="/" class="text-white">Home</RouterLink>
    </v-btn>
    <v-btn>
      <RouterLink to="/about" class="text-white">About</RouterLink>
    </v-btn>
    
    <v-btn icon>
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-toolbar>

  <RouterView />
</template>


<style scoped>
nav a {
  text-decoration: none;
  margin-right: 15px;
}
</style>
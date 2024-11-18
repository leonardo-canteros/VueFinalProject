<template>
  <div>
    <CarouselComponent></CarouselComponent>

    <v-container class="my-2">
      <v-row no-gutters>
        <v-col class="bg-surface-variant" cols="12" sm="6">
          <v-sheet class="pa-2 ma-2">content</v-sheet>
        </v-col>
        <v-col class="bg-blue" cols="12" sm="6">
          <v-sheet class="pa-2 ma-2">content</v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import CarouselComponent from "@/components/common/CarouselComponent.vue";
</script>

<template>
  <v-container class="pageView">
    <v-row class="d-flex flex-column justify-center align-center">
      <v-col cols="12" md="6">
        <div>
          <h1 class="text-h2">404</h1>
          <h2 class="text-h4">Page not found!</h2>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div>
          <p class="my-4 text-caption">
            We're sorry, the page you requested could not be found. Please go
            back to the homepage!
          </p>
          <ButtonComponent @click="home" class="text-uppercase">Go home!</ButtonComponent>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/common/ButtonComponent.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const home = () => {
  router.push("/");
};
</script>

<style scoped></style>

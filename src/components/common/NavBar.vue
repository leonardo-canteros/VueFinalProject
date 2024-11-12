<template>
  <div id="app">
    <v-app>
      <v-toolbar flat color="#4e59d8">
        <v-toolbar-title class="text-uppercase">
          <span class="font-weight-light"> More Than Sound </span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <RouterLink
            v-for="item in menu"
            :key="item.icon"
            :to="item.link"
            class="text-white mt-3"
          >
            <v-btn flat
              >{{ item.title }}
              <v-icon left class="px-3">{{ item.icon }}</v-icon>
            </v-btn>
          </RouterLink>

          <RouterLink to="/login" class="text-white mt-3">
            <v-btn v-if="!authStore.isLoggedIn" flat>
              Login
              <v-icon left  class="px-3">mdi-account-key-outline</v-icon>
            </v-btn>
          </RouterLink>

          <RouterLink to="/" class="text-white mt-3">
            <v-btn v-if="authStore.isLoggedIn" flat @click="authStore.logout">
              Logout
              <v-icon left  class="px-3">mdi-account-off-outline</v-icon>
            </v-btn>
          </RouterLink>
        </v-toolbar-items>
      </v-toolbar>

      <v-content>
        <RouterView />

        <!--         <v-container fluid fill-height>
          <v-layout>

          </v-layout>

        </v-container> -->
      </v-content>
    </v-app>
  </div>
</template>


<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
//import router from "@/router";

const authStore = useAuthStore();

const menu = ref([
  { title: "Home", link: "/", icon: "mdi-home" },
  { title: "About", link: "/about", icon: "mdi-information" },
  { title: "Products", link: "/products", icon: "mdi-cart" },
]);
</script>

<style scoped></style>

<template>
  <div id="app">
    <v-app>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Music Menu</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <RouterLink
            v-for="item in menu"
            :key="item.icon"
            :to="item.link"
            class="text-white"
          >
            <v-btn flat>{{ item.title }}</v-btn>
          </RouterLink>
        </v-toolbar-items>

        <v-menu class="hidden-md-and-up">
<!--           <template v-slot:activator="{ on }">
            <v-toolbar-side-icon v-on="on"></v-toolbar-side-icon>
          </template> -->
          <v-list>
            <v-list-item v-for="item in menu" :key="item.icon" :to="item.link">
              <RouterLink :to="item.link" class="text-decoration-none">
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </RouterLink>
            </v-list-item>
          </v-list>
        </v-menu>
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
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";

const menu = ref([
  { title: "Home", link: "/", icon: "mdi-home" },
  { title: "About", link: "/about", icon: "mdi-information" },
  { title: "Products", link: "/products", icon: "mdi-cart" },
]);
</script>

<style scoped></style>

<template>
  <v-layout>
    <v-app-bar
      color="teal-darken-4"
      image="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>More Than Sound</v-app-bar-title>
      <v-spacer></v-spacer>
      <DropdownShoppingCart />
      <!-- <RouterLink to="/cart" class="text-white">
        <v-btn icon>
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </RouterLink> -->
      <RouterLink to="/login" class="text-white">
        <v-btn v-if="!authStore.isLoggedIn" icon>
          <v-icon left class="px-3">mdi-account-key-outline</v-icon>
        </v-btn>
      </RouterLink>
      <RouterLink to="/" class="text-white">
        <v-btn v-if="authStore.isLoggedIn" icon @click="authStore.logout">
          <v-icon left class="px-3">mdi-account-off-outline</v-icon>
        </v-btn>
      </RouterLink>
    </v-app-bar>
    <!--
    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
    >   
    -->
    <v-navigation-drawer
      v-model="drawer"
      :location="smAndDown ? 'bottom' : undefined"
      temporary
    >
      <v-list>
        <router-link
          v-for="item in menu"
          :key="item.icon"
          :to="item.link"
          class="text-black"
        >
          <v-list-item :title="item.title" :prepend-icon="item.icon">
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-main style="min-height: 400px">
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import DropdownShoppingCart from "@/components/common/DropdownShoppingCart.vue";
import { useAuthStore } from "@/stores/auth";
import { ref, watch } from "vue";
import { RouterView } from "vue-router";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();

const drawer = ref(false);
const group = ref(null);

const authStore = useAuthStore();

const menu = ref([
  { title: "Home", link: "/", icon: "mdi-home" },
  { title: "About Us", link: "/about", icon: "mdi-information" },
  { title: "Products", link: "/products", icon: "mdi-cart" },
  { title: "Contact", link: "/contact", icon: "mdi-email" },
]);

watch(authStore, (newValue) => {
  if (newValue.role === "admin") {
    menu.value.push({
      title: "Users",
      link: "/users",
      icon: "mdi-account-supervisor",
    });
  } else {
    menu.value = menu.value.filter((item) => item.title !== "Users");
  }
});
</script>

<style scoped></style>

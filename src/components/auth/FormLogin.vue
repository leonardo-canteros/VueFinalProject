<template>
  <v-container fluid>
    <v-form @submit.prevent="submit" class="my-8">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Username</div>
        <v-text-field
          prepend-inner-icon="mdi-account-outline"
          density="compact"
          placeholder="Username"
          variant="outlined"
          v-model="username"
          :rules="[rules.required]"
        >
        </v-text-field>
        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password
          <a
            class="text-caption text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a
          >
        </div>
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          v-model="password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          :rules="[rules.required]"
        ></v-text-field>
        <v-btn
          style="background-color: #f46568; color: #ffffff"
          class="mb-8"
          size="large"
          block
          type="submit"
        >
          Log In
        </v-btn>
        <v-card-text class="text-center">
          <a
            class="text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import rules from "@/helpers/validation";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const authStore = useAuthStore();

const visible = ref(false);

const username = ref(null);
const password = ref(null);

const submit = async () => {
  if (!username.value || !password.value) {
    return;
  }
  try {
    await authStore.fetchToken(username.value, password.value);
    if (authStore.isLoggedIn) {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

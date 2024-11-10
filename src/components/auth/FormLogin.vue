<template>
  <v-container fluid>
    <v-form @submit.prevent="submit">
      <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
      ></v-img>

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
            class="text-caption text-decoration-none text-blue"
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

        <!-- <v-card
        class="mb-12"
          color="surface-variant"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
          </v-card-text>
        </v-card> -->

        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          type="submit"
        >
          Log In
        </v-btn>

        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
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
import { ref } from "vue";

import { useAuthStore } from "@/stores/auth";
import router from "@/router";
const authStore = useAuthStore();

const rules = {
  required: (value: string) => !!value || "Este campo es requerido",
  minLength: (min: number) => (value: string) =>
    value.length >= min || `Debe tener al menos ${min} caracteres`,
};

const visible = ref(false);

const username = ref(null);
const password = ref(null);
const token = ref("");

const submit = async () => {
  if (!username.value || !password.value) {
    return;
  }
  try {
    await authStore.getToken(username.value, password.value);
    if (authStore.isLoggedIn) {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};

// const required = (v: any) => !!v || 'This field is required'
</script>

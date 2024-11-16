<template>
  <FormContainer title="Log In" @submit="submit">
    <FormTextField
      label="Username"
      placeholder="Username"
      prepend-inner-icon="mdi-account-outline"
      v-model="username"
      :rules="[rules.required]"
    ></FormTextField>

    <FormTextField
      label="Password"
      placeholder="Password"
      prepend-inner-icon="mdi-lock-outline"
      v-model="password"
      :rules="[rules.required]"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      @click:append-inner="visible = !visible"
    >
      <!-- <FormLink label="Forgot login password?" class="text-caption"</FormLink> -->
    </FormTextField>

    <FormButton label="Log In" type="submit"></FormButton>

    <v-card-text class="text-center">
      <FormLink label="Sign up now" icon="mdi-chevron-right"></FormLink>
    </v-card-text>
  </FormContainer>
</template>

<script setup lang="ts">
import rules from "@/helpers/validation";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import FormButton from "./FormButton.vue";
import FormContainer from "./FormContainer.vue";
import FormLink from "./FormLink.vue";
import FormTextField from "./FormTextField.vue";

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

<template>
  <FormContainer title="Log In" @submit="submitForm">
    <FormTextField
      label="Username"
      icon="mdi-account-outline"
      placeholder="Username"
      v-model="username"
      :error-messages="errors.username"
      required
    ></FormTextField>

    <FormTextField
      label="Password"
      icon="mdi-lock-outline"
      placeholder="Password"
      v-model="password"
      :error-messages="errors.password"
      required
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
import FormButton from "@/components/auth/FormButton.vue";
import FormContainer from "@/components/auth/FormContainer.vue";
import FormLink from "@/components/auth/FormLink.vue";
import FormTextField from "@/components/auth/FormTextField.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { useForm, useField } from "vee-validate";
import { ref } from "vue";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters long"),
});

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: username } = useField<string>("username");
const { value: password } = useField<string>("password");

const authStore = useAuthStore();

const visible = ref(false);

const submitForm = handleSubmit(async (values) => {
  try {
    await authStore.fetchToken(username.value, password.value);
    if (authStore.isLoggedIn) {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
});
</script>

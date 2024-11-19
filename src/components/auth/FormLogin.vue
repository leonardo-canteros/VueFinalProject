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
      <FormLink label="Forgot login password?" class="text-caption" @click="passwordHelp" </FormLink>
    </FormTextField>

    <FormButton :loading="loading" label="Log In" type="submit"></FormButton>

    <v-alert
      v-if="msgAlert.show"
      v-model="msgAlert.show"
      closable
      density="compact"
      :text="msgAlert.text"
      :title="msgAlert.title"
      :type="(msgAlert.isError ? 'error' : 'warning')"
    ></v-alert>

    <v-card-text class="text-center">
      <RouterLink to="/register" class="text-white mt-3">
        <FormLink label="Sign up now" icon="mdi-chevron-right"></FormLink>
      </RouterLink>
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
import { useField, useForm } from "vee-validate";
import { reactive, ref } from "vue";
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

const loading = ref(false);
const visible = ref(false);

const passwordHelp = () => {
    msgAlert.show = true;
    msgAlert.title = "Password Forgotten";
    msgAlert.text = "We can't help you. Maybe in future release";
    msgAlert.isError = false;
}

const msgAlert = reactive({
  show: false,
  title: "",
  text: "",
  isError: true,
});

const submitForm = handleSubmit(async (values) => {
  try {
    loading.value = true;
    setTimeout(() => (loading.value = false), 2000);
    await authStore.fetchToken(username.value, password.value);
    if (authStore.isLoggedIn) {
      router.push("/");
    }
  } catch (error: any) {
    msgAlert.show = true;
    msgAlert.title = "Login Error";
    msgAlert.text = error.message;
    msgAlert.isError = true;
  }
});
</script>

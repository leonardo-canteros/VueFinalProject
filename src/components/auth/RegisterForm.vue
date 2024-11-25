<template>
  <FormContainer title="Register" @submit="submitForm" max-width="700">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <FormTextField
          label="Username*"
          icon="mdi-account-outline"
          placeholder="Username"
          v-model="username"
          :error-messages="errors.username"
          required
        ></FormTextField>
      </v-col>

      <v-col cols="12" md="6">
        <FormTextField
          label="Email*"
          icon="mdi-email-outline"
          placeholder="Email"
          v-model="email"
          :error-messages="errors.email"
          required
        ></FormTextField>
      </v-col>

      <v-col cols="12" md="6">
        <FormSelect
          v-model="role"
          :items="['seller', 'customer']"
          label="Role*"
          :error-messages="errors.role"
          color="primary"
          outlined
          required
        ></FormSelect>
      </v-col>

      <v-col cols="12" md="6">
        <FormTextField
          label="Password*"
          icon="mdi-lock-outline"
          placeholder="Password"
          v-model="password"
          :error-messages="errors.password"
          required
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
        >
        </FormTextField>
      </v-col>

      <v-col cols="12" md="12">
        <FormTextField
          label="Image URL"
          icon="mdi-image-outline"
          placeholder="Copy your image URL"
          v-model="image"
          :error-messages="errors.image"
          required
        ></FormTextField>
      </v-col>
    </v-row>

    <FormButton :loading="loading" label="Sing Up" type="submit"></FormButton>

    <v-alert
      v-if="msgAlert.show"
      v-model="msgAlert.show"
      closable
      density="compact"
      :text="msgAlert.text"
      :title="msgAlert.title"
      :type="msgAlert.isError ? 'error' : 'warning'"
    ></v-alert>

    <small class="text-caption text-medium-emphasis"
      >*indicates required field</small
    >
  </FormContainer>
</template>

<script setup lang="ts">
import FormButton from "@/components/auth/FormButton.vue";
import FormContainer from "@/components/auth/FormContainer.vue";
import FormSelect from "@/components/auth/FormSelect.vue";
import FormTextField from "@/components/auth/FormTextField.vue";
import { registerUser } from "@/helpers/usersServices";
import router from "@/router";
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
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email address")
});

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: username } = useField<string>("username");
const { value: password } = useField<string>("password");
const { value: email } = useField<string>("email");
const { value: role } = useField<any>("role");
const { value: image } = useField<string>("image");

const loading = ref(false);
const visible = ref(false);

const passwordHelp = () => {
  msgAlert.show = true;
  msgAlert.title = "Password Forgotten";
  msgAlert.text = "We can't help you. Maybe in future release";
  msgAlert.isError = false;
};

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
    await registerUser(values);
    router.push("/login");
  } catch (error: any) {
    msgAlert.show = true;
    msgAlert.title = "Registration Error";
    msgAlert.text = error.message;
    msgAlert.isError = true;
  }
});
</script>

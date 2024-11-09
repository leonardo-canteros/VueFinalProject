<template>
  <div>
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
        density="compact"
        placeholder="Username"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
        v-model="username"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
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

      <v-btn @click="login"
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
      >
        Log In
      </v-btn>
      <v-btn @click="testLogin">
        Test Login
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
  </div>
</template>


<script setup lang="ts">
  
import axios from 'axios';
import { ref } from 'vue';
  
const serverAPI = 'https://upper-serena-fastapi-ecommerce-6026090d.koyeb.app/'

  const visible = ref(false)

  const username = ref(null)
  const password = ref(null)
  const token = ref('')

  const login = async () => {
    try {
      let data = {  
        username: username.value,  
        password: password.value
      };  
  
      const res = await axios.post(
        `${serverAPI}auth/login`, 
        data,
        {headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }}
      )

      token.value = res.data.access_token
      console.log(res.data)
      
    } catch (error) {
      console.log(error)
    }
    
  }

  const testLogin = async () => {
    const params = {
      headers: {
        'Authorization': 'Bearer ' + token.value
      }}
      const res = await axios.get(`${serverAPI}auth/authenticated_user`, params)
      console.log(res.data)    
  }

  // const required = (v: any) => !!v || 'This field is required'


</script>
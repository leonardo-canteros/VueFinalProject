<template>
  <v-container class="contact-container" fluid>
    <div class ="div-container">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h2 class="text-center mb-4">Contact Us</h2>

          <form @submit.prevent="handleSubmit(submitForm)">
            <v-text-field
              label="Name"
              v-model="name"
              :error-messages="errors.name"
              outlined
              color="primary"
            ></v-text-field>

            <v-text-field
              label="Email"
              v-model="email"
              :error-messages="errors.email"
              outlined
              color="primary"
              type="email"
            ></v-text-field>

            <v-text-field
              label="Subject"
              v-model="subject"
              :error-messages="errors.subject"
              outlined
              color="primary"
            ></v-text-field>

            <v-textarea
              label="Message"
              v-model="message"
              :error-messages="errors.message"
              rows="5"
              outlined
              color="primary"
            ></v-textarea>


            <v-btn color="primary" class="mt-4" type="submit">Send</v-btn>
          </form>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';


const validationSchema = yup.object({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters long'),
  email: yup.string().required('Email is required').email('Must be a valid email address'),
  subject: yup.string().required().min(10, 'Subject must be at least 10 characters long'),
  message: yup.string().required('Message is required').min(15, 'Message must be at least 15 characters long'),
});


const { handleSubmit, errors, validate } = useForm({
  validationSchema,
});


const submitForm = async () => {
  const isFormValid = await validate();
  if (isFormValid) {
    alert('Thank you for contacting us. We will get back to you soon.');
  } else {
    console.log('Form is not valid');
  }
};


const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: subject } = useField('subject');
const { value: message } = useField('message');
</script>

<style scoped>
.div-container{
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
border-radius: 8px;
}
.contact-container {
  background-color: rgb(255, 255, 255); 
  padding: 30px;
  color: rgb(0, 0, 0);
}
h2 {
  color: #000000; 
}
</style>

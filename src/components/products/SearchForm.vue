<template>
    <v-card class="mx-auto" color="grey-lighten-3" max-width="448">
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
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title>Search</v-app-bar-title>

          <v-spacer></v-spacer>

          <v-text-field
            placeholder="Search"
            prepend-inner-icon="mdi-magnity"
            class="expanding-search mt-1"
            filled
            dense
          >
          </v-text-field>
        </v-app-bar>

        <v-main>
          <v-container fluid>
            <v-row dense>
              <v-col v-for="n in 4" :key="n" cols="12">
                <v-card
                  :subtitle="`Subtitle for Content ${n}`"
                  :title="`Content ${n}`"
                  text="Lorem ipsum dolor sit amet consectetur, adipisicing elit.?"
                ></v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
</template>

<script setup lang="ts"></script>

<style scoped>

.v-field--variant-filled {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.v-field--variant-filled .v-input__control {
  border: none !important;
  box-shadow: none !important;

}

</style>

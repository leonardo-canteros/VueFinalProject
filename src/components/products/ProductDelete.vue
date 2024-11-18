<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        icon="mdi-delete"
        size="small"
        color="red"
      ></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card title="Hey!">
        <v-card-text>
          "Are you sure you want to delete this product?"
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts"></script>

<style scoped></style>

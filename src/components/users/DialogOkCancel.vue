<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">{{ title }}</v-card-title>
      <slot></slot>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="emit('cancel')">{{
          cancelBtnLegend
        }}</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="emit('ok')">{{
          okBtnLegend
        }}</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const showDialog = defineModel({
  type: Boolean,
  required: true,
});

defineProps({
  title: {
    type: String,
    required: true,
    default: "Are you sure you want to delete this item?",
  },
  cancelBtnLegend: {
    type: String,
    default: "Cancel",
  },
  okBtnLegend: {
    type: String,
    default: "OK",
  },
});
const emit = defineEmits(["cancel", "ok"]);
</script>

<style scoped></style>

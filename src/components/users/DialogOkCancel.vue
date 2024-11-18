<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <form @submit.prevent>
      <v-card>
        <v-card-title class="text-h5">{{ title }}</v-card-title>
        <slot></slot>
        <v-card-actions>
          <v-spacer></v-spacer>
          <ButtonComponent @click="emit('cancel')">
            {{ cancelBtnLegend }}
          </ButtonComponent>
          <ButtonComponent type="submit" @click="emit('ok')">
            {{ okBtnLegend }}
          </ButtonComponent>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/common/ButtonComponent.vue";
const showDialog = defineModel({
  type: Boolean,
  required: true,
});

defineProps({
  title: {
    type: String,
    default: "You must define a title",
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
const emit = defineEmits(["cancel", "ok", "submit"]);
</script>

<style scoped></style>

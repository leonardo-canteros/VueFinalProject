<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <v-container class="pa-2">
      <form @submit.prevent>
        <v-card>
          <v-card-title class="text-h5">{{ title }}</v-card-title>
          <slot></slot>
          <v-card-actions>
            <v-row justify="center">
              <v-col
                cols="12"
                md="6"
                align-self="center"
                class="d-flex justify-center"
              >
                <ButtonComponent @click="emit('cancel')">
                  {{ cancelBtnLegend }}
                </ButtonComponent>
              </v-col>
              <v-col
                cols="12"
                md="6"
                align-self="center"
                class="d-flex justify-center"
              >
                <ButtonComponent type="submit" @click="emit('ok')">
                  {{ okBtnLegend }}
                </ButtonComponent>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </form>
    </v-container>
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

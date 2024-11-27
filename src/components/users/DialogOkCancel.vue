<template>
  <v-dialog v-model="showDialog" max-width="500px" persistent>
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
                <ButtonComponent
                  hover
                  class="text-uppercase mx-auto text-white bg-indigo round"
                  @click="emit('cancel')"
                >
                  {{ cancelBtnLegend }}
                </ButtonComponent>
              </v-col>
              <v-col
                cols="12"
                md="6"
                align-self="center"
                class="d-flex justify-center"
              >
                <ButtonComponent
                  hover
                  class="text-uppercase mx-auto text-white round"
                  type="submit"
                  @click="emit('ok')"
                >
                  {{ okBtnLegend }}
                </ButtonComponent>
              </v-col>
              <v-col cols="12" md="12" align-self="center" class="d-flex">
                <v-alert
                  v-if="msgAlert.show"
                  v-model="msgAlert.show"
                  closable
                  density="compact"
                  :text="msgAlert.text"
                  :title="msgAlert.title"
                  type="error"
                ></v-alert>
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
  msgAlert: {
    type: Object,
    default: () => {
      return {
        show: false,
        title: "",
        text: "",
      };
    },
  },
});
const emit = defineEmits(["cancel", "ok", "submit"]);
</script>

<style scoped></style>

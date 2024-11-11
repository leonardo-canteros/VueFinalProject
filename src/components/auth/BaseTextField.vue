<template>
  <div>
    <div class="text-subtitle-1 text-medium-emphasis">{{ label }}</div>
    <v-text-field
      :id="name"
      :prepend-inner-icon="icon"
      :placeholder="placeholder"
      :type="type || 'text'"
      :error-messages="errorMessages"
      v-model="val"
      @input="handleInput"
      variant="outlined"
      density="compact"
    >
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: String,
  placeholder: String,
  label: String,
  icon: String,
  errorMessages: String,
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const val = ref("");

watch(
  () => props.modelValue,
  (nVal) => (val.value = nVal),
  { immediate: true }
);

const handleInput = () => {
  emit("update:modelValue", val.value);
};
</script>

<style scoped></style>

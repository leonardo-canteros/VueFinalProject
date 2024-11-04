<template>
  <v-sheet class="mx-auto" width="900">
    <v-form @submit.prevent>

      <v-text-field
        @input="search"

        type="text"
        placeholder="Search"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block>Search</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">

const search = (e) => {
  e.target.value;
}

</script>
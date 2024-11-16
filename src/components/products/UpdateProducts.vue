<template>
  <div>
    <v-container>
      <div class="ma-4">
        <h1>List products</h1>
      </div>
      <!-- props -->
      <v-card
        flat
        v-for="product in listProduct"
        :key="product.id"
        class="pa-3 border"
      >
        <v-row no-gutters>
            <v-col cols="12" sm="6" md="6">
              <div class="text-caption title-color">Product name</div>

              <div class="text-body-1 mt-1">{{ product.name }}</div>
            </v-col>
            <v-col cols="12" sm="2" md="2">
              <div class="text-caption title-color">User</div>

              <div class="text-body-1 mt-1"></div>
            </v-col>
            <v-col cols="6" sm="2" md="2">
              <div class="text-caption title-color">Update</div>

              <div class="text-body-1 mt-1">
                <v-btn color="primary" icon="mdi-update" size="small"></v-btn>
              </div>
            </v-col>
            <v-col cols="6" sm="2" md="2">
              <div class="text-caption title-color">Delete</div>

              <div class="text-body-1 mt-1">
                <v-btn color="red" icon="mdi-delete" size="small"></v-btn>
              </div>
            </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  listProduct: {
    type: Array,
    default: [],
  },
});
</script>

<style scoped>
.title-color {
  color: #757575;
}
</style>

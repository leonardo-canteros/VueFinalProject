<template>
  <div>
    <div class="ma-4">
      <h1>List products</h1>
    </div>

    <v-container class="grey lighten-5">

      <!-- props -->
      <v-card flat v-for="product in listProduct" :key="product.id" class="pa-3">
        <v-row no-gutters>
        <v-col cols="12" sm="6" md="6">
            <div class="text-caption">Product name</div>

          <div class="text-body-1">{{ product.name }}</div>
        </v-col>
        <v-col cols="12" sm="2" md="2">
            <div class="text-caption">User</div>

            <div class="text-body-1"></div>
        </v-col>
        <v-col cols="6" sm="2" md="2">
            <div class="text-caption">Update</div>

            <div class="text-body-1"></div>
        </v-col>
        <v-col cols="6" sm="2" md="2">
            <div class="text-caption">Delete</div>

            <div class="text-body-1"></div>
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



<style scoped></style>

<template>
  <div class="pageview">
    <div v-if="productRetrive">
        
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-carousel>
   
                <v-carousel-item :key="0" :src="productRetrive.image"></v-carousel-item>

            </v-carousel>
          </v-col>

          <v-col cols="12" md="6">
            <v-card >{{ $route.params.id }}


              <v-card-title>{{ productRetrive.name }}</v-card-title>
              <v-card-subtitle class="text-h6">{{
                productRetrive.species
              }}</v-card-subtitle>
              <v-card-actions>
                <v-btn icon>
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <span>{{ quantity }}</span>
                <v-btn icon>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn class="add-to-cart-btn">Add to cart</v-btn>
              </v-card-actions>
            </v-card>

            <v-card class="mt-4">
              <v-card-title>More information:</v-card-title>
              <v-card-text>
                <p>{{ productRetrive.status }}</p>
                <v-list>
                  <v-list-item-group>
                    <v-list-item
                      v-for="(feature, index) in productRetrive.features"
                      :key="index"
                    >
                      <v-list-item-content>{{ feature }}</v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <p v-else>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const apiUrl = "https://rickandmortyapi.com/api/";

const getUserAll = async function () {
  const response = await axios.get(`${apiUrl}character`);
  return response.data.results;
};

const getUserId = async (id) => {
  const users = await getUserAll();
  return users.find((user) => user.id == id);
};

const productRetrive = ref();
const route = useRoute();

onMounted(async () => {
  const id = route.params.id;
  productRetrive.value = await getUserId(id);
});

const quantity = ref(1);

</script>



<style scoped>
.add-to-cart-btn {
  border: 2px solid #000000;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: bold;
  transition: background-color 0.3s, border-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #000000;
  color: white;
  border-color: #000000;
}
</style>

<template>
  <div>
    <div v-if="productRetrieve">
      <v-container>
        <v-row>
            
            <v-col cols="12" md="6">
                <v-carousel>
                  <v-carousel-item :key="0" :src="productRetrieve.image"></v-carousel-item>
                </v-carousel>
            </v-col>
            
            <v-col cols="12" md="6">
              <div class="d-flex justify-end my-3 mr-2">
                
                <ButtonComponent
              @click="goToBack"
              color="indigo"
              class="text-uppercase text-white"
              ><v-icon icon="mdi-arrow-left" start></v-icon>
              Back</ButtonComponent>

              </div>
                <v-card>
                  <v-card-title>{{ productRetrieve.name }}</v-card-title>
                  <v-card-subtitle class="text-h6">{{productRetrieve.price}}</v-card-subtitle>
                
                    <v-card-actions>
                      <div icon>
                        <v-btn icon @click="decreaseQuantity">
                        <v-icon>mdi-minus</v-icon>
                        </v-btn><span>{{ quantity }}</span><v-btn icon @click="increaseQuantity">
                        <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </div>
                      
                      <v-spacer></v-spacer>
                      
                       <!-- Botón para agregar al carrito -->
                      <ButtonComponent
                        class="mx-auto text-uppercase add-to-cart-btn"
                        type="button"
                        @click="addToCart">
                        Add to cart
                      </ButtonComponent>
                   </v-card-actions>
                </v-card>
              
              <v-card class="mt-4">
                <v-card-title>More information:</v-card-title>
                  <v-card-text>
                    <p>{{ productRetrieve.description }}</p>
                    <v-list>
                        <v-list-item v-for="(feature, index) in productRetrieve.features" :key="index">
                          <v-list-item-title>{{ feature }}</v-list-item-title>
                        </v-list-item>
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
import { useProductsListStore } from "@/stores/ProductsStore";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import ButtonComponent from "@/components/common/ButtonComponent.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const productRetrieve = ref();
const store = useProductsListStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const userId = authStore.getUserId();
const cart = cartStore;

console.log("ID del usuario:", userId);

const quantity = ref(1);
const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};


const addToCart = async () => {
  try {
    await cart.addProductToCart(
      productRetrieve.value, 
      userId,           
      quantity.value,     
    );
    alert("Product added to cart successfully");
  } catch (error) {
    console.error("Error al añadir producto al carrito:", error);
    alert("No se pudo añadir el producto al carrito.");
  }
};

const goToBack = () => {
  router.push("/products");
};

onMounted(async () => {
  const productId = route.params.id;
  console.log("ID del producto:", productId);

  productRetrieve.value = await store.getProductId(productId);
  console.log("productRetrieve:", productRetrieve.value);
});
</script>

<style scoped></style>

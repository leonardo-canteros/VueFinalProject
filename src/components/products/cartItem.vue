<template>
  <v-list-item class="product-item" :class="{'hovered': isHovered}" @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <v-row style="align-items: center; justify-content: space-between">
      <!-- Imagen del producto -->
      <v-col>
        <v-list-item-avatar>
          <v-img :src="product.image" alt="Product Image" max-width="80" max-height="80" />
        </v-list-item-avatar>
      </v-col>

      <!-- Detalles del producto -->
      <v-col cols="12" sm="8" md="6">
        <v-list-item-content>
          <v-row justify="start" style="align-items: center">
            <v-col>
              <v-list-item-title>{{ product.name }}</v-list-item-title>
            </v-col>
            <v-col>
              <v-list-item-subtitle>Precio: ${{ product.price }}</v-list-item-subtitle>
            </v-col>
            <v-col>
              <v-list-item-subtitle>
                <v-row class="d-flex align-center">
                  <v-btn small @click="decreaseQuantity" :disabled="product.quantity <= 1">-</v-btn>
                  <span class="mx-2">{{ product.quantity }}</span>
                  <v-btn small @click="increaseQuantity">+</v-btn>
                </v-row>
              </v-list-item-subtitle>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-col>

      <!-- Acciones del producto -->
      <v-col cols="12" md="4" class="d-flex justify-end">
        <v-list-item-action>
          <RouterLink :to="{ name: 'productId', params: { id: product.id } }">
            <v-btn color="primary">Ver Detalles</v-btn>
          </RouterLink>
          <v-btn @click="removeFromCart" color="red">Eliminar</v-btn>
        </v-list-item-action>
      </v-col>
    </v-row>
  </v-list-item>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import type { Orders02 } from "@/stores/cart";

const cartStore = useCartStore();
const authStore = useAuthStore();

const customer_id = authStore.getUserId();


const props = defineProps({
  product: {
    type: Object as () => Orders02["order_products"][0],
    required: true,
  },
});

const isHovered = ref(false);

// Función para eliminar el producto del carrito
const removeFromCart = async () => {
  if (authStore.isLoggedIn) {
    await cartStore.removeProductFromCart(props.product.id, customer_id);
  }
};

// Función para aumentar la cantidad
const increaseQuantity = async () => {
  if (authStore.isLoggedIn) {
    props.product.quantity += 1; // Actualiza localmente
    await cartStore.updateProductInCart (
      props.product,
      customer_id,
      
    );
  }
};

// Función para disminuir la cantidad
const decreaseQuantity = async () => {
  if (authStore.isLoggedIn && props.product.quantity > 1) {
    props.product.quantity -= 1; // Actualiza localmente
    await cartStore.updateProductInCart(
      props.product,
      customer_id,
    );
  }
};
</script>

<style scoped>
.product-item {
  border: 1px solid #ccc;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.product-item.hovered {
  border-color: #f46568;
  border-radius: 20px;
  background-color: #f9f9f9;
}
</style>

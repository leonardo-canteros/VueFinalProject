<template>
  <v-list-item class="product-item" :class="{'hovered': isHovered}" @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <v-row style="align-items: center; justify-content: space-between">
      <!-- Imagen del producto -->
      <v-col>
        <div>
          <v-img :src="product.image" alt="Product Image" max-width="80" max-height="80" />
        </div>
      </v-col>

      <!-- Detalles del producto -->
      <v-col cols="12" sm="8" md="6">
        <div>
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
        </div>
      </v-col>

      <!-- Acciones del producto -->
      <v-col cols="12" md="4" class="d-flex justify-end">
        <div>
          <RouterLink :to="{ name: 'productId', params: { id: product.product_id } }">
            <v-btn color="primary">See Details</v-btn>
          </RouterLink>
          <v-btn @click="showRemoveDialog" color="red">Remove</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-list-item>

  <!-- Diálogo de confirmación para eliminar producto -->
  <v-dialog v-model="dialogVisible" max-width="400px">
    <v-card>
      <v-card-title class="headline">¿Remove product from cart?</v-card-title>
      <v-card-actions>
        <v-btn  @click="dialogVisible = false">No</v-btn>
        <v-btn color="red" @click="removeFromCart">yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import type { Orders01 } from "@/stores/cart";

const cartStore = useCartStore();
const authStore = useAuthStore();

const customer_id = authStore.getUserId();

const props = defineProps({
  product: {
    type: Object as () => Orders01["order_products"][0],
    required: true,
  },
});

// Define los eventos que el componente puede emitir
const emit = defineEmits(["cartUpdated"]);

const isHovered = ref(false);
const dialogVisible = ref(false);  // Estado para controlar la visibilidad del diálogo

// Función para mostrar el diálogo de confirmación
const showRemoveDialog = () => {
  dialogVisible.value = true;
};

// Función para eliminar el producto del carrito
const removeFromCart = async () => {
  if (authStore.isLoggedIn) {
    await cartStore.removeProductFromCart(
      props.product,
      customer_id,
      props.product.quantity
    );
    dialogVisible.value = false; // Cierra el diálogo después de eliminar el producto
    // Emitir el evento para notificar a la vista
    emit("cartUpdated");
  }
};

// Función para aumentar la cantidad
const increaseQuantity = async () => {
  if (authStore.isLoggedIn) {
    props.product.quantity += 1; // Actualiza localmente
    await cartStore.updateProductInCart(
      props.product,
      customer_id,
      props.product.quantity
    );
    // Emitir el evento para notificar a la vista
    emit("cartUpdated");
  }
};

// Función para disminuir la cantidad
const decreaseQuantity = async () => {
  if (authStore.isLoggedIn && props.product.quantity > 1) {
    props.product.quantity -= 1; // Actualiza localmente
    await cartStore.updateProductInCart(
      props.product,
      customer_id,
      props.product.quantity
    );
    // Emitir el evento para notificar a la vista
    emit("cartUpdated");
  }
};
</script>

<style scoped>
.product-item {
  display: grid;
  grid-template-rows: auto 1fr auto; /* Ajusta el contenido a la altura disponible */
  border: 1px solid #ccc;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.product-item.hovered {
  border-color: #f46568;
  border-radius: 20px;
  background-color: #f9f9f9;
}

.v-img {
  object-fit: cover;
  height: 80px;
  width: 80px;
}
</style>

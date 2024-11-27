<template>
  <v-menu v-if="role === 'customer'">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
    </template>
    <v-card min-width="300">
      <v-list>
        <v-list-item
          prepend-avatar="orderProducts.image"
          :subtitle="orderProducts[0]['description']"
          title="John Leider"
        >
        </v-list-item>
      </v-list>
      <v-card-actions class="cart-dropdown">
        <v-row justify="center">
          <v-col
            cols="12"
            md="6"
            align-self="center"
            class="d-flex justify-center"
          >
            <RouterLink to="/cart" class="text-white">
              <ButtonComponent> View Cart </ButtonComponent>
            </RouterLink>
          </v-col>
          <!-- <v-col
            cols="12"
            md="6"
            align-self="center"
            class="d-flex justify-center"
          >
            <RouterLink to="/cart" class="text-white">
              <ButtonComponent> Checkout </ButtonComponent>
            </RouterLink>
          </v-col> -->
        </v-row>
      </v-card-actions>
    </v-card>
  </v-menu>

  <RouterLink to="/products" class="text-white">
    <v-btn v-if="role !== 'customer'" icon>
      <v-icon>mdi-cart-outline</v-icon>
    </v-btn>
  </RouterLink>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/common/ButtonComponent.vue";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { ref, watch } from "vue";

interface OrderProduct {
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  category: string;
  seller_id: string;
  id: string;
}

interface OrderProducts {
  orderProducts: OrderProduct[];
}

const authStore = useAuthStore();
const cartStore = useCartStore();
const role = ref("");
const orderProducts = ref<OrderProducts[]>([]);

// console.log(cartStore);

watch(authStore, async (newValue) => {
  role.value = newValue.role;
  if (newValue.isLoggedIn) {
    orderProducts.value = await cartStore.fetchCartProducts(
      newValue.getUserId()
    );
  }
});
</script>

<style scoped></style>

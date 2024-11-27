<template>
  <template v-if="role === 'customer' && orderProducts.length > 0">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-badge
            :content="orderProducts.length"
            :value="orderProducts.length"
            color="red"
            overlap
          >
            <v-icon>mdi-cart-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card min-width="300">
        <v-list v-for="product in orderProducts" :key="product.product_id">
          <v-list-item>
            <v-row>
              <v-col>
                <v-img
                  :src="product.image"
                  alt="Product Image"
                  max-width="60"
                  max-height="60"
                />
              </v-col>
              <v-col>
                <h4>{{ product.name }}</h4>
                <h5>
                  <span>x{{ product.quantity }} </span> {{ product.price }}
                </h5>
              </v-col>
            </v-row>
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
  </template>

  <template v-else>
    <RouterLink to="/products" class="text-white">
      <v-btn icon>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
    </RouterLink>
  </template>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/common/ButtonComponent.vue";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { ref, watch } from "vue";

const authStore = useAuthStore();
const cartStore = useCartStore();
const role = ref("");

interface OrderProduct {
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  category: String;
  seller_id: string;
  product_id: string;
}

const orderProducts = ref<OrderProduct[]>([]);

// console.log(cartStore);

watch(authStore, async (newValue) => {
  role.value = newValue.role;
  if (newValue.isLoggedIn) {
    orderProducts.value = await cartStore.fetchCartProducts(
      newValue.getUserId()
    );
  }
});

watch(cartStore, (newValue) => {
  orderProducts.value = newValue.cartProducts.order_products;
});
</script>

<style scoped></style>

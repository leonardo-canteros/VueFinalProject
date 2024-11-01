<template>
  <v-container>
    <v-row>
      <!-- Carrusel de imágenes a la izquierda -->
      <v-col cols="12" md="6">
        <v-carousel>
          <v-carousel-item
            v-for="(image, index) in product.images"
            :key="index"
            :src="image"
          ></v-carousel-item>
        </v-carousel>
      </v-col>

      <!-- Detalles del producto a la derecha -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-subtitle class="text-h6">{{ product.price }}</v-card-subtitle>
          <v-card-actions>
            <v-btn icon @click="decrementQuantity">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <span>{{ quantity }}</span>
            <v-btn icon @click="incrementQuantity">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="add-to-cart-btn" @click="addToCart">add to cart</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>More information:</v-card-title>
          <v-card-text>
            <p>{{ product.description }}</p>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="(feature, index) in product.features" :key="index">
                  <v-list-item-content>{{ feature }}</v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: 1
    };
  },
  methods: {
    incrementQuantity() {
      this.quantity++;
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart() {
      // Lógica para agregar el producto al carrito
      console.log(`Agregado al carrito: ${this.product.name}, Cantidad: ${this.quantity}`);
    },
  },
};
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

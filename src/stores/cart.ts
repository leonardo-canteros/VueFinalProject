// src/stores/cart.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const http = axios.create({
  baseURL: "https://upper-serena-fastapi-ecommerce-6026090d.koyeb.app/api/",
});

export const useCartStore = defineStore("cart", () => {
  const cartProducts = ref([]); // Lista de productos en el carrito

  // **Función para obtener el carrito del usuario**
  const fetchCartProducts = async (userId: string) => {
    try {
      const response = await http.get(`/cart/${userId}`); // agregar carrito en back
      cartProducts.value = response.data;
    } catch (error) {
      console.error("Error obteniendo productos del carrito:", error);
    }
  };

  // **Función para añadir un producto al carrito**
  const addProductToCart = async (productId: string, userId: string) => {
    try {
      await http.post(`/cart/${userId}/add`, { productId });
      await fetchCartProducts(userId); 
    } catch (error) {
      console.error("Error añadiendo producto al carrito:", error);
    }
  };

  // **Función para actualizar la cantidad de un producto en el carrito**
  const updateProductInCart = async (productId: string, quantity: number, userId: string) => {
    try {
      await http.put(`/cart/${userId}/update`, { productId, quantity }); // Asegúrate de tener este endpoint en el backend
      await fetchCartProducts(userId); 
    } catch (error) {
      console.error("Error actualizando producto en el carrito:", error);
    }
  };

  // **Función para eliminar un producto del carrito**
  const removeProductFromCart = async (productId: string, userId: string) => {
    try {
      await http.delete(`/cart/${userId}/remove`, { data: { productId } });
      await fetchCartProducts(userId); 
    } catch (error) {
      console.error("Error eliminando producto del carrito:", error);
    }
  };

  return {
    cartProducts,
    fetchCartProducts,
    addProductToCart,
    updateProductInCart,
    removeProductFromCart,
  };
});

// src/stores/cart.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export interface Orders {
  customer_id: String;
  order_products: Array<{
    product_id: string;
    price: number;
    quantity: number;
  }>;
  status: String;
  id: String;
}

export interface Orders01 {
   customer_id: String;
  order_products: Array<{
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
    category: String;
    seller_id: string;
    product_id: string;
  }>;
  status: String;
  id: String;
}

export interface Orders02 {
  customer_id: String;
  order_products: Array<{
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
    category: String;
    seller_id: string;
    id: string;
  }>;
  status: String;
  id: String;
}

export const cartProducts = ref<Orders02>({
  customer_id: "",
  order_products: [],
  status: "",
  id: "",
});

  
const http = axios.create({
  baseURL: "https://upper-serena-fastapi-ecommerce-6026090d.koyeb.app/api",
});

export const useCartStore = defineStore("cart", () => {

  const authStore = useAuthStore();

  // Agrega un interceptor para incluir el token en las solicitudes
  http.interceptors.request.use((config) => {
  const token = authStore.getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
  });
  
  const cartProducts = ref<Orders01>({
    customer_id: "",
    order_products: [],
    status: "",
    id: "",
  });
  
  const fetchCartProducts = async (customer_id: string) => {
    try {
      const response = await http.get(`/orders/shopping_cart/${customer_id}`);
      const cart = response.data.response[0];
      console.log("el carrito", cart);
      cartProducts.value = cart;
      return cart;
    } catch (error) {
      console.error("Error obteniendo productos del carrito:", error);
      cartProducts.value = {
        customer_id: "",
        order_products: [],
        status: "",
        id: "",
      };
    }
  };

    const addProductToCart = async (product: Orders02["order_products"][0], customer_id: string, quantity: number) => {
      try {
        console.log("product id",product.id, "product price", product.price, "quatity",quantity,"id usuario", customer_id,  );
        const response = await http.post(`/orders/shopping_cart/add/${customer_id}`,{ 
          product_id: product.id,
          price: product.price,
          quantity: quantity
        } );
        const cart = response.data.response;
        cartProducts.value = cart;
        return cart;
      } catch (error) {
        console.error("Error añadiendo producto al carrito:", error);
        
      }
    };

    const updateProductInCart = async (product: Orders01["order_products"][0], customer_id: string, quantity: number) => {
      try {
        await http.put(`/orders/shopping_cart/update/${customer_id}`, {
            product_id: product.product_id,
            price: product.price,
            quantity: quantity
          
        });
        await fetchCartProducts(customer_id);
      } catch (error) {
        console.error("Error actualizando producto en el carrito:", error);
      }
    };

    const removeProductFromCart = async (product: Orders01["order_products"][0], customer_id: string, quantity: number) => {
      try {
        console.log("product id",product.product_id, "product price", product.price, "quatity",quantity,"id usuario", customer_id,  );
          await http.delete(`/orders/shopping_cart/remove/${customer_id}`, {
          data: { // Debes envolver los datos en 'data' en una solicitud DELETE
            product_id: product.product_id,
            price: product.price,
            quantity: quantity
          }
        });
        await fetchCartProducts(customer_id);
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

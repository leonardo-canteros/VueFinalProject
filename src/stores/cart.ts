// src/stores/cart.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { string } from "yup";

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

export const useCartStore = defineStore("cart", () => {
  const authStore = useAuthStore();
  
  const cartProducts = ref<Orders02>({
    customer_id: "",
    order_products: [],
    status: "",
    id: "",
  });


const http = axios.create({
  baseURL: "https://upper-serena-fastapi-ecommerce-6026090d.koyeb.app/api",
});

// Agrega un interceptor para incluir el token en las solicitudes
http.interceptors.request.use((config) => {
  const token = authStore.getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Función para obtener los productos del carrito, con el id hardcodeado
const fetchCartProducts = async (customer_id: string) => {
  try {
    const response = await http.get(`/orders/shopping_cart/${customer_id}`);
    const cart = response.data.response;
    console.log("el carrito", cart);
    cartProducts.value = cart;
    return cart;
  } catch (error) {
    console.error("Error obteniendo productos del carrito:", error);
  }
};

  const addProductToCart = async (product: Orders02["order_products"][0], customer_id: string, quantity: number) => {
    try {
      console.log("product id",product.id, "product price", product.price, "quatity",quantity,"id usuario", customer_id,  );
      await http.post(`/orders/shopping_cart/add/${customer_id}`,{ 
        product_id: product.id,
        price: product.price,
        quantity: quantity
      } );
     
    } catch (error) {
      console.error("Error añadiendo producto al carrito:", error);
      
    }
  };

  const updateProductInCart = async (product: Orders02["order_products"][0], customer_id: string) => {
    try {
      await http.put(`/orders/shopping_cart/update/${customer_id}`, { data: {
          productId: product.id,
          quantity: product.quantity
        }
      });
      await fetchCartProducts(customer_id);
    } catch (error) {
      console.error("Error actualizando producto en el carrito:", error);
    }
  };

  const removeProductFromCart = async (product_id: string, customer_id: string) => {
    try {
      await http.delete(`/orders/shopping_cart/remove/${customer_id}`, { data: { product_id } });
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

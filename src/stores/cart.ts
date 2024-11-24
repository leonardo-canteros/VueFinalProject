// src/stores/cart.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

 export interface Orders {
  customer_id: String;
  order_products:Array<{
    product_id: string;
    price: number;
    quantity: number;
  }>;
  status: String;
  id: String;
}

export interface Orders01 {
  customer_id: String;
  order_products:Array<{
    product_id: string;
    price: number;
    quantity: number;
  }>;
}

export interface Orders02 {
  customer_id: String;
  order_products:Array<{
    name: string;
    price: number;
    quantity: number;
    description:string;
    image: string;
    category:String;
    seller_id:string;
    product_id: string;
  
  }>;
  status: String;
  id: String;
}

const http = axios.create({
  baseURL: "https://upper-serena-fastapi-ecommerce-6026090d.koyeb.app/api/",
});

export const useCartStore = defineStore("cart", () => {
  const cartProducts = ref <Orders02["order_products"]> ([]);

  // Función para obtener el carrito del usuario
  const fetchCartProducts = async (customer_id: string) => {
    try {
      const objects = await http.get(`/orders/shopping_cart/${customer_id}`); 
      const orders = objects.data.response;

      const shoppingOrder = orders.find((order: Orders02) => order.status === "shopping");

      if (shoppingOrder) {
        cartProducts.value = shoppingOrder.order_products;
      } else {
        cartProducts.value = [];
      }
    } catch (error) {
      console.error("Error obteniendo productos del carrito:", error);
    }
  };

  // Función para añadir un producto al carrito
  const addProductToCart = async (product:  Orders["order_products"][0], customer_id: string) => {
    try {
      await http.post(`/orders/shopping_cart/add/${customer_id}`, {data: 
      {  
        customer_id: customer_id,
        product:product, 
      }} );
      await fetchCartProducts(customer_id); 
    } catch (error) {
      console.error("Error añadiendo producto al carrito:", error);
    }
  };

 // Función para actualizar la cantidad de un producto en el carrito
const updateProductInCart = async (product: Orders["order_products"][0], customer_id: string) => {
  try {
    await http.put(`/orders/shopping_cart/update/${customer_id}`, {data: {
        productId: product.product_id,
        quantity: product.quantity
      }
    });
    await fetchCartProducts(customer_id); 
  } catch (error) {
    console.error("Error actualizando producto en el carrito:", error);
  }
};


  // Función para eliminar un producto del carrito
  const removeProductFromCart = async (product_id: string, customer_id: string) => {
    try {
      await http.delete(`/orders/shopping_cart/remove/${customer_id}`, { data: {product_id}});
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

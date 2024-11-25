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
  // Estado reactivo
  const cartProducts = ref<Orders02>({
    customer_id: "",
    order_products: [],
    status: "",
    id: "",
  });


  // Función para obtener los productos del carrito
  const fetchCartProducts = async (customer_id: string) => {
    try {
      // Realiza la solicitud a la API
      const response = await http.get(`/orders/shopping_cart/${customer_id}`);
      const cart = response.data.response;  // Suponemos que la API siempre devuelve un objeto Orders02
      
      // Asigna el carrito recibido directamente
      cartProducts.value = cart; 
  
      // Si el carrito está vacío, asigna un estado vacío
      if (cart.order_products.length === 0) {
        cartProducts.value = {
          customer_id: customer_id,
          order_products: [],
          status: "empty",
          id: "",
        };
      }
  
    } catch (error) {
      console.error("Error obteniendo productos del carrito:", error);
      // Manejo de error, asignando carrito vacío si falla la llamada
      cartProducts.value = {
        customer_id: customer_id,
        order_products: [],
        status: "empty",
        id: "",
      };
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

import { defineStore } from "pinia";
import { ref } from "vue";

import { getProductsAll } from "@/helpers/products.model";

export const useProductsListStore = defineStore("productsStore", () => {
  
    const listProducts = ref([])
    const loading = ref(false);
    const error = ref<string | null>(null);


    async function fetchAllProducts() {
      loading.value = true;
      try {
        const result = await getProductsAll();
        listProducts.value = result.data.response;

      } catch (error) {
        error.value = "Error fetching products";
      } finally {
        loading.value = false;
      }
    }

    function addProduct(product: any) {
      listProducts.value.push(product);
    }

    function filterListProduct(searchQuery: string) {
      if (searchQuery.trim() === "") {
        listProducts.value;
        return;
      }
        listProducts.value = listProducts.value.filter((product) => {
        return product.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    function clearProducts() {
      listProducts.value = [];
    }
  
  return { fetchAllProducts, addProduct, filterListProduct, clearProducts, listProducts, error, loading}
  
});

import { defineStore } from "pinia";
import { ref } from "vue";
import TutorialDataService from "@/helpers/products.model";

export const useProductsListStore = defineStore("productsStore", () => {
  
  const listProducts = ref([]);
  const loading = ref(false);
  const error = ref<string | null>(null);



  async function fetchAllProducts() {
    loading.value = true;
    try {
      //  const result = await getProductsAll();
      const result = await TutorialDataService.getAll();
      console.log("resultado", result.data.response);

      listProducts.value = result.data.response;
    } catch (error) {
      error.value = "Error fetching products";
    } finally {
      loading.value = false;
    }
  }

  async function addProduct(product) {
    try {
      const respo = await TutorialDataService.create(product);

      console.log("Respuesta: ---->", respo.data.response);

      const newProduct = respo.data.response || respo.data;

      listProducts.value.push(newProduct);
    } catch (err) {
      console.error("Error adding product:", err);
      error.value = "Error adding product.";
    }
  }

  async function getProductId(id) {
    try {
      if (!listProducts.value || listProducts.value.length === 0) {
        await TutorialDataService.get(id);
      }

      return listProducts.value.find((product) => product.id === id);
    } catch (err) {
      error.value = "Failed to fetch products.";
    }
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

  
  return {
    fetchAllProducts,
    getProductId,
    addProduct,
    filterListProduct,
    clearProducts,
    listProducts,
    error,
    loading,
  };
});

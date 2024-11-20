import { defineStore } from "pinia";
import { ref } from "vue";
import TutorialDataService from "@/helpers/products.model";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  deactivated_at: string | null;
}


export const useProductsListStore = defineStore("productsStore", () => {
  const listProducts = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const originalProducts = ref<Product[]>([]);


  async function fetchAllProducts() {
    loading.value = true;
    try {
      const result = await TutorialDataService.getAll();

      listProducts.value = result.data.response.filter((product: Product) => {
        return product.deactivated_at === null;
      });
    } catch (err) {
        error.value = "Error fetching products";
    } finally {
      loading.value = false;
    }
  }

  async function addProduct(product: Product) {
    try {
      const respo = await TutorialDataService.create(product);
      const newProduct = respo.data.response || respo.data;
      listProducts.value.push(newProduct);
    } catch (err) {
      error.value = "Error adding product.";
    }
  }

  async function updateProduct(productId: any, product: any) {
    try {
      const updateProdResponse = await TutorialDataService.update(
        productId,
        product
      );

      const productEdited: Product = updateProdResponse.data.response || updateProdResponse.data;

      const indexOfProductToReplace = listProducts.value.findIndex(
        (productItem) => {
          return productItem.id === productId;
        }
      );

      listProducts.value[indexOfProductToReplace] = productEdited;
    } catch (err) {
      console.error("Error adding product:", err);
      error.value = "Error adding product.";
    }
  }

  async function getProductId(id: any) {
    try {
      if (!listProducts.value || listProducts.value.length === 0) {
        await TutorialDataService.get(id);
      }

      return listProducts.value.find((product) => product.id === id);
    } catch (err) {
      error.value = "Failed to fetch products.";
    }
  }

  function filterListProduct(searchQuery: any) {
    if (originalProducts.value.length === 0) {
      originalProducts.value = [...listProducts.value];
    }

    if (searchQuery.trim() === "") {
      listProducts.value = [...originalProducts.value];
      return;
    }

    listProducts.value = originalProducts.value.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  async function deleteProduct(productId: string) {
    try {
      await TutorialDataService.delete(`${productId}`);
    } catch (error) {
      console.error("Error al borrar:", error);
    }
  }

  return {
    fetchAllProducts,
    getProductId,
    addProduct,
    updateProduct,
    filterListProduct,
    deleteProduct,
    listProducts,
    error,
    loading,
  };
});

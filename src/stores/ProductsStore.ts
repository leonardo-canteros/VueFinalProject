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
            const result = await TutorialDataService.getAll();

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

            const newProduct = respo.data.response || respo.data;

            console.log("Nuevo producto:", newProduct);

            listProducts.value.push(newProduct);

            console.log("Lista actualizada:", listProducts.value);
          } catch (err) {
            console.error("Error adding product:", err);
            error.value = "Error adding product.";
          }
        }

        async function updateProduct(productId: any, product: any) {
          try {
            const updateProdResponse = await TutorialDataService.update(
              productId,
              product
            );

            console.log("Respuesta: ---->", updateProdResponse.data.response);

            const productEdited =
              updateProdResponse.data.response || updateProdResponse.data;

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

        const originalProducts = ref([]);

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

        /*  function filterListProduct(searchQuery: string) {
          if (searchQuery.trim() === "") {
            listProducts.value;
            return;
          }
          listProducts.value = listProducts.value.filter((product) => {
            return product.name.toLowerCase().includes(searchQuery.toLowerCase());
          });
        } */

        function clearProducts() {
          listProducts.value = [];
        }

        return {
          fetchAllProducts,
          getProductId,
          addProduct,
          updateProduct,

          filterListProduct,
          clearProducts,
          listProducts,
          error,
          loading,
        };
});

import { defineStore } from "pinia";

import { getProductsAll } from "@/helpers/products.model";

export const useProductsListStore = defineStore("productsStore", {
  state: () => ({
    listProducts: [],
    id: 0,
    loading: false,
  }),

  actions: {

    async fetchAllProducts() {
      this.loading = true;
      try {
        const result = await getProductsAll();
        this.listProducts = result.data.response;

      } catch (error) {
        this.error = "Error fetching products";
      } finally {
        this.loading = false;
      }
    },

    addProduct(product) {
      this.listProducts.push(product);
    },

    filterListProduct(searchQuery) {
      if (searchQuery.trim() === "") {
        this.listProducts;
        return;
      }
        this.listProducts = this.listProducts.filter((product) => {
        return product.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    },

    clearProducts() {
      this.listProducts = [];
    },
  },
});

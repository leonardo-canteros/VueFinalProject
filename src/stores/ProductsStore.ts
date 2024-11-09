import { defineStore } from "pinia";


export const useProductsListStore = defineStore("productsStore", {

  state: () => ({
    listProducts: [],
    id: 0,
  }),

  actions: {
    setProducts(products) {
      this.listProducts = products;
    },

    addProduct(product){
      this.listProducts.push({product});

    },

    async filterListProduct(searchQuery) {
      if (searchQuery.trim() === "") {
        const result = await getUserAll();
        if (result.status === 200) {
          this.setProducts(result.data.response);
        }
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

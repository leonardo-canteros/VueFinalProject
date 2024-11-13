import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const apiUrl = "https://upper-serena-fastapi-ecommerce-6026090d.koyeb.app/api/";

export const getProductsAll = async function () {
  return await axios.get(`${apiUrl}products/`);
};

const authStore = useAuthStore();

// POST request using fetch with set headers
const http = axios.create({
  baseURL: "https://upper-serena-fastapi-ecommerce-6026090d.koyeb.app/api/",
  headers: {
    Authorization: "Bearer " + authStore.getToken(),
  },
});

class TutorialDataService {
  getAll() {
    return http.get("/products");
  }

  get(id: string) {
    return http.get(`/products/${id}`);
  }

  create(data: any) {
    return http.post("/products", data);
  }

  update(id: string, data: any) {
    return http.put(`/products/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/products/${id}`);
  }
}

export default new TutorialDataService();

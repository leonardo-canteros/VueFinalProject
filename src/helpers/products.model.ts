import axios from "axios";
import { useAuthStore } from "@/stores/auth";


const authStore = useAuthStore();


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

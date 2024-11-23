import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();


export interface FormData {
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  category: string;
  seller_id: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  category: string;
  deactivated_at: string | null;
}


const http = axios.create({
  baseURL: "https://upper-serena-fastapi-ecommerce-6026090d.koyeb.app/api/",
});


class TutorialDataService {
  getAll(sortBy = 'name', sortDir = 'asc') {
    return http.get(`/products?sort_by=${sortBy}&sort_dir=${sortDir}`);
  }

  get(id: string) {
    return http.get(`/products/${id}`);
  }

  create(data: any) {
    data.seller_id = authStore.getUserId();
    return http.post(
      "/products", 
      data,
        {
          headers: {
            Authorization: "Bearer " + authStore.getToken()
          }
        }
    );
  }

  update(id: string, data: any) {
    return http.put(`/products/${id}`, 
    data,
    {
      headers: {
        Authorization: "Bearer " + authStore.getToken()
      }
    }
    );
  }

  delete(id: string) {
    return http.delete(
      `/products/${id}`,
      {
        headers: {
          Authorization: "Bearer " + authStore.getToken()
        }
      }
      );
  }
}

export default new TutorialDataService();

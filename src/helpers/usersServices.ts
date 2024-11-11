import { urlApiServer } from "@/constApi";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

export const getProfile = async () => {
    const params = {
      headers: {
        'Authorization': 'Bearer ' + authStore.getToken(),
      }}
    const res = await axios.get(`${urlApiServer}/auth/authenticated_user`, params);
    return res.data;
}
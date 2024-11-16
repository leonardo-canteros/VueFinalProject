import { urlApiServer } from "@/constApi";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const authStore = useAuthStore();

export const getProfile = async () => {
    const params = {
      headers: {
        'Authorization': 'Bearer ' + authStore.getToken(),
      }}
    const res = await axios.get(`${urlApiServer}/auth/authenticated_user`, params);
    return res.data;
}

export const getUsersList = async () => {
    const params = {
      headers: {
        'Authorization': 'Bearer ' + authStore.getToken(),
      }}
    const res = await axios.get(`${urlApiServer}/api/users/include_deleted`, params);
    return res.data.response;
}
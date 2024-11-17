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

export const createUser = async (user: any) => {
    const headers = {
      headers: {
        'Authorization': 'Bearer ' + authStore.getToken(),
      }}
    const body = {
      ...user
    }
    console.log(body);
    const res = await axios.post(`${urlApiServer}/api/users/`, headers);
    return res.data;
}

export const deleteUser = async (id: string) => {
    const params = {
      headers: {
        'Authorization': 'Bearer ' + authStore.getToken(),
      }}
    const res = await axios.delete(`${urlApiServer}/api/users/${id}`, params);
    return res.data;
}
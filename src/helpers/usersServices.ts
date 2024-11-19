import { urlApiServer } from "@/constApi";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const authStore = useAuthStore();

export const getProfile = async () => {
  try {
    const params = {
      headers: {
        'Authorization': 'Bearer ' + authStore.getToken(),
      }
    }
    const res = await axios.get(`${urlApiServer}/auth/authenticated_user`, params);
    return res.data;
    
  } catch (reason: any) {
    console.log(reason.response.data.detail)
    // throw new Error(reason.response.data.detail);
  }  
}

export const getUsersList = async () => {
  try {
    const params = {
      headers: {
          'Authorization': 'Bearer ' + authStore.getToken(),
      }
    }
    const res = await axios.get(`${urlApiServer}/api/users/include_deleted`, params);
    return res.data.response;
  } catch (reason: any) {
    console.log(reason.response.data.detail)
    // throw new Error(reason.response.data.detail);
  }  
}

export const createUser = async (user: any) => {
  try {
    const headers = {
      headers: {
        'Authorization': 'Bearer ' + authStore.getToken(),
      }
    }
    const res = await axios.post(`${urlApiServer}/api/users/`, user, headers);
    return res.data;
  } catch (reason: any) {
    console.log(reason.response.data.detail)
    // throw new Error(reason.response.data.detail);
  }  
}

export const registerUser = async (user: any) => {
  try {
    const headers = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }
    const res = await axios.post(`${urlApiServer}/auth/register`, user, headers);
    return res.data;
  } catch (reason: any) {
    throw new Error(reason.response.data.detail);
  }  
}

export const updateUser = async (user: any) => {
  try {
    const headers = {
      headers: {
        'Authorization': 'Bearer ' + authStore.getToken(),
      }
    }
    const res = await axios.put(`${urlApiServer}/api/users/${user.id}`, user, headers);
    return res.data;
  } catch (reason: any) {
    console.log(reason.response.data.detail)
    // throw new Error(reason.response.data.detail);
  }  
}

export const deleteUser = async (id: string) => {
  try {
    const params = {
      headers: {
        'Authorization': 'Bearer ' + authStore.getToken(),
      }
    }
    const res = await axios.delete(`${urlApiServer}/api/users/${id}`, params);
    return res.data;
    
  } catch (reason: any) {
    console.log(reason.response.data.detail)
    // throw new Error(reason.response.data.detail);
  }  
}
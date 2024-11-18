import { urlApiServer } from "@/constApi";
// import { getProfile } from "@/helpers/usersServices";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const token = ref<string | null>(null);
    const isLoggedIn = ref(false);
    const role = ref('');
    const userId = ref('');

    const fetchToken = async (username: string = '', password: string = '') => {
        try {
            const params = {
                "username": username,
                "password": password
            }
            const res = await axios.post(
                `${urlApiServer}/auth/login`, params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },}
            );
            token.value = res.data.access_token
            isLoggedIn.value = true;
            await getProfile();
        } catch (reason: any) {
            // if (reason.response!.status === 400) {
            // // Handle 400
            // } else {
            // // Handle else
            // }
            // console.log(reason.response.data.detail)
            throw new Error(reason.response.data.detail);
        }
    }

    const getToken = () => {
        return token.value;
    }



    const getUserId = () => {
        return userId.value;
    }

    const getProfile = async () => {
        const params = {
        headers: {
            'Authorization': 'Bearer ' + getToken(),
        }}
        const res = await axios.get(`${urlApiServer}/auth/authenticated_user`, params);
        const data = res.data;
        role.value = data.role;
        userId.value = data.id;
    }

    const logout = () => {
        token.value = null;
        role.value = '';
        userId.value = '';
        isLoggedIn.value = false;
    }

    return { fetchToken, getToken, getUserId, isLoggedIn, logout, role, userId };
});
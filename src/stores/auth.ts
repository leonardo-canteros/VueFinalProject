import { urlApiServer } from "@/constApi";
// import { getProfile } from "@/helpers/usersServices";
import axios from "axios";
import { defineStore } from "pinia";
import VueCookies from 'vue-cookies'
import { ref, inject } from "vue";



export const useAuthStore = defineStore("auth", () => {
    
    
    const role = ref('');
    const userId = ref('');
    const $cookies = inject<VueCookies>('$cookies');

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
            $cookies.set("user_token", res.data.access_token)
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
        return $cookies.get("user_token");
    }

    const initAuth = () => {
        const authToken = getToken()

        if (!Boolean(userId.value)) {
            getProfile()
        }

        return authToken
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

    const token = ref<string | null>(initAuth() || null);
    const isLoggedIn = ref(Boolean(token.value) || false);

    const logout = () => {
        token.value = null;
        $cookies.remove("user_token")
        role.value = '';
        userId.value = '';
        isLoggedIn.value = false;
    }

    return { fetchToken, getToken, getUserId, isLoggedIn, logout, role, userId };
});
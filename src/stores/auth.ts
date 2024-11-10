import { urlApiServer } from "@/constApi";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const token = ref<string | null>(null);
    const isLoggedIn = ref(false);
    const role = ref('');

    const getToken = async (username: string = '', password: string = '') => {
        try {
            if (token.value) {
                return token.value;
            }
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
        } catch (error) {
            console.log(error);
        }
    }

    const setRole = (newRole: string) => {
        role.value = newRole;
    }

    const getRole = () => {
        return role.value;
    }

    const logout = () => {
        token.value = null;
        isLoggedIn.value = false;
    }

    return { getToken, isLoggedIn, logout };
});
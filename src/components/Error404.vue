<template>
    <div class="container-error">
        <div class="error-status">
            <h1>404</h1>
            <h2>Page not found!</h2>
        </div>
        <div class="error-message">
            <p>We're sorry, the page you requested could not be found.
                Please go back to the homepage!
            </p>
            <ButtonComponent @click="home"></ButtonComponent>
        </div>
    </div>
</template>


<script setup lang="ts">

import ButtonComponent from '@/components/ButtonComponent.vue';
import { useRouter, RouterLink} from 'vue-router';

const router = useRouter();

const home = () => {
    router.push('/')
}

</script>


<style scoped>
.container-error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

h1 {
    font-size: 4rem;
}

h2 {
    font-size: 2rem;
}

.error-message {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    max-width: 600px;
}
</style>
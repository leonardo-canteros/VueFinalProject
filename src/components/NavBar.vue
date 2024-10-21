<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
    <div>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/products">Products</RouterLink>
        </nav>   
    </div>

    <RouterView />
</template>

<style scoped>
</style>
<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
    <div>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>   
    </div>

    <RouterView />
</template>

<style scoped>

nav {
    background-color: #1E90FF; 
    color: #FFFFFF; 
    padding: 15px; 
    font-size: 18px;
}

nav a {
    text-decoration: none;
    margin-right: 15px;
}

nav a:hover {
    color: #FFFFFF; 
}

</style>
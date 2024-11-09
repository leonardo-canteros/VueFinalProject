<template>
  <div class="pageview">
    
    <CarouselComponent></CarouselComponent>

    <Login></Login>

  </div>
</template>

<script setup lang="ts">
import Login from "@/components/Auth/Login.vue";
import CarouselComponent from "@/components/common/CarouselComponent.vue";
</script>
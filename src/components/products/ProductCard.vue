<template>
    <BaseSlot>
        <template v-slot:productsData="myProps">
            <div class="product-card">
              <img :src="myProps.myProps.image"/>
              <div class="product-info">
                <h2 class="product-name">{{ myProps.myProps.name }}</h2>
                <p class="product-species">{{ myProps.myProps.species }}</p>
              </div>
            </div>
        </template>
    </BaseSlot>
</template>

<script setup lang="ts">

import BaseSlot from '@/components/products/BaseSlot.vue';

</script>


<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
}

.product-info {
  padding: 1rem;
  text-align: center;
}

.product-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2F4F4F; 
}

.product-species {
  font-size: 1rem;
  color: #32CD32; 
}
</style>
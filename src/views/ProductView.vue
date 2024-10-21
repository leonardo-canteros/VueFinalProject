<template>
  <div>
      <section>
        <ProductCard></ProductCard>

      </section>
      <section>
        <ProductList></ProductList>


      </section>
  </div>
</template>


<script setup lang="ts">

import ProductCard from '@/components/products/ProductCard.vue';
import ProductList from '@/components/products/ProductList.vue';

</script>

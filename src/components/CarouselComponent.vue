<template>
    <v-container fluid>
        <v-carousel>
            <v-carousel-item :src="imgUrl" cover></v-carousel-item>

            <v-carousel-item :src="imgUrl2" cover></v-carousel-item>

            <v-carousel-item :src="imgUrl3" cover></v-carousel-item>
        </v-carousel>
    </v-container>
</template>

<script setup lang="ts">

import imgUrl from '@/assets/images/ImageStore01.jpg';
import imgUrl2 from '@/assets/images/ImageStore02.jpg';
import imgUrl3 from '@/assets/images/ImageStore03.jpg';

</script>
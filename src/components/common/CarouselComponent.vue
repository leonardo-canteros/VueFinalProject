<template>
    <v-container fluid>
        <v-carousel show-arrows="hover" cycle interval="4000">
            <v-carousel-item :src="imgUrl" cover>
                <v-container class="d-flex justify-center align-center fill-height">
                    <v-row>
                        <v-col class="text-center">
                            <h2 class="text-white text-h3 font-weight-bold carousel-title">
                                Find the Soundtrack to Your Life
                            </h2>
                        </v-col>
                    </v-row>
                </v-container>
            </v-carousel-item>
            <v-carousel-item :src="imgUrl2" cover>
                <v-container class="d-flex justify-center align-center fill-height">
                    <v-row>
                        <v-col class="text-center">
                            <h2 class="text-white text-h3 font-weight-bold carousel-title">
                                Feel the Vibes: Shop String Instruments
                            </h2>
                        </v-col>
                    </v-row>
                </v-container>
            </v-carousel-item>
            <v-carousel-item :src="imgUrl3" cover>
                <v-container class="d-flex justify-center align-center fill-height">
                    <v-row>
                        <v-col class="text-center">
                            <h2 class="text-white text-h3 font-weight-bold carousel-title">
                                Top Deals on Instruments </h2>
                        </v-col>
                    </v-row>
                </v-container>
            </v-carousel-item>
        </v-carousel>
    </v-container>
</template>

<script setup lang="ts">

import imgUrl from "@/assets/images/ImageStore01.jpg";
import imgUrl2 from "@/assets/images/ImageStore02.jpg";
import imgUrl3 from "@/assets/images/ImageStore03.jpg";

</script>


<style scoped>
.carousel-title {
    background: transparent;
    color: #ffffff;
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
}

</style>
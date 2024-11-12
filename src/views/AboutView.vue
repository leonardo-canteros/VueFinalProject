<template>
  <v-container 
     class="py-10" 
     style="max-width:1200px">
     
    <v-row
      class="d-flex"
      style="align-items: center; justify-content: space-between"
    >
      <v-col cols="12" md="6" :order="1" :order-md="1">
        <h2 class="mb-4">About Us</h2>
        <p>
          We believe that music is a universal language,
          and everyone should have access to the instruments that bring their
          creativity to life. Our mission is to provide musicians of all levels,
          from beginners to professionals, with high-quality instruments and
          accessories. Whether you're looking to start your musical journey or
          perfect your craft, we're here to support you every step of the way.
        </p>
      </v-col>

      <v-col cols="12" md="6" :order="2" :order-md="2">
        <v-img
          src="src/assets/images/ImageAbout01.jpg"
          cover
          alt="IMG"
          width="100%"
        ></v-img>
      </v-col>
    </v-row>

    <div class="section-separator"></div>

    <v-row
      class="d-flex"
      style="align-items: center; justify-content: space-between"
    >
      <v-col
        cols="12"
        md="6"
        class="d-flex justify-center"
        :order="4"
        :order-md="3"
      >
        <v-img
          src="src/assets/images/ImageAbout05.jpg"
          cover
          alt="IMG"
          width="100%"
        ></v-img>
      </v-col>

      <v-col cols="12" md="6" :order="3" :order-md="4">
        <h2 class="mb-4">Our Vision</h2>
        <p>
          We are committed to driving music forward worldwide by providing a
          platform where musicians and retailers can connect andare their
          passion. Our vision is to make music accessible to everyone by
          providing the best tools and resources.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
.section-separator {
  height: 40px;
}

h2 {
  color: #333;
}

p {
  color: #555;
  line-height: 2;
}
</style>

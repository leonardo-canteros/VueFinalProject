<template>
    <v-card class="mx-auto" max-width="400">
        <v-img class="align-end text-white ma-2" height="300" src="https://cdn.vuetifyjs.com/images/cards/sky.jpg" cover>
        </v-img>
        <v-card-title>Product title</v-card-title>
        <v-card-subtitle class="pt-4 card-price">
            Price
        </v-card-subtitle>
        <v-card-text>
            <div class="card-title">Description</div>

            <div class="text-justify card-text">Whitsunday Island,
                Whitsunday Islands.
                Lorem ipsum dolor sit amet consectetur adipisicing 
                elit. Enim similique molestiae tenetur assumenda, eum
                quae facilis sit ea perferendis. Libero quisquam 
                corrupti, pariatur id ipsam reiciendis eos sapiente eius
                alias.</div>
        </v-card-text>
        <v-card-actions>
            <v-btn color="blue" 
                   text="Share" 
                   block
                   >BUY</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">



</script>

<style scoped>

.card-price {
    font-size: 30px;
}

.card-title {
    font-size: 1rem;
}
.card-text {
    margin-top: 1rem;
    font-size: 1rem;
}

</style>
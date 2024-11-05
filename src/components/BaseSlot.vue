<!-- <template>
    <v-list lines="two">
        <v-list-item v-for="user in users" 
                      :key="user.id" 
                      :title="user.name" 
                      :subtitle="user.status">
            <template #prepend>
                <v-avatar>
                    <img :src="user.image" :alt="user.name" class="user-image" />
                </v-avatar>
            </template>

            <slot name="userData" :myProps="user"></slot>
        </v-list-item>
    </v-list>
</template>


<script setup lang="ts">

import { getUserAll } from '@/helpers/users.model';
import { onMounted, ref } from 'vue';

const users = ref([]);

onMounted(async () => {
    const result = await getUserAll()
    if (result.status === 200) { users.value = result.data.results }
})

</script>


<style scoped>
.user-image {
    width: 100%;
    height: auto;
}
</style> -->


<!-- <template>
  <div>
    <v-container>
      <v-row no-gutters class="mb-6">
        <v-col cols="12" md="6">
          <v-sheet class="main-title pa-2">Manage Your Products</v-sheet>
        </v-col>
        <v-col cols="12" md="6">
          <v-sheet class="pa-2">
            <ButtonComponent
              @click="goToBack"
              color="indigo"
              class="text-uppercase mx-auto text-white"
              ><v-icon icon="mdi-arrow-left" start></v-icon>
              Back</ButtonComponent>
          </v-sheet>
        </v-col>
      </v-row>
      <v-card
        flat
        v-for="product in listProduct"
        :key="product.id"
        class="pa-3 border"
      >
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="6">
            <div class="text-caption sub-title">Product name</div>

            <div class="text-body-1 mt-1">{{ product.name }}</div>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <div class="text-caption sub-title">User</div>

            <div class="text-body-1 mt-1"></div>
          </v-col>
          <v-col cols="6" sm="2" md="2">
            <div class="text-caption sub-title">Update</div>
            <div class="text-body-1 mt-1">
              <RouterLink
                :to="{ name: 'ProductUpdateForm', params: { id: product.id } }"
              >
                <v-btn color="primary" icon="mdi-update" size="small"></v-btn>
              </RouterLink>
            </div>
          </v-col>
          <v-col cols="6" sm="2" md="2">
            <div class="text-caption sub-title">Delete</div>
            <div class="text-body-1 mt-1">
              <RouterLink
                :to="{ name: 'ProductDelete', params: { id: product.id } }"
              >
                <v-btn color="red" icon="mdi-delete" size="small"></v-btn>
              </RouterLink>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>


<script setup lang="ts">
import ButtonComponent from "@/components/common/ButtonComponent.vue";
import { useRouter } from "vue-router";
import type { Product } from "@/helpers/products.model";

const router = useRouter();

const goToBack = () => {
  router.push("/products");
};

const props = defineProps({
  listProduct: {
    type: Array as () => Product[],
    default: () => [],
  },
});
</script>

<style scoped>
.main-title {
  font-size: 1.8rem;
}

.sub-title {
  color: #757575;
}
</style>
 -->
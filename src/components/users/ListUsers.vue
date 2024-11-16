<template>
  <v-data-table
    :headers="headers"
    :items="usersList"
    :sort-by="[{ key: 'calories', order: 'asc' }]"
  >
    <template v-slot:item.image="{ item: { image } }">
      <img :src="image" width="40" height="40" />
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <!-- <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
        <DialogOkCancel v-model="dialogDelete" />

        <!-- <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="dialogDelete = true"> mdi-delete </v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
  </v-data-table>
</template>

<script setup lang="ts">
import { getUsersList } from "@/helpers/usersServices";
import { computed, onMounted, reactive, ref, watch } from "vue";

const dialog = ref(false);
const dialogDelete = ref(false);
const headers = ref([{}]);
headers.value = [
  { title: "Image", key: "image" },
  { title: "Username", key: "username" },
  { title: "Email", key: "email" },
  { title: "Role", key: "role" },
  { title: "Deactivated_at", key: "deactivated_at" },
  { title: "Actions", key: "actions", sortable: false },
];

const editedIndex = ref(-1);
const editedItem = ref({
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});

const defaultItem = reactive({
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
});

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New Item" : "Edit Item";
});

const usersList = ref([]);

onMounted(async () => {
  usersList.value = await getUsersList();
});

watch(dialog, (val) => {
  val || close();
});

function editItem(item: {}): void {
  // editedIndex.value = usersList.value.indexOf(item);
  // editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

function deleteItem(item: {}): void {
  // editedIndex.value = usersList.value.indexOf(item);
  // editedItem.value = Object.assign({}, item);
  dialogDelete.value = true;
}

// watch(dialogDelete, (val) => {
//   val || closeDelete();
// });

// function deleteItem(item: { name: string; calories: number; fat: number; carbs: number; protein: number; }): void  {
//   editedIndex.value = desserts.value.indexOf(item);
//   editedItem = Object.assign({}, item);
//   dialogDelete.value = true;
// }

// deleteItemConfirm() {
//   this.desserts.splice(this.editedIndex, 1);
//   this.closeDelete();
// },

// close() {
//   this.dialog = false;
//   this.$nextTick(() => {
//     this.editedItem = Object.assign({}, this.defaultItem);
//     this.editedIndex = -1;
//   });
// },

// closeDelete() {
//   this.dialogDelete = false;
//   this.$nextTick(() => {
//     this.editedItem = Object.assign({}, this.defaultItem);
//     this.editedIndex = -1;
//   });
// },

// save() {
//   if (this.editedIndex > -1) {
//     Object.assign(this.desserts[this.editedIndex], this.editedItem);
//   } else {
//     this.desserts.push(this.editedItem);
//   }
//   this.close();
// },
</script>

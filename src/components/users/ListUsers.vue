<template>
  <v-data-table
    :headers="headers"
    :items-per-page="5"
    :items="usersList"
    :search="search"
    :sort-by="[{ key: 'username', order: 'asc' }]"
  >
    <template v-slot:item.image="{ item: { image } }">
      <img :src="image" width="40" height="40" />
    </template>

    <template v-slot:item.deactivated_at="{ item: { deactivated_at } }">
      {{ formatDate(deactivated_at) }}
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <v-row justify="center">
          <v-col align="center">
            <v-toolbar-title>Users List</v-toolbar-title>
          </v-col>
          <v-divider class="mx-4" insert vertical></v-divider>
          <v-col>
            <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              single-line
            ></v-text-field>
          </v-col>
          <v-divider class="mx-4" insert vertical></v-divider>
          <v-col align="center">
            <ButtonComponent @click="addUserInit"> Add User </ButtonComponent>
          </v-col>
        </v-row>

        <DialogOkCancel
          v-model="dialog.show"
          :title="dialog.title"
          @cancel="clearDialog"
          @ok="saveUser"
          cancel-btn-legend="Cancel"
          ok-btn-legend="Save"
          max-width="600"
        >
          <v-card-text>
            <v-row dense>
              <v-col cols="12" sm="6">
                <v-text-field v-model="dialog.user.id" label="ID" disabled>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  :v-model="dialog.user.deactivated_at"
                  label="Deactivated At"
                  disabled
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="dialog.user.username"
                  label="Username*"
                  required
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="dialog.user.email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="dialog.user.image"
                  label="Image URL"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="dialog.user.role"
                  :items="['admin', 'seller', 'customer']"
                  label="Role*"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <small class="text-caption text-medium-emphasis"
              >*indicates required field</small
            >
          </v-card-text>
        </DialogOkCancel>

        <DialogOkCancel
          v-model="dialogDelete.show"
          title="Confirm delete user?"
          @cancel="clearDialogDelete"
          @ok="deleteUserConfirm"
          cancel-btn-legend="Cancel"
          ok-btn-legend="Delete"
        >
          <v-card-text> {{ dialogDelete.msg }}</v-card-text>
        </DialogOkCancel>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editUserInit(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteUserInit(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/common/ButtonComponent.vue";
import DialogOkCancel from "@/components/users/DialogOkCancel.vue";
import { formatDate } from "@/helpers/format";
import { createUser, deleteUser, getUsersList } from "@/helpers/usersServices";
import { onMounted, reactive, ref, watch } from "vue";

const usersList = ref([]);

onMounted(async () => {
  usersList.value = await getUsersList();
});

const search = ref("");

const headers = ref([{}]);
headers.value = [
  { title: "Image", key: "image" },
  { title: "Username", key: "username" },
  { title: "Email", key: "email" },
  { title: "Role", key: "role" },
  { title: "Deactivated At", key: "deactivated_at" },
  { title: "Actions", key: "actions", sortable: false },
];

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  deactivated_at: string | null;
  image: string | null;
}

const dialog = reactive<{
  show: boolean;
  editMode: boolean;
  title: string;
  user: User;
}>({
  show: false,
  editMode: false,
  title: "",
  user: {
    id: "",
    username: "",
    email: "",
    role: "",
    deactivated_at: "",
    image: "",
  },
});

const dialogDelete = reactive({
  show: false,
  id: "",
  msg: "",
});

function saveUser(): void {
  if (dialog.editMode) {
    editUserConfirm();
  } else {
    addUserConfirm();
  }
}

function addUserInit(): void {
  clearDialog();
  dialog.title = "Add User";
  dialog.show = true;
  dialog.editMode = false;
}

function addUserConfirm(): void {
  createUser(JSON.parse(JSON.stringify(dialog.user)));
  clearDialog();
}

function editUserInit(item: {}): void {
  const itemJson = JSON.parse(JSON.stringify(item));
  dialog.user = itemJson;
  dialog.title = "Edit User";
  dialog.show = true;
  dialog.editMode = true;
}

function editUserConfirm(): void {
  // editUser(dialog.user);
  clearDialog();
}

function deleteUserInit(item: {}): void {
  const itemJson = JSON.parse(JSON.stringify(item));
  dialogDelete.id = itemJson.id;
  dialogDelete.msg = `You are going to perform a logical deletion of the user ${itemJson.username}`;
  dialogDelete.show = true;
}

function deleteUserConfirm(): void {
  deleteUser(dialogDelete.id);
  clearDialogDelete();
}

watch(dialogDelete, async (val) => {
  if (!val.show) {
    usersList.value = await getUsersList();
  }
});

function clearDialog(): void {
  dialog.user = {
    id: "",
    username: "",
    email: "",
    role: "",
    deactivated_at: "",
    image: "",
  };
  dialog.title = "";
  dialog.editMode = false;
  dialog.show = false;
}

function clearDialogDelete(): void {
  dialogDelete.id = "";
  dialogDelete.msg = "";
  dialogDelete.show = false;
}
</script>

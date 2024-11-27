<template>
  <v-container class="bg-grey-lighten-2 rounded" fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-toolbar-title class="text-center mt-2 main-title"
          >Users List
        </v-toolbar-title>
      </v-col>
      <v-col cols="12" md="4">
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
      <v-col cols="12" md="4">
        <ButtonComponent @click="addUserInit" class="text-uppercase mx-auto">
          Add User
        </ButtonComponent>
      </v-col>
    </v-row>
  </v-container>

  <v-skeleton-loader />
  <v-data-table
    :headers="headers"
    :mobile="smAndDown"
    :items-per-page="5"
    :items="usersList"
    :search="search"
    :sort-by="[{ key: 'username', order: 'asc' }]"
    :loading="loading"
  >
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
    </template>
    <template v-slot:item.image="{ item: { image } }">
      <img v-if="image" :src="image" width="40" height="40" />
      <span v-else>No image</span>
    </template>

    <template v-slot:item.deactivated_at="{ item: { deactivated_at } }">
      {{ formatDate(deactivated_at) }}
    </template>

    <template v-slot:top>
      <!-- <v-toolbar flat>
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
        </v-row> -->

      <DialogOkCancel
        v-model="dialog.show"
        :title="dialog.title"
        @ok="submitForm"
        @cancel="clearDialog"
        cancel-btn-legend="Cancel"
        ok-btn-legend="Save"
        max-width="600"
        :msg-alert="dialog.msgAlert"
      >
        <v-card-text>
          <v-row dense>
            <v-col v-if="dialog.editMode" cols="12" sm="6">
              <BaseTextField v-model="id" label="ID" readonly></BaseTextField>
            </v-col>

            <v-col v-if="dialog.editMode" cols="12" sm="6">
              <BaseTextField
                v-model="deactivated_at"
                label="Deactivated At"
                readonly
              ></BaseTextField>
            </v-col>

            <v-col cols="12" sm="6">
              <BaseTextField
                v-model="username"
                :error-messages="errors.username"
                label="Username*"
                required
              ></BaseTextField>
            </v-col>

            <v-col cols="12" sm="6">
              <BaseTextField
                v-model="email"
                :error-messages="errors.email"
                label="Email*"
                required
              ></BaseTextField>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="role"
                :items="['admin', 'seller', 'customer']"
                label="Role*"
                :error-messages="errors.role"
                color="primary"
                outlined
                required
              ></v-select>
            </v-col>

            <v-col v-if="!dialog.editMode" cols="12" sm="6">
              <BaseTextField
                v-model="password"
                :error-messages="errors.password"
                label="Password*"
                required
                :append-inner-icon="
                  passwordIsVisible ? 'mdi-eye-off' : 'mdi-eye'
                "
                :type="passwordIsVisible ? 'text' : 'password'"
                @click:append-inner="passwordIsVisible = !passwordIsVisible"
              ></BaseTextField>
            </v-col>

            <v-col cols="12" sm="12">
              <BaseTextField
                v-model="image"
                :error-messages="errors.image"
                label="Image URL"
              ></BaseTextField>
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
      <!-- </v-toolbar> -->
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="mr-2 bg-primary pa-5 rounded-circle"
        size="small"
        color="white"
        @click="editUserInit(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        class="bg-red pa-5 rounded-circle"
        size="small"
        @click="deleteUserInit(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import BaseTextField from "@/components/common/BaseTextField.vue";
import ButtonComponent from "@/components/common/ButtonComponent.vue";
import DialogOkCancel from "@/components/users/DialogOkCancel.vue";
import { formatDate } from "@/helpers/format";
import {
  createUser,
  deleteUser,
  getUsersList,
  updateUser,
} from "@/helpers/usersServices";
import { useField, useForm } from "vee-validate";
import { nextTick, onMounted, reactive, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import * as yup from "yup";

const { smAndDown } = useDisplay();

const editUserSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email address"),
  role: yup
    .mixed()
    .oneOf(["admin", "seller", "customer"] as const)
    .required("Role is required"),
  image: yup.string().url("Must be a valid URL"),
});

const addUserSchema = editUserSchema.concat(
  yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters long"),
  })
);

const validationSchema = ref(yup.object().shape({}));

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: id } = useField("id");
const { value: username } = useField("username");
const { value: email } = useField("email");
const { value: role } = useField<any>("role");
const { value: password } = useField("password");
const { value: deactivated_at } = useField("deactivated_at");
const { value: image } = useField("image");

const submitForm = handleSubmit((values) => {
  if (dialog.editMode) {
    editUserConfirm(values);
  } else {
    addUserConfirm(values);
  }
});

const usersList = ref([]);
const loading = ref(false);

onMounted(() => {
  updateTable();
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

const dialog = reactive({
  show: false,
  editMode: false,
  title: "",
  msgAlert: reactive({ show: false, title: "", text: "" }),
});

watch(dialog, (newVal) => {
  validationSchema.value = newVal.editMode ? editUserSchema : addUserSchema;
});

const passwordIsVisible = ref(false);

const dialogDelete = reactive({
  show: false,
  id: "",
  msg: "",
});

const addUserInit = () => {
  clearDialog();
  dialog.title = "Add User";
  dialog.show = true;
  dialog.editMode = false;
};

const addUserConfirm = async (values: {}) => {
  // let user = JSON.parse(JSON.stringify(values));
  // user.password = passwordInput.value;
  try {
    await createUser(values);
    clearDialog();
    updateTable();
  } catch (error: any) {
    dialog.msgAlert.show = true;
    dialog.msgAlert.title = "Creation User Error";
    dialog.msgAlert.text = error.message;
  }
};

function editUserInit(item: {}): void {
  const itemJson = JSON.parse(JSON.stringify(item));
  id.value = itemJson.id;
  username.value = itemJson.username;
  email.value = itemJson.email;
  role.value = itemJson.role;
  deactivated_at.value = itemJson.deactivated_at;
  image.value = itemJson.image;
  dialog.title = "Edit User";
  dialog.show = true;
  dialog.editMode = true;
}

async function editUserConfirm(values: {}): Promise<void> {
  // const user = JSON.parse(JSON.stringify(dialog.user));
  try {
    await updateUser(values);
    clearDialog();
    updateTable();
  } catch (error: any) {
    dialog.msgAlert.show = true;
    dialog.msgAlert.title = "Editing User Error";
    dialog.msgAlert.text = error.message;
  }
}

function deleteUserInit(item: {}): void {
  const itemJson = JSON.parse(JSON.stringify(item));
  dialogDelete.id = itemJson.id;
  dialogDelete.msg = `You are going to perform a logical deletion of the user ${itemJson.username}`;
  dialogDelete.show = true;
}

async function deleteUserConfirm(): Promise<void> {
  await deleteUser(dialogDelete.id);
  clearDialogDelete();
  await updateTable();
}

function clearDialog(): void {
  dialog.title = "";
  dialog.show = false;
  dialog.editMode = false;
  dialog.msgAlert.show = false;
  dialog.msgAlert.title = "";
  dialog.msgAlert.text = "";
  id.value = "";
  username.value = "";
  email.value = "";
  role.value = "";
  deactivated_at.value = "";
  image.value = "";
  password.value = "";
}

function clearDialogDelete(): void {
  dialogDelete.id = "";
  dialogDelete.msg = "";
  dialogDelete.show = false;
}

const updateTable = async () => {
  loading.value = true;
  await nextTick();
  usersList.value = await getUsersList();
  setTimeout(() => {
    loading.value = false;
  }, 700);
};
</script>

<style scoped>
.main-title {
  font-size: 1.8rem;
}
</style>

<template>
  <v-main class="list" style="margin: auto">
    <!-- <v-alert
      v-model="alert"
      dismissible
      color="primary"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-bell"
      style="align:right;padding:5px 15px 5px 15px;text-align: left;margin-top:-5px"
    >
      Anda mendapatkan <strong>{{ fakultatif }}</strong> permintaan alokasi fakultatif.
    </v-alert> -->
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px; width:30%"
    ></v-breadcrumbs>
    <v-spacer></v-spacer>
    <!-- <h5 class="flex-item" style="font-size: 30px; margin-top: 40px">Data Pegawai</h5> -->
    <div v-if="isWideScreen" style="margin-bottom: 7.5%">
      <h3 style="float:left">Pegawai</h3>
      <v-spacer></v-spacer>
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right"
        >Tambah</v-btn
      >
    </div>
    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Pegawai</h3>
      <v-spacer></v-spacer>
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right"
        >Tambah</v-btn
      >
    </div>
    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Pegawai</h3>
      <v-spacer></v-spacer>
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right"
        >Tambah</v-btn
      >
    </div>
    <!-- <v-card style="padding: 10px 20px 20px 20px; width: 50%">
      <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Cari"
            single-line
            hide-details
            style="width: 100%"
            >
            </v-text-field>
    </v-card> -->
    <v-card fill-height class="flex-item mx-auto" elevation="5" style="margin-top: 5%">
      <v-card-title class="text-right" style="display: inherit;">
        <v-text-field
          v-if="isWideScreen"
          v-model="search"
          append-icon="mdi-magnify"
          label="Cari"
          single-line
          hide-details
          style="margin-left: 75%; width: 25%;"
        >
        </v-text-field>
        <v-text-field
          v-else
          v-model="search"
          append-icon="mdi-magnify"
          label="Cari"
          single-line
          hide-details
          style="margin-left: 50%; width: 50%;"
        >
        </v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="pegawais"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-chip link color="#E7C913">
                  <v-icon>mdi-circle-edit-outline</v-icon>
                </v-chip>
              </span>
            </template>
            <v-list width="90" class="py-0" style="margin-top: 20px">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title style="color: #000000; margin-top: 10px"
                    ><v-btn small @click="editHandler(item)"
                      ><v-icon color="#E39348">mdi-pencil</v-icon></v-btn
                    ></v-list-item-title
                  >
                  <v-list-item-title style="color: #000000; margin-top: 10px"
                    ><v-btn small @click="deleteHandler(item.id_pegawai)"
                      ><v-icon color="#C94141"
                        >mdi-account-remove</v-icon
                      ></v-btn
                    ></v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;">
        <v-card-title>
          <!-- <v-spacer></v-spacer> -->
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data</h3>
          <v-spacer></v-spacer>
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>
      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <!-- <v-card-title>
          <v-spacer></v-spacer>
          <span class="headline">{{ formTitle }} Data Pegawai</span>
        </v-card-title> -->
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-select
              :rules="roleRules"
              v-model="form.role_pegawai"
              :items="roles"
              item-text="role"
              item-value="role"
              label="Jabatan"
              required
            ></v-select>
            <v-text-field
              :rules="namaRules"
              v-model="form.nama_pegawai"
              label="Nama"
            ></v-text-field>
            <v-text-field
              :rules="ttlRules"
              type="date"
              v-model="form.tanggal_lahir_pegawai"
              label="Tanggal Lahir"
            ></v-text-field>
            <v-text-field
              :rules="emailRules"
              v-model="form.email_pegawai"
              label="Email"
            ></v-text-field>
            <v-text-field
              :rules="telpRules"
              v-model="form.nomor_telepon_pegawai"
              label="Nomor Telepon"
            ></v-text-field>
            <v-card-action>
              <v-spacer></v-spacer>
              <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="saveProfil">Simpan</v-btn>
              <v-spacer></v-spacer>
            </v-card-action>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>
        <v-card-text> Anda yakin ingin menghapus data ini? </v-card-text>
        <v-card-action>
          <v-spacer></v-spacer>
          <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
          <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false"
              >Batal</v-btn
          >
        </v-card-action>
        <v-card-text></v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
      >{{ error_message }}
    </v-snackbar>
  </v-main>
</template>

<script>
export default {
  name: "PegawaiPage",
  watch: {
    $route: {
      immediate: true,
      handler() {
        document.title = "Pegawai";
      },
    },
  },
  data() {
    return {
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialogConfirm: false,
      temp: 0,
      fakultatif: 0,
      isWideScreen: window.innerWidth >= 1000,
      isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
      items: [
        { 
          text: "Dashboard",
          disabled: false,
          href: '/dashboard-page',
        },
        { 
          text: "Pegawai",
          disabled: true,
          href: '/pegawai-page',
        },
      ],
      headers: [
        {
          text: "Jabatan",
          align: "start",
          sortable: true,
          value: "role_pegawai",
        },
        { text: "Nama", value: "nama_pegawai" },
        { text: "Tanggal Lahir", value: "tanggal_lahir_pegawai" },
        { text: "Email", value: "email_pegawai" },
        { text: "Nomor Telepon", value: "nomor_telepon_pegawai" },
        { text: "Status", value: "status_pegawai" },
        { text: "", value: "actions" },
      ],
      menus: [{ title: "Check" }, { title: "Edit" }, { title: "Delete" }],
      pegawai: new FormData(),
      pegawais: [],
      form: {
        id_pegawai: null,
        role_pegawai: null,
        nama_pegawai: null,
        tanggal_lahir_pegawai: null,
        email_pegawai: null,
        nomor_telepon_pegawai: null,
        status_pegawai: null,
        nama_role: null,
      },
      // role: [
      //     { nama_role: "Admin"},
      //     { nama_role: "Manajer" }
      // ],
      roles: [{ role: "Admin" }, { role: "Manajer" }, { role: "Driver"}],
      deleteId: "",
      editId: "",
      roleRules: [(v) => !!v || "Role is Required"],
      namaRules: [(v) => !!v || "Nama is Required"],
      ttlRules: [(v) => !!v || "Tanggal Lahir is Required"],
      emailRules: [
        (v) => !!v || "Email is Required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      telpRules: [
        (v) => !!v || "Nomor Telepon is Required",
        (v) => /^([0][8][0-9]{8,10})$/g.test(v) || "Phone Number must be valid",
      ],
    };
  },
  methods: {
    setForm() {
      if (this.inputType !== "Tambah") {
        this.update();
      } else {
        this.save();
      }
    },
    readData() {
      var url = this.$api + "/pegawai/getAll";
      this.$http
        .get(url)
        .then((response) => {
          this.pegawais = response.data.data;
        });
    },
    readDataRemove() {
      var url = this.$api + "/pegawai/getAll";
      this.$http
        .get(url)
        .then((response) => {
          this.pegawaisR = response.data.data;
        });
    },
    save() {
      this.pegawai.append("nama_pegawai", this.form.nama_pegawai);
      this.pegawai.append("role_pegawai", this.form.nama_role);
      this.pegawai.append(
        "tanggal_lahir_pegawai",
        this.form.tanggal_lahir_pegawai
      );
      this.pegawai.append("email_pegawai", this.form.email_pegawai);
      this.pegawai.append("no_telp_pegawai", this.form.no_telp_pegawai);

      var url = this.$api + "/pegawai/";
      this.load = true;
      this.$http
        .post(url, this.pegawai, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.close();
          this.updateTemp();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    updateTemp() {
      var url = this.$api + "/pegawaiTemp";
      this.load = true;
      this.$http
        .put(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.readDataRemove();
          this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    //ubah data pegawai
    update() {
      let newData = {
        role_pegawai: this.form.nama_role,
        nama_pegawai: this.form.nama_pegawai,
        tanggal_lahir_pegawai: this.form.tanggal_lahir_pegawai,
        email_pegawai: this.form.email_pegawai,
        no_telp_pegawai: this.form.no_telp_pegawai,
      };

      var url = this.$api + "/pegawai/" + this.editId;
      this.load = true;
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.readDataRemove();
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    //non aktif data pegawai
    deleteData() {
      var url = this.$api + "/pegawaiDelete/" + this.deleteId;
      this.load = true;
      this.$http
        .put(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = false;
          this.close();
          this.readDataRemove();
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    editHandler(item) {
      this.inputType = "Ubah";
      this.editId = item.id_pegawai;
      this.form.role_pegawai = item.role_pegawai;
      this.form.nama_pegawai = item.nama_pegawai;
      this.form.tanggal_lahir_pegawai = item.tanggal_lahir_pegawai;
      this.form.email_pegawai = item.email_pegawai;
      this.form.no_telp_pegawai = item.no_telp_pegawai;
      this.dialog = true;
    },
    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.readDataRemove();
    },
    cancel() {
      this.resetForm();
      this.dialog = false;
      this.dialogConfirm = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.form = {
        id_pegawai: null,
        role_pegawai: null,
        nama_pegawai: null,
        tanggal_lahir_pegawai: null,
        email_pegawai: null,
        nomor_telepon_pegawai: null,
      };
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    localStorage.setItem("menu", "Pegawai");
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
    this.readData();
    // this.updateTemp();
  },
};
</script>

<style>
    .v-alert__icon.v-icon {
        font-size: 17.5px;
    }
    .v-alert__content {
        font-size: 13.5px;
    }
    .v-btn--icon.v-size--small .v-icon{
        font-size: 17.5px;
    }
    /* Flex */
    .flex {
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
    }
    .flex-item {
    flex: 0 0 auto;
    }

    /* Inline-block */
    .inline {
    vertical-align: middle;
    overflow-x: scroll; 
    }
    .inline-item {
    display: inline-block;
    vertical-align: middle;
    height: 96px;
    margin-right: -4px;
    }
    .v-btn {
      letter-spacing: .020em;
    }
    .v-btn.v-size--small {
      font-size: .70rem;
      font-family: "Helvetica", Arial, sans-serif;
    }
    .v-text-field input {
      font-size: 12.5px;
    }
    .v-text-field .v-label {
      font-size: 14px;
    }
    .v-icon.v-icon.mdi-magnify {
      font-size: 22px;
      /* color: #1976d2; */
    }
    /* .v-card__subtitle, .v-card__text, .v-card__title {
    padding: 1%;
    } */
</style>

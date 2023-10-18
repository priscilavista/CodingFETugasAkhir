<template>
  <v-main class="list" style="margin: auto;">
    <v-alert
      v-model="alert"
      dismissible
      color="primary"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-bell"
      style="align:right;padding:5px 15px 5px 15px;text-align: left;margin-top:-5px"
    >
      Anda menerima <strong>{{ permintaanFakultatif }}</strong> permintaan alokasi fakultatif.
    </v-alert>
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    ></v-breadcrumbs>
    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Alokasi Fakultatif</h3>
    </div>
    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Alokasi Fakultatif</h3>
    </div>
    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Alokasi Fakultatif</h3>
    </div>
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
        :items="fakultatifs"
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
                    ><v-btn small @click="deleteHandler(item.id_alokasi_fakultatif)"
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

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>
        <v-card-text> Anda Yakin ingin <strong>menyetujui</strong> permintaan alokasi fakultatif ini? </v-card-text>
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

    <v-dialog v-model="dialogReject" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>
        <v-card-text> Anda Yakin ingin <strong>menolak</strong> permintaan alokasi fakultatif ini? </v-card-text>
        <v-card-action>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="rejectData">Hapus</v-btn>
          <v-btn color="blue darken-1" text @click="dialogConfirm = false"
            >Batal</v-btn
          >
        </v-card-action>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
      >{{ error_message }}
    </v-snackbar>
  </v-main>
</template>

<script>
export default {
  name: "AlokasiFakultatifPage",
  watch: {
    $route: {
      immediate: true,
      handler() {
        document.title = "Alokasi Fakultatif";
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
      dialogReject: false,
      dialogConfirm: false,
      temp: 0,
      permintaanFakultatif: 0,
      isWideScreen: window.innerWidth >= 1000,
      isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
      items: [
        { 
          text: "Dashboard",
          disabled: false,
          href: '/dashboard-page',
        },
        { 
          text: "Alokasi Fakultatif",
          disabled: true,
          href: '/konfirmasi-alokasi-fakultatif-page',
        },
      ],
      headers: [
        {
          text: "Tanggal Pengajuan",
          align: "start",
          sortable: true,
          value: "tanggal_pengajuan",
        },
        { text: "Tanggal Penambahan Alokasi", value: "tanggal_penambahan_alokasi" },
        { text: "Alokasi Tambahan", value: "alokasi_tambahan" },
        { text: "Konfirmasi", value: "actions" },
      ],
      menus: [{ title: "Check" }, { title: "Edit" }, { title: "Delete" }],
      fakultatif: new FormData(),
      fakultatifs: [],
      form: {
        id_alokasi_fakultatif: null,
        id_pangkalan: null,
        tanggal_pengajuan: null,
        tanggal_penambahan_alokasi: null,
        alokasi_tambahan: null,
        status_persetujuan_pangkalan: null,
      },
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
      var url = this.$api + "/fakultatifRead";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.fakultatifs = response.data.data;
        });
    },
    readDataRemove() {
      var url = this.$api + "/fakultatifRemove";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.fakultatifsR = response.data.data;
        });
    },
    save() {
      this.fakultatif.append("nama_fakultatif", this.form.nama_fakultatif);
      this.fakultatif.append("role_fakultatif", this.form.nama_role);
      this.fakultatif.append(
        "tanggal_lahir_fakultatif",
        this.form.tanggal_lahir_fakultatif
      );
      this.fakultatif.append("email_fakultatif", this.form.email_fakultatif);
      this.fakultatif.append("no_telp_fakultatif", this.form.no_telp_fakultatif);

      var url = this.$api + "/fakultatif/";
      this.load = true;
      this.$http
        .post(url, this.fakultatif, {
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
      var url = this.$api + "/fakultatifTemp";
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
    //ubah data fakultatif
    update() {
      let newData = {
        role_fakultatif: this.form.nama_role,
        nama_fakultatif: this.form.nama_fakultatif,
        tanggal_lahir_fakultatif: this.form.tanggal_lahir_fakultatif,
        email_fakultatif: this.form.email_fakultatif,
        no_telp_fakultatif: this.form.no_telp_fakultatif,
      };

      var url = this.$api + "/fakultatif/" + this.editId;
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

    //non aktif data fakultatif
    deleteData() {
      var url = this.$api + "/fakultatifDelete/" + this.deleteId;
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
      this.inputType = "Edit";
      this.editId = item.id_fakultatif;
      this.form.role_fakultatif = item.role_fakultatif;
      this.form.nama_fakultatif = item.nama_fakultatif;
      this.form.tanggal_lahir_fakultatif = item.tanggal_lahir_fakultatif;
      this.form.email_fakultatif = item.email_fakultatif;
      this.form.no_telp_fakultatif = item.no_telp_fakultatif;
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
        id_alokasi_fakultatif: null,
        id_pangkalan: null,
        tanggal_pengajuan: null,
        tanggal_penambahan_alokasi: null,
        alokasi_tambahan: null,
        status_persetujuan_pangkalan: null,
      };
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    localStorage.setItem("menu", "Alokasi Fakultatif");
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
    // this.readDataRemove();
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

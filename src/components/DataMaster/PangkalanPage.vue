<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    ></v-breadcrumbs>
    <!-- <h5 class="flex-item" style="font-size: 30px; margin-top: 40px">Data Pegawai</h5> -->
    <div v-if="isWideScreen" style="margin-bottom: 7.5%">
      <h3 style="float:left">Pangkalan</h3>
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
      <h3 style="float:left">Pangkalan</h3>
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
      <h3 style="float:left">Pangkalan</h3>
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
        :items="pangkalans"
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
                    ><v-btn small @click="deleteHandler(item.id_sppbe)"
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
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <!-- <v-spacer></v-spacer> -->
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data Pangkalan</h3>
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
            <v-text-field
              :rules="namaRules"
              v-model="form.nama_pangkalan"
              label="Nama"
            ></v-text-field>
            <v-text-field
              :rules="idRules"
              v-model="form.id_registrasi_pangkalan"
              label="ID Registrasi"
            ></v-text-field>
            <v-text-field
              :rules="kontrakRules"
              type="date"
              v-model="form.tanggal_kontrak_pangkalan"
              label="Tanggal Kontrak Pangkalan"
            ></v-text-field>
            <v-text-field
              :rules="emailRules"
              v-model="form.email_pangkalan"
              label="Email"
            ></v-text-field>
            <v-text-field
              :rules="telpRules"
              v-model="form.nomor_telepon_pangkalan"
              label="Nomor Telepon"
            ></v-text-field>
            <v-select
              :rules="kecamatanRules"
              v-model="form.kecamatan_pangkalan"
              :items="kecamatan"
              item-text="nama_kecamatan"
              item-value="id_kecamatan"
              label="Kecamatan"
              required
            ></v-select>
            <v-select
              :rules="kelurahanRules"
              v-model="form.kelurahan_pangkalan"
              :items="kelurahan"
              item-text="nama_kelurahan"
              item-value="id_kelurahan"
              label="Kelurahan"
              required
            ></v-select>
            <v-select
              :rules="padukuhanRules"
              v-model="form.padukuhan_pangkalan"
              :items="padukuhan"
              item-text="nama_padukuhan"
              item-value="id_padukuhan"
              label="Padukuhan"
              required
            ></v-select>
            <v-text-field
              :rules="alamatRules"
              v-model="form.alamat_pangkalan"
              label="Alamat"
            ></v-text-field>
            <v-text-field
              :rules="mapsRules"
              v-model="form.url_maps_pangkalan"
              label="URL Maps"
            ></v-text-field>
            <iframe v-if="form.url_maps_sppbe!=null" :src="this.form.url_maps_sppbe" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <v-text-field
              v-if="form.url_maps_sppbe!=null"
              disabled
              label="Lokasi"
            ></v-text-field>
            <a v-if="form.url_maps_sppbe!=null" href="form.url_maps_sppbe" target="_blank">Lihat Lokasi SPPBE</a>
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
        <v-card-text> Anda Yakin ingin menghapus data ini? </v-card-text>
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
  name: "PangkalanPage",
  watch: {
    $route: {
      immediate: true,
      handler() {
        document.title = "Pangkalan";
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
      isWideScreen: window.innerWidth >= 1000,
      isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
      items: [
        { 
          text: "Dashboard",
          disabled: false,
          href: '/dashboard-page',
        },
        { 
          text: "Pangkalan",
          disabled: true,
          href: '/pangkalan-page',
        },
      ],
      headers: [
        { text: "Nama", align: "start", sortable: true, value: "nama_pangkalan" },
        { text: "Email", value: "email_pangkalan" },
        { text: "Nomor Telepon", value: "nomor_telepon_pangkalan" },
        { text: "Alamat", value: "alamat_pangkalan" },
        { text: "Status", value: "status_pangkalan" },
        { text: "", value: "actions" },
      ],
      menus: [{ title: "Check" }, { title: "Edit" }, { title: "Delete" }],
      pangkalan: new FormData(),
      pangkalans: [],
      form: {
        id_pangkalan: null,
        nama_pangkalan: null,
        id_registrasi_pangkalan: null,
        tanggal_kontrak_pangkalan: null,
        email_pangkalan: null,
        nomor_telepon_pangkalan: null,
        alamat_pangkalan: null,
        id_kecamatan: null,
        nama_kecamatan: null,
        id_kelurahan: null,
        nama_kelurahan: null,
        id_padukuhan: null,
        nama_padukuhan: null,
        url_maps_pangkalan: null,
        status_pangkalan: null,
      },
      form_kecamatan: {
        id_kecamatan: null,
        nama_kecamatan: null,
      },
      kecamatan: [],
      form_kelurahan: {
        id_kelurahan: null,
        nama_kelurahan: null,
      },
      kelurahan: [],
      form_padukuhan: {
        id_padukuhan: null,
        nama_padukuhan: null,
      },
      padukuhan: [],
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
      var url = this.$api + "/pangkalanRead";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.pangkalans = response.data.data;
        });
    },
    readDataRemove() {
      var url = this.$api + "/pangkalanRemove";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.pangkalansR = response.data.data;
        });
    },
    readKecamatan() {
      var url = this.$api + "/kecamatanRead";
      this.$http.get(url).then((response) => {
        // this.role = response.data.data;
        let temp = response.data.data;
        this.form_kecamatan.id_kecamatan = temp.map((v) => v.id_kecamatan);
        this.form_kecamatan.nama_kecamatan = temp.map((v) => v.nama_kecamatan);
        for (let i = 0; i < this.form_kecamatan.nama_kecamatan.length; i++) {
          this.kecamatan.id_kecamatan.push(this.form_kecamatan.id_kecamatan[i]);
          this.kecamatan.nama_kecamatan.push(this.form_kecamatan.nama_kecamatan[i]);
        }
      });
    },
    readKelurahan() {
      var url = this.$api + "/kelurahanRead/" + this.form.kecamatan_pangkalan;
      this.$http.get(url).then((response) => {
        // this.role = response.data.data;
        let temp = response.data.data;
        this.form_kelurahan.id_kelurahan = temp.map((v) => v.id_kelurahan);
        this.form_kelurahan.nama_kelurahan = temp.map((v) => v.nama_kelurahan);
        for (let i = 0; i < this.form_kelurahan.nama_kelurahan.length; i++) {
          this.kelurahan.id_kelurahan.push(this.form_kelurahan.id_kelurahan[i]);
          this.kelurahan.nama_kelurahan.push(this.form_kelurahan.nama_kelurahan[i]);
        }
      });
    },
    readPadukuhan() {
      var url = this.$api + "/padukuhanRead/" + this.form.kelurahan_pangkalan;
      this.$http.get(url).then((response) => {
        // this.role = response.data.data;
        let temp = response.data.data;
        this.form_padukuhan.id_padukuhan = temp.map((v) => v.id_padukuhan);
        this.form_padukuhan.nama_padukuhan = temp.map((v) => v.nama_padukuhan);
        for (let i = 0; i < this.form_padukuhan.nama_padukuhan.length; i++) {
          this.padukuhan.id_padukuhan.push(this.form_padukuhan.id_padukuhan[i]);
          this.padukuhan.nama_padukuhan.push(this.form_padukuhan.nama_padukuhan[i]);
        }
      });
    },
    save() {
      this.pangkalan.append("nama_pangkalan", this.form.nama_pangkalan);
      this.pangkalan.append("id_registrasi_pangkalan", this.form.id_registrasi_pangkalan);
      this.pangkalan.append("role_pangkalan", this.form.nama_role);
      this.pangkalan.append(
        "tanggal_lahir_pangkalan",
        this.form.tanggal_lahir_pangkalan
      );
      this.pangkalan.append("email_pangkalan", this.form.email_pangkalan);
      this.pangkalan.append("no_telp_pangkalan", this.form.no_telp_pangkalan);

      var url = this.$api + "/pangkalan/";
      this.load = true;
      this.$http
        .post(url, this.pangkalan, {
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
      var url = this.$api + "/pangkalanTemp";
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
    //ubah data pangkalan
    update() {
      let newData = {
        role_pangkalan: this.form.nama_role,
        nama_pangkalan: this.form.nama_pangkalan,
        id_registrasi_pangkalan: this.form.id_registrasi_pangkalan,
        tanggal_lahir_pangkalan: this.form.tanggal_lahir_pangkalan,
        email_pangkalan: this.form.email_pangkalan,
        no_telp_pangkalan: this.form.no_telp_pangkalan,
      };

      var url = this.$api + "/pangkalan/" + this.editId;
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

    //non aktif data pangkalan
    deleteData() {
      var url = this.$api + "/pangkalanDelete/" + this.deleteId;
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
      this.editId = item.id_pangkalan;
      this.form.role_pangkalan = item.role_pangkalan;
      this.form.nama_pangkalan = item.nama_pangkalan;
      this.form.id_registrasi_pangkalan = item.id_registrasi_pangkalan;
      this.form.tanggal_lahir_pangkalan = item.tanggal_lahir_pangkalan;
      this.form.email_pangkalan = item.email_pangkalan;
      this.form.no_telp_pangkalan = item.no_telp_pangkalan;
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
        id_pangkalan: null,
        nama_pangkalan: null,
        id_registrasi_pangkalan: null,
        tanggal_kontrak_pangkalan: null,
        email_pangkalan: null,
        nomor_telepon_pangkalan: null,
        alamat_pangkalan: null,
        id_kecamatan: null,
        nama_kecamatan: null,
        id_kelurahan: null,
        nama_kelurahan: null,
        id_padukuhan: null,
        nama_padukuhan: null,
        url_maps_pangkalan: null,
        status_pangkalan: null,
      };
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    localStorage.setItem("menu", "Pangkalan");
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
    this.readDataRemove();
    this.updateTemp();
  },
};
</script>

<style>
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

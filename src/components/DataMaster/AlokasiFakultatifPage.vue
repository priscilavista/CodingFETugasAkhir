<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    ></v-breadcrumbs>
    <!-- <h5 class="flex-item" style="font-size: 30px; margin-top: 40px">Data kendaraan</h5> -->
    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Alokasi Fakultatif</h3>
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
      <h3 style="float:left">Alokasi Fakultatif</h3>
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
      <h3 style="float:left">Alokasi Fakultatif</h3>
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

    <h3 style="margin-bottom:-30px">Disetujui Pangkalan</h3>
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

    <h3 style="margin-bottom:-30px; padding-top:50px">Belum Dikonfirmasi Pangkalan</h3>
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

    <h3 style="margin-bottom:-30px;padding-top:50px">Ditolak Pangkalan</h3>
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

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <!-- <v-spacer></v-spacer> -->
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data Alokasi Fakultatif</h3>
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
              :rules="pangkalanRules"
              v-model="form.pangkalan"
              :items="pangkalan"
              item-text="nama_pangkalan"
              item-value="id_pangkalan"
              label="Pangkalan"
              required
            ></v-select>
            <v-text-field
              :rules="tanggalPenambahanRules"
              type="date"
              v-model="form.tanggal_penambahan_alokasi"
              label="Tanggal Penambahan Alokasi"
            ></v-text-field>
            <v-text-field
              :rules="alokasiRules"
              v-model="form.alokasi_tambahan"
              label="Alokasi Tambahan"
              type="number"
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
          text: "Alokasi Fakultatif",
          disabled: true,
          href: '/alokasi-fakultatif-page',
        },
      ],
      headers: [
        {
          text: "Tanggal Pengajuan",
          align: "start",
          sortable: true,
          value: "tanggal_pengajuan",
        },
        { text: "Pangkalan", value: "nama_pangkalan" },
        { text: "Tanggal Penambahan Alokasi", value: "tanggal_penambahan_alokasi" },
        { text: "Alokasi Tambahan", value: "alokasi_tambahan" },
        { text: "Status Persetujuan", value: "status_persetujuan_pangkalan" },
        { text: "", value: "actions" },
      ],
      bulan: [
        { bulan_transaksi: "Januari", nomor_bulan: '1' },
        { bulan_transaksi: "Februari", nomor_bulan: '2' },
        { bulan_transaksi: "Maret", nomor_bulan: '3' },
        { bulan_transaksi: "April", nomor_bulan: '4' },
        { bulan_transaksi: "Mei", nomor_bulan: '5' },
        { bulan_transaksi: "Juni", nomor_bulan: '6' },
        { bulan_transaksi: "Juli", nomor_bulan: '7' },
        { bulan_transaksi: "Agustus", nomor_bulan: '8' },
        { bulan_transaksi: "September", nomor_bulan: '9' },
        { bulan_transaksi: "Oktober", nomor_bulan: '10' },
        { bulan_transaksi: "November", nomor_bulan: '11' },
        { bulan_transaksi: "Desember", nomor_bulan: '12' },
      ],
      tahun: [
          { tahun_transaksi: '2015'},
          { tahun_transaksi: '2016'},
          { tahun_transaksi: '2017'},
          { tahun_transaksi: '2018'},
          { tahun_transaksi: '2019'},
          { tahun_transaksi: '2020'},
          { tahun_transaksi: '2021'},
          { tahun_transaksi: '2022'},
          { tahun_transaksi: '2023'},
      ],
      menus: [{ title: "Check" }, { title: "Edit" }, { title: "Delete" }],
      fakultatif: new FormData(),
      fakultatifs: [],
       form_filter: {
        bulan_transaksi: null,
        tahun_transaksi: null,
      },
      form: {
        id_alokasi_fakultatif: null,
        id_pangkalan: null,
        nama_pangkalan: null,
        tanggal_pengajuan: null,
        tanggal_penambahan_alokasi: null,
        alokasi_tambahan: null,
        status_persetujuan_pangkalan: null,
      },
      form_pangkalan: {
        id_pangkalan: null,
        nama_pangkalan: null,
      },
      pangkalan: [],
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
    readPangkalan() {
      var url = this.$api + "/pangkalanRead";
      this.$http.get(url).then((response) => {
        // this.role = response.data.data;
        let temp = response.data.data;
        this.form_pangkalan.id_pangkalan = temp.map((v) => v.id_pangkalan);
        this.form_pangkalan.nama_pangkalan = temp.map((v) => v.nama_pangkalan);
        for (let i = 0; i < this.form_pangkalan.nama_pangkalan.length; i++) {
          this.pangkalan.id_pangkalan.push(this.form_pangkalan.id_pangkalan[i]);
          this.pangkalan.nama_pangkalan.push(this.form_pangkalan.nama_pangkalan[i]);
        }
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
        nama_pangkalan: null,
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

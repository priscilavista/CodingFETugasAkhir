<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    />
    
    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Transaksi</h3>
      <v-spacer />
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Transaksi</h3>
      <v-spacer />
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Transaksi</h3>
      <v-spacer />
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right"
      >
        Tambah
      </v-btn>
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
        />

        <v-text-field
          v-else
          v-model="search"
          append-icon="mdi-magnify"
          label="Cari"
          single-line
          hide-details
          style="margin-left: 50%; width: 50%;"
        />
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="transaksis"
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
                  <v-list-item-title style="color: #000000; margin-top: 10px">
                    <v-btn small @click="editHandler(item)">
                      <v-icon color="#E39348">mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-title>
                  
                  <v-list-item-title style="color: #000000; margin-top: 10px">
                    <v-btn small @click="deleteHandler(item.id_pegawai)">
                      <v-icon color="#C94141">mdi-account-remove</v-icon>
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px; ">
        <v-card-title>
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data Transaksi</h3>
          <v-spacer />
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              type="date"
              :rules="tanggalRules"
              v-model="form.tanggal_transaksi"
              label="Tanggal Transaksi"
            />

            <v-text-field
              :rules="jumlahRules"
              v-model="form.jumlah_pembelian"
              label="Jumlah Pembelian"
              type="number"
            />

            <v-text-field
              :rules="namaRules"
              v-model="form.nama_pembeli"
              label="Nama Pembeli"
            />

            <v-text-field
              :rules="ktpRules"
              v-model="form.nomor_ktp_pembeli"
              label="Nomor KTP Pembeli"
            />

            <v-text-field
              :rules="telpRules"
              v-model="form.nomor_telepon_pembeli"
              label="Nomor Telepon Pembeli"
            />

            <v-select
              :rules="kategoriRules"
              v-model="form.kategori_pembeli"
              :items="kategori"
              item-text="kategori_pembeli"
              item-value="kategori_pembeli"
              label="Kategori Pembeli"
              required
            />

            <v-card-action>
              <v-spacer />
              <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="save">Simpan</v-btn>
              <v-spacer />
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

        <v-card-text> Anda Yakin Ingin Menghapus Data Tersebut? </v-card-text>

        <v-card-action>
          <v-spacer />
          <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
          <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
        </v-card-action>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
  </v-main>
</template>

<script>
  export default {
    name: "TransaksiPage",

    watch: {
      $route: {
        immediate: true,
        handler() {
          document.title = "Transaksi";
        },
      },
    },

    data() {
      return {
        inputType: "Tambah",
        snackbar: false,
        error_message: "",
        color: "",
        search: null,
        dialog: false,
        dialogConfirm: false,
        isWideScreen: window.innerWidth >= 1000,
        isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
        items: [
          { 
            text: "Dashboard",
            disabled: false,
            href: '/dashboard-page',
          },
          { 
            text: "Transaksi",
            disabled: true,
            href: '/transaksi-pangkalan-page',
          },
        ],
        headers: [
          {
            text: "Tanggal Transaksi",
            align: "start",
            sortable: true,
            value: "tanggal_transaksi",
          },
          { text: "Jumlah Pembelian", value: "jumlah_pembelian" },
          { text: "Nama Pembeli", value: "nama_pembeli" },
          { text: "Nomor KTP Pembeli", value: "nomor_ktp_pembeli" },
          { text: "Nomor Telepon Pembeli", value: "nomor_telepon_pembeli" },
          { text: "Kategori Pembeli", value: "kategori_pembeli" },
          { text: "", value: "actions" },
        ],
        transaksi: new FormData(),
        transaksis: [],
        form: {
          id_transaksi: null,
          tanggal_transaksi: null,
          jumlah_pembelian: null,
          nama_pembeli: null,
          nomor_ktp_pembeli: null,
          nomor_telepon_pembeli: null,
          kategori_pembeli: null,
        },
        stokBulananPangkalan: null,
        kategori: [
          { kategori_pembeli: "Rumah Tangga" },
          { kategori_pembeli: "Usaha Mikro" },
          { kategori_pembeli: "Lainnya" },
        ],
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
        var url = this.$api + "/transaksiRead";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.transaksis = response.data.data;
          });
      },
      
      save() {
        this.transaksi.append("tanggal_transaksi", this.form.tanggal_transaksi);
        this.transaksi.append("jumlah_pembelian", this.form.jumlah_pembelian);
        this.transaksi.append(
          "nama_pembeli",
          this.form.nama_pembeli
        );
        this.transaksi.append("nomor_ktp_pembeli", this.form.nomor_ktp_pembeli);
        this.transaksi.append("nomor_telepon_pembeli", this.form.nomor_telepon_pembeli);
        this.transaksi.append("kategori_pembeli", this.form.kategori_pembeli);

        var url = this.$api + "/transaksi";
        this.load = true;
        this.$http
          .post(url, this.transaksi)
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = true;
            this.close();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      },

      //ubah data transaksi
      update() {
        let newData = {
          role_transaksi: this.form.nama_role,
          nama_transaksi: this.form.nama_transaksi,
          tanggal_lahir_transaksi: this.form.tanggal_lahir_transaksi,
          email_transaksi: this.form.email_transaksi,
          no_telp_transaksi: this.form.no_telp_transaksi,
        };

        var url = this.$api + "/transaksi/" + this.editId;
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

      //non aktif data transaksi
      deleteData() {
        var url = this.$api + "/transaksiDelete/" + this.deleteId;
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
        this.editId = item.id_transaksi;
        this.form.role_transaksi = item.role_transaksi;
        this.form.nama_transaksi = item.nama_transaksi;
        this.form.tanggal_lahir_transaksi = item.tanggal_lahir_transaksi;
        this.form.email_transaksi = item.email_transaksi;
        this.form.no_telp_transaksi = item.no_telp_transaksi;
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
          id_transaksi: null,
          tanggal_transaksi: null,
          jumlah_pembelian: null,
          nama_pembeli: null,
          nomor_ktp_pembeli: null,
          nomor_telepon_pembeli: null,
          kategori_pembeli: null,
        };
      },
    },

    computed: {
      formTitle() {
        return this.inputType;
      },
    },

    mounted() {
      localStorage.setItem("menu", "Transaksi");
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
</style>

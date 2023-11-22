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
                <v-icon @click="editHandler(item)" color="primary" style="margin-right: 15px;">
                  mdi-pencil
                </v-icon>
                <v-icon @click="deleteHandler(item)" color="error">
                  mdi-account-remove
                </v-icon>
              </span>
            </template>
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

            <v-spacer />
            <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="setForm">Simpan</v-btn>
            <v-spacer />
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
          <v-card-title>
            <h3 style="font-size:20px; color:#ffffff">Hapus Data Transaksi</h3>
            <v-spacer />
            <v-icon @click="cancel" link>mdi-close</v-icon>
          </v-card-title>
        </v-card>

        <v-card-text> Anda Yakin Ingin Menghapus Data Tersebut? </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="#E53935" text @click="deleteData">Hapus</v-btn>
          <v-btn style="margin-right:12.5px" color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
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
        color: "",
        editId: "",
        search: null,
        deleteId: "",
        dialog: false,
        overlay: false,
        transaksis: [],
        snackbar: false,
        error_message: "",
        inputType: "Tambah",
        dialogConfirm: false,
        transaksi: new FormData(),
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
        form: {
          id_transaksi: null,
          id_pangkalan: null,
          nama_pangkalan: null,
          tanggal_transaksi: null,
          jumlah_pembelian: null,
          nama_pembeli: null,
          nomor_ktp_pembeli: null,
          nomor_telepon_pembeli: null,
          kategori_pembeli: null,
        },
        kategori: [
          { kategori_pembeli: "Rumah Tangga" },
          { kategori_pembeli: "Usaha Mikro" },
          { kategori_pembeli: "Lainnya" },
        ],
        namaRules: [(v) => !!v || "Nama Pembeli is Required"],
        ktpRules: [(v) => !!v || "Nomor KTP Pembeli is Required"],
        jumlahRules: [(v) => !!v || "Jumlah Pembelian is Required"],
        tanggalRules: [(v) => !!v || "Tanggal Transaksi is Required"],
        kategoriRules: [(v) => !!v || "Kategori Pembeli is Required"],
        telpRules: [
          (v) => !!v || "Nomor Telepon Pembeli is Required", 
          (v) => /^([0][8][0-9]{8,10})$/g.test(v) || "Nomor Telepon Pembeli must be valid",
        ],
      };
    },

    methods: {
      setForm() {
        if (this.inputType !== "Tambah") 
        {
          this.update();
        } 
        else 
        {
          this.save();
        }
      },

      readData() {
        this.overlay = true;
        var url = this.$api + "/transaksi/postBySearchData";
        var body = { 'id_pangkalan': localStorage.getItem('id') };

        this.$http.post(url, body)
          .then((response) => {
            if(response.data.code === 200)
            {
              var res = response.data.data;
              this.transaksis = res;
              
              this.color = "green";
              this.snackbar = true;
              this.overlay = false;
              this.error_message = response.data.message;
            }
            else
            {
              this.color = "red";
              this.snackbar = true;
              this.overlay = false;
              this.error_message = response.data.message;
            }
          })
          .catch((error) => {
            this.overlay = false;
            console.log(error)

            if(error.request.status === 404)
            {
              this.transaksis = [];
              this.color = "red";
              this.snackbar = true;
              this.error_message = 'Data Transaksi Tidak Ditemukan';
            }
          });
      },
      
      save() {
        this.transaksi.append("nama_pembeli", this.form.nama_pembeli);
        this.transaksi.append("jumlah_pembelian", this.form.jumlah_pembelian);
        this.transaksi.append("kategori_pembeli", this.form.kategori_pembeli);
        this.transaksi.append("nomor_ktp_pembeli", this.form.nomor_ktp_pembeli);
        this.transaksi.append("tanggal_transaksi", this.form.tanggal_transaksi);
        this.transaksi.append("nomor_telepon_pembeli", this.form.nomor_telepon_pembeli);

        var url = this.$api + "/transaksi/create";
        this.$http.post(url, this.transaksi)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.cancel();
              this.readData();
              this.resetForm();
              this.color = "green";
              this.snackbar = true;
              this.error_message = response.data.message;
              location.reload();
            }
            else
            {
              this.color = "red";
              this.snackbar = true;
              this.error_message = response.data.message;
            }
          })
          .catch((error) => {
            this.color = "red";
            this.snackbar = true;
            this.error_message = error.response.data.message;
          });
      },

      //ubah data transaksi
      update() {
        let newData = {
          nama_pembeli: this.form.nama_pembeli,
          jumlah_pembelian: this.form.jumlah_pembelian,
          kategori_pembeli: this.form.kategori_pembeli,
          nomor_ktp_pembeli: this.form.nomor_ktp_pembeli,
          tanggal_transaksi: this.form.tanggal_transaksi,
          Pangkalanid_pangkalan: localStorage.getItem('id'),
          nomor_telepon_pembeli: this.form.nomor_telepon_pembeli,
        };

        var url = this.$api + "/transaksi/update/" + this.editId;
        this.$http.put(url, newData)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.cancel();
              this.readData();
              this.resetForm();
              this.color = "green";
              this.snackbar = true;
              this.error_message = response.data.message;
              location.reload();
            }
            else
            {
              this.color = "red";
              this.snackbar = true;
              this.error_message = response.data.message;
            }
          })
          .catch((error) => {
            this.color = "red";
            this.snackbar = true;
            this.error_message = error.response.data.message;
          });
      },

      //non aktif data transaksi
      deleteData() {
        var url = this.$api + "/transaksi/delete/" + this.deleteId;
        this.$http.delete(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.cancel();
              this.readData();
              this.resetForm();
              this.color = "green";
              this.snackbar = true;
              this.error_message = response.data.message;
              location.reload();
            }
            else
            {
              this.color = "red";
              this.snackbar = true;
              this.error_message = response.data.message;
            }
          })
          .catch((error) => {
            this.color = "red";
            this.snackbar = true;
            this.error_message = error.response.data.message;
          });
      },

      editHandler(item) {
        this.dialog = true;
        this.inputType = "Edit";
        this.editId = item.id_transaksi;
        this.form.nama_pembeli = item.nama_pembeli;
        this.form.id_pangkalan = item.id_pangkalan;
        this.form.nama_pangkalan = item.nama_pangkalan;
        this.form.jumlah_pembelian = item.jumlah_pembelian;
        this.form.kategori_pembeli = item.kategori_pembeli;
        this.form.nomor_ktp_pembeli = item.nomor_ktp_pembeli;
        this.form.tanggal_transaksi = item.tanggal_transaksi;
        this.form.nomor_telepon_pembeli = item.nomor_telepon_pembeli;
      },

      deleteHandler(item) {
        this.dialogConfirm = true;
        this.deleteId = item.id_transaksi;
      },

      cancel() {
        this.resetForm();
        this.dialog = false;
        this.inputType = "Tambah";
        this.dialogConfirm = false;
      },

      resetForm() {
        this.form = {
          nama_pembeli: null,
          id_transaksi: null,
          id_pangkalan: null,
          nama_pangkalan: null,
          jumlah_pembelian: null,
          kategori_pembeli: null,
          tanggal_transaksi: null,
          nomor_ktp_pembeli: null,
          nomor_telepon_pembeli: null,
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
      this.readData();
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

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
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Transaksi</h3>
      <v-spacer />
    </div>

    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Transaksi</h3>
      <v-spacer />
    </div>
    
    <v-card width="350px" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
      <v-card-title>
        <h3 style="font-size:20px; color:#ffffff">Filter Data</h3>
      </v-card-title>
    </v-card>

    <v-card style="border-radius: 0px 0px 4px 4px;width:350px;height:">
      <v-card-text>
        <v-container v-if="isWideScreen" style="padding-left: 5px; padding-right: 5px; padding-bottom:30px">
          <v-row style="margin-top:-30px">
            <v-col 
              cols="12"
              md="7"
            >
              <v-select
                v-model="form_filter.bulan_transaksi"
                :items="bulan"
                item-text="nama_bulan"
                item-value="id_bulan"
                label="Bulan"
              />
            </v-col>

            <v-col
              cols="6"
              md="5"
            >
              <v-select
                v-model="form_filter.tahun_transaksi"
                :items="tahun"
                item-text="nama_tahun"
                item-value="nama_tahun"
                label="Tahun"
              />
            </v-col>
          </v-row>

          <v-select
            v-model="form_filter.pangkalan_transaksi"
            :items="pangkalan"
            item-text="nama_pangkalan"
            item-value="id_pangkalan"
            label="Pangkalan"
            style="margin-top:-25px"
          />

          <v-btn small color="primary" dark style="float:left;" @click="readData">Filter</v-btn>
          <v-spacer />
          <v-btn small color="primary" dark style="float:left;" class="ml-4" @click="resetData()">Reset</v-btn>
        </v-container>

        <v-container v-else style="padding-left: 5px; padding-right: 5px; padding-bottom:50px">
          <v-select
            v-model="form_filter.bulan_transaksi"
            :items="bulan"
            item-text="nama_bulan"
            item-value="id_bulan"
            label="Bulan"
            style="margin-top:-12.5px"
          />

          <v-select
            v-model="form_filter.tahun_transaksi"
            :items="tahun"
            item-text="nama_tahun"
            item-value="nama_tahun"
            label="Tahun"
            style="width:50%"
          />
          
          <v-select
            v-model="form_filter.pangkalan_transaksi"
            :items="pangkalan"
            item-text="nama_pangkalan"
            item-value="id_pangkalan"
            label="Pangkalan"
          />

          <v-btn small color="primary" dark style="float:left;margin-top:10px" @click="readData">Filter</v-btn>
          <v-spacer />
          <v-btn small color="primary" dark style="float:left;margin-top:10px" class="ml-4" @click="resetData()">Reset</v-btn>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card fill-height class="flex-item mx-auto" elevation="5" style="margin-top: 2.5%">
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
        id="customStyleTable"
        class="elevation-1"
        :items-per-page="5"
        height="350px"
        :headers="headers"
        :items="transaksis"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" @click="editHandler(item)" color="primary" style="margin-right: 15px; font-size: 20px">
                      mdi-pencil
                    </v-icon>
                  </template>
                  <span>Ubah Data</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" @click="deleteHandler(item)" color="error" style="font-size: 20px">
                      mdi-file-document-remove
                    </v-icon>
                  </template>
                  <span>Hapus Data</span>
                </v-tooltip>
              </span>
            </template>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <h3 style="font-size:20px; color:#ffffff">Edit Data Transaksi</h3>
          <v-spacer />
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" @click="cancel" style="font-size: 28px" link color="error">mdi-close</v-icon>
            </template>
            <span>Tutup</span>
          </v-tooltip>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              v-model="form.nama_pangkalan"
              label="Pangkalan"
              disabled
            />

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

            <v-text-field
              :rules="kategoriRules"
              v-model="form.kategori_pembeli"
              label="Kategori Pembeli"
            />

            <v-spacer />
            <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="update">Simpan</v-btn>
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
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="cancel" style="font-size: 28px" link color="error">mdi-close</v-icon>
              </template>
              <span>Tutup</span>
            </v-tooltip>
          </v-card-title>
        </v-card>

        <v-card-text style="padding-bottom:5px; padding-left:16px">
          <p style="font-size:16px; text-align:left; color:#000000" class="mt-3">Anda yakin ingin menghapus data tersebut?</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="#E53935" text @click="deleteData">Hapus</v-btn>
          <v-btn color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

    <v-overlay :value="overlay" class="align-center justify-center" style="zIndex: 100000">
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
        bulan: [],
        tahun: [],
        editId: "",
        search: null,
        deleteId: "",
        dialog: false,
        pangkalan: [],
        transaksis: [],
        overlay: false,
        snackbar: false,
        error_message: "",
        dialogConfirm: false,
        isWideScreen: window.innerWidth >= 1000,
        isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
        items: [
          { 
            disabled: false,
            text: "Dashboard",
            href: '/dashboard-page',
          },
          { 
            disabled: true,
            text: "Transaksi",
            href: '/transaksi-page',
          },
        ],
        headers: [
          {
            text: "Tanggal Transaksi",
            align: "start",
            sortable: true,
            value: "tanggal_transaksi",
          },
          { text: "Pangkalan", value: "nama_pangkalan" },
          { text: "Jumlah Pembelian", value: "jumlah_pembelian" },
          { text: "Nama Pembeli", value: "nama_pembeli" },
          { text: "Nomor KTP Pembeli", value: "nomor_ktp_pembeli" },
          { text: "Nomor Telepon Pembeli", value: "nomor_telepon_pembeli" },
          { text: "Kategori Pembeli", value: "kategori_pembeli" },
          { text: "", value: "actions", sortable: false },
        ],
        form_filter: {
          bulan_transaksi: null,
          tahun_transaksi: null,
          pangkalan_transaksi: null,
        },
        form: {
          id_transaksi: null,
          id_pangkalan: null,
          nama_pembeli: null,
          nama_pangkalan: null,
          jumlah_pembelian: null,
          kategori_pembeli: null,
          tanggal_transaksi: null,
          nomor_ktp_pembeli: null,
          nomor_telepon_pembeli: null,
        },
        namaRules: [(v) => !!v || "Nama Pembeli Tidak Boleh Kosong"],
        ktpRules: [(v) => !!v || "Nomor KTP Pembeli Tidak Boleh Kosong"],
        jumlahRules: [(v) => !!v || "Jumlah Pembelian Tidak Boleh Kosong"],
        tanggalRules: [(v) => !!v || "Tanggal Transaksi Tidak Boleh Kosong"],
        kategoriRules: [(v) => !!v || "Kategori Pembeli Tidak Boleh Kosong"],
        telpRules: [
          (v) => !!v || "Nomor Telepon Pembeli Tidak Boleh Kosong", 
          (v) => /^([0][8][0-9]{8,10})$/g.test(v) || "Nomor Telepon Pembeli Tidak Valid",
        ],
      };
    },

    methods: {
      readData() {
        this.overlay = true;
        var url = this.$api + "/transaksi/postBySearchData";
        var body = { 
          'bulan': this.form_filter.bulan_transaksi, 
          'tahun': this.form_filter.tahun_transaksi, 
          'id_pangkalan': this.form_filter.pangkalan_transaksi 
        };

        this.$http.post(url, body)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.transaksis = response.data.data;
              
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

            if(error.request.status === 404)
            {
              this.transaksis = [];
              this.color = "red";
              this.snackbar = true;
              this.error_message = 'Data Transaksi Tidak Ditemukan';
            }
          });
      },

      readDataBulan() {
        this.overlay = true;
        var url = this.$api + "/bulan/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.bulan = response.data.data;
              this.overlay = false;
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
            this.color = "red";
            this.snackbar = true;
            this.overlay = false;
            this.error_message = error.response.data.message;
          });
      },

      readDataTahun() {
        this.overlay = true;
        var url = this.$api + "/tahun/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.tahun= response.data.data;
              this.overlay = false;
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
            this.color = "red";
            this.snackbar = true;
            this.overlay = false;
            this.error_message = error.response.data.message;
          });
      },

      readDataPangkalan() {
        this.overlay = true;
        var url = this.$api + "/pangkalan/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.pangkalan = response.data.data;
              this.overlay = false;
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
            this.color = "red";
            this.snackbar = true;
            this.overlay = false;
            this.error_message = error.response.data.message;
          });
      },

      //ubah data transaksi
      update() {
        if(this.checkForm() === 0)
        {
          this.overlay = true;
          let newData = {
            nama_pembeli: this.form.nama_pembeli,
            jumlah_pembelian: this.form.jumlah_pembelian,
            kategori_pembeli: this.form.kategori_pembeli,
            Pangkalanid_pangkalan: this.form.id_pangkalan,
            nomor_ktp_pembeli: this.form.nomor_ktp_pembeli,
            tanggal_transaksi: this.form.tanggal_transaksi,
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
                this.overlay = false;
                this.error_message = response.data.message;
                location.reload();
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
              this.color = "red";
              this.snackbar = true;
              this.overlay = false;
              this.error_message = error.response.data.message;
            });
        }
        else
        {
          this.color = "red";
          this.snackbar = true;
          this.error_message = 'Data Tidak Lengkap!!';
        }
      },

      //non aktif data transaksi
      deleteData() {
        this.overlay = true;
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
              this.overlay = false;
              this.error_message = response.data.message;
              location.reload();
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
            this.color = "red";
            this.snackbar = true;
            this.overlay = false;
            this.error_message = error.response.data.message;
          });
      },

      checkForm() {
        if(this.form.id_pangkalan === null || this.form.id_pangkalan === '')
        {
          return 1;
        }

        if(this.form.nama_pembeli === null || this.form.nama_pembeli === '')
        {
          return 1;
        }

        if(this.form.jumlah_pembelian === null || this.form.jumlah_pembelian === '')
        {
          return 1;
        }

        if(this.form.kategori_pembeli === null || this.form.kategori_pembeli === '')
        {
          return 1;
        }

        if(this.form.nomor_ktp_pembeli === null || this.form.nomor_ktp_pembeli === '')
        {
          return 1;
        }

        if(this.form.tanggal_transaksi === null || this.form.tanggal_transaksi === '')
        {
          return 1;
        }

        if(this.form.nomor_telepon_pembeli === null || this.form.nomor_telepon_pembeli === '')
        {
          return 1;
        }

        return 0;
      },

      editHandler(item) {
        this.editId = item.id_transaksi;
        this.form.id_pangkalan = item.id_pangkalan;
        this.form.nama_pembeli = item.nama_pembeli;
        this.form.nama_pangkalan = item.nama_pangkalan;
        this.form.jumlah_pembelian = item.jumlah_pembelian;
        this.form.kategori_pembeli = item.kategori_pembeli;
        this.form.nomor_ktp_pembeli = item.nomor_ktp_pembeli;
        this.form.tanggal_transaksi = item.tanggal_transaksi;
        this.form.nomor_telepon_pembeli = item.nomor_telepon_pembeli;

        this.dialog = true;
      },

      deleteHandler(item) {
        this.deleteId = item.id_transaksi;
        this.dialogConfirm = true;
      },

      cancel() {
        this.resetForm();
        this.dialog = false;
        this.dialogConfirm = false;
      },

      resetData() {
        this.resetForm();
        this.readData();
      },

      resetForm() {
        this.form = {
          id_transaksi: null,
          id_pangkalan: null,
          nama_pembeli: null,
          nama_pangkalan: null,
          jumlah_pembelian: null,
          kategori_pembeli: null,
          tanggal_transaksi: null,
          nomor_ktp_pembeli: null,
          nomor_telepon_pembeli: null,
        };

        this.form_filter = {
          bulan_transaksi: null,
          tahun_transaksi: null,
          pangkalan_transaksi: null,
        }
      },
    },

    mounted() {
      localStorage.setItem("menu", "Transaksi");
      this.readData();
      this.readDataBulan();
      this.readDataTahun();
      this.readDataPangkalan();
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

  .v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn {
    margin-left: 0px;
  }


  .v-dialog>.v-card>.v-card__title {
    padding: 16px 24px;
  }
</style>

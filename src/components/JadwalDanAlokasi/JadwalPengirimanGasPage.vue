<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    />

    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Jadwal Pengiriman Gas</h3>
      
      <v-spacer />

      <v-btn
        small
        color="primary"
        dark
        @click="moveTampilanKalender"
        style="float:right"
      >
        Tampilan Kalender
      </v-btn>
      
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right; margin-right:10px"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Jadwal Pengiriman Gas</h3>
      
      <v-spacer />

      <v-btn
        small
        color="primary"
        dark
        @click="moveTampilanKalender"
        style="float:right"
        >Tampilan Kalender</v-btn
      >

      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right; margin-right:10px"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Jadwal Pengiriman Gas</h3>
      
      <v-spacer />
      
      <v-btn
        small
        color="primary"
        dark
        @click="moveTampilanKalender"
        style="float:right"
      >
        Tampilan Kalender
      </v-btn>

      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right; margin-right:10px"
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
        :items="jadwals"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-icon color="primary" @click="editHandler(item)" style="margin-right: 15px;">
                  mdi-pencil
                </v-icon>

                <v-icon @click="deleteHandler(item.id_jadwal_pengiriman_gas)" color="error">
                  mdi-account-remove
                </v-icon>
              </span>
            </template>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data</h3>
          <v-spacer />
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              :rules="tanggalRules"
              type="date"
              v-model="form.tanggal_pengiriman_gas"
              label="Tanggal Pengiriman Gas"
            />

            <v-text-field
              v-if="formTitle=='Edit'"
              disabled
              v-model="form.total_alokasi_pengiriman_gas"
              label="Total Alokasi"
            />

            <v-text-field
              v-if="formTitle=='Edit'"
              disabled
              v-model="form.alokasi_fakultatif_pengiriman_gas"
              label="Alokasi Fakultatif"
            />

            <v-select
              v-if="form.tanggal_pengiriman_gas==null"
              disabled
              :rules="pangkalanRules"
              v-model="form.pangkalan"
              :items="pangkalan"
              item-text="nama_pangkalan"
              item-value="id_pangkalan"
              label="Pangkalan"
              required
            />

            <v-select
              v-else
              :rules="pangkalanRules"
              v-model="form.pangkalan"
              :items="jadwalPangkalanPerHari(form.tanggal_pengiriman_gas)"
              item-text="nama_pangkalan"
              item-value="id_jadwal_rutin_pangkalan"
              label="Pangkalan"
              required
            />

            <v-select
              :rules="driverRules"
              v-model="form.driver"
              :items="driver"
              item-text="nama_driver"
              item-value="id_driver"
              label="Driver yang Bertugas"
              required
            />
            
            <v-spacer />
            <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="save">Simpan</v-btn>
            <v-spacer />
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline" />
        </v-card-title>

        <v-card-text>Anda Yakin Ingin Menghapus Data Tersebut?</v-card-text>
        
        <v-spacer />
        <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
        <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
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
    name: "JadwalPengirimanGasPage",

    watch: {
      $route: {
        immediate: true,
        handler() {
          document.title = "Jadwal Pengiriman Gas";
        },
      },
    },

    data() {
      return {
        color: "",
        search: null,
        dialog: false,
        overlay: false,
        snackbar: false,
        error_message: "",
        inputType: "Tambah",
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
            text: "Jadwal Pengiriman Gas",
            disabled: true,
            href: '/jadwal-pengiriman-gas-page',
          },
        ],
        headers: [
          {
            text: "Tanggal",
            align: "start",
            sortable: true,
            value: "tanggal_pengambilan_gas",
          },
          { text: "Jenis Alokasi", value: "jenis_alokasi_pengambilan_gas" },
          { text: "Total Alokasi", value: "alokasi_penerimaan_gas" },
          { text: "Pangkalan", value: "nama_pangkalan" },
          { text: "Driver", value: "nama_pegawai" },
          { text: "",  value:"actions"},
        ],
        jadwal: new FormData(),
        jadwals: [],
        pangkalan: [],
        form: {
          id_jadwal_pengiriman_gas: null,
          tanggal_pengiriman_gas: null,
          id_jadwal_rutin_pangkalan: null,
          id_pangkalan: null, 
          nama_pangkalan: null,
          id_driver: null,
          nama_driver: null,
          total_alokasi_pengiriman_gas: null,
          alokasi_fakultatif_pengiriman_gas: null,
        },
        driver: [],
        jadwalPangkalan: [],
        deleteId: "",
        editId: "",
        alokasi: [
          {
            jumlah: 360
          },
          {
            jumlah: 560
          },
        ],
        tanggalRules: [(v) => !!v || "Tanggal Pengiriman is Required"],
        pangkalanRules: [(v) => !!v || "Pangkalan is Required"],
        driverRules: [(v) => !!v || "Driver is Required"],
      };
    },

    methods: {
      moveTampilanKalender() {
        this.$router.push({ path: "/kalender-jadwal-pengiriman-gas-page" });
      },

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
        var url = this.$api + "/jadwalPengirimanGas/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.color = "green";
              this.snackbar = true;
              this.overlay = false;
              this.jadwals = response.data.data;
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
            this.color = "red";
            this.snackbar = true;
            this.overlay = false;
            this.error_message = error.response.data.message;
          });
      },

      readJadwalPangkalan() {
        var url = this.$api + "/jadwalRutinPangkalan/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.jadwalPangkalan = response.data.data;
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

      jadwalPangkalanPerHari(date) {
          var weekdays = new Array(7);
          weekdays[0] = "Minggu";
          weekdays[1] = "Senin";
          weekdays[2] = "Selasa";
          weekdays[3] = "Rabu";
          weekdays[4] = "Kamis";
          weekdays[5] = "Jumat";
          weekdays[6] = "Sabtu";
          var day = weekdays[date.getDay()];
          var pangkalan = [];

          for (let i = 0; i < this.jadwalPangkalan.length; i++) {
            if(day === this.jadwalPangkalan[i].hari_penerimaan_gas)
            {
              pangkalan.id_jadwal_rutin_pangkalan.push(this.jadwalPangkalan[i].id_jadwal_rutin_pangkalan);
              pangkalan.nama_pangkalan.push(this.jadwalPangkalan[i].nama_pangkalan);
            }
          }

          return pangkalan;
      },

      readDriver() {
        var url = this.$api + "/pegawai/getDriver";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.driver = response.data.data;
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

      searchJadwalPangkalan(id) {
        var jadwal = [];
        var url = this.$api + "/jadwalRutinPangkalanSearchById" + id;
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            jadwal = response.data.data;
          });
          return jadwal;
      },

      save() {
        var jadwalPangkalan = this.searchJadwalPangkalan(this.form.id_jadwal_rutin_pangkalan);
        this.jadwal.append("tanggal_pengiriman_gas", this.form.tanggal_pengiriman_gas);
        this.jadwal.append("id_jadwal_rutin_pangkalan", this.form.id_jadwal_rutin_pangkalan);
        this.jadwal.append("id_driver", this.form.id_driver);
        this.jadwal.append("total_alokasi_pengiriman_gas", jadwalPangkalan.alokasi_penerimaan_gas);

        var url = this.$api + "/jadwalPengirimanGas/";
        this.$http
          .post(url, this.jadwal, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.cancel();
            this.updateTemp();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
          });
      },

      //ubah data jadwal
      update() {
        let newData = {
          id_jadwal_rutin_pangkalan: this.form.id_jadwal_rutin_pangkalan,
          id_driver: this.form.id_driver,
          tanggal_pengiriman_gas: this.form.tanggal_pengiriman_gas,
        };

        var url = this.$api + "/jadwalPengirimanGas/update/" + this.editId;
        this.$http.put(url, newData)
          .then((response) => {
            this.cancel();
            this.resetForm();
            this.color = "green";
            this.snackbar = true;
            this.inputType = "Tambah";
            this.error_message = response.data.message;
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.snackbar = true;
            this.color = "red";
            this.load = false;
          });
      },

      //non aktif data jadwal
      deleteData() {
        var url = this.$api + "/jadwalPengirimanGas/delete/" + this.deleteId;
        this.$http.delete(url)
          .then((response) => {
            this.cancel();
            this.resetForm();
            this.color = "green";
            this.snackbar = true;
            this.inputType = "Tambah";
            this.error_message = response.data.message;
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.snackbar = true;
            this.color = "red";
            this.load = false;
          });
      },

      editHandler(item) {
        this.inputType = "Edit";
        this.editId = item.id_jadwal_pengambilan_gas;
        this.form.tanggal_pengiriman_gas = item.tanggal_pengiriman_gas;
        this.form.id_jadwal_rutin_pangkalan = item.id_jadwal_rutin_pangkalan;
        this.form.nama_pangkalan = item.nama_pangkalan;
        this.form.id_driver = item.id_driver;
        this.form.nama_driver = item.nama_driver;
        this.form.total_alokasi_pengiriman_gas = item.total_alokasi_pengiriman_gas;
        this.form.alokasi_fakultatif_pengiriman_gas = item.alokasi_fakultatif_pengiriman_gas;
        this.dialog = true;
      },

      deleteHandler(id) {
        this.deleteId = id;
        this.dialogConfirm = true;
      },

      cancel() {
        this.resetForm();
        // location.reload();
        this.dialog = false;
        this.inputType = "Tambah";
        this.dialogConfirm = false;
      },

      resetForm() {
        this.form = {
          id_jadwal_pengiriman_gas: null,
          tanggal_pengiriman_gas: null,
          id_jadwal_rutin_pangkalan: null,
          id_pangkalan: null,
          nama_pangkalan: null,
          id_driver: null,
          nama_driver: null,
          total_alokasi_pengiriman_gas: null,
          alokasi_fakultatif_pengiriman_gas: null,
        };
      },
    },

    computed: {
      formTitle() {
        return this.inputType;
      },
    },

    mounted() {
      localStorage.setItem("menu", "Jadwal Pengambilan Gas");
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
  /* .v-card__subtitle, .v-card__text, .v-card__title {
  padding: 1%;
  } */
</style>

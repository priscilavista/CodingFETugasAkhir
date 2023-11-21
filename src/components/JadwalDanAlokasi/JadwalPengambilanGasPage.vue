<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    />

    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Jadwal Pengambilan Gas</h3>
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

      <!-- <v-btn
        small
        color="primary"
        dark
        @click="addHandler"
        style="float:right; margin-right:10px"
      >
        Tambah
      </v-btn> -->
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Jadwal Pengambilan Gas</h3>
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
      
      <!-- <v-btn
        small
        color="primary"
        dark
        @click="addHandler"
        style="float:right; margin-right:10px"
      >
        Tambah
      </v-btn> -->
    </div>
    
    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Jadwal Pengambilan Gas</h3>
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
      
      <!-- <v-btn
        small
        color="primary"
        dark
        @click="addHandler"
        style="float:right; margin-right:10px"
      >
        Tambah
      </v-btn> -->
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
                  mdi-magnify
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
          <h3 style="font-size:20px; color:#ffffff">Detail Data Jadwal Pengambilan Gas</h3>
          <v-spacer />
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px;">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              :rules="tanggalRules"
              type="date"
              v-model="form.tanggal_pengambilan_gas"
              disabled
              label="Tanggal Pengambilan Gas"
            />

            <v-text-field
              disabled
              v-model="form.jenis_alokasi_pengambilan_gas"
              label="Jenis Alokasi"
            />

            <v-text-field
              :rules="alokasiRules"
              v-model="form.alokasi_pengambilan_gas"
              label="Jumlah Alokasi"
              disabled
            />

            <span v-if="form.tanggal_pengambilan_gas!=null" style="float:left; margin-top:-20px">Sisa Alokasi: {{ searchAlokasi(form.tanggal_pengambilan_gas) - sumAlokasiWithout(form.tanggal_pengambilan_gas,form.id_jadwal_pengambilan_gas) - form.alokasi_pengambilan_gas }} Tabung</span>
            
            <v-select
              class="mt-5"
              :rules="SPPBERules"
              v-model="form.SPPBEid_sppbe"
              :items="sppbe"
              item-text="nama_sppbe"
              item-value="id_sppbe"
              label="SPPBE"
              required
              disabled
            />

            <v-text-field
              :rules="driverRules"
              v-model="form.nama_pegawai"
              label="Driver yang Bertugas"
              disabled
            />
            
            <!-- <v-spacer />
            <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="save">Simpan</v-btn>
            <v-spacer /> -->
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline" />
        </v-card-title>
        <v-card-text> Anda Yakin Ingin Menghapus Data Tersebut? </v-card-text>
        
        <v-spacer />
        <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
        <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
      </v-card>
    </v-dialog> -->

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
  </v-main>
</template>

<script>
  export default {
    name: "JadwalPengambilanGasPage",
    
    watch: {
      $route: {
        immediate: true,
        handler() {
          document.title = "Jadwal Pengambilan Gas";
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
            text: "Jadwal Pengambilan Gas",
            disabled: true,
            href: '/jadwal-pengambilan-gas-page',
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
          { text: "Jumlah Alokasi", value: "alokasi_pengambilan_gas" },
          { text: "SPPBE", value: "nama_sppbe" },
          { text: "Driver", value: "nama_pegawai" },
          { text: '', value: 'actions', sortable: false },
        ],
        jadwal: new FormData(),
        jadwals: [],
        form: {
          nama_sppbe: null,
          nama_pegawai: null,
          SPPBEid_sppbe: null,
          Pegawaiid_pegawai: null,
          tanggal_pengambilan_gas: null,
          alokasi_pengambilan_gas: null,
          id_jadwal_pengambilan_gas: null,
          jenis_alokasi_pengambilan_gas: null,
        },
        sppbe: [],
        driver: [],
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
        tanggalRules: [(v) => !!v || "Tanggal Pengambilan is Required"],
        alokasiRules: [(v) => !!v || "Jumlah Pengambilan is Required"],
        SPPBERules: [(v) => !!v || "SPPBE is Required"],
        driverRules: [(v) => !!v || "Driver is Required"],
      };
    },

    methods: {
      moveTampilanKalender() {
        this.$router.push({ path: "/kalender-jadwal-pengambilan-gas-page" });
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

      searchAlokasi(date) {
        for (let i = 0; i < this.jadwals.length; i++) {
          if(date === this.jadwals[i].tanggal_alokasi_pengambilan_gas) {
            return parseInt(this.jadwals[i].alokasi_pengambilan_gas);
          }
        }
        return 0;
      },

      sumAlokasiWithout(date,id) {
        let sum = 0;
        for (let i = 0; i < this.jadwals.length; i++) {
            if(date === this.jadwals[i].tanggal_pengambilan_gas && this.jadwals[i].id_jadwal_pengambilan_gas !== id)
            {
              sum = sum + parseInt(this.jadwals[i].alokasi_pengambilan_gas);
            }
        }
        return sum;
      },

      readData() {
        this.overlay = true;
        var url = this.$api + "/jadwalPengambilanGas/getAll";
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

      readSPPBE() {
        var url = this.$api + "/sppbe/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.sppbe = response.data.data;
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

      // save() {
      //   this.jadwal.append("tanggal_pengambilan_gas", this.form.tanggal_pengambilan_gas);
      //   this.jadwal.append("SPPBEid_sppbe", this.SPPBEid_sppbe);
      //   this.jadwal.append("Pegawaiid_pegawai", this.Pegawaiid_pegawai);
      //   this.jadwal.append("alokasi_pengambilan_gas", this.form.alokasi_pengambilan_gas);
      //   this.jadwal.append("alokasi_fakultatif_pengambilan_gas", 0);

      //   var url = this.$api + "/jadwalRutinPangkalan/create";
      //   this.$http.post(url, this.jadwal)
      //     .then((response) => {
      //       this.error_message = response.data.message;
      //       this.color = "green";
      //       this.snackbar = true;
      //       this.load = true;
      //       this.cancel();
      //     })
      //     .catch((error) => {
      //       this.error_message = error.response.data.message;
      //       this.snackbar = true;
      //       this.color = "red";
      //       this.load = false;
      //     });
      // },

      //ubah data jadwal
      // update() {
      //   let newData = {
      //     SPPBEid_sppbe: this.form.SPPBEid_sppbe,
      //     Pegawaiid_pegawai: this.form.Pegawaiid_pegawai,
      //     tanggal_pengambilan_gas: this.form.tanggal_pengambilan_gas,
      //     alokasi_pengambilan_gas: this.form.alokasi_pengambilan_gas,
      //   };

      //   var url = this.$api + "/jadwalPengambilanGas/update/" + this.editId;
      //   this.$http.put(url, newData)
      //     .then((response) => {
      //       this.cancel();
      //       this.resetForm();
      //       this.color = "green";
      //       this.snackbar = true;
      //       this.inputType = "Tambah";
      //       this.error_message = response.data.message;
      //     })
      //     .catch((error) => {
      //       this.error_message = error.response.data.message;
      //       this.snackbar = true;
      //       this.color = "red";
      //       this.load = false;
      //     });
      // },

      // //non aktif data jadwal
      // deleteData() {
      //   var url = this.$api + "/jadwalPengambilanGas/delete/" + this.deleteId;
      //   this.$http.delete(url)
      //     .then((response) => {
      //       this.cancel();
      //       this.resetForm();
      //       this.color = "green";
      //       this.snackbar = true;
      //       this.inputType = "Tambah";
      //       this.error_message = response.data.message;
      //     })
      //     .catch((error) => {
      //       this.error_message = error.response.data.message;
      //       this.snackbar = true;
      //       this.color = "red";
      //       this.load = false;
      //     });
      // },

      // addHandler() {
      //   this.dialog = true;
      //   this.readSPPBE();
      //   this.readDriver();
      // },

      editHandler(item) {
        this.readSPPBE();
        this.readDriver();
        this.inputType = "Edit";
        this.editId = item.id_jadwal_pengambilan_gas;
        this.form.nama_sppbe = item.nama_sppbe;
        this.form.nama_pegawai = item.nama_pegawai;
        this.form.SPPBEid_sppbe = parseInt(item.SPPBEid_sppbe);
        this.form.Pegawaiid_pegawai = item.Pegawaiid_pegawai;
        this.form.tanggal_pengambilan_gas = item.tanggal_pengambilan_gas;
        this.form.alokasi_pengambilan_gas = item.alokasi_pengambilan_gas;
        this.form.id_jadwal_pengambilan_gas = item.id_jadwal_pengambilan_gas;
        this.form.jenis_alokasi_pengambilan_gas = item.jenis_alokasi_pengambilan_gas;
        console.log(this.form)
        this.dialog = true;
      },

      // deleteHandler(id) {
      //   this.deleteId = id;
      //   this.dialogConfirm = true;
      // },

      cancel() {
        this.resetForm();
        // location.reload();
        this.dialog = false;
        this.inputType = "Tambah";
        this.dialogConfirm = false;
      },

      resetForm() {
        this.form = {
          nama_sppbe: null,
          nama_pegawai: null,
          SPPBEid_sppbe: null,
          Pegawaiid_pegawai: null,
          tanggal_pengambilan_gas: null,
          alokasi_pengambilan_gas: null,
          id_jadwal_pengambilan_gas: null,
          jenis_alokasi_pengambilan_gas: null,
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

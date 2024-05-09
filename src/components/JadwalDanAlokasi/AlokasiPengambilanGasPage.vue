<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    />
    
    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Alokasi Pengambilan Gas</h3>
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
        @click="addHandler"
        style="float:right; margin-right:10px"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Alokasi Pengambilan Gas</h3>
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
        @click="addHandler"
        style="float:right; margin-right:10px"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Alokasi Pengambilan Gas</h3>
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
        @click="addHandler"
        style="float:right; margin-right:10px"
      >
        Tambah
      </v-btn>
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
                v-model="form_filter.bulan_alokasi"
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
                v-model="form_filter.tahun_alokasi"
                :items="tahun"
                item-text="nama_tahun"
                item-value="nama_tahun"
                label="Tahun"
              />
            </v-col>
          </v-row>

          <v-select
            v-model="form_filter.sppbe_alokasi"
            :items="sppbe"
            item-text="nama_sppbe"
            item-value="id_sppbe"
            label="SPPBE"
            style="margin-top:-25px"
          />

          <v-btn small color="primary" dark style="float:left;" @click="readData">Filter</v-btn>
          <v-spacer />
          <v-btn small color="primary" dark style="float:left;" class="ml-4" @click="resetData()">Reset</v-btn>
        </v-container>

        <v-container v-else style="padding-left: 5px; padding-right: 5px; padding-bottom:50px">
          <v-select
            v-model="form_filter.bulan_alokasi"
            :items="bulan"
            item-text="nama_bulan"
            item-value="id_bulan"
            label="Bulan"
            style="margin-top:-12.5px"
          />

          <v-select
            v-model="form_filter.tahun_alokasi"
            :items="tahun"
            item-text="nama_tahun"
            item-value="nama_tahun"
            label="Tahun"
            style="width:50%"
          />
          
          <v-select
            v-model="form_filter.sppbe_alokasi"
            :items="sppbe"
            item-text="nama_sppbe"
            item-value="id_sppbe"
            label="SPPBE"
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
        :headers="headers"
        :items="alokasis"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-icon v-if="item.status_alokasi_pengambilan_gas === 'P'" @click="appproveHandler(item)" color="success" style="margin-right: 15px;">
                  mdi-check
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
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data Alokasi Pengambilan Gas</h3>
          <v-spacer />
          <v-icon @click="cancel" link large color="error">mdi-close</v-icon>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              type="date"
              :rules="tanggalRules"
              v-model="form.tanggal_pengambilan_gas"
              label="Tanggal Alokasi Pengambilan Gas"
            />

            <v-select
              required
              :rules="jenisRules"
              label="Jenis Alokasi"
              item-text="nama_jenis"
              :items="jenis_alokasi"
              item-value="nama_jenis"
              v-model="form.jenis_alokasi_pengambilan_gas"
            />

            <v-text-field
              type="number"
              :rules="alokasiRules"
              label="Jumlah Alokasi"
              v-model="form.jumlah_alokasi_pengambilan_gas"
            />

            <v-select
              required
              label="SPPBE"
              :items="sppbe"
              :rules="SPPBERules"
              item-value="id_sppbe"
              item-text="nama_sppbe"
              v-model="form.SPPBEid_sppbe"
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
        <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
          <v-card-title>
            <h3 style="font-size:18px; color:#ffffff">Konfirmasi Alokasi Pengambilan Gas</h3>
            <v-spacer />
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="dialogConfirm = false" style="font-size: 28px" link color="error">mdi-close</v-icon>
              </template>
              <span>Tutup</span>
            </v-tooltip>
          </v-card-title>
        </v-card>

        <v-card-text style="padding-bottom:5px; padding-left:16px">
          <p style="font-size:16px; text-align:left; color:#000000" class="mt-3">
            Anda yakin ingin <strong>menyetujui</strong> permintaan alokasi pengambilan gas ini?
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="#E53935" text @click="updateStatus">Setuju</v-btn>
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
    name: "AlokasiPengambilanGasPage",

    watch: {
      $route: {
        immediate: true,

        handler() {
          document.title = "Alokasi Pengambilan Gas";
        },
      },
    },

    data() {
      return {
        minDate: "",
        minDateMessage: "",
        today: "",
        color: "",
        sppbe: [],
        bulan: [],
        tahun: [],
        itemId: "",
        search: null,
        alokasis: [],
        dialog: false,
        overlay: false,
        snackbar: false,
        error_message: "",
        inputType: "Tambah",
        dialogConfirm: false,
        alokasi: new FormData(),
        isWideScreen: window.innerWidth >= 1000,
        isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
        jenis_alokasi: [ { id: 1, nama_jenis: 'Reguler' }, { id: 2, nama_jenis: 'Fakultatif' }, ],
        form_filter: {
          bulan_alokasi: null,
          tahun_alokasi: null,
          sppbe_alokasi: null,
        },
        items: [
          {
            disabled: false,
            text: "Dashboard",
            href: '/dashboard-page',
          },
          {
            disabled: true,
            text: "Alokasi Pengambilan Gas",
            href: '/alokasi-pengambilan-gas-page',
          },
        ],
        headers: [
          { text: "Tanggal", align: "start", sortable: true, value: "tanggal_pengambilan_gas" },
          { text: "Jenis Alokasi", value: "jenis_alokasi_pengambilan_gas" },
          { text: "Jumlah Alokasi", align: "center", value: "jumlah_alokasi_pengambilan_gas" },
          { text: "SPPBE", value: "nama_sppbe" },
          { text: "", value: 'actions', sortable: false }
        ],
        form: {
          SPPBEid_sppbe: null,
          tanggal_pengambilan_gas: null,
          id_alokasi_pengambilan_gas: null,
          jenis_alokasi_pengambilan_gas: null,
          jumlah_alokasi_pengambilan_gas: null,
        },
        SPPBERules: [(v) => !!v || "SPPBE Tidak Boleh Kosong"],
        jenisRules: [(v) => !!v || "Jenis Alokasi Tidak Boleh Kosong"],
        alokasiRules: [(v) => !!v || "Jumlah Alokasi Tidak Boleh Kosong"],
        tanggalRules: [(v) => !!v || "Tanggal Alokasi Tidak Boleh Kosong"],
      };
    },

    methods: {
      moveTampilanKalender() {
        this.$router.push({ path: "/kalender-alokasi-pengambilan-gas-page" });
      },

      setForm() {
        if (this.inputType === "Tambah") 
        {
          this.save();
        }
      },

      setDate() {
        this.today = new Date;
        let day = this.today.getDate();
        let month = this.today.getMonth();
        let nextMonth = month;
        let year = this.today.getFullYear();
        let nextYear = year;
        if(month!=11)
        {
          month = month + 1;
          nextMonth = nextMonth + 2;
          if(month<10)
          {
            month = "0" + month;
          }

          if(nextMonth<10)
          {
            nextMonth = "0" + nextMonth;
          }
        }
        else
        {
          month = 12;
          nextMonth = "0" + 1;
          nextYear = year + 1;
        }
        
        if(day < 10)
        {
          day = "0" + day;
        }
        
        this.today = year + "-" + month + "-" + day;
        this.minDateMessage = "01/" + nextMonth + "/" + nextYear;
        this.minDate = nextYear + "-" + nextMonth + "-01";
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

      readData() {
        this.overlay = true;
        var body = { 
          'bulan': this.form_filter.bulan_alokasi, 
          'tahun': this.form_filter.tahun_alokasi, 
          'id_sppbe': this.form_filter.sppbe_alokasi 
        };

        var url = this.$api + "/alokasiPengambilanGas/postBySearchData";
        this.$http.post(url, body)
          .then((response) => {
            if(response.data.code == 200)
            {
              this.color = "green";
              this.snackbar = true;
              this.overlay = false;
              this.alokasis = response.data.data;
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
              this.alokasis = [];
              this.color = "red";
              this.snackbar = true;
              this.error_message = 'Data Alokasi Pengambilan Gas Tidak Ditemukan';
            }
          });
      },

      readSPPBE() {
        this.overlay = true;
        var url = this.$api + "/sppbe/getAllActive";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.sppbe = response.data.data;
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

      save() {
        if(this.checkForm() === 0)
        {
          this.overlay = true;
          this.alokasi.append("SPPBEid_sppbe", this.form.SPPBEid_sppbe);
          this.alokasi.append("tanggal_pengambilan_gas", this.form.tanggal_pengambilan_gas);
          this.alokasi.append("jenis_alokasi_pengambilan_gas", this.form.jenis_alokasi_pengambilan_gas);
          this.alokasi.append("jumlah_alokasi_pengambilan_gas", this.form.jumlah_alokasi_pengambilan_gas);
          this.alokasi.append("status_alokasi_pengambilan_gas", 'P');

          var url = this.$api + "/alokasiPengambilanGas/create";
          this.$http.post(url, this.alokasi)
            .then((response) => {
              if(response.data.code === 200)
              {
                this.cancel();
                this.readData();
                this.resetForm();
                this.color = "green";
                this.snackbar = true;
                this.inputType = "Tambah";
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
        else if(this.checkForm() === 1)
        {
          this.color = "red";
          this.snackbar = true;
          this.error_message = 'Data Tidak Lengkap!!';
        }
        else
        {
          this.color = "red";
          this.snackbar = true;
          this.error_message = 'Tanggal Tidak Boleh Sebelum ' + this.minDateMessage;
        }
      },

      updateStatus() {
        this.overlay = true;
        let statusPersetujuan = '';

        if(this.dialogConfirm === true)
        {
          statusPersetujuan = 'A';
        }
        // else if(this.dialogReject === true)
        // {
        //   statusPersetujuan = 'D';
        // }

        if(statusPersetujuan !== '')
        {
          let newData = {
            SPPBEid_sppbe: this.form.SPPBEid_sppbe,
            tanggal_pengambilan_gas: this.form.tanggal_pengambilan_gas,
            jenis_alokasi_pengambilan_gas: this.form.jenis_alokasi_pengambilan_gas,
            jumlah_alokasi_pengambilan_gas: this.form.jumlah_alokasi_pengambilan_gas,
            status_alokasi_pengambilan_gas: statusPersetujuan,
          };

          var url = this.$api + "/alokasiPengambilanGas/updateStatus/" + this.itemId;
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
      },

      checkForm() {
        if(this.form.SPPBEid_sppbe === null || this.form.SPPBEid_sppbe === '')
        {
          return 1;
        }

        if(this.form.tanggal_pengambilan_gas === null || this.form.tanggal_pengambilan_gas === '')
        {
          return 1;
        }

        if(this.form.jenis_alokasi_pengambilan_gas === null || this.form.jenis_alokasi_pengambilan_gas === '')
        {
          return 1;
        }

        if(this.form.jumlah_alokasi_pengambilan_gas === null || this.form.jumlah_alokasi_pengambilan_gas === '')
        {
          return 1;
        }

        if(this.form.tanggal_pengambilan_gas < this.minDate)
        {
          return 2;
        }

        return 0;
      },

      addHandler(){
        this.readSPPBE();
        this.inputType = "Tambah";

        this.dialog = true;
      },

      appproveHandler(item) {
        this.itemId = item.id_alokasi_pengambilan_gas;
        this.form.SPPBEid_sppbe = item.SPPBEid_sppbe;
        this.form.id_alokasi_pengambilan_gas = item.id_alokasi_pengambilan_gas;
        this.form.jenis_alokasi_pengambilan_gas = item.jenis_alokasi_pengambilan_gas;
        this.form.jumlah_alokasi_pengambilan_gas = item.jumlah_alokasi_pengambilan_gas;
        this.form.tanggal_pengambilan_gas = item.tanggal_pengambilan_gas;
        this.dialogConfirm = true;
      },

      cancel() {
        this.sppbe = [];
        this.resetForm();
        this.dialog = false;
        this.inputType = "Tambah";
      },

      resetForm() {
        this.form = {
          SPPBEid_sppbe: null,
          tanggal_pengambilan_gas: null,
          id_alokasi_pengambilan_gas: null,
          jenis_alokasi_pengambilan_gas: null,
          jumlah_alokasi_pengambilan_gas: null,
        };

        this.form_filter = {
          bulan_alokasi: null,
          tahun_alokasi: null,
          sppbe_alokasi: null,
        }
      },
      
      resetData() {
        this.resetForm();
        this.readData();
      },
    },

    computed: {
      formTitle() {
        return this.inputType;
      },
    },

    mounted() {
      localStorage.setItem("menu", "Alokasi Pengambilan Gas");
      this.readData(); 
      this.readDataBulan();
      this.readDataTahun();
      this.readSPPBE();
      this.setDate();
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

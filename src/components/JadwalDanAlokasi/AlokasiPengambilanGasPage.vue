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
        :items="alokasis"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <!-- <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-icon @click="editHandler(item)" color="primary" style="margin-right: 15px;">
                  mdi-pencil
                </v-icon>
              </span>
            </template>
          </v-menu>
        </template> -->
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data Alokasi Pengambilan Gas</h3>
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

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

    <v-overlay :value="overlay">
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
        color: "",
        sppbe: [],
        search: null,
        alokasis: [],
        dialog: false,
        overlay: false,
        snackbar: false,
        error_message: "",
        inputType: "Tambah",
        alokasi: new FormData(),
        isWideScreen: window.innerWidth >= 1000,
        isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
        jenis_alokasi: [ { id: 1, nama_jenis: 'Reguler' }, { id: 2, nama_jenis: 'Fakultatif' }, ],
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
        SPPBERules: [(v) => !!v || "SPPBE is Required"],
        jenisRules: [(v) => !!v || "Jenis Alokasi is Required"],
        alokasiRules: [(v) => !!v || "Jumlah Alokasi is Required"],
        tanggalRules: [(v) => !!v || "Tanggal Alokasi is Required"],
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

      readData() {
        this.overlay = true;

        var url = this.$api + "/alokasiPengambilanGas/getAll";
        this.$http.get(url)
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

      save() {
        if(this.checkForm() === 0)
        {
          this.overlay = true;
          this.alokasi.append("SPPBEid_sppbe", this.form.SPPBEid_sppbe);
          this.alokasi.append("tanggal_pengambilan_gas", this.form.tanggal_pengambilan_gas);
          this.alokasi.append("jenis_alokasi_pengambilan_gas", this.form.jenis_alokasi_pengambilan_gas);
          this.alokasi.append("jumlah_alokasi_pengambilan_gas", this.form.jumlah_alokasi_pengambilan_gas);

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

        return 0;
      },

      addHandler(){
        this.readSPPBE();
        this.inputType = "Tambah";

        this.dialog = true;
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

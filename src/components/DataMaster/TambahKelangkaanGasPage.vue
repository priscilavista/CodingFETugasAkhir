<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    />
    
    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Kelangkaan Gas</h3>
      <v-spacer />
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Kelangkaan Gas</h3>
      <v-spacer />
    </div>

    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Kelangkaan Gas</h3>
      <v-spacer />
    </div>
    
    <v-alert
      v-model="alert"
      dismissible
      color="primary"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-bell"
      style="align:right; padding:5px 15px 5px 15px; text-align: left; margin-top:-5px"
    >
      Stok gas anda masih ada <strong>{{ stock }}</strong> tabung.
    </v-alert>

    <v-card v-if="this.checkStock()==0" height="14%" width="30%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
      <v-card-title>
        <h3 style="font-size:20px; color:#ffffff">Tambah Data Kelangkaan Gas</h3>
        <v-spacer />
      </v-card-title>
    </v-card>

    <v-card v-if="this.checkStock()==0" fill-height width="30%" class="flex-item" elevation="5" style="border-radius: 0px 0px 4px 4px; padding-bottom: 4%">
      <v-card-text>
        <v-container style="padding-left: 5px; padding-right: 5px">
          <v-text-field
            type="date"
            :rules="tanggalRules"
            v-model="form.tanggal_pengisian"
            label="Tanggal Pengisian"
          />

          <v-text-field
            :rules="jumlahRules"
            v-model="form.jumlah_permintaan"
            label="Jumlah Permintaan Gas"
            type="number"
          />

          <v-spacer />
          <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="handleDialog()">Simpan</v-btn>
          <v-spacer />
        </v-container>
      </v-card-text>
    </v-card>

    <v-row v-else align="center" justify="center" class="mt-4">
      <v-col cols="12" style="height: 570px;" align="center" justify="center" class="mt-2">
        <v-img 
          contain
          width="75%"
          height="75%"
          :src="image"
          style="margin-bottom: 50px"
        />

        <v-spacer x-large></v-spacer>

        <v-typography 
          :style="{
            color: 'var(--Primary-One, #083A50)',
            fontSize: '22px',
            fontStyle: 'normal',
            fontWeight: '525',
          }"
        >
          Stok Gas Masih Tersedia, Mohon Ditransaksikan Dahulu Semua!
        </v-typography>
      </v-col>
    </v-row>
    
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <h3 style="font-size:20px; color:#ffffff">Konfirmasi Penambahan Kelangkaan Gas</h3>
          <v-spacer />
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" @click="close" style="font-size: 28px" link color="error">mdi-close</v-icon>
            </template>
            <span>Tutup</span>
          </v-tooltip>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 2.5%; overflow-x: hidden">
        <v-card-text style="padding: 10px 24px 5px 20px">
          <p style="font-size:16px; text-align:left; color:#000000; padding-left:5px;" class="mt-3">Apakah anda yakin dengan data kelangkaan gas di bawah ini?</p>

          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              type="date"
              :rules="tanggalRules"
              v-model="form.tanggal_pengisian"
              label="Tanggal Pengisian"
              readonly
            />

            <v-text-field
              :rules="jumlahRules"
              v-model="form.jumlah_permintaan"
              label="Jumlah Permintaan Gas"
              type="number"
              readonly
            />
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn small color="primary" dark style="float:right;" @click="save">Konfirmasi</v-btn>
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
    name: "TambahKelangkaanGasPage",

    watch: {
      $route: {
        immediate: true,
        handler() {
          document.title = "Tambah Kelangkaan Gas";
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
        stock: 0,
        error_message: "",
        kelangkaanGas: new FormData(),
        image: require("@/assets/in-stock.png"),
        isWideScreen: window.innerWidth >= 1000,
        isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
        items: [
          { 
            text: "Dashboard",
            disabled: false,
            href: '/dashboard-page',
          },
          { 
            text: "Tambah Kelangkaan Gas",
            disabled: true,
            href: '/tambah-kelangkaan-gas-page',
          },
        ],
        form: {
          id_kelangkaan_gas: null,
          tanggal_pengisian: null,
          jumlah_permintaan: null,
        },
        jumlahRules: [(v) => !!v || "Jumlah Permintaan Tidak Boleh Kosong"],
        tanggalRules: [(v) => !!v || "Tanggal Pengisian Tidak Boleh Kosong"],
      };
    },

    methods: {
      save() {
        this.overlay = true;
        this.kelangkaanGas.append("Pangkalanid_pangkalan", localStorage.getItem('id'));
        this.kelangkaanGas.append("tanggal_pengisian_data", this.form.tanggal_pengisian);
        this.kelangkaanGas.append("jumlah_permintaan", this.form.jumlah_permintaan);

        var url = this.$api + "/kelangkaanGas/create";
        this.$http.post(url, this.kelangkaanGas)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.close();
              this.resetForm();
              this.overlay = false;
              this.color = "green";
              this.error_message = response.data.message;
              this.snackbar = true;
              location.reload();
            }
            else
            {
              this.color = "red";
              this.overlay = false;
              this.snackbar = true;
              this.error_message = response.data.message;
            }
          })
          .catch((error) => {
            this.color = "red";
            this.overlay = false;
            this.snackbar = true;
            this.error_message = error.response.data.message;
          });
      },

      checkStock()
      {
        if(this.stock > 0)
          return 1;
        else
          return 0;
      },

      getStock()
      {
        this.overlay = true;
        var url = this.$api + "/stokBulananPangkalan/getLastStockByPangkalan/" + localStorage.getItem('id');
        this.$http.get(url)
        .then((response) => {
            if(response.data.code === 200)
            {
                this.stock = response.data.data.stok_akhir_bulan_pangkalan;
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

      close() {
        this.dialog = false;
        this.resetForm();
      },

      checkForm() {
        if(this.form.jumlah_permintaan === null)
        {
          return 1;
        }
        else
        {
          if(this.form.tanggal_pengisian === null)
          {
            return 1;
          }
          else
          {
            return 0;
          }
        }
      },

      handleDialog() {
        if(this.checkForm() === 0)
        {
          this.dialog = true;
        }
        else
        {
          this.color = "red";
          this.snackbar = true;
          this.error_message = 'Data Tidak Lengkap!!';
        }
      },

      resetForm() {
        this.form = {
          id_kelangkaan_gas: null,
          tanggal_pengisian: null,
          jumlah_permintaan: null,
        };
      },
    },

    mounted() {
      localStorage.setItem("menu", "Tambah Kelangkaan Gas");
      this.getStock();
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

  .v-application p {
    margin-bottom: 0;
  }
</style>

<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    />

    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Gas Bocor</h3>
      <v-spacer />
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Gas Bocor</h3>
      <v-spacer />
    </div>

    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Gas Bocor</h3>
      <v-spacer />
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
        id="customStyleTable"
        class="elevation-1"
        :items-per-page="5"
        height="350px"
        :headers="headers"
        :items="gasbocors"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-show="item.status_tabung==='R'" v-bind="attrs" v-on="on" color="primary" @click="deleteHandler(item)" style="margin-right: 15px; font-size: 20px">
                      mdi-check
                    </v-icon>
                  </template>
                  <span>Konfirmasi Gas Sudah Diambil</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-show="item.status_tabung==='R'" v-bind="attrs" v-on="on" color="primary" @click="rejectHandler(item)" style="margin-right: 15px; font-size: 20px">
                      mdi-close
                    </v-icon>
                  </template>
                  <span>Konfirmasi Gas Tidak Bocor</span>
                </v-tooltip>
              </span>
            </template>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialogConfirm" persistent max-width="600px">
      <v-card>
        <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
          <v-card-title>
            <h3 style="font-size:20px; color:#ffffff">Konfirmasi Pengambilan Gas Bocor</h3>
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
          <p style="font-size:16px; text-align:left; color:#000000">Apakah gas bocor sudah diambil dari pangkalan?</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="#1E88E5" text @click="deleteData">Konfirmasi</v-btn>
          <v-btn color="#E53935" text @click="dialogConfirm = false">Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogReject" persistent max-width="600px">
      <v-card>
        <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
          <v-card-title>
            <h3 style="font-size:20px; color:#ffffff">Konfirmasi Pengambilan Gas Bocor</h3>
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
          <p style="font-size:16px; text-align:left; color:#000000">Apakah gas tidak bocor?</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="#1E88E5" text @click="deleteData">Konfirmasi</v-btn>
          <v-btn color="#E53935" text @click="dialogConfirm = false">Batal</v-btn>
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
    name: "GasBocorPage",

    watch: {
      $route: {
        immediate: true,
        
        handler() {
          document.title = "Gas Bocor";
        },
      },
    },

    data() {
      return {
        color: "",
        deleteId: "",
        status: "",
        search: null,
        gasbocors: [],
        overlay: false,
        snackbar: false,
        error_message: "",
        dialogConfirm: false,
        dialogReject: false,
        isWideScreen: window.innerWidth >= 1000,
        isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
        items: [
          { 
            text: "Dashboard",
            disabled: false,
            href: '/dashboard-page',
          },
          { 
            text: "Gas Bocor",
            disabled: true,
            href: '/gas-bocor-page',
          },
        ],
        headers: [
          {
            text: "Tanggal Pengisian",
            align: "start",
            sortable: true,
            value: "tanggal_pengisian_data",
          },
          { text: "Pangkalan", value: "nama_pangkalan" },
          { text: "Nomor Tabung", value: "nomor_tabung" },
          { text: "Status Tabung", value: "status_note" },
          { text: "", value: "actions", sortable: false },
        ],
      };
    },

    methods: {
      readData() {
        this.overlay = true;
        var status = "";

        var url = this.$api + "/gasBocor/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              let res = response.data.data;
              let temp = [];

              res.forEach(element => {
                if(element.status_tabung === 'R' || element.status_tabung === 'C')
                {
                  if(element.status_tabung === 'R')
                  {
                    status = "Segera Diambil";
                  }
                  else
                  {
                    status = "Segera Ditukarkan";
                  }
                  temp = [...temp, element];
                  temp[temp.length - 1].status_note = status;
                }
              });

              this.gasbocors = temp;
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
            this.color = "red";
            this.snackbar = true;
            this.overlay = false;
            this.error_message = error.response.data.message;
          });
      },

      //non aktif data gasbocor
      deleteData() {
        this.overlay = true;
        let newData = {
          status_tabung: this.status,
        }
        var url = this.$api + "/gasBocor/updateStatus/" + this.deleteId;
        this.$http.put(url, newData)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.cancel();
              this.readData();
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

      deleteHandler(item) {
        this.deleteId = item.id_gas_bocor;
        this.status = 'C';
        this.dialogConfirm = true;
      },

      rejectHandler(item) {
        this.deleteId = item.id_gas_bocor;
        this.status = 'D';
        this.dialogReject = true;
      },

      cancel() {
        this.dialogConfirm = false;
        this.dialogReject = false;
        this.status = "";
      },
    },

    mounted() {
      this.readData();
      localStorage.setItem("menu", "Gas Bocor");
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

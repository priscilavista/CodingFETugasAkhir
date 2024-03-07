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

    <v-card width="350px" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
      <v-card-title>
        <h3 style="font-size:20px; color:#ffffff">Tambah Data Gas Bocor</h3>
      </v-card-title>
    </v-card>

    <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 3%; width:350px">
      <v-card-text>
        <v-container style="padding-left: 5px; padding-right: 5px">
          <v-text-field
            type="date"
            :rules="tanggalRules"
            v-model="form.tanggal_pengisian"
            label="Tanggal Pengisian"
          />

          <v-text-field
            :rules="nomorTabungRules"
            v-model="form.nomor_tabung"
            label="Nomor Tabung"
          />

          <v-spacer />
          <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="handleDialog()">Simpan</v-btn>
          <v-spacer />
        </v-container>
      </v-card-text>
    </v-card>

    <v-container style="padding: 25px 0px 12px 0px; margin-left:0px">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-card width="350px" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
            <v-card-title>
              <h3 style="font-size:20px; color:#ffffff">Sedang Berlangsung</h3>
            </v-card-title>
          </v-card>
          <v-card fill-height class="flex-item mx-auto" elevation="5">
            <v-card-title class="text-right" style="display: inherit;">
              <!-- <h3 style="float:left; margin-left:15px;padding-top:15px">Sedang Berlangsung</h3><br/> -->
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
              :items="onGoingGasBocor"
              :search="search"
              style="padding: 10px 20px 20px 20px"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-menu offset-y style="float: left">
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on" style="cursor: pointer">
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-show="item.status_tabung == 'C'" v-bind="attrs" v-on="on" @click="updateHandler(item)" color="primary" style="margin-right: 15px;">
                            mdi-check
                          </v-icon>
                        </template>
                        <span>Sudah Diterima</span>
                      </v-tooltip>
                    </span>
                  </template>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-card width="350px" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
            <v-card-title>
              <h3 style="font-size:20px; color:#ffffff">Selesai</h3>
            </v-card-title>
          </v-card>
          <v-card fill-height class="flex-item mx-auto" elevation="5">
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
              :items="finishedGasBocor"
              :search="search"
              style="padding: 10px 20px 20px 20px"
            >
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <h3 style="font-size:20px; color:#ffffff">Konfirmasi Penambahan Gas Bocor</h3>
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
          <p style="font-size:16px; text-align:left; color:#000000; padding-left:5px;" class="mt-3">Apakah anda yakin dengan data gas bocor di bawah ini?</p>

          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              type="date"
              :rules="tanggalRules"
              v-model="form.tanggal_pengisian"
              label="Tanggal Pengisian"
              readonly
            />

            <v-text-field
              :rules="nomorTabungRules"
              v-model="form.nomor_tabung"
              label="Nomor Tabung"
              readonly
            />
          </v-container>
        </v-card-text>

        <v-card-actions style="float:right; padding-right:26px">
          <v-spacer />
          <v-btn small color="primary" dark style="float:right;" @click="save">Konfirmasi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="600px">
      <v-card>
        <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
          <v-card-title>
            <h3 style="font-size:20px; color:#ffffff">Konfirmasi Penukaran Gas Bocor</h3>
            <v-spacer />
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="close" style="font-size: 28px" link color="error">mdi-close</v-icon>
              </template>
              <span>Tutup</span>
            </v-tooltip>
          </v-card-title>
        </v-card>

        <v-card-text style="padding-bottom:5px; padding-left:16px">
          <p style="font-size:16px; text-align:left; color:#000000">Apakah gas bocor sudah ditukarkan?</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="#1E88E5" text @click="updateData">Konfirmasi</v-btn>
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
    name: "TambahGasBocorPage",

    watch: {
      $route: {
        immediate: true,
        
        handler() {
          document.title = "Tambah Gas Bocor";
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
        updateId: "",
        tempStatus: "",
        dialogConfirm: false,
        error_message: "",
        onGoingGasBocor: [],
        finishedGasBocor: [],
        gasBocor: new FormData(),
        isWideScreen: window.innerWidth >= 1000,
        id_pangkalan: localStorage.getItem('id'),
        isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
        items: [
          { 
            text: "Dashboard",
            disabled: false,
            href: '/dashboard-page',
          },
          { 
            text: "Tambah Gas Bocor",
            disabled: true,
            href: '/tambah-gas-bocor-page',
          },
        ],
        headers: [
          {
            text: "Tanggal",
            align: "start",
            sortable: true,
            value: "tanggal_pengisian_data",
          },
          { text: "Nomor Tabung", value: "nomor_tabung" },
          { text: "Status", value: "status_note" },
          { text: "", value: "actions", sortable: false },
        ],
        form: {
          id_gas_bocor: null,
          nomor_tabung: null,
          tanggal_pengisian: null,
        },
        tanggalRules: [(v) => !!v || "Tanggal Tidak Boleh Kosong"],
        nomorTabungRules: [(v) => !!v || "Nomor Tabung Tidak Boleh Kosong"],
      };
    },

    methods: {
      readGasBocor()
      {
        this.overlay = true;
        this.onGoingGasBocor = [];
        this.finishedGasBocor = [];
        var status = "";
        var url = this.$api + "/gasBocor/getAllByPangkalan/" + localStorage.getItem('id');
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              let temp = response.data.data;
              temp.forEach(element => {
                  if(element.status_tabung == 'S' || element.status_tabung == 'D')
                  {
                      if(element.status_tabung == 'S')
                      {
                        status = "Sudah Ditukar";
                      }
                      else
                      {
                        status = "Tidak Bocor";
                      }
                      this.finishedGasBocor = [...this.finishedGasBocor, element];
                      this.finishedGasBocor[this.finishedGasBocor.length - 1].status_note = status;
                  }
                  else
                  {
                      if(element.status_tabung == 'R')
                      {
                        status = "Menunggu Driver";
                      }
                      else
                      {
                        status = "Dibawa Driver";
                      }
                      this.onGoingGasBocor = [...this.onGoingGasBocor, element];
                      this.onGoingGasBocor[this.onGoingGasBocor.length - 1].status_note = status;
                  }
              });
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
        this.overlay = true;
        this.gasBocor.append("status_tabung", 'R');
        this.gasBocor.append("nomor_tabung", this.form.nomor_tabung);
        this.gasBocor.append("Pangkalanid_pangkalan", this.id_pangkalan);
        this.gasBocor.append("tanggal_pengisian_data", this.form.tanggal_pengisian);

        var url = this.$api + "/gasBocor/create";
        this.$http.post(url, this.gasBocor)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.close();
              this.resetForm();
              this.readGasBocor();
              this.overlay = false;
              this.color = "green";
              this.snackbar = true;
              this.overlay = false;
              this.error_message = response.data.message;
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

      updateData() {
        this.overlay = true;
        let newData = {
          status_tabung: this.tempStatus,
        }
        var url = this.$api + "/gasBocor/updateStatus/" + this.updateId;
        this.$http.put(url, newData)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.close();
              this.readGasBocor();
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
            this.overlay = false;
            this.snackbar = true;
            this.error_message = error.response.data.message;
          });
      },

      updateHandler(item) {
        this.updateId = item.id_gas_bocor;
        this.tempStatus = 'S';
        this.dialogConfirm = true;
      },

      close() {
        this.dialog = false;
        this.dialogConfirm = false;
        this.resetForm();
      },

      checkForm() {
        if(this.form.nomor_tabung === null)
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
          id_gas_bocor: null,
          nomor_tabung: null,
          tanggal_pengisian: null,
        };
      },
    },

    mounted() {
      localStorage.setItem("menu", "Tambah Gas Bocor");
      this.readGasBocor();
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

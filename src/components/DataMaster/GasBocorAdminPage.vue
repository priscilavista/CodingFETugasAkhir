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

    <div style="padding: 0px 0px 12px 0px; margin-left:0px">
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
    </div>

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
            text: "Gas Bocor",
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
        ],
      };
    },

    methods: {
      readGasBocor()
      {
        this.overlay = true;
        this.onGoingGasBocor = [];
        this.finishedGasBocor = [];
        var status = "";
        var url = this.$api + "/gasBocor/getAll";
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
    },

    mounted() {
      localStorage.setItem("menu", "Gas Bocor");
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

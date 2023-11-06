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
    
    <v-card height="14%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
      <v-card-title>
        <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data Gas Bocor</h3>
        <v-spacer />
      </v-card-title>
    </v-card>

    <v-card fill-height class="flex-item mx-auto" elevation="5" style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
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

          <v-card-action>
            <v-spacer />
            <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="save">Simpan</v-btn>
            <v-spacer />
          </v-card-action>
        </v-container>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

    <v-overlay :value="overlay">
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
        id_pangkalan: localStorage.getItem('id'),
        snackbar: false,
        overlay: false,
        error_message: "",
        color: "",
        search: null,
        isWideScreen: window.innerWidth >= 1000,
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
        gasbocor: new FormData(),
        form: {
          id_gas_bocor: null,
          tanggal_pengisian: null,
          nomor_tabung: null,
        },
        tanggalRules: [(v) => !!v || "Tanggal is Required"],
        nomorTabungRules: [(v) => !!v || "Nomor Tabung is Required"],
      };
    },
    methods: {
      save() {
        this.gasbocor.append("nomor_tabung", this.form.nomor_tabung);
        this.gasbocor.append("tanggal_pengisian_data", this.form.tanggal_pengisian);
        this.gasbocor.append("Pangkalanid_pangkalan", this.id_pangkalan);
        this.gasbocor.append("status_tabung", 'R');

        var url = this.$api + "/gasBocor/create";
        this.load = true;
        this.$http.post(url, this.gasbocor)
          .then((response) => {
            if(response.data.code === 200)
            {
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

      resetForm() {
        this.form = {
          id_gas_bocor: null,
          tanggal_pengisian: null,
          nomor_tabung: null,
        };
      },
    },

    mounted() {
      localStorage.setItem("menu", "Tambah Gas Bocor");
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

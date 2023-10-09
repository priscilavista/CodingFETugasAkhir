<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    ></v-breadcrumbs>
    <!-- <h5 class="flex-item" style="font-size: 30px; margin-top: 40px">Data kendaraan</h5> -->
    <div v-if="isWideScreen" style="margin-bottom: 7.5%">
      <h3 style="float:left">Gas Bocor</h3>
      <v-spacer></v-spacer>
      <!-- <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right"
        >Tambah Gas Bocor</v-btn
      > -->
    </div>
    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Gas Bocor</h3>
      <v-spacer></v-spacer>
      <!-- <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right"
        >Tambah Gas Bocor</v-btn
      > -->
    </div>
    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Gas Bocor</h3>
      <v-spacer></v-spacer>
      <!-- <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right"
        >Tambah Gas Bocor</v-btn
      > -->
    </div>
    <!-- <v-card style="padding: 10px 20px 20px 20px; width: 50%">
      <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Cari"
            single-line
            hide-details
            style="width: 100%"
            >
            </v-text-field>
    </v-card> -->
    <v-card height="14%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <!-- <v-spacer></v-spacer> -->
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data Gas Bocor</h3>
          <v-spacer></v-spacer>
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
            ></v-text-field>
            <v-text-field
                :rules="nomorTabungRules"
                v-model="form.nomor_tabung"
                label="Nomor Tabung"
            ></v-text-field>
            <v-card-action>
                <v-spacer></v-spacer>
                <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="saveProfil">Simpan</v-btn>
                <v-spacer></v-spacer>
            </v-card-action>
            </v-container>
        </v-card-text>
    </v-card>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
      >{{ error_message }}
    </v-snackbar>
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
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      temp: 0,
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
      roleRules: [(v) => !!v || "Role is Required"],
      namaRules: [(v) => !!v || "Nama is Required"],
      ttlRules: [(v) => !!v || "Tanggal Lahir is Required"],
      emailRules: [
        (v) => !!v || "Email is Required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      telpRules: [
        (v) => !!v || "Nomor Telepon is Required",
        (v) => /^([0][8][0-9]{8,10})$/g.test(v) || "Phone Number must be valid",
      ],
    };
  },
  methods: {
    setForm() {
      if (this.inputType !== "Tambah") {
        this.update();
      } else {
        this.save();
      }
    },
    save() {
      this.kendaraan.append("nama_kendaraan", this.form.nama_kendaraan);
      this.kendaraan.append("role_kendaraan", this.form.nama_role);
      this.kendaraan.append(
        "tanggal_lahir_kendaraan",
        this.form.tanggal_lahir_kendaraan
      );
      this.kendaraan.append("email_kendaraan", this.form.email_kendaraan);
      this.kendaraan.append("no_telp_kendaraan", this.form.no_telp_kendaraan);

      var url = this.$api + "/kendaraan/";
      this.load = true;
      this.$http
        .post(url, this.kendaraan, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.close();
          this.updateTemp();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
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
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    localStorage.setItem("menu", "Tambah Gas Bocor");
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
    this.readDataRemove();
    this.updateTemp();
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

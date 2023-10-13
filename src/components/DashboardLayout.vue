<template>
  <v-app>
    <v-navigation-drawer v-if="isWideScreen" v-model="drawer" app :permanent="drawer" :mini-variant.sync="miniVariant" :clipped="clipped" style="height:100%">
      <div class="">
        <v-sheet color="#ffffff" class="">
          <div class="text-center mt-4">
            <v-avatar class="mb-4" color="grey darken-1" size="94">
              <v-img aspect-ratio="30" :src="img" />
            </v-avatar>

            <!-- <h3>tes</h3> -->
            <!-- <h3>{{ pegawaiLogin }}</h3> -->
          </div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list dense class="fullheight" color="#ffffff">
          <v-list-item
              v-for="item in routeSA"
              :key="item.title"
              link
              tag="router-link"
              :to="item.to"
              style="margin-top: 10px"
              color="#196b4d"
              @click="color='#ffffff'"
            >
              <!-- <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon> -->
              <v-list-item-content style="text-align: left;color:#000000;margin-left:10px;">
                <v-list-item-title style="">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          <!-- <span v-if="jabatan == 1">
            <v-list-item
              v-for="item in routeM"
              :key="item.title"
              link
              tag="router-link"
              :to="item.to"
              color="#1B3963"
              style="margin-top: 10px"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content style="text-align: left">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </span>
          <span v-if="jabatan == 2">
            <v-list-item
              v-for="item in routeA"
              :key="item.title"
              link
              tag="router-link"
              :to="item.to"
              color="#1B3963"
              style="margin-top: 10px"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content style="text-align: left">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </span>
          <span v-if="jabatan == 3">
            <v-list-item
              v-for="item in routeCS"
              :key="item.title"
              link
              tag="router-link"
              :to="item.to"
              color="#1B3963"
              style="margin-top: 10px"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content style="text-align: left">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </span> -->
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-navigation-drawer v-else v-model="drawer" app>
      <div class="">
        <v-sheet color="#ffffff" class="pa-4">
          <div class="text-center mt-4">
            <v-avatar class="mb-4" color="grey darken-1" size="94">
              <v-img aspect-ratio="30" :src="img" />
            </v-avatar>

            <h3>tes</h3>
            <!-- <h3>{{ pegawaiLogin }}</h3> -->
          </div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list dense class="fullheight" style="margin-top: -10px">
          <v-list-item
              v-for="item in routeSA"
              :key="item.title"
              link
              tag="router-link"
              :to="item.to"
              color="#1B3963"
              style="margin-top: 10px"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content style="text-align: left">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          <!-- <span v-if="jabatan == 1">
            <v-list-item
              v-for="item in routeM"
              :key="item.title"
              link
              tag="router-link"
              :to="item.to"
              color="#1B3963"
              style="margin-top: 10px"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content style="text-align: left">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </span>
          <span v-if="jabatan == 2">
            <v-list-item
              v-for="item in routeA"
              :key="item.title"
              link
              tag="router-link"
              :to="item.to"
              color="#1B3963"
              style="margin-top: 10px"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content style="text-align: left">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </span>
          <span v-if="jabatan == 3">
            <v-list-item
              v-for="item in routeCS"
              :key="item.title"
              link
              tag="router-link"
              :to="item.to"
              color="#1B3963"
              style="margin-top: 10px"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content style="text-align: left">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </span> -->
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-app-bar app elevate-on-scroll elevation="4" color="#196b4d" height="50%">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        color="#ffffff"
        nav
      ></v-app-bar-nav-icon>
      
      <!-- <h3
        style="
          color: #ffffff;
          font-family: arial;
          font-size: 24px;
          margin-top: 2px;
          margin-left: 10px;
        "
      >
        {{ menuTitle }}
      </h3> -->
      <v-spacer />

      <v-spacer />
      <v-tooltip bottom color="#757575">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
              style="cursor: pointer"
              class=""
            >
              <v-icon size="20" @click="dialogProfil = true" link color="ffffff" class="mr-2">mdi-account-circle</v-icon>
            </span>
          </template> 
          <span>Profil</span>
      </v-tooltip>
      <v-tooltip bottom color="#757575">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
              style="cursor: pointer"
              class=""
            >
              <v-icon size="20" @click="dialogPassword = true" link color="ffffff" class="mr-2">mdi-lock-reset</v-icon>
            </span>
          </template> 
          <span>Ubah Password</span>
      </v-tooltip>
      <v-tooltip bottom color="#757575">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
              style="cursor: pointer"
              class=""
            >
              <v-icon size="20" @click="dialogLogout = true" link color="ffffff">mdi-logout</v-icon>
            </span>
          </template> 
          <span>Keluar</span>
      </v-tooltip>
      <!-- <v-menu offset-y> -->
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              style="cursor: pointer"
              class=""
            >
              <v-icon @click="dialogProfil = true" link color="ffffff" class="mr-2">mdi-account-circle</v-icon>
            </v-btn>
          </template> 
          <span>Profil</span>
        </v-tooltip> -->
        <!-- <v-tooltip>
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
              style="cursor: pointer"
              class=""
            >
              <v-icon @click="dialogProfil = true" link color="ffffff">mdi-logout</v-icon>
            </span>
          </template> 
          <span>Keluar</span>
        </v-tooltip> -->
        <!-- <v-list dense width="150">
            <v-list-item-group
                v-model="selectedItem"
                color="primary"
            >
                <v-list-item
                v-for="(item, i) in items"
                :key="i"
                >
                <v-list-item-content>
                    <v-list-item-title style="text-align: left" v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list> -->
        <!-- <v-list
          width="100%"
          class="py-0"
          style="margin-top: 20%; background-color: #eeeeee"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title style="color: #000000; margin-top: 5px">
                <v-btn text @click="dialogProfil = true"
                  >Change Password</v-btn
                ></v-list-item-title
              >

              <v-list-item-title
                style="color: #000000; margin-top: 5px; margin-bottom: 5px"
              >
                <v-btn text @click="dialogLogout = true"
                  >Logout</v-btn
                ></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list> -->
      <!-- </v-menu> -->
    </v-app-bar>
    <!-- <v-breadcrumbs
      :items="items"
      divider="/"
    ></v-breadcrumbs> -->
    <!-- <div style="padding: 50px 0px 0px 256px;">
      <v-alert
        v-model="alert"
        dismissible
        color="primary"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-bell"
        style="width: 45%;align:right;padding:5px 15px 5px 15px;margin: 16px 0 0 16px"
      >
        Anda mendapatkan <strong>{{ fakultatif }}</strong> permintaan alokasi fakultatif.
      </v-alert>
    </div> -->
    <div class="fullheight pa-5" style="height:100%">
      <router-view></router-view>
    </div>

    <v-dialog v-model="dialogProfil" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <!-- <v-spacer></v-spacer> -->
          <h3 style="font-size:20px; color:#ffffff">Profil</h3>
          <v-spacer></v-spacer>
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>
      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <!-- <v-card-title>
          <v-spacer></v-spacer>
          <h3 style="font-size:20px; margin-top:2%">Profil</h3>
        </v-card-title> -->
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              v-model="form.role"
              label="Jabatan"
              :rules="roleRules"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="form.nama"
              label="Nama"
              :rules="namaRules"
              disabled
            ></v-text-field>
            <v-text-field
              v-model="form.email"
              label="Email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.nomor_telepon"
              label="Nomor Telepon"
              :rules="nomor_teleponRules"
              required
            ></v-text-field>
            <v-card-action>
              <v-spacer></v-spacer>
              <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="saveProfil">Simpan</v-btn>
              <v-spacer></v-spacer>
            </v-card-action>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogPassword" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <!-- <v-spacer></v-spacer> -->
          <h3 style="font-size:20px; color:#ffffff">Ubah Password</h3>
          <v-spacer></v-spacer>
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>
      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <!-- <v-card-title>
          <v-spacer></v-spacer>
          <h3 style="font-size:20px; margin-top:2%">Profil</h3>
        </v-card-title> -->
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              v-model="form.oldPassword"
              label="Password Lama"
              :rules="passwordRules"
              counter
              required
            ></v-text-field>
            <v-text-field
              v-model="form.newPassword"
              label="Password Baru"
              :rules="passwordRules"
              counter
              required
            ></v-text-field>
            <v-card-action>
              <v-spacer></v-spacer>
              <v-btn small color="primary" dark style="float:right; margin-top: 4%" @click="savePassword">Simpan</v-btn>
              <v-spacer></v-spacer>
            </v-card-action>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogLogout" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Keluar!</span>
        </v-card-title>

        <v-card-text>Apakah Anda Yakin Untuk Keluar?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="setLogout()">Keluar</v-btn>
          <v-btn color="blue darken-1" text @click="dialogLogout = false">Tidak</v-btn> 
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    
    <v-snackbar v-model="snackbar" :color="color" timeout="750" bottom>{{ error_message }}</v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "DashboardPage",
  watch: {
    $route: {
      immediate: true,
      handler() {
        document.title = "Dashboard";
      },
    },
  },
  data() {
    return {
      menuTitle: localStorage.getItem("menu"),
      jabatan: localStorage.getItem("jabatan"),
      pegawaiLogin: localStorage.getItem("namaPegawai"),
      emailLogin: localStorage.getItem("email"),
      passwordLogin: localStorage.getItem("password"),
      dialogLogout: false,
      dialogProfil: false,
      dialogPassword: false,
      error_message: "",
      color: "",
      colorMenu: "#ffffff",
      snackbar: false,
      drawer: true,
      rail: true,
      miniVariant: false,
      overlay: false,
      clipped: false,
      img: require("@/assets/isatria.png"),
      selectedItem: 0,
      isWideScreen: window.innerWidth >= 650,
      // items: [
      //   { 
      //     text: $route.meta.breadcrumb.title,
      //     disabled: false,
      //     href: $route.meta.breadcrumb.url,
      //   },
      // ],
      routeSA: [
          { title: "Dashboard", icon: "mdi-home", to: "/dashboard-page" },
          { title: "Pegawai", icon: "mdi-home", to: "/pegawai-page" },
          { title: "Pangkalan", icon: "mdi-home", to: "/pangkalan-page" },
          { title: "SPPBE", icon: "mdi-home", to: "/sppbe-page" },
          { title: "Kendaraan", icon: "mdi-home", to: "/kendaraan-page" },
          { title: "Transaksi Pangkalan", icon: "mdi-home", to: "/transaksi-pangkalan-page" },
          { title: "Transaksi Admin", icon: "mdi-home", to: "/transaksi-page" },
          { title: "Alokasi Pengambilan Gas", icon: "mdi-home", to: "/alokasi-pengambilan-gas-page" },
          { title: "Jadwal Pengambilan Gas", icon: "mdi-home", to: "/jadwal-pengambilan-gas-page" },
          { title: "Jadwal Pengambilan Gas Driver", icon: "mdi-home", to: "/kalender-jadwal-pengambilan-gas-driver-page" },
          { title: "Jadwal Penerimaan Gas", icon: "mdi-home", to: "/kalender-jadwal-penerimaan-gas-page" },
          { title: "Jadwal Pengiriman Gas", icon: "mdi-home", to: "/jadwal-pengiriman-gas-page" },
          { title: "Jadwal Pengiriman Gas Driver", icon: "mdi-home", to: "/kalender-jadwal-pengiriman-gas-driver-page" },
          { title: "Jadwal Rutin Pangkalan", icon: "mdi-home", to: "/jadwal-rutin-pangkalan-page" },
          { title: "Alokasi Fakultatif Manager", icon: "mdi-home", to: "/alokasi-fakultatif-page" },
          { title: "Alokasi Fakultatif Pangkalan", icon: "mdi-home", to: "/konfirmasi-alokasi-fakultatif-page" },
          { title: "Laporan Kelangkaan Gas", icon: "mdi-home", to: "/laporan-kelangkaan-gas-page" },
          { title: "Kelangkaan Gas Pangkalan", icon: "mdi-home", to: "/tambah-kelangkaan-gas-page" },
          { title: "Gas Bocor Pangkalan", icon: "mdi-home", to: "/tambah-gas-bocor-page" },
          { title: "Gas Bocor Driver", icon: "mdi-home", to: "/gas-bocor-page" },
          { title: "Surat Kuasa", icon: "mdi-home", to: "/surat-kuasa-pengambilan-gas-page" },
          { title: "Laporan Transaksi", icon: "mdi-home", to: "/laporan-transaksi-pangkalan-page" },
          { title: "Laporan Bulanan", icon: "mdi-home", to: "/laporan-bulanan-page" },

      ],
      routeA: [
        { title: "Dashboard", icon: "mdi-home", to: "/dashboard" },
        { title: "Mobil", icon: "mdi-car", to: "/mobil" },
        { title: "Mitra", icon: "mdi-handshake", to: "/mitra" },
        { title: "Pegawai", icon: "mdi-account-tie", to: "/pegawai" },
        { title: "Driver", icon: "mdi-card-account-details", to: "/driver" },
      ],
      routeM: [
        { title: "Dashboard", icon: "mdi-home", to: "/dashboard" },
        {
          title: "Brosur",
          icon: "mdi-file-document-multiple-outline",
          to: "/brosur",
        },
        { title: "Promo", icon: "mdi-sale", to: "/promo" },
        {
          title: "Jadwal Pegawai",
          icon: "mdi-calendar-clock",
          to: "/jadwalPegawai",
        },
      ],
      routeD: [
        { title: "Dashboard", icon: "mdi-home", to: "/dashboard" },
        { title: "Customer", icon: "mdi-account-group", to: "/customer" },
        { title: "Transaksi", icon: "mdi-cash-multiple", to: "/transaksi" },
      ],
      routeP: [

      ],
      menus: [
        { title: "Change Password", icon: "mdi-key" },
        { title: "Logout", icon: "mdi-logout" },
      ],
      emailRules: [
        (v) => !!v || "Email is Required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      namaRules: [(v) => !!v || "Nama is Required"],
      passwordRules: [(v) => !!v || "Password is Required"],
      form: {
        role: null,
        nama: null,
        nomor_telepon: null,
        email: null,
        oldPassword: null,
        newPassword: null,
      },
    };
  },
  methods: {
    setLogout() {
      this.overlay = true;
      this.color = "green";
      this.snackbar = true;
      this.error_message = "Terima Kasih Atas Kunjungan Anda";
      setTimeout(() => this.logout(), 750);
    },

    logout() {
      this.overlay = false;
      this.dialogLogout = false;
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      this.$router.push({ path: "/login" });
    },

    cancel() {
      this.resetForm();
      this.dialogProfil = false;
      this.dialogPassword = false;
    },

    close() {
      this.dialogProfil = false;
      this.dialogPassword = false;
      this.dialogLogout = false;
    },

    savePassword() {
      if (this.form.email != localStorage.getItem("email")) {
        this.error_message = "Email Doesn't Match";
        this.color = "red";
        this.snackbar = true;
      } else if (this.form.oldPassword != localStorage.getItem("password")) {
        this.error_message = "Old Password Doesn't Match";
        this.color = "red";
        this.snackbar = true;
      } else {
        let newData = {
          password_pegawai: this.form.newPassword,
        };
        var url = this.$api + "/pegawaiEditPass/" + localStorage.getItem("id");
        this.load = true;
        this.$http
          .put(url, newData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = false;
            this.close();
            localStorage.removeItem("password");
            localStorage.setItem("password", this.form.newPassword);
            this.resetForm();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },

    resetForm() {
      this.form = {
        role: null,
        nama: null,
        nomor_telepon: null,
        email: null,
        oldPassword: null,
        newPassword: null,
      };
    },
  },
  mounted() {
    // localStorage.setItem("menu", "Pegawai");
    // if (localStorage.getItem("reloaded")) {
    //   // The page was just reloaded. Clear the value from local storage
    //   // so that it will reload the next time this page is visited.
    //   localStorage.removeItem("reloaded");
    // } else {
    //   // Set a flag so that we know not to reload the page twice.
    //   localStorage.setItem("reloaded", "1");
    //   location.reload();
    // }
  },
};
</script>

<style scoped>
 .v-alert__icon.v-icon {
        font-size: 17.5px;
    }
    .v-alert__content {
        font-size: 13.5px;
    }
    .v-btn--icon.v-size--small .v-icon{
        font-size: 17.5px;
    }
.fullheight {
  min-height: 74.5vh !important;
}

.theme--light.v-icon {
    color: #ffffff;
}

.v-btn {
  letter-spacing: .020em;
}
.v-btn.v-size--small {
  font-size: .70rem;
  font-family: "Helvetica", Arial, sans-serif;
}
/* .v-icon:hover {
  background-color: #BDBDBD;
} */
</style>

<template>
  <v-app>
    <v-navigation-drawer 
      app
      v-model="drawer"
      :clipped="clipped"
      v-if="isWideScreen" 
      :permanent="drawer"
      style="height:100%"
      :mini-variant.sync="miniVariant"
    >
      <div class="">
        <v-sheet color="#ffffff" class="">
          <div class="text-center mt-4">
            <v-avatar class="mb-4" color="grey darken-1" size="94">
              <v-img aspect-ratio="30" :src="img" />
            </v-avatar>
          </div>
        </v-sheet>

        <v-divider />

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
            <v-list-item-content style="text-align: left;color:#000000;margin-left:10px;">
              <v-list-item-title style="">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar app elevate-on-scroll elevation="4" color="#196b4d" height="50%">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        color="#ffffff"
        nav
      />

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
            <v-icon size="20" @click="getDataUser" link color="ffffff" class="mr-2">mdi-account-circle</v-icon>
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
    </v-app-bar>

    <div class="fullheight pa-5" style="height:100%">
      <router-view />
    </div>

    <!-- Dialog for Change User Profile -->
    <v-dialog v-model="dialogProfil" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <h3 style="font-size:20px; color:#ffffff">Profil</h3>
          <v-spacer />
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <div v-if="jabatan === 'pegawai'">
              <v-text-field
                v-model="form.role"
                label="Jabatan"
                :rules="roleRules"
                disabled
              />

              <v-text-field
                v-model="form.nama"
                label="Nama"
                :rules="namaRules"
                disabled
              />

              <v-text-field
                v-model="form.email"
                label="Email"
                :rules="emailRules"
                required
              />

              <v-text-field
                v-model="form.nomor_telepon"
                label="Nomor Telepon"
                :rules="nomor_teleponRules"
                required
              />
            </div>

            <div v-if="jabatan === 'pangkalan'">

            </div>

            <v-card-action>
              <v-spacer />
              <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="saveChangeProfile">Simpan</v-btn>
              <v-spacer />
            </v-card-action>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog for Change Password -->
    <v-dialog v-model="dialogPassword" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <h3 style="font-size:20px; color:#ffffff">Ubah Password</h3>
          <v-spacer />
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              v-model="form.oldPassword"
              label="Password Lama"
              :rules="passwordRules"
              :type="showOldPassword ? 'text' : 'password'"
              :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showOldPassword = !showOldPassword"
              counter
              required
            />

            <v-text-field
              v-model="form.newPassword"
              label="Password Baru"
              :rules="passwordRules"
              :type="showNewPassword ? 'text' : 'password'"
              :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showNewPassword = !showNewPassword"
              counter
              required
            />

            <v-card-action>
              <v-spacer></v-spacer>
              <v-btn small color="primary" dark style="float:right; margin-top: 4%" @click="savePassword">Simpan</v-btn>
              <v-spacer></v-spacer>
            </v-card-action>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog for Logout -->
    <v-dialog v-model="dialogLogout" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Keluar!</span>
        </v-card-title>

        <v-card-text>Apakah Anda Yakin Untuk Keluar?</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="setLogout()">Keluar</v-btn>
          <v-btn color="blue darken-1" text @click="dialogLogout = false">Tidak</v-btn> 
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64" />
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
        jabatan: localStorage.getItem("role"),
        dialogLogout: false,
        dialogProfil: false,
        dialogPassword: false,
        error_message: "",
        color: "",
        snackbar: false,
        drawer: true,
        miniVariant: false,
        overlay: false,
        clipped: false,
        showOldPassword: false,
        showNewPassword: false,
        img: require("@/assets/isatria.png"),
        isWideScreen: window.innerWidth >= 650,
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
          tanggal_lahir: null,
          email: null,
          oldPassword: null,
          newPassword: null,
        },
      };
    },

    methods: {
      getDataUser() {
        var url = this.$api;

        if(this.jabatan === 'pegawai')
        {
          url = url + "/pegawai/getById";
          this.$http.get(url + "/" + localStorage.getItem("id"))
            .then((response) => {
              if(response.data.code == 200)
              {
                var res = response.data.data;
                this.form.role = res.role_pegawai;
                this.form.nama = res.nama_pegawai;
                this.form.email = res.email_pegawai;
                this.form.nomor_telepon = res.nomor_telepon_pegawai;
                this.form.tanggal_lahir = res.tanggal_lahir_pegawai;
                this.dialogProfil = true;
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
              this.overlay = false;
              this.error_message = error.response.data.message;
            });
        }
        else if(this.jabatan === 'pangkalan')
        {
          url = url + "/pangkalan/getById";
          this.$http.get(url + "/" + localStorage.getItem("id"))
            .then((response) => {
              if(response.data.code == 200)
              {
                this.dialogProfil = true;
                var res = response.data.data;
                this.form.role = res.role_pegawai;
                this.form.nama = res.nama_pegawai;
                this.form.email = res.email_pegawai;
                this.form.nomor_telepon = res.nomor_telepon_pegawai;
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
              this.overlay = false;
              this.error_message = error.response.data.message;
            });
        }
      },

      saveChangeProfile() {
        this.overlay = true;
        this.dialogProfil = false;
        var url = this.$api;
        var body;

        if(this.jabatan === 'pegawai')
        {
          url = url + "/pegawai/update/" + localStorage.getItem("id");
          body = {
            role_pegawai: this.form.role,
            nama_pegawai: this.form.nama,
            nomor_telepon_pegawai: this.form.nomor_telepon,
            tanggal_lahir_pegawai: this.form.tanggal_lahir,
            email_pegawai: this.form.email,
          };
        }
        else if(this.jabatan === 'pangkalan')
        {
          url = url + "/pangkalan/update/" + localStorage.getItem("id");
          body = {
            oldPassword: this.form.oldPassword, 
            newPassword: this.form.newPassword
          };
        }

        this.$http.put(url, body)
          .then((response) => {
            if(response.data.code === 200)
            {
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

      savePassword() {
        this.dialogPassword = false;
        this.overlay = true;
        var url = this.$api;
        var body = {oldPassword: this.form.oldPassword, newPassword: this.form.newPassword};

        if(this.jabatan === 'pegawai')
        {
          url = url + "/pegawai/updatePassword/" + localStorage.getItem("id");
        }
        else if(this.jabatan === 'pangkalan')
        {
          url = url + "/pangkalan/updatePassword/" + localStorage.getItem("id");
        }

        this.$http.put(url, body)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.color = "green";
              this.snackbar = true;
              this.error_message = response.data.message;
              setTimeout(() => this.logout(), 750);
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

      setLogout() {
        this.overlay = true;
        this.color = "green";
        this.snackbar = true;
        this.dialogLogout = false;
        this.error_message = "Terima Kasih Atas Kunjungan Anda";
        setTimeout(() => this.logout(), 750);
      },

      logout() {
        this.overlay = false;
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        this.$router.push({ path: "/login" });
      },

      cancel() {
        this.resetForm();
        this.dialogProfil = false;
        this.dialogPassword = false;
        this.dialogLogout = false;
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

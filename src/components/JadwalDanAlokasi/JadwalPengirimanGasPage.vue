<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    ></v-breadcrumbs>
    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Jadwal Pengiriman Gas</h3>
      <v-spacer></v-spacer>
      <v-btn
        small
        color="primary"
        dark
        @click="moveTampilanKalender"
        style="float:right"
        >Tampilan Kalender</v-btn
      >
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right; margin-right:10px"
        >Tambah</v-btn
      >
    </div>
    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Jadwal Pengiriman Gas</h3>
      <v-spacer></v-spacer>
      <v-btn
        small
        color="primary"
        dark
        @click="moveTampilanKalender"
        style="float:right"
        >Tampilan Kalender</v-btn
      >
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right; margin-right:10px"
        >Tambah</v-btn
      >
    </div>
    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Jadwal Pengiriman Gas</h3>
      <v-spacer></v-spacer>
      <v-btn
        small
        color="primary"
        dark
        @click="moveTampilanKalender"
        style="float:right"
        >Tampilan Kalender</v-btn
      >
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right; margin-right:10px"
        >Tambah</v-btn
      >
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
        >
        </v-text-field>
        <v-text-field
          v-else
          v-model="search"
          append-icon="mdi-magnify"
          label="Cari"
          single-line
          hide-details
          style="margin-left: 50%; width: 50%;"
        >
        </v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="jadwals"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-chip link color="#E7C913">
                  <v-icon>mdi-circle-edit-outline</v-icon>
                </v-chip>
              </span>
            </template>
            <v-list width="90" class="py-0" style="margin-top: 20px">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title style="color: #000000; margin-top: 10px"
                    ><v-btn small @click="editHandler(item)"
                      ><v-icon color="#E39348">mdi-pencil</v-icon></v-btn
                    ></v-list-item-title
                  >
                  <v-list-item-title style="color: #000000; margin-top: 10px"
                    ><v-btn small @click="deleteHandler(item.id_jadwal_pengiriman_gas)"
                      ><v-icon color="#C94141"
                        >mdi-account-remove</v-icon
                      ></v-btn
                    ></v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <!-- <v-spacer></v-spacer> -->
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data</h3>
          <v-spacer></v-spacer>
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>
      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              :rules="tanggalRules"
              type="date"
              v-model="form.tanggal_pengiriman_gas"
              label="Tanggal Pengiriman Gas"
            ></v-text-field>
            <v-text-field
              v-if="formTitle=='Edit'"
              disabled
              v-model="form.total_alokasi_pengiriman_gas"
              label="Total Alokasi"
            ></v-text-field>
            <v-text-field
              v-if="formTitle=='Edit'"
              disabled
              v-model="form.alokasi_fakultatif_pengiriman_gas"
              label="Alokasi Fakultatif"
            ></v-text-field>
            <v-select
              v-if="form.tanggal_pengiriman_gas==null"
              disabled
              :rules="pangkalanRules"
              v-model="form.pangkalan"
              :items="pangkalan"
              item-text="nama_pangkalan"
              item-value="id_pangkalan"
              label="Pangkalan"
              required
            ></v-select>
            <v-select
              v-else
              :rules="pangkalanRules"
              v-model="form.pangkalan"
              :items="jadwalPangkalanPerHari(form.tanggal_pengiriman_gas)"
              item-text="nama_pangkalan"
              item-value="id_jadwal_rutin_pangkalan"
              label="Pangkalan"
              required
            ></v-select>
            <v-select
              :rules="driverRules"
              v-model="form.driver"
              :items="driver"
              item-text="nama_driver"
              item-value="id_driver"
              label="Driver yang Bertugas"
              required
            ></v-select>
            <v-card-action>
              <v-spacer></v-spacer>
              <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="save">Simpan</v-btn>
              <v-spacer></v-spacer>
            </v-card-action>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline"></span>
        </v-card-title>
        <v-card-text> Anda Yakin Ingin Menghapus Data Tersebut? </v-card-text>
        <v-card-action>
          <v-spacer></v-spacer>
          <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
          <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false"
            >Batal</v-btn
          >
        </v-card-action>
        <v-card-text></v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom
      >{{ error_message }}
    </v-snackbar>
  </v-main>
</template>

<script>
export default {
  name: "JadwalPengirimanGasPage",
  watch: {
    $route: {
      immediate: true,
      handler() {
        document.title = "Jadwal Pengiriman Gas";
      },
    },
  },
  data() {
    return {
      todayDate : new Date().toISOString().slice(0, 10),
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      color: "",
      search: null,
      dialog: false,
      dialogConfirm: false,
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
          text: "Jadwal Pengiriman Gas",
          disabled: true,
          href: '/jadwal-pengiriman-gas-page',
        },
      ],
      headers: [
        {
          text: "Tanggal",
          align: "start",
          sortable: true,
          value: "tanggal_pengiriman_gas",
        },
        { text: "Total Alokasi", value: "total_alokasi_pengiriman_gas" },
        { text: "Alokasi Fakultatif", value: "alokasi_fakultatif_pengiriman_gas" },
        { text: "Pangkalan", value: "nama_pangkalan" },
        { text: "Driver", value: "nama_driver" },
        { text: "",  value:"actions"},
      ],
      menus: [{ title: "Check" }, { title: "Edit" }, { title: "Delete" }],
      jadwal: new FormData(),
      jadwals: [],
      form: {
        id_jadwal_pengiriman_gas: null,
        tanggal_pengiriman_gas: null,
        id_jadwal_rutin_pangkalan: null,
        id_pangkalan: null,
        nama_pangkalan: null,
        id_driver: null,
        nama_driver: null,
        total_alokasi_pengiriman_gas: null,
        alokasi_fakultatif_pengiriman_gas: null,
      },
      form_driver: {
        id_driver: null,
        nama_driver: null,
      },
      driver: [],
      form_jadwal_pangkalan: {
          id_jadwal_rutin_pangkalan: null,
          id_pangkalan: null,
          nama_pangkalan: null,
          hari_penerimaan_gas: null,
          alokasi_penerimaan_gas: null,
      },
      jadwalPangkalan: [],
      deleteId: "",
      editId: "",
      alokasi: [
          {
              jumlah: 360
          },
          {
              jumlah: 560
          },
      ],
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
    moveTampilanKalender() {
      this.$router.push({ path: "/kalender-jadwal-pengiriman-gas-page" });
    },
    setForm() {
      if (this.inputType !== "Tambah") {
        this.update();
      } else {
        this.save();
      }
    },
    readData() {
      var url = this.$api + "/jadwalPengirimanGasRead";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.jadwals = response.data.data;
        });

        for (let i = 0; i < this.jadwals.length; i++) {
          this.jadwals[i].alokasi_fakultatif_pengiriman_gas.push(this.jadwals[i].total_alokasi_pengiriman_gas - this.jadwals[i].alokasi_penerimaan_gas);
        }
    },
    readDataRemove() {
      var url = this.$api + "/jadwalPengirimanGasRemove";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.jadwalsR = response.data.data;
        });

        for (let i = 0; i < this.jadwals.length; i++) {
          this.jadwals[i].alokasi_fakultatif_pengiriman_gas.push(this.jadwals[i].total_alokasi_pengiriman_gas - this.jadwals[i].alokasi_penerimaan_gas);
        }
    },
    readJadwalPangkalan() {
      var url = this.$api + "/jadwalRutinPangkalanRead";
      this.$http.get(url).then((response) => {
        let temp = response.data.data;
        this.form_jadwal_pangkalan.id_jadwal_rutin_pangkalan = temp.map((v) => v.id_jadwal_rutin_pangkalan);
        this.form_jadwal_pangkalan.hari_penerimaan_gas = temp.map((v) => v.hari_penerimaan_gas);
        this.form_jadwal_pangkalan.alokasi_penerimaan_gas = temp.map((v) => v.alokasi_penerimaan_gas);
        this.form_jadwal_pangkalan.id_pangkalan = temp.map((v) => v.id_pangkalan);
        this.form_jadwal_pangkalan.nama_pangkalan = temp.map((v) => v.nama_pangkalan);
        for (let i = 0; i < this.form_jadwal_pangkalan.length; i++) {
          this.jadwalPangkalan.push(this.form_jadwal_pangkalan[i]);
        }
      });
    },
    jadwalPangkalanPerHari(date) {
        var weekdays = new Array(7);
        weekdays[0] = "Minggu";
        weekdays[1] = "Senin";
        weekdays[2] = "Selasa";
        weekdays[3] = "Rabu";
        weekdays[4] = "Kamis";
        weekdays[5] = "Jumat";
        weekdays[6] = "Sabtu";
        var day = weekdays[date.getDay()];
        var pangkalan = [];

        for (let i = 0; i < this.jadwalPangkalan.length; i++) {
            if(day === this.jadwalPangkalan[i].hari_penerimaan_gas)
            {
                pangkalan.id_jadwal_rutin_pangkalan.push(this.jadwalPangkalan[i].id_jadwal_rutin_pangkalan);
                pangkalan.nama_pangkalan.push(this.jadwalPangkalan[i].nama_pangkalan);
            }
        }

        return pangkalan;
    },
    readDriver() {
      var url = this.$api + "/driverRead";
      this.$http.get(url).then((response) => {
        let temp = response.data.data;
        this.form_driver.id_driver = temp.map((v) => v.id_driver);
        this.form_driver.nama_driver = temp.map((v) => v.nama_driver);
        for (let i = 0; i < this.form_driver.length; i++) {
          this.driver.push(this.form_driver[i]);
        }
      });
    },
    searchJadwalPangkalan(id) {
      var jadwal = [];
      var url = this.$api + "/jadwalRutinPangkalanSearchById" + id;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          jadwal = response.data.data;
        });
        return jadwal;
    },
    save() {
      var jadwalPangkalan = this.searchJadwalPangkalan(this.form.id_jadwal_rutin_pangkalan);
      this.jadwal.append("tanggal_pengiriman_gas", this.form.tanggal_pengiriman_gas);
      this.jadwal.append("id_jadwal_rutin_pangkalan", this.form.id_jadwal_rutin_pangkalan);
      this.jadwal.append("id_driver", this.form.id_driver);
      this.jadwal.append("total_alokasi_pengiriman_gas", jadwalPangkalan.alokasi_penerimaan_gas);

      var url = this.$api + "/jadwalPengirimanGas/";
      this.load = true;
      this.$http
        .post(url, this.jadwal, {
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
    updateTemp() {
      var url = this.$api + "/jadwalPengirimanGasTemp";
      this.load = true;
      this.$http
        .put(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.load = true;
          this.readDataRemove();
          this.resetForm();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    //ubah data jadwal
    update() {
      let newData = {
        id_jadwal_rutin_pangkalan: this.form.id_jadwal_rutin_pangkalan,
        id_driver: this.form.id_driver,
        tanggal_pengiriman_gas: this.form.tanggal_pengiriman_gas,
      };

      var url = this.$api + "/jadwalPengirimanGas/" + this.editId;
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
          this.readDataRemove();
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },

    //non aktif data jadwal
    deleteData() {
      var url = this.$api + "/jadwalPengirimanGasDelete/" + this.deleteId;
      this.load = true;
      this.$http
        .put(url, {
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
          this.readDataRemove();
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    editHandler(item) {
      this.inputType = "Edit";
      this.editId = item.id_jadwal_pengambilan_gas;
      this.form.tanggal_pengiriman_gas = item.tanggal_pengiriman_gas;
      this.form.id_jadwal_rutin_pangkalan = item.id_jadwal_rutin_pangkalan,
      this.form.nama_pangkalan = item.nama_pangkalan,
      this.form.id_driver = item.id_driver,
      this.form.nama_driver = item.nama_driver,
      this.form.total_alokasi_pengiriman_gas = item.total_alokasi_pengiriman_gas,
      this.form.alokasi_fakultatif_pengiriman_gas = item.alokasi_fakultatif_pengiriman_gas,
      this.dialog = true;
    },
    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    close() {
      this.dialog = false;
      this.inputType = "Tambah";
      this.dialogConfirm = false;
      this.readDataRemove();
    },
    cancel() {
      this.resetForm();
      this.dialog = false;
      this.dialogConfirm = false;
      this.inputType = "Tambah";
    },
    resetForm() {
      this.form = {
        id_jadwal_pengiriman_gas: null,
        tanggal_pengiriman_gas: null,
        id_jadwal_rutin_pangkalan: null,
        id_pangkalan: null,
        nama_pangkalan: null,
        id_driver: null,
        nama_driver: null,
        total_alokasi_pengiriman_gas: null,
        alokasi_fakultatif_pengiriman_gas: null,
      };
    },
  },
  computed: {
    formTitle() {
      return this.inputType;
    },
  },
  mounted() {
    localStorage.setItem("menu", "Jadwal Pengambilan Gas");
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
    // this.readDataRemove();
    // this.updateTemp();
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

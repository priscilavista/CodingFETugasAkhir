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
        @click="dialog = true"
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
        @click="dialog = true"
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
        @click="dialog = true"
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
                  <v-list-item-title style="color: #000000; margin-top: 10px">
                    <v-btn small @click="editHandler(item)">
                      <v-icon color="#E39348">mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-title>
                  
                  <v-list-item-title style="color: #000000; margin-top: 10px">
                    <v-btn small @click="deleteHandler(item.id_alokasi_pengambilan_gas)">
                      <v-icon color="#C94141">mdi-account-remove</v-icon>
                    </v-btn>
                  </v-list-item-title>
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
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data Alokasi Pengambilan Gas</h3>
          <v-spacer />
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              :rules="tanggalRules"
              type="date"
              v-model="form.tanggal_alokasi_pengambilan_gas"
              label="Tanggal Alokasi Pengambilan Gas"
            />

            <v-text-field
              :rules="alokasiRules"
              v-model="form.jumlah_alokasi_pengambilan_gas"
              label="Jumlah Alokasi"
              type="number"
            />

            <v-select
              :rules="SPPBERules"
              v-model="form.sppbe"
              :items="sppbe"
              item-text="nama_SPPBE"
              item-value="id_SPPBE"
              label="SPPBE"
              required
            />
            
            <v-spacer />
            <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="save">Simpan</v-btn>
            <v-spacer />
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
        
          <v-spacer />
          <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
          <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
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
            text: "Alokasi Pengambilan Gas",
            disabled: true,
            href: '/alokasi-pengambilan-gas-page',
          },
        ],
        headers: [
          {
            text: "Tanggal",
            align: "start",
            sortable: true,
            value: "tanggal_alokasi_pengambilan_gas",
          },
          { text: "Jumlah Alokasi", value: "jumlah_alokasi_pengambilan_gas" },
          { text: "SPPBE", value: "nama_sppbe" },
        ],
        menus: [{ title: "Check" }, { title: "Edit" }, { title: "Delete" }],
        alokasi: new FormData(),
        jadwalPengambilanGas: new FormData(),
        jadwalPengirimanGas: new FormData(),
        alokasis: [],
        form: {
          id_alokasi_pengambilan_gas: null,
          tanggal_alokasi_pengambilan_gas: null,
          id_sppbe: null,
          nama_sppbe: null,
          jumlah_alokasi_pengambilan_gas: null,
        },
        form_sppbe: {
          id_sppbe: null,
          nama_sppbe: null,
        },
        sppbe: [],
        form_driver: {
          id_driver: null,
          nama_driver: null,
        },
        driver: [],
        deleteId: "",
        editId: "",
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
        this.$router.push({ path: "/kalender-alokasi-pengambilan-gas-page" });
      },

      setForm() {
        if (this.inputType !== "Tambah") {
          this.update();
        } else {
          this.save();
        }
      },

      readData() {
        var url = this.$api + "/alokasiRead";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.alokasis = response.data.data;
          });
      },

      readDataRemove() {
        var url = this.$api + "/alokasiRemove";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.alokasisR = response.data.data;
          });
      },

      readSPPBE() {
        var url = this.$api + "/sppbeRead";
        this.$http.get(url).then((response) => {
          // this.role = response.data.data;
          let temp = response.data.data;
          this.form_sppbe.id_sppbe = temp.map((v) => v.id_sppbe);
          this.form_sppbe.nama_sppbe = temp.map((v) => v.nama_sppbe);
          for (let i = 0; i < this.form_sppbe.nama_sppbe.length; i++) {
            this.sppbe.id_sppbe.push(this.form_sppbe.id_sppbe[i]);
            this.sppbe.nama_sppbe.push(this.form_sppbe.nama_sppbe[i]);
          }
        });
      },

      readDriver() {
        var url = this.$api + "/driverRead";
        this.$http.get(url).then((response) => {
          // this.role = response.data.data;
          let temp = response.data.data;
          this.form_driver.id_driver = temp.map((v) => v.id_driver);
          this.form_driver.nama_driver = temp.map((v) => v.nama_driver);
          for (let i = 0; i < this.form_driver.id_driver.length; i++) {
            this.driver.push({
              id_driver: this.form_driver.id_driver[i],
              count: 0,
            })
          }
        });
      },

      save() {
        this.alokasi.append("tanggal_alokasi_pengambilan_gas", this.form.tanggal_alokasi_pengambilan_gas);
        this.alokasi.append("id_sppbe", this.form.id_sppbe);
        this.alokasi.append("jumlah_alokasi_pengambilan_gas", this.form.jumlah_alokasi_pengambilan_gas);

        var url = this.$api + "/alokasi/";
        this.load = true;
        this.$http
          .post(url, this.alokasi, {
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

      tambahOtomatisJadwalPengambilanGas(){
          let total=0;
          let i=1;
          let tempDriver = null;
          let min = Math.min(this.driver.count);
          while(tempDriver==null)
          {
            let temp = this.rnd(0, this.driver.length - 1);
            if(this.driver[temp].count==min)
            {
              tempDriver = this.driver[temp].id_driver;
            }
          }
          while(total<this.form.jumlah_alokasi_pengambilan_gas)
          {
              if(this.isOdd(i)==1)
              {
                this.saveJadwalPengambilanGas(tempDriver,360);
                total=total+360;
              }
              else
              {
                this.saveJadwalPengambilanGas(tempDriver,560);
                total=total+560;
              }
              i++;
          }
      },

      saveJadwalPengambilanGas(driver,alokasi){
        // let tempDriver = null;
        // let min = Math.min(this.driver.count);
        this.jadwalPengambilanGas.append("tanggal_pengambilan_gas", this.form.tanggal_alokasi_pengambilan_gas);
        this.jadwalPengambilanGas.append("id_sppbe", this.form.id_sppbe);

        // while(tempDriver==null)
        // {
        //   let temp = this.rnd(0, this.driver.length - 1);
        //   if(this.driver[temp].count==min)
        //   {
        //     tempDriver = this.driver[temp].id_driver;
        //   }
        // }
        this.jadwalPengambilanGas.append("id_driver",driver);
        this.jadwalPengambilanGas.append("jumlah_alokasi_pengambilan_gas", alokasi);
        this.jadwalPengambilanGas.append("alokasi_fakultatif_pengambilan_gas", 0);

        var url = this.$api + "/jadwalPengambilanGas/";
        this.load = true;
        this.$http
          .post(url, this.jadwalPengambilanGas, {
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

      isOdd(number){
        if(number%2==1)
        {
          return 1;
        }
        return 0;
      },

      //ubah data alokasi
      update() {
        let newData = {
          id_sppbe: this.form.id_sppbe,
          tanggal_alokasi_pengambilan_gas: this.form.tanggal_alokasi_pengambilan_gas,
          jumlah_alokasi_pengambilan_gas: this.form.jumlah_alokasi_pengambilan_gas,
        };

        var url = this.$api + "/alokasi/" + this.editId;
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

      //non aktif data alokasi
      deleteData() {
        var url = this.$api + "/alokasiDelete/" + this.deleteId;
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
        this.editId = item.id_alokasi_pengambilan_gas;
        this.form.tanggal_alokasi_pengambilan_gas = item.tanggal_alokasi_pengambilan_gas;
        this.form.id_sppbe = item.id_sppbe,
        this.form.nama_sppbe = item.nama_sppbe,
        this.form.jumlah_alokasi_pengambilan_gas = item.jumlah_alokasi_pengambilan_gas,
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
          id_alokasi_pengambilan_gas: null,
          tanggal_alokasi_pengambilan_gas: null,
          id_sppbe: null,
          nama_sppbe: null,
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

<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    />
    
    <div v-if="isWideScreen" style="margin-bottom: 7.5%">
      <h3 style="float:left">Jadwal Rutin Pangkalan</h3>
      <v-btn
        small
        color="primary"
        dark
        @click="addHandler"
        style="float:right; margin-right:10px"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Jadwal Rutin Pangkalan</h3>
      <v-btn
        small
        color="primary"
        dark
        @click="addHandler"
        style="float:right; margin-right:10px"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Jadwal Rutin Pangkalan</h3>
      <v-btn
        small
        color="primary"
        dark
        @click="addHandler"
        style="float:right; margin-right:10px"
      >
        Tambah
      </v-btn>
    </div>

    <template>
      <v-row>
        <v-col
          v-for="item in hari"
          :key="item.day"
          cols="12"
          sm="6"
          md="6"
          lg="4"
        >
          <v-card>
            <v-card-title style="display: inline-grid" class="subheading font-weight-bold">
              {{ item.day }}
            </v-card-title>
            
            <v-simple-table
              fixed-header
              height="300px"
            >
              <template v-slot:default>
                <!-- <thead>
                  <tr>
                    <th style="font-size:15px" class="text-center">
                      Grup
                    </th>
                    <th style="font-size:15px" class="text-center">
                      Pangkalan
                    </th>
                    <th style="font-size:15px" class="text-center">
                      Alokasi
                    </th>
                    <th style="font-size:15px" class="text-center" />
                  </tr>
                </thead> -->

                <tbody>
                  <tr
                    v-for="grup in grupPangkalan"
                    :key="grup.nomor"
                  >
                    <td>Grup {{ grup.nomor }}</td>
                    <!-- <td>{{ jadwal.nama_pangkalan }}</td>
                    <td>{{ jadwal.alokasi_penerimaan_gas }}</td> -->
                    <td>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" small @click="detailHandler(item.day,grup.nomor)" color="primary" style="margin-right: 5px; font-size: 20px">mdi-arrow-expand</v-icon>
                        </template>
                        <span>Detail Data</span>
                      </v-tooltip>
                      <!-- <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" small @click="editHandler(jadwal)" color="primary" style="margin-right: 5px;">mdi-pencil</v-icon>
                        </template>
                        <span>Edit Data</span>
                      </v-tooltip> -->
                      <!-- <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" small @click="deleteHandler(jadwal.id_jadwal_rutin_pangkalan)" color="error" style="margin-left:5px">mdi-delete</v-icon>
                        </template>
                        <span>Hapus Data</span>
                      </v-tooltip> -->
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data</h3>
          <v-spacer />
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" @click="closeDialog" style="font-size: 28px" link color="error">mdi-close</v-icon>
            </template>
            <span>Tutup</span>
          </v-tooltip>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-select
              v-if="this.inputType=='Tambah'"
              :rules="hariRules"
              v-model="form.hari_penerimaan_gas"
              :items="hari"
              item-text="day"
              item-value="day"
              label="Hari Penerimaan Gas"
              required
            />

            <v-select
              v-else
              readonly
              :rules="hariRules"
              v-model="form.hari_penerimaan_gas"
              :items="hari"
              item-text="day"
              item-value="day"
              label="Hari Penerimaan Gas"
              required
            />

            <v-select
              v-if="this.inputType=='Tambah'"
              :rules="grupRules"
              v-model="form.grup_pangkalan"
              :items="grupPangkalan"
              item-text="nomor"
              item-value="nomor"
              label="Grup Pangkalan"
              required
            />

            <v-select
              v-else
              readonly
              :rules="grupRules"
              v-model="form.grup_pangkalan"
              :items="grupPangkalan"
              item-text="nomor"
              item-value="nomor"
              label="Grup Pangkalan"
              required
            />

            <v-select
              :rules="pangkalanRules"
              v-model="form.Pangkalanid_pangkalan"
              :items="pangkalan"
              item-text="nama_pangkalan"
              item-value="id_pangkalan"
              label="Pangkalan"
              required
            />

            <v-text-field
              :rules="alokasiRules"
              v-model="form.alokasi_penerimaan_gas"
              label="Jumlah Alokasi"
              type="number"
            />

            <v-spacer />
            <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="setForm">Simpan</v-btn>
            <v-spacer />
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    
    <v-dialog v-model="dialogDetail" persistent max-width="1000px">
      <v-card>
        <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
          <v-card-title >
            <h3 style="font-size:20px; color:#ffffff">Detail Jadwal Pangkalan</h3>
            <v-spacer />
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="cancel" style="font-size: 28px" link color="error">mdi-close</v-icon>
              </template>
              <span>Tutup</span>
            </v-tooltip>
          </v-card-title>
        </v-card>
        <v-card class="flex-item mx-auto" elevation="5" width="90%">
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
          </v-card-title>

          <v-data-table
            id="customStyleTable"
            class="elevation-1"
            :items-per-page="5"
            height="350px"
            :headers="headers"
            :items="jadwalPerHari"
            :search="search"
            style="padding: 10px 20px 20px 20px"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-menu offset-y style="float: left">
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on" style="cursor: pointer">
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" small @click="editHandler(item)" color="primary" style="margin-right: 5px; font-size: 20px">mdi-pencil</v-icon>
                      </template>
                      <span>Edit Data</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on" small @click="deleteHandler(item)" color="error" style="margin-left:5px; font-size: 20px">mdi-delete</v-icon>
                      </template>
                      <span>Hapus Data</span>
                    </v-tooltip>
                  </span>
                </template>
              </v-menu>
            </template>
          </v-data-table>
        </v-card>
        <br>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
          <v-card-title >
            <h3 style="font-size:20px; color:#ffffff">Hapus Jadwal Pangkalan</h3>
            <v-spacer />
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="closeDialog" style="font-size: 28px" link color="error">mdi-close</v-icon>
              </template>
              <span>Tutup</span>
            </v-tooltip>
          </v-card-title>
        </v-card>
        <v-card-text style="padding-bottom:5px; padding-left:16px">
          <p style="font-size:16px; text-align:left; color:#000000" class="mt-3">Apakah anda yakin untuk menghapus data tersebut?</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="#E53935" text @click="deleteData">Hapus</v-btn>
          <v-btn color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
        </v-card-actions>
      </v-card>
      <!-- <v-card>
        <v-card-title>
          <span class="headline" />
        </v-card-title>

        <v-card-text>Anda Yakin Ingin Menghapus Data Tersebut?</v-card-text>

        <v-spacer />
        <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
        <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
      </v-card> -->
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

    <v-overlay :value="overlay" class="align-center justify-center" style="zIndex: 100000">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
  </v-main>
</template>

<script>
  export default {
    name: "JadwalRutinPangkalanPage",
    
    watch: {
      $route: {
        immediate: true,
        handler() {
          document.title = "Jadwal Rutin Pangkalan";
        },
      },
    },

    data() {
      return {
        color: "",
        editId: "",
        search: null,
        deleteId: "",
        dialog: false,
        dialogDetail: false,
        pangkalan: [],
        jumlahDriver: null,
        overlay: false,
        snackbar: false,
        jadwaltemp : [],
        jadwalPerHari : [],
        error_message: "",
        grupPangkalan: [],
        inputType: "Tambah",
        dialogConfirm: false,
        jadwal: new FormData(),
        isWideScreen: window.innerWidth >= 1000,
        isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
        headers: [
          { text: "Pangkalan", align: "start", sortable: true, value: "nama_pangkalan", },
          { text: "Hari", value: "hari_penerimaan_gas" },
          { text: "Grup Pangkalan", value: "grup_pangkalan" },
          { text: "Alokasi Penerimaan", value: "alokasi_penerimaan_gas" },
          { text: "", value: "actions", sortable: false },
        ],
        items: [
          { text: "Dashboard", disabled: false, href: '/dashboard-page' },
          { text: "Jadwal Rutin Pangkalan", disabled: true, href: '/jadwal-rutin-pangkalan-page' },
        ],
        hari: [
          { id: 1, day: "Senin", style: { 'background-color': 'red' } }, 
          { id: 2, day: "Selasa", style: { 'background-color': 'orange' } }, 
          { id: 3, day: "Rabu", style: { 'background-color': 'green' } },
          { id: 4, day: "Kamis", style: { 'background-color': '#00AFFF' } }, 
          { id: 5, day: "Jumat" , style: { 'background-color': '#6f00ff' } }, 
          { id: 6, day: "Sabtu", style: { 'background-color': 'purple' } },
        ],
        form: {
          nama_pangkalan: null,
          grup_pangkalan: null,
          hari_penerimaan_gas: null,
          Pangkalanid_pangkalan: null,
          alokasi_penerimaan_gas: null,
          id_jadwal_rutin_pangkalan: null,
        },
        formBefore: {
          nama_pangkalan: null,
          grup_pangkalan: null,
          hari_penerimaan_gas: null,
          Pangkalanid_pangkalan: null,
          alokasi_penerimaan_gas: null,
          id_jadwal_rutin_pangkalan: null,
        },
        grupRules: [(v) => !!v || "Grup Pangkalan Tidak Boleh Kosong"],
        pangkalanRules: [(v) => !!v || "Pangkalan Tidak Boleh Kosong"],
        hariRules: [(v) => !!v || "Hari Penerimaan Tidak Boleh Kosong"],
        alokasiRules: [(v) => !!v || "Jumlah Alokasi Tidak Boleh Kosong"],
      };
    },

    methods: {
      setForm() {
        if (this.inputType !== "Tambah") 
        {
          this.update();
        } 
        else 
        {
          this.save();
        }
      },

      convertJadwal(day) {
        let jadwalPerHari = [];
        for (let i = 0; i < this.jadwaltemp.length; i++) 
        {
          if(this.jadwaltemp[i].hari_penerimaan_gas === day) 
          {
            jadwalPerHari.push(this.jadwaltemp[i]);
          }
        }

        return jadwalPerHari;
      },

      convertGrupPangkalan(jumlahDriver)
      {
        for(let i = 0; i < jumlahDriver; i++)
        {
          this.grupPangkalan.push({nomor: i+1,});
        }
      },

      detailHandler(day,grup)
      {
        this.readData(day,grup);
        this.dialogDetail = true;
      },

      readData(day,grup) {
        this.jadwalPerHari= [],
        this.overlay = true;
        // var url = this.$api + "/jadwalRutinPangkalan/getAll";
        var url = this.$api + "/jadwalRutinPangkalan/PostBySearchData";
        var body = { 
            'hari_penerimaan_gas': day, 
            'grup_pangkalan': grup,
        };
        this.$http.post(url,body)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.color = "green";
              this.snackbar = true;
              this.overlay = false;
              this.jadwalPerHari = response.data.data;
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

      readPangkalan() {
        this.overlay = true;
        var url = this.$api + "/pangkalan/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.pangkalan = response.data.data;
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

      readJumlahDriver() {
        this.overlay = true;
        var url = this.$api + "/pegawai/getJumlahDriver";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.jumlahDriver = parseInt(response.data.data.jumlah_driver);
              this.convertGrupPangkalan(this.jumlahDriver);
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
        if(this.checkForm() === 0)
        {
          this.overlay = true;
          this.jadwal.append("grup_pangkalan", this.form.grup_pangkalan);
          this.jadwal.append("Pangkalanid_pangkalan", parseInt(this.form.Pangkalanid_pangkalan));
          this.jadwal.append("hari_penerimaan_gas", this.form.hari_penerimaan_gas);
          this.jadwal.append("alokasi_penerimaan_gas", this.form.alokasi_penerimaan_gas);
          this.jadwal.append("status_jadwal_rutin_pangkalan", "A");

          var url = this.$api + "/jadwalRutinPangkalan/create";
          this.$http.post(url, this.jadwal)
            .then((response) => {
              if(response.data.code === 200)
              {
                this.cancel();
                this.load = true;
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
              this.error_message = error.response.data.message;
              this.snackbar = true;
              this.overlay = false;
              this.color = "red";
              this.load = false;
            });
        }
        else
        {
          this.color = "red";
          this.snackbar = true;
          this.error_message = 'Data Tidak Lengkap!!';
        }
      },

      //ubah data jadwal
      update() {
        if(this.checkForm() === 0)
        {
          this.overlay = true;
          let newData = {
            grup_pangkalan: this.formBefore.grup_pangkalan,
            hari_penerimaan_gas: this.formBefore.hari_penerimaan_gas,
            Pangkalanid_pangkalan: parseInt(this.formBefore.Pangkalanid_pangkalan),
            alokasi_penerimaan_gas: this.formBefore.alokasi_penerimaan_gas,
            status_jadwal_rutin_pangkalan: 'D',
          };

          var url = this.$api + "/jadwalRutinPangkalan/update/" + this.editId;
          this.$http.put(url, newData)
            .then((response) => {
              if(response.data.code === 200)
              {
                this.save();
                // this.cancel();
                // this.resetForm();
                // this.color = "green";
                // this.snackbar = true;
                // this.inputType = "Tambah";
                // this.overlay = false;
                // this.error_message = response.data.message;
                // location.reload();
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
              this.error_message = error.response.data.message;
              this.snackbar = true;
              this.overlay = false;
              this.color = "red";
              this.load = false;
            });
        }
        else
        {
          this.color = "red";
          this.snackbar = true;
          this.error_message = 'Data Tidak Lengkap!!';
        }
      },

      //non aktif data jadwal
      deleteData() {
        this.overlay = true;
        // var url = this.$api + "/jadwalRutinPangkalan/delete/" + this.deleteId;
        let newData = {
          grup_pangkalan: this.form.grup_pangkalan,
          hari_penerimaan_gas: this.form.hari_penerimaan_gas,
          Pangkalanid_pangkalan: parseInt(this.form.Pangkalanid_pangkalan),
          alokasi_penerimaan_gas: this.form.alokasi_penerimaan_gas,
          status_jadwal_rutin_pangkalan: 'D',
        };

        var url = this.$api + "/jadwalRutinPangkalan/update/" + this.deleteId;
        this.$http.put(url, newData)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.cancel();
              this.resetForm();
              this.color = "green";
              this.snackbar = true;
              this.inputType = "Tambah";
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
            this.error_message = error.response.data.message;
            this.snackbar = true;
            this.overlay = false;
            this.color = "red";
            this.load = false;
          });
      },

      checkForm() {
        if(this.form.grup_pangkalan === null || this.form.grup_pangkalan === '')
        {
          return 1;
        }

        if(this.form.hari_penerimaan_gas === null || this.form.hari_penerimaan_gas === '')
        {
          return 1;
        }

        if(this.form.Pangkalanid_pangkalan === null || this.form.Pangkalanid_pangkalan === '')
        {
          return 1;
        }

        if(this.form.alokasi_penerimaan_gas === null || this.form.alokasi_penerimaan_gas === '')
        {
          return 1;
        }

        return 0;
      },

      addHandler(){
        this.readPangkalan();
        // this.readJumlahDriver();
        
        this.dialog = true;
      },
      
      editHandler(item) {
        this.readPangkalan();
        // this.readJumlahDriver();
        this.dialogDetail = false;
        this.inputType = "Edit";
        this.editId = item.id_jadwal_rutin_pangkalan;
        //  form edit
        this.form.nama_pangkalan = item.nama_pangkalan;
        this.form.grup_pangkalan = parseInt(item.grup_pangkalan);
        this.form.hari_penerimaan_gas = item.hari_penerimaan_gas;
        this.form.alokasi_penerimaan_gas = item.alokasi_penerimaan_gas;
        this.form.id_jadwal_rutin_pangkalan = item.id_jadwal_rutin_pangkalan;
        this.form.Pangkalanid_pangkalan = parseInt(item.Pangkalanid_pangkalan);
        // data sebelumnya
        this.formBefore.nama_pangkalan = item.nama_pangkalan;
        this.formBefore.grup_pangkalan = parseInt(item.grup_pangkalan);
        this.formBefore.hari_penerimaan_gas = item.hari_penerimaan_gas;
        this.formBefore.alokasi_penerimaan_gas = item.alokasi_penerimaan_gas;
        this.formBefore.id_jadwal_rutin_pangkalan = item.id_jadwal_rutin_pangkalan;
        this.formBefore.Pangkalanid_pangkalan = parseInt(item.Pangkalanid_pangkalan);

        this.dialog = true;
      },

      deleteHandler(item) {
        this.deleteId = item.id_jadwal_rutin_pangkalan;
        this.form.nama_pangkalan = item.nama_pangkalan;
        this.form.grup_pangkalan = parseInt(item.grup_pangkalan);
        this.form.hari_penerimaan_gas = item.hari_penerimaan_gas;
        this.form.alokasi_penerimaan_gas = item.alokasi_penerimaan_gas;
        this.form.id_jadwal_rutin_pangkalan = item.id_jadwal_rutin_pangkalan;
        this.form.Pangkalanid_pangkalan = parseInt(item.Pangkalanid_pangkalan);
        this.dialogConfirm = true;
      },

      closeDialog() {
        this.resetForm();
        if(this.formTitle !== 'Tambah')
        {
          this.dialogDetail = true;
        }
        this.dialog = false;
        this.dialogConfirm = false;
      },

      cancel() {
        this.resetForm();
        this.dialog = false;
        this.inputType = "Tambah";
        this.dialogConfirm = false;
        this.dialogDetail = false;
      },

      resetForm() {
        this.form = {
          nama_pangkalan: null,
          grup_pangkalan: null,
          hari_penerimaan_gas: null,
          Pangkalanid_pangkalan: null,
          alokasi_penerimaan_gas: null,
          id_jadwal_rutin_pangkalan: null,
        };
      },
    },

    computed: {
      formTitle() {
        return this.inputType;
      },
    },

    mounted() {
      localStorage.setItem("menu", "Jadwal Rutin Pangkalan");
      // this.readData();
      this.readJumlahDriver();
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

  .v-select__selection--comma {
    font-size: 12.5px;
  }
</style>
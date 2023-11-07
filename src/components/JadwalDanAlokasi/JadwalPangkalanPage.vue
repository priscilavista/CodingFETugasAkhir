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
        @click="dialog = true"
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
        @click="dialog = true"
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
        @click="dialog = true"
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
              style="margin-top: -13.5px"
            >
              <template v-slot:default>
                <thead>
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
                </thead>

                <tbody>
                  <tr
                    v-for="jadwal in convertJadwal(item.day)"
                    :key="jadwal.hari_penerimaan_gas"
                  >
                    <td>{{ jadwal.grup_pangkalan }}</td>
                    <td>{{ jadwal.nama_pangkalan }}</td>
                    <td>{{ jadwal.alokasi_penerimaan_gas }}</td>
                    <td>
                      <v-icon small @click="editHandler(jadwal)" color="primary" style="margin-right: 5px;">mdi-pencil</v-icon>
                      <v-icon small @click="deleteHandler(jadwal.id_jadwal_rutin_pangkalan)" color="error" style="margin-left:5px">mdi-delete</v-icon>
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
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-select
              :rules="hariRules"
              v-model="form.hari_penerimaan_gas"
              :items="hari"
              item-text="day"
              item-value="day"
              label="Hari Penerimaan Gas"
              required
            />

            <v-select
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
              v-model="form.id_pangkalan"
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

            <v-card-action>
              <v-spacer />
              <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="save">Simpan</v-btn>
              <v-spacer />
            </v-card-action>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline" />
        </v-card-title>

        <v-card-text>Anda Yakin Ingin Menghapus Data Tersebut?</v-card-text>

        <v-card-action>
          <v-spacer />
          <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
          <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
        </v-card-action>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
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
            text: "Jadwal Rutin Pangkalan",
            disabled: true,
            href: '/jadwal-rutin-pangkalan-page',
          },
        ],
        hari: [
          {
            day: "Senin"
          },
          {
            day: "Selasa"
          },
          {
            day: "Rabu"
          },
          {
            day: "Kamis"
          },
          {
            day: "Jumat"
          },
          {
            day: "Sabtu"
          },
        ],
        jadwaltemp : [
          {
            id_jadwal_rutin_pangkalan: 1,
            hari_penerimaan_gas: 'Senin',
            alokasi_penerimaan_gas: 20,
            id_pangkalan: 1,
            nama_pangkalan: 'A',
            grup_pangkalan: 1
          }, 
          {
            id_jadwal_rutin_pangkalan: 2,
            hari_penerimaan_gas: 'Senin',
            alokasi_penerimaan_gas: 22,
            id_pangkalan: 2,
            nama_pangkalan: 'B',
            grup_pangkalan: 1
          }, 
          {
            id_jadwal_rutin_pangkalan: 3,
            hari_penerimaan_gas: 'Selasa',
            alokasi_penerimaan_gas: 25,
            id_pangkalan: 3,
            nama_pangkalan: 'C',
            grup_pangkalan: 2
          }, 
          {
            id_jadwal_rutin_pangkalan: 4,
            hari_penerimaan_gas: 'Rabu',
            alokasi_penerimaan_gas: 20,
            id_pangkalan: 4,
            nama_pangkalan: 'D',
            grup_pangkalan: 3
          }, 
          {
            id_jadwal_rutin_pangkalan: 5,
            hari_penerimaan_gas: 'Rabu',
            alokasi_penerimaan_gas: 15,
            id_pangkalan: 5,
            nama_pangkalan: 'E',
            grup_pangkalan: 3
          }, 
          {
            id_jadwal_rutin_pangkalan: 6,
            hari_penerimaan_gas: 'Kamis',
            alokasi_penerimaan_gas: 18,
            id_pangkalan: 6,
            nama_pangkalan: 'F',
            grup_pangkalan: 4
          }, 
        ],
        menus: [{ title: "Check" }, { title: "Edit" }, { title: "Delete" }],
        jadwal: new FormData(),
        jadwals: [],
        form: {
          id_jadwal_rutin_pangkalan: null,
          hari_penerimaan_gas: null,
          id_pangkalan: null,
          nama_pangkalan: null,
          alokasi_penerimaan_gas: null,
          grup_pangkalan: null,
        },
        form_pangkalan: {
          id_pangkalan: null,
          nama_pangkalan: null,
        },
        pangkalan: [],
        grupPangkalan: [],
        form_driver: {
          id_driver: null,
          nama_driver: null,
        },
        driver: [
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
          {
            id: 4,
          },
          {
            id: 5,
          },
          {
            id: 6,
          },
        ],
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

      hitungJumlahDriver(){
        let jumlahDriver;
        var url = this.$api + "/";
        this.$http.get(url).then((response) => {
          // this.role = response.data.data;
          jumlahDriver = response.data.data.jumlah_driver;
        });

        this.convertGrupPangkalan(jumlahDriver)
      },

      convertGrupPangkalan(jumlahDriver)
      {
        for(let i = 0; i < jumlahDriver; i++)
        {
          this.grupPangkalan.push({nomor: i+1,});
          console.log("convert grup: ", this.grupPangkalan[i].nomor);
        }
      },

      readData() {
        var url = this.$api + "/jadwalRutinPangkalanRead";
        this.$http.get(url)
          .then((response) => {
            this.jadwals = response.data.data;
          });
      },

      readDataRemove() {
        var url = this.$api + "/jadwalRutinPangkalanRemove";
        this.$http.get(url)
          .then((response) => {
            this.jadwalsR = response.data.data;
          });
      },

      readPangkalan() {
        var url = this.$api + "/pangkalanRead";
        this.$http.get(url)
          .then((response) => {
            let temp = response.data.data;
            this.form_pangkalan.id_pangkalan = temp.map((v) => v.id_pangkalan);
            this.form_pangkalan.nama_pangkalan = temp.map((v) => v.nama_pangkalan);
            
            for (let i = 0; i < this.form_pangkalan.length; i++) 
            {
              this.pangkalan.push(this.form_pangkalan[i]);
            }
          });
      },

      save() {
        this.jadwal.append("hari_penerimaan_gas", this.form.hari_penerimaan_gas);
        this.jadwal.append("id_pangkalan", this.id_pangkalan);
        this.jadwal.append("alokasi_penerimaan_gas", this.form.alokasi_penerimaan_gas);

        var url = this.$api + "/jadwaRutinPangkalan/";
        this.load = true;
        this.$http.post(url, this.jadwal)
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.load = true;
            this.close();
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
          id_pangkalan: this.form.id_pangkalan,
          hari_penerimaan_gas: this.form.hari_penerimaan_gas,
          alokasi_penerimaan_gas: this.form.alokasi_penerimaan_gas,
        };

        var url = this.$api + "/jadwalRutinPangkalan/" + this.editId;
        this.load = true;
        this.$http.put(url, newData)
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
        var url = this.$api + "/jadwalRutinPangkalanDelete/" + this.deleteId;
        this.load = true;
        this.$http.put(url)
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
        this.editId = item.id_jadwal_rutin_pangkalan;
        this.form.hari_penerimaan_gas = item.hari_penerimaan_gas;
        this.form.id_pangkalan = item.id_pangkalan,
        this.form.nama_pangkalan = item.nama_pangkalan,
        this.form.alokasi_penerimaan_gas = item.alokasi_penerimaan_gas,
        this.form.grup_pangkalan = item.grup_pangkalan,
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
          id_jadwal_rutin_pangkalan: null,
          hari_penerimaan_gas: null,
          id_pangkalan: null,
          nama_pangkalan: null,
          alokasi_penerimaan_gas: null,
          grup_pangkalan: null,
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
      this.convertGrupPangkalan();
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

    .v-select__selection--comma {
      font-size: 12.5px;
    }
</style>
<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      divider="/"
      :items="items"
      style="margin-left:-25px; margin-top:-25px"
    />

    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Pangkalan</h3>
      <v-spacer />
      <v-btn
        dark
        small
        color="primary"
        style="float:right"
        @click="addHandler"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Pangkalan</h3>
      <v-spacer />
      <v-btn
        dark
        small
        color="primary"
        style="float:right"
        @click="addHandler"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Pangkalan</h3>
      <v-spacer />
      <v-btn
        dark
        small
        color="primary"
        style="float:right"
        @click="addHandler"
      >
        Tambah
      </v-btn>
    </div>

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
        id="customStyleTable"
        class="elevation-1"
        :items-per-page="5"
        height="350px"
        :headers="headers"
        :items="pangkalans"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" v-show="item.status_pangkalan=='A'" color="primary" @click="editHandler(item)" style="margin-right: 15px; font-size: 20px">
                      mdi-pencil
                    </v-icon>
                  </template>
                  <span>Ubah Data</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" v-show="item.status_pangkalan=='A'" @click="deleteHandler(item)" color="error" style="font-size: 20px">
                      mdi-store-remove
                    </v-icon>
                  </template>
                  <span>Non Aktifkan Status</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon  v-bind="attrs" v-on="on" v-show="item.status_pangkalan=='D'" @click="deleteHandler(item)" color="success" style="font-size: 20px">
                      mdi-store-check
                    </v-icon>
                  </template>
                  <span>Aktifkan Status</span>
                </v-tooltip>
              </span>
            </template>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
        <v-card-title>
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data Pangkalan</h3>
          <v-spacer />
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" @click="cancel" style="font-size: 28px" link color="error">mdi-close</v-icon>
            </template>
            <span>Tutup</span>
          </v-tooltip>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 4.5%">
        <v-card-text>
          <v-container>
            <v-text-field
              :rules="namaRules"
              v-model="form.nama_pangkalan"
              label="Nama"
            />

            <v-text-field
              :rules="idRules"
              v-model="form.id_registrasi_pangkalan"
              label="ID Registrasi"
            />

            <v-text-field
              :rules="kontrakRules"
              type="date"
              v-model="form.tanggal_kontrak_pangkalan"
              label="Tanggal Kontrak Pangkalan"
            />

            <v-text-field
              :rules="emailRules"
              v-model="form.email_pangkalan"
              label="Email"
            />

            <v-text-field
              :rules="telpRules"
              v-model="form.nomor_telepon_pangkalan"
              label="Nomor Telepon"
            />

            <v-select
              :rules="kecamatanRules"
              v-model="form.id_kecamatan"
              :items="kecamatan"
              item-text="nama_kecamatan"
              item-value="id_kecamatan"
              label="Kecamatan"
              v-on:change="getDataKelurahan(form.id_kecamatan)"
              required
            />

            <v-select
              :rules="kelurahanRules"
              v-model="form.id_kelurahan"
              :items="kelurahan"
              item-text="nama_kelurahan"
              item-value="id_kelurahan"
              label="Kelurahan"
              required
            />
            
            <v-text-field
              :rules="alamatRules"
              v-model="form.alamat_pangkalan"
              label="Alamat"
            />

            <v-text-field
              v-model="form.url_maps_pangkalan"
              label="URL Maps"
            />

            <iframe 
              v-if="form.url_maps_pangkalan!=null" 
              :src="this.form.url_maps_pangkalan" 
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade" 
            />
            
            <v-spacer />
            <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="setForm">Simpan</v-btn>
            <v-spacer />
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
          <v-card-title>
            <h3 style="font-size:20px; color:#ffffff">Ubah Status Pangkalan</h3>
            <v-spacer />
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="cancel" style="font-size: 28px" link color="error">mdi-close</v-icon>
              </template>
              <span>Tutup</span>
            </v-tooltip>
          </v-card-title>
        </v-card>

        <v-card-text style="padding-bottom:5px; padding-left:16px" v-if="form.status_pangkalan=='A'">
          <p style="font-size:16px; text-align:left; color:#000000" class="mt-3">Anda yakin ingin menonaktifkan status pangkalan ini?</p>
        </v-card-text>

        <v-card-text style="padding-bottom:5px; padding-left:16px" v-else>
          <p style="font-size:16px; text-align:left; color:#000000" class="mt-3">Anda yakin ingin mengaktifkan status pangkalan ini?</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn v-if="form.status_pangkalan=='A'" color="#E53935" text @click="deleteData">Non Aktif</v-btn>
          <v-btn v-else color="#E53935" text @click="deleteData">Aktif</v-btn>
          <v-btn color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
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
    name: "PangkalanPage",

    watch: {
      $route: {
        immediate: true,
        
        handler() {
          document.title = "Pangkalan";
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
        kecamatan: [],
        kelurahan: [],
        pangkalans: [],
        overlay: false,
        snackbar: false,
        error_message: "",
        inputType: "Tambah",
        dialogConfirm: false,
        pangkalan: new FormData(),
        isWideScreen: window.innerWidth >= 1000,
        isMediumScreen: window.innerWidth >= 650 && window.innerWidth < 1000,
        items: [
          { 
            text: "Dashboard",
            disabled: false,
            href: '/dashboard-page',
          },
          { 
            text: "Pangkalan",
            disabled: true,
            href: '/pangkalan-page',
          },
        ],
        headers: [
          { text: "Nama", align: "start", sortable: true, value: "nama_pangkalan" },
          { text: "Email", value: "email_pangkalan" },
          { text: "Nomor Telepon", value: "nomor_telepon_pangkalan" },
          { text: "Alamat", value: "alamat_pangkalan" },
          { text: "Status", value: "status_pangkalan" },
          { text: "", value: "actions", sortable: false },
        ],
        form: {
          id_pangkalan: null,
          id_kecamatan: null,
          id_kelurahan: null,
          id_padukuhan: null,
          nama_kecamatan: null,
          nama_padukuhan: null,
          nama_kelurahan: null,
          nama_pangkalan: null,
          email_pangkalan: null,
          alamat_pangkalan: null,
          status_pangkalan: null,
          url_maps_pangkalan: null,
          nomor_telepon_pangkalan: null,
          id_registrasi_pangkalan: null,
          tanggal_kontrak_pangkalan: null,
        },
        roleRules: [(v) => !!v || "Role Tidak Boleh Kosong"],
        namaRules: [(v) => !!v || "Nama Tidak Boleh Kosong"],
        alamatRules: [(v) => !!v || "Alamat Tidak Boleh Kosong"],
        idRules: [(v) => !!v || "ID Registrasi Tidak Boleh Kosong"],
        kecamatanRules: [(v) => !!v || "Kecamatan Tidak Boleh Kosong"],
        kelurahanRules: [(v) => !!v || "Kelurahan Tidak Boleh Kosong"],
        kontrakRules: [(v) => !!v || "Tanggal Kontrak Tidak Boleh Kosong"],
        emailRules: [
          (v) => !!v || "Email Tidak Boleh Kosong",
          (v) => /.+@.+\..+/.test(v) || "Email Tidak Valid",
        ],
        telpRules: [
          (v) => !!v || "Nomor Telepon Tidak Boleh Kosong",
          (v) => /^([0][8][0-9]{8,10})$/g.test(v) || "Nomor Telepon Tidak Valid",
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

      readData() {
        this.overlay = true;
        var url = this.$api + "/pangkalan/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.color = "green";
              this.snackbar = true;
              this.overlay = false;
              this.pangkalans = response.data.data;
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
      
      getDataKecamatan() {
        this.overlay = true;
        var url = this.$api + "/masterKecamatan/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.kecamatan = response.data.data;
              this.color = "green";
              this.snackbar = true;
              this.overlay = false;
              this.error_message = response.data.message;
            }
            else
            {
              this.color = "red";
              this.dialog = false;
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

      getDataKelurahan(id) {
        this.overlay = true;
        var url = this.$api + "/masterKelurahan/getAllByKecamatan/" + id;
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              let temp = response.data.data;
              this.kelurahan = temp;
              this.color = "green";
              this.snackbar = true;
              this.overlay = false;
              this.error_message = response.data.message;
            }
            else
            {
              this.color = "red";
              this.dialog = false;
              this.overlay = false;
              this.snackbar = true;
              this.error_message = response.data.message;
            }
          })
          .catch((error) => {
            this.color = "red";
            this.dialog = false;
            this.snackbar = true;
            this.overlay = false;
            this.error_message = error.response.data.message;
          });
      },
      
      save() {
        if(this.checkForm() === 0)
        {
          this.overlay = true;
          this.pangkalan.append("nama_pangkalan", this.form.nama_pangkalan);
          this.pangkalan.append("email_pangkalan", this.form.email_pangkalan);
          this.pangkalan.append("alamat_pangkalan", this.form.alamat_pangkalan);
          this.pangkalan.append("url_maps_pangkalan", this.form.url_maps_pangkalan);
          this.pangkalan.append("id_registrasi", this.form.id_registrasi_pangkalan);
          this.pangkalan.append("Master_Kelurahanid_kelurahan", this.form.id_kelurahan);
          this.pangkalan.append("nomor_telepon_pangkalan", this.form.nomor_telepon_pangkalan);
          this.pangkalan.append("tanggal_kontrak_pangkalan", this.form.tanggal_kontrak_pangkalan);

          var url = this.$api + "/pangkalan/create";
          this.$http.post(url, this.pangkalan)
            .then((response) => {
              if(response.data.code === 200)
              {
                this.cancel();
                this.readData();
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
        }
        else
        {
          this.color = "red";
          this.snackbar = true;
          this.error_message = 'Data Tidak Lengkap!!';
        }
      },
      
      update() {
        if(this.checkForm() === 0)
        {
          this.overlay = true;
          let newData = {
            nama_pangkalan: this.form.nama_pangkalan,
            email_pangkalan: this.form.email_pangkalan,
            alamat_pangkalan: this.form.alamat_pangkalan,
            url_maps_pangkalan: this.form.url_maps_pangkalan,
            id_registrasi: this.form.id_registrasi_pangkalan,
            Master_Kelurahanid_kelurahan: this.form.id_kelurahan,
            nomor_telepon_pangkalan: this.form.nomor_telepon_pangkalan,
            tanggal_kontrak_pangkalan: this.form.tanggal_kontrak_pangkalan,
          };

          var url = this.$api + "/pangkalan/update/" + this.editId;
          this.$http.put(url, newData)
            .then((response) => {
              if(response.data.code === 200)
              {
                this.cancel();
                this.readData();
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
        }
        else
        {
          this.color = "red";
          this.snackbar = true;
          this.error_message = 'Data Tidak Lengkap!!';
        }
      },
      
      deleteData() {
        this.overlay = true;
        var url = this.$api + "/pangkalan/updateStatus/" + this.deleteId;
        this.$http.put(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.cancel();
              this.readData();
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

      checkForm() {
        if(this.form.id_kelurahan === null || this.form.id_kelurahan === '')
        {
          return 1;
        }

        if(this.form.id_registrasi === null || this.form.id_registrasi === '')
        {
          return 1;
        }

        if(this.form.nama_pangkalan === null || this.form.nama_pangkalan === '')
        {
          return 1;
        }

        if(this.form.email_pangkalan === null || this.form.email_pangkalan === '')
        {
          return 1;
        }

        if(this.form.alamat_pangkalan === null || this.form.alamat_pangkalan === '')
        {
          return 1;
        }

        if(this.form.nomor_telepon_pangkalan === null || this.form.nomor_telepon_pangkalan === '')
        {
          return 1;
        }

        if(this.form.tanggal_kontrak_pangkalan === null || this.form.tanggal_kontrak_pangkalan === '')
        {
          return 1;
        }

        return 0;
      },

      addHandler(){
        this.inputType = "Tambah";
        this.getDataKecamatan();
        this.dialog = true;
      },

      editHandler(item) {
        this.overlay = true;
        this.inputType = "Ubah";
        this.getDataKecamatan();
        this.editId = item.id_pangkalan;
        var url = this.$api + "/pangkalan/getById";
        this.$http.get(url + "/" + item.id_pangkalan)
          .then((response) => {
            if(response.data.code == 200)
            {
              var res = response.data.data;
              
              this.form.id_pangkalan = res.id_pangkalan;
              this.form.id_kelurahan = res.id_kelurahan;
              this.form.nama_kecamatan = res.nama_kecamatan;
              this.form.nama_kelurahan = res.nama_kelurahan;
              this.form.nama_pangkalan = res.nama_pangkalan;
              this.form.email_pangkalan = res.email_pangkalan;
              this.form.alamat_pangkalan = res.alamat_pangkalan;
              this.form.id_kecamatan = parseInt(res.id_kecamatan);
              this.form.id_registrasi_pangkalan = res.id_registrasi;
              this.form.nomor_telepon_pangkalan = res.nomor_telepon_pangkalan;
              this.getDataKelurahan(parseInt(res.Master_Kecamatanid_kecamatan));
              this.form.tanggal_kontrak_pangkalan = res.tanggal_kontrak_pangkalan;
              if(res.url_maps_pangkalan !== null && res.url_maps_pangkalan !== 'null')
              {
                this.form.url_maps_pangkalan = res.url_maps_pangkalan;
              }

              this.dialog = true;
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

      deleteHandler(item) {
        this.form.status_pangkalan = item.status_pangkalan;
        this.deleteId = item.id_pangkalan;
        this.dialogConfirm = true;
      },

      cancel() {
        this.resetForm();
        this.kecamatan = [];
        this.kelurahan = [];
        this.dialog = false;
        this.inputType = "Tambah";
        this.dialogConfirm = false;
      },

      resetForm() {
        this.form = {
          id_kecamatan: null,
          id_pangkalan: null,
          id_kelurahan: null,
          id_padukuhan: null,
          nama_padukuhan: null,
          nama_kelurahan: null,
          nama_pangkalan: null,
          nama_kecamatan: null,
          email_pangkalan: null,
          alamat_pangkalan: null,
          status_pangkalan: null,
          url_maps_pangkalan: null,
          nomor_telepon_pangkalan: null,
          id_registrasi_pangkalan: null,
          tanggal_kontrak_pangkalan: null,
        };
      },
    },

    computed: {
      formTitle() {
        return this.inputType;
      },
    },

    mounted() {
      localStorage.setItem("menu", "Pangkalan");
      this.readData();
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
    }

    .v-select__selection--comma {
      font-size: 12.5px;
    }

    .v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn {
      margin-left: 0px;
    }

    .v-dialog>.v-card>.v-card__title {
      padding: 16px 24px;
    }
</style>

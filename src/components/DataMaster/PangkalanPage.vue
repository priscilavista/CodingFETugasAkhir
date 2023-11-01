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
        :headers="headers"
        :items="pangkalans"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-icon color="primary" @click="editHandler(item)" style="margin-right: 15px;">
                  mdi-pencil
                </v-icon>

                <v-icon v-if="item.status_pangkalan=='A'" @click="deleteHandler(item)" color="error">
                  mdi-account-remove
                </v-icon>
                <v-icon v-else @click="deleteHandler(item)" color="success">
                  mdi-account-check
                </v-icon>
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
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
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
              :rules="mapsRules"
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
            
            <!-- <a v-if="form.url_maps_pangkalan!=null" href="form.url_maps_pangkalan" target="_blank">Lihat Lokasi Pangkalan</a> -->
            
            <v-card-action>
              <v-spacer />
              <v-btn small color="primary" dark style="float:right; margin-top: 3%" @click="setForm">Simpan</v-btn>
              <v-spacer />
            </v-card-action>
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
            <v-icon @click="cancel" link>mdi-close</v-icon>
          </v-card-title>
        </v-card>

        <v-card-text style="padding-bottom:5px" v-if="form.status_pangkalan=='A'">Anda yakin ingin menonaktifkan status pangkalan ini?</v-card-text>
        <v-card-text style="padding-bottom:5px" v-else>Anda yakin ingin mengaktifkan status pangkalan ini?</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn v-if="form.status_pangkalan=='A'" color="#E53935" text @click="deleteData">Non Aktif</v-btn>
          <v-btn v-else color="#E53935" text @click="deleteData">Aktif</v-btn>
          <v-btn style="margin-right:12.5px" color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

    <v-overlay :value="overlay">
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
        inputType: "Tambah",
        snackbar: false,
        error_message: "",
        color: "",
        search: null,
        dialog: false,
        dialogConfirm: false,
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
          { text: "", value: "actions" },
        ],
        pangkalan: new FormData(),
        pangkalans: [],
        form: {
          id_pangkalan: null,
          nama_pangkalan: null,
          id_registrasi_pangkalan: null,
          tanggal_kontrak_pangkalan: null,
          email_pangkalan: null,
          nomor_telepon_pangkalan: null,
          alamat_pangkalan: null,
          id_kecamatan: null,
          nama_kecamatan: null,
          id_kelurahan: null,
          nama_kelurahan: null,
          id_padukuhan: null,
          nama_padukuhan: null,
          url_maps_pangkalan: null,
          status_pangkalan: null,
        },
        kecamatan: [],
        kelurahan: [],
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

      readData() {
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
        var url = this.$api + "/masterKecamatan/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              let temp = response.data.data;
              this.kecamatan = temp;
            }
            else
            {
              this.color = "red";
              this.dialog = false;
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
      },

      getDataKelurahan(id) {
        var url = this.$api + "/masterKelurahan/getAllByKecamatan/" + id;
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              let temp = response.data.data;
              this.kelurahan = temp;
            }
            else
            {
              this.color = "red";
              this.dialog = false;
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
      },
      
      save() {
        this.pangkalan.append("Master_Kelurahanid_kelurahan", this.form.id_kelurahan);
        this.pangkalan.append("nama_pangkalan", this.form.nama_pangkalan);
        this.pangkalan.append("tanggal_kontrak_pangkalan", this.form.tanggal_kontrak_pangkalan);
        this.pangkalan.append("nomor_telepon_pangkalan", this.form.nomor_telepon_pangkalan);
        this.pangkalan.append("email_pangkalan", this.form.email_pangkalan);
        this.pangkalan.append("alamat_pangkalan", this.form.alamat_pangkalan);
        this.pangkalan.append("url_maps_pangkalan", this.form.url_maps_pangkalan);
        this.pangkalan.append("id_registrasi", this.form.id_registrasi_pangkalan);

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
      
      update() {
        let newData = {
          alamat_pangkalan: this.form.alamat_pangkalan,
          nama_pangkalan: this.form.nama_pangkalan,
          url_maps_pangkalan: this.form.url_maps_pangkalan,
          id_registrasi: this.form.id_registrasi_pangkalan,
          tanggal_kontrak_pangkalan: this.form.tanggal_kontrak_pangkalan,
          email_pangkalan: this.form.email_pangkalan,
          nomor_telepon_pangkalan: this.form.nomor_telepon_pangkalan,
          Master_Kelurahanid_kelurahan: this.form.id_kelurahan,
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
      
      deleteData() {
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

      addHandler(){
        this.inputType = "Tambah";
        this.getDataKecamatan();
        this.dialog = true;
      },

      editHandler(item) {
        this.inputType = "Edit";
        this.getDataKecamatan();
        this.editId = item.id_pangkalan;
        var url = this.$api + "/pangkalan/getById";
        this.$http.get(url + "/" + item.id_pangkalan)
          .then((response) => {
            if(response.data.code == 200)
            {
              var res = response.data.data;
              
              this.form.id_pangkalan = res.id_pangkalan;
              this.form.id_kelurahan = res.Master_Kelurahanid_kelurahan;
              this.form.nama_kelurahan = res.nama_kelurahan;
              this.form.nama_pangkalan = res.nama_pangkalan;
              this.form.tanggal_kontrak_pangkalan = res.tanggal_kontrak_pangkalan;
              this.form.nomor_telepon_pangkalan = res.nomor_telepon_pangkalan;
              this.form.email_pangkalan = res.email_pangkalan;
              this.form.alamat_pangkalan = res.alamat_pangkalan;
              this.form.url_maps_pangkalan = res.url_maps_pangkalan;
              this.form.id_registrasi_pangkalan = res.id_registrasi;
              this.form.id_kecamatan = res.Master_Kecamatanid_kecamatan;
              this.form.nama_kecamatan = res.nama_kecamatan;
              this.getDataKelurahan(res.Master_Kecamatanid_kecamatan);
              this.dialog = true;
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
      },

      deleteHandler(item) {
        this.deleteId = item.id_pangkalan;
        this.form.status_pangkalan = item.status_pangkalan;
        this.dialogConfirm = true;
      },

      cancel() {
        this.resetForm();
        this.kecamatan = [];
        this.kelurahan = [];
        this.dialog = false;
        this.inputType = "Tambah";
        this.dialogConfirm = false;
        location.reload();
      },

      resetForm() {
        this.form = {
          id_pangkalan: null,
          nama_pangkalan: null,
          id_registrasi_pangkalan: null,
          tanggal_kontrak_pangkalan: null,
          email_pangkalan: null,
          nomor_telepon_pangkalan: null,
          alamat_pangkalan: null,
          id_kecamatan: null,
          nama_kecamatan: null,
          id_kelurahan: null,
          nama_kelurahan: null,
          id_padukuhan: null,
          nama_padukuhan: null,
          url_maps_pangkalan: null,
          status_pangkalan: null,
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
</style>

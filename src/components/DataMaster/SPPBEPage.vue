<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    />

    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">SPPBE</h3>
      <v-spacer />
      <v-btn
        small
        color="primary"
        dark
        @click="addHandler"
        style="float:right"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">SPPBE</h3>
      <v-spacer />
      <v-btn
        small
        color="primary"
        dark
        @click="addHandler"
        style="float:right"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">SPPBE</h3>
      <v-spacer />
      <v-btn
        small
        color="primary"
        dark
        @click="addHandler"
        style="float:right"
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
        :items="sppbes"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" v-show="item.status_sppbe=='A'" color="primary" @click="editHandler(item)" style="margin-right: 15px; font-size: 20px">
                      mdi-pencil
                    </v-icon>
                  </template>
                  <span>Ubah Data</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" v-show="item.status_sppbe=='A'" @click="deleteHandler(item)" color="error" style="font-size: 20px">
                      mdi-store-remove
                    </v-icon>
                  </template>
                  <span>Non Aktifkan Status</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon  v-bind="attrs" v-on="on" v-show="item.status_sppbe=='D'" @click="deleteHandler(item)" color="success" style="font-size: 20px">
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
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data SPPBE</h3>
          <v-spacer />
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" @click="cancel" style="font-size: 28px" link color="error">mdi-close</v-icon>
            </template>
            <span>Tutup</span>
          </v-tooltip>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-text-field
              :rules="namaRules"
              v-model="form.nama_sppbe"
              label="Nama"
            />

            <v-text-field
              :rules="emailRules"
              v-model="form.email_sppbe"
              label="Email"
            />

            <v-text-field
              :rules="telpRules"
              v-model="form.nomor_telepon_sppbe"
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
              v-model="form.alamat_sppbe"
              label="Alamat"
            />

            <v-text-field
              v-model="form.url_maps_sppbe"
              label="URL Maps"
            />

            <iframe 
              v-if="form.url_maps_sppbe!=null" 
              :src="this.form.url_maps_sppbe" 
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
            <h3 style="font-size:20px; color:#ffffff">Ubah Status SPPBE</h3>
            <v-spacer />
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="cancel" style="font-size: 28px" link color="error">mdi-close</v-icon>
              </template>
              <span>Tutup</span>
            </v-tooltip>
          </v-card-title>
        </v-card>

        <v-card-text style="padding-bottom:5px; padding-left:16px" v-if="form.status_sppbe=='A'">
          <p style="font-size:16px; text-align:left; color:#000000" class="mt-3">Anda yakin ingin menonaktifkan status SPPBE ini?</p>
        </v-card-text>
        <v-card-text style="padding-bottom:5px; padding-left:16px" v-else>
          <p style="font-size:16px; text-align:left; color:#000000" class="mt-3">Anda yakin ingin mengaktifkan status SPPBE ini?</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn v-if="form.status_sppbe=='A'" color="#E53935" text @click="deleteData">Non Aktif</v-btn>
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
    name: "SPPBEPage",
    
    watch: {
      $route: {
        immediate: true,
        
        handler() {
          document.title = "SPPBE";
        },
      },
    },

    data() {
      return {
        color: "",
        editId: "",
        sppbes: [],
        search: null,
        deleteId: "",
        kecamatan: [],
        kelurahan: [],
        dialog: false,
        overlay: false,
        snackbar: false,
        error_message: "",
        inputType: "Tambah",
        dialogConfirm: false,
        sppbe: new FormData(),
        isWideScreen: window.innerWidth >= 1000,
        isMediumScreen: window.innerWidth >= 650 && window.innerWidth < 1000,
        items: [
          { 
            text: "Dashboard",
            disabled: false,
            href: '/dashboard-page',
          },
          { 
            text: "SPPBE",
            disabled: true,
            href: '/sppbe-page',
          },
        ],
        headers: [
          { text: "Nama", align: "start", sortable: true, value: "nama_sppbe" },
          { text: "Email", value: "email_sppbe" },
          { text: "Nomor Telepon", value: "nomor_telepon_sppbe" },
          { text: "Alamat", value: "alamat_sppbe" },
          { text: "Status", value: "status_sppbe" },
          { text: "", value: "actions", sortable: false },
        ],
        form: {
          id_sppbe: null,
          nama_sppbe: null,
          email_sppbe: null,
          id_padukuhan: null,
          status_sppbe: null,
          alamat_sppbe: null,
          id_kecamatan: null,
          id_kelurahan: null,
          nama_kecamatan: null,
          nama_kelurahan: null,
          nama_padukuhan: null,
          url_maps_sppbe: null,
          nomor_telepon_sppbe: null,
        },
        roleRules: [(v) => !!v || "Role Tidak Boleh Kosong"],
        namaRules: [(v) => !!v || "Nama Tidak Boleh Kosong"],
        alamatRules: [(v) => !!v || "Alamat Tidak Boleh Kosong"],
        kecamatanRules: [(v) => !!v || "Kecamatan Tidak Boleh Kosong"],
        kelurahanRules: [(v) => !!v || "Kelurahan Tidak Boleh Kosong"],
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
        var url = this.$api + "/sppbe/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.color = "green";
              this.snackbar = true;
              this.overlay = false;
              this.sppbes = response.data.data;
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
              this.snackbar = true;
              this.overlay = false;
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
          this.sppbe.append("nama_sppbe", this.form.nama_sppbe);
          this.sppbe.append("email_sppbe", this.form.email_sppbe);
          this.sppbe.append("alamat_sppbe", this.form.alamat_sppbe);
          this.sppbe.append("nomor_telepon_sppbe", this.form.nomor_telepon_sppbe);
          this.sppbe.append("Master_Kelurahanid_kelurahan", this.form.id_kelurahan);
          if(this.form.url_maps_sppbe !== null && this.form.url_maps_sppbe !== 'null')
          {
            this.sppbe.append("url_maps_sppbe", this.form.url_maps_sppbe);
          }

          var url = this.$api + "/sppbe/create";
          this.$http.post(url, this.sppbe)
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
          let url_maps = null;
          if(this.form.url_maps_sppbe !== null && this.form.url_maps_sppbe !== 'null' && this.form.url_maps_sppbe !== '')
          {
            url_maps = this.form.url_maps_sppbe;
          }
          
          let newData = {
            url_maps_sppbe: url_maps,
            nama_sppbe: this.form.nama_sppbe,
            email_sppbe: this.form.email_sppbe,
            alamat_sppbe: this.form.alamat_sppbe,
            nomor_telepon_sppbe: this.form.nomor_telepon_sppbe,
            Master_Kelurahanid_kelurahan: this.form.id_kelurahan,
          };

          var url = this.$api + "/sppbe/update/" + this.editId;
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
        var url = this.$api + "/sppbe/updateStatus/" + this.deleteId;
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

        if(this.form.nama_sppbe === null || this.form.nama_sppbe === '')
        {
          return 1;
        }

        if(this.form.email_sppbe === null || this.form.email_sppbe === '')
        {
          return 1;
        }

        if(this.form.alamat_sppbe === null || this.form.alamat_sppbe === '')
        {
          return 1;
        }

        if(this.form.nomor_telepon_sppbe === null || this.form.nomor_telepon_sppbe === '')
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
        this.inputType = "Edit";
        this.getDataKecamatan();
        this.editId = item.id_sppbe;
        var url = this.$api + "/sppbe/getById";
        this.$http.get(url + "/" + item.id_sppbe)
          .then((response) => {
            if(response.data.code == 200)
            {
              var res = response.data.data;
              
              this.form.id_sppbe = res.id_sppbe;
              this.form.nama_sppbe = res.nama_sppbe;
              this.form.email_sppbe = res.email_sppbe;
              this.form.alamat_sppbe = res.alamat_sppbe;
              this.form.nama_kecamatan = res.nama_kecamatan;
              this.form.nama_kelurahan = res.nama_kelurahan;
              this.form.nomor_telepon_sppbe = res.nomor_telepon_sppbe;
              this.form.id_kelurahan = res.Master_Kelurahanid_kelurahan;
              this.getDataKelurahan(parseInt(res.Master_Kecamatanid_kecamatan));
              this.form.id_kecamatan = parseInt(res.Master_Kecamatanid_kecamatan);
              if(res.url_maps_sppbe !== null && res.url_maps_sppbe !== 'null')
              {
                this.form.url_maps_sppbe = res.url_maps_sppbe;
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
        this.form.status_sppbe = item.status_sppbe;
        this.deleteId = item.id_sppbe;
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
          id_sppbe: null,
          nama_sppbe: null,
          email_sppbe: null,
          alamat_sppbe: null,
          id_kecamatan: null,
          status_sppbe: null,
          id_kelurahan: null,
          id_padukuhan: null,
          nama_kecamatan: null,
          nama_kelurahan: null,
          nama_padukuhan: null,
          url_maps_sppbe: null,
          nomor_telepon_sppbe: null,
        };
      },
    },

    computed: {
      formTitle() {
        return this.inputType;
      },
    },

    mounted() {
      localStorage.setItem("menu", "SPPBE");
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

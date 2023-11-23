<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    />
    
    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Alokasi Fakultatif</h3>
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
      <h3 style="float:left">Alokasi Fakultatif</h3>
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
      <h3 style="float:left">Alokasi Fakultatif</h3>
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

    <h3 style="margin-bottom:-30px">Disetujui Pangkalan</h3>
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
        :items="fakultatifA"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-icon color="primary" @click="editHandler(item)" style="margin-right: 15px;">
                  mdi-magnify
                </v-icon>
              </span>
            </template>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <h3 style="margin-bottom:-30px; padding-top:50px">Belum Dikonfirmasi Pangkalan</h3>
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
        :items="fakultatifP"
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

                <v-icon @click="deleteHandler(item.id_alokasi_fakultatif)" color="error">
                  mdi-file-document-remove
                </v-icon>
              </span>
            </template>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <h3 style="margin-bottom:-30px;padding-top:50px">Ditolak Pangkalan</h3>
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
        :items="fakultatifD"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-icon color="primary" @click="editHandler(item)" style="margin-right: 15px;">
                  mdi-magnify
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
          <h3 v-if="form.status_persetujuan_pangkalan !== 'P' && inputType === 'Edit'" style="font-size:20px; color:#ffffff">
            Detail Data Alokasi Fakultatif
          </h3>
          
          <h3 v-else style="font-size:20px; color:#ffffff">
            {{ formTitle }} Data Alokasi Fakultatif
          </h3>
          <v-spacer />
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>

      <v-card v-if="form.status_persetujuan_pangkalan !== 'P' && inputType === 'Edit'" style="border-radius: 0px 0px 4px 4px">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
            <v-select
              :rules="pangkalanRules"
              v-model="form.id_pangkalan"
              :items="pangkalan"
              item-text="nama_pangkalan"
              item-value="id_pangkalan"
              label="Pangkalan"
              readonly
            />

            <v-text-field
              :rules="tanggalPenambahanRules"
              type="date"
              v-model="form.tanggal_penambahan_alokasi"
              label="Tanggal Penambahan Alokasi"
              readonly
            />

            <v-text-field
              :rules="alokasiRules"
              v-model="form.alokasi_tambahan"
              label="Alokasi Tambahan"
              type="number"
              readonly
            />
          </v-container>
        </v-card-text>
      </v-card>

      <v-card v-else style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container style="padding-left: 5px; padding-right: 5px">
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
              :rules="tanggalPenambahanRules"
              type="date"
              v-model="form.tanggal_penambahan_alokasi"
              label="Tanggal Penambahan Alokasi"
            />

            <v-text-field
              :rules="alokasiRules"
              v-model="form.alokasi_tambahan"
              label="Alokasi Tambahan"
              type="number"
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
        <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
          <v-card-title>
            <h3 style="font-size:20px; color:#ffffff">Hapus Data Alokasi Fakultatif</h3>
            <v-spacer />
            <v-icon @click="cancel" link>mdi-close</v-icon>
          </v-card-title>
        </v-card>

        <v-card-text>
          <h6 style="font-size:16px; justify-content: start; align-items: start;">Anda Yakin Ingin Menghapus Data Tersebut?</h6>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn small style="font-size:12px" color="#E53935" text @click="deleteData">Hapus</v-btn>
          <v-btn small style="font-size:12px" color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
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
    name: "AlokasiFakultatifPage",

    watch: {
      $route: {
        immediate: true,
        
        handler() {
          document.title = "Alokasi Fakultatif";
        },
      },
    },

    data() {
      return {
        color: "",
        editId: "",
        deleteId: "",
        search: null,
        dialog: false,
        pangkalan: [],
        overlay: false,
        fakultatifA: [],
        fakultatifP: [],
        fakultatifD: [],
        snackbar: false,
        error_message: "",
        inputType: "Tambah",
        dialogConfirm: false,
        fakultatif: new FormData(),
        isWideScreen: window.innerWidth >= 1000,
        isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
        items: [
          { 
            disabled: false,
            text: "Dashboard",
            href: '/dashboard-page',
          },
          { 
            disabled: true,
            text: "Alokasi Fakultatif",
            href: '/alokasi-fakultatif-page',
          },
        ],
        headers: [
          {
            text: "Tanggal Pengajuan",
            align: "start",
            sortable: true,
            value: "tanggal_pengajuan",
          },
          { text: "Pangkalan", value: "nama_pangkalan" },
          { text: "Tanggal Penambahan Alokasi", value: "tanggal_penambahan_alokasi" },
          { text: "Alokasi Tambahan", value: "alokasi_tambahan" },
          { text: "", value: "actions", sortable: false },
        ],
        form: {
          id_pangkalan: null,
          nama_pangkalan: null,
          alokasi_tambahan: null,
          tanggal_pengajuan: null,
          id_alokasi_fakultatif: null,
          tanggal_penambahan_alokasi: null,
          status_persetujuan_pangkalan: null,
        },
        alokasiRules: [(v) => !!v || "Alokasi is Required"],
        pangkalanRules: [(v) => !!v || "Pangkalan is Required"],
        tanggalPenambahanRules: [(v) => !!v || "Tanggal Penambahan is Required"],
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

        var url = this.$api + "/alokasiFakultatif/getAll";
        this.$http.get(url)
          .then((response) => {if(response.data.code == 200)
            {
              var res = response.data.data;
              res.forEach(element => {
                if(element.status_persetujuan_pangkalan === 'A')
                {
                  this.fakultatifA = [...this.fakultatifA, element];
                }
                else if(element.status_persetujuan_pangkalan === 'P')
                {
                  this.fakultatifP = [...this.fakultatifP, element];
                }
                else if(element.status_persetujuan_pangkalan === 'D')
                {
                  this.fakultatifD = [...this.fakultatifD, element];
                }
              });

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

      readPangkalan() {
        var url = this.$api + "/pangkalan/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.pangkalan = response.data.data;
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
          this.fakultatif.append("status_persetujuan_pangkalan", 'P');
          this.fakultatif.append("alokasi_tambahan", this.form.alokasi_tambahan);
          this.fakultatif.append("Pangkalanid_pangkalan", this.form.id_pangkalan);
          this.fakultatif.append("tanggal_pengajuan", this.form.tanggal_pengajuan);
          this.fakultatif.append("tanggal_penambahan_alokasi", this.form.tanggal_penambahan_alokasi);

          var url = this.$api + "/alokasiFakultatif/create";
          this.$http.post(url, this.fakultatif)
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
            alokasi_tambahan: this.form.alokasi_tambahan,
            Pangkalanid_pangkalan: this.form.id_pangkalan,
            tanggal_pengajuan: this.form.tanggal_pengajuan,
            tanggal_penambahan_alokasi: this.form.tanggal_penambahan_alokasi,
            status_persetujuan_pangkalan: this.form.status_persetujuan_pangkalan,
          };

          var url = this.$api + "/alokasiPengambilanGas/update/" + this.editId;
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
        var url = this.$api + "/alokasiFakultatif/delete/" + this.deleteId;
        this.$http.delete(url)
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
        if(this.form.id_pangkalan === null || this.form.id_pangkalan === '')
        {
          return 1;
        }

        if(this.form.alokasi_tambahan === null || this.form.alokasi_tambahan === '')
        {
          return 1;
        }

        if(this.form.tanggal_pengajuan === null || this.form.tanggal_pengajuan === '')
        {
          return 1;
        }

        if(this.form.tanggal_penambahan_alokasi === null || this.form.tanggal_penambahan_alokasi === '')
        {
          return 1;
        }

        if(this.form.status_persetujuan_pangkalan === null || this.form.status_persetujuan_pangkalan === '')
        {
          return 1;
        }

        return 0;
      },

      addHandler(){
        this.inputType = "Tambah";
        this.readPangkalan();
        this.dialog = true;
      },

      editHandler(item) {
        this.readPangkalan();
        this.inputType = "Edit";
        this.editId = item.id_alokasi_fakultatif;
        this.form.nama_pangkalan = item.nama_pangkalan;
        this.form.alokasi_tambahan = item.alokasi_tambahan;
        this.form.id_pangkalan = parseInt(item.id_pangkalan);
        this.form.tanggal_pengajuan = item.tanggal_pengajuan;
        this.form.id_alokasi_fakultatif = item.id_alokasi_fakultatif;
        this.form.tanggal_penambahan_alokasi = item.tanggal_penambahan_alokasi;
        this.form.status_persetujuan_pangkalan = item.status_persetujuan_pangkalan;
        
        this.dialog = true;
      },

      deleteHandler(id) {
        this.deleteId = id;
        this.dialogConfirm = true;
      },

      cancel() {
        this.resetForm();
        this.dialog = false;
        this.inputType = "Tambah";
        this.dialogConfirm = false;
      },

      resetForm() {
        this.form = {
          id_pangkalan: null,
          nama_pangkalan: null,
          alokasi_tambahan: null,
          tanggal_pengajuan: null,
          id_alokasi_fakultatif: null,
          tanggal_penambahan_alokasi: null,
          status_persetujuan_pangkalan: null,
        };
      },
    },

    computed: {
      formTitle() {
        return this.inputType;
      },
    },

    mounted() {
      localStorage.setItem("menu", "Alokasi Fakultatif");
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
</style>

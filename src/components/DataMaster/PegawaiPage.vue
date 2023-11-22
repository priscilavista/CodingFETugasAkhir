<template>
  <v-main class="list" style="margin: auto">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px; width:30%"
    />
    
    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Pegawai</h3>
      <v-spacer />
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Pegawai</h3>
      <v-spacer />
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right"
      >
        Tambah
      </v-btn>
    </div>

    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Pegawai</h3>
      <v-spacer />
      <v-btn
        small
        color="primary"
        dark
        @click="dialog = true"
        style="float:right"
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
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="pegawais"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-icon @click="editHandler(item)" color="primary" style="margin-right: 15px;">
                  mdi-pencil
                </v-icon>
                <v-icon v-if="item.status_pegawai=='A'" @click="deleteHandler(item)" color="error">
                  mdi-account-remove
                </v-icon>
                <v-icon v-else @click="deleteHandler(item)" color="success">
                  mdi-account-check
                </v-icon>
                <!-- <v-chip link color="#E7C913">
                  <v-icon>mdi-circle-edit-outline</v-icon>
                </v-chip> -->
              </span>
            </template>

            <!-- <v-list width="90" class="py-0">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title style="color: #000000; margin-bottom: 10px">
                    <v-btn small @click="editHandler(item)">
                      <v-icon color="#E39348">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </v-list-item-title>

                  <v-list-item-title style="color: #000000; margin-top: 10px">
                    <v-btn small @click="deleteHandler(item.id_pegawai)">
                      <v-icon color="#C94141">
                        mdi-account-remove
                      </v-icon>
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list> -->
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;">
        <v-card-title>
          <h3 style="font-size:20px; color:#ffffff">{{ formTitle }} Data</h3>
          <v-spacer />
          <v-icon @click="cancel" link>mdi-close</v-icon>
        </v-card-title>
      </v-card>

      <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%">
        <v-card-text>
          <v-container>
            <v-select
              :rules="roleRules"
              v-model="form.role_pegawai"
              :items="roles"
              item-text="role"
              item-value="role"
              label="Jabatan"
              required
            />

            <v-text-field
              :rules="namaRules"
              v-model="form.nama_pegawai"
              label="Nama"
            />

            <v-text-field
              :rules="ttlRules"
              type="date"
              v-model="form.tanggal_lahir_pegawai"
              label="Tanggal Lahir"
            />

            <v-text-field
              :rules="emailRules"
              v-model="form.email_pegawai"
              label="Email"
            />

            <v-text-field
              :rules="telpRules"
              v-model="form.nomor_telepon_pegawai"
              label="Nomor Telepon"
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
            <h3 style="font-size:20px; color:#ffffff">Ubah Status Pegawai</h3>
            <v-spacer />
            <v-icon @click="cancel" link>mdi-close</v-icon>
          </v-card-title>
        </v-card>

        <v-card-text style="padding-bottom:5px" v-if="form.status_pegawai=='A'">Anda yakin ingin menonaktifkan status pegawai ini?</v-card-text>
        <v-card-text style="padding-bottom:5px" v-else>Anda yakin ingin mengaktifkan status pegawai ini?</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn v-if="form.status_pegawai=='A'" color="#E53935" text @click="deleteData">Non Aktif</v-btn>
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
    name: "PegawaiPage",

    watch: {
      $route: {
        immediate: true,
        
        handler() {
          document.title = "Pegawai";
        },
      },
    },

    data() {
      return {
        color: "",
        editId: "",
        pegawais: [],
        deleteId: "",
        search: null,
        dialog: false,
        overlay: false,
        snackbar: false,
        error_message: "",
        inputType: "Tambah",
        dialogConfirm: false,
        pegawai: new FormData(),
        isWideScreen: window.innerWidth >= 1000,
        roles: [{ role: "Admin" }, { role: "Manajer" }, { role: "Driver"}],
        isMediumScreen: window.innerWidth >= 650 && window.innerWidth < 1000,
        items: [
          { 
            text: "Dashboard",
            disabled: false,
            href: '/dashboard-page',
          },
          { 
            text: "Pegawai",
            disabled: true,
            href: '/pegawai-page',
          },
        ],
        headers: [
          { text: "Jabatan", align: "start", sortable: true, value: "role_pegawai", },
          { text: "Nama", value: "nama_pegawai" },
          { text: "Tanggal Lahir", value: "tanggal_lahir_pegawai" },
          { text: "Email", value: "email_pegawai" },
          { text: "Nomor Telepon", value: "nomor_telepon_pegawai" },
          { text: "Status", value: "status_pegawai" },
          { text: "", value: "actions" },
        ],
        form: {
          id_pegawai: null,
          role_pegawai: null,
          nama_pegawai: null,
          tanggal_lahir_pegawai: null,
          email_pegawai: null,
          nomor_telepon_pegawai: null,
          status_pegawai: null,
        },
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
        this.overlay = true;
        var url = this.$api + "/pegawai/getAll";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code === 200)
            {
              this.color = "green";
              this.snackbar = true;
              this.overlay = false;
              this.pegawais = response.data.data;
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

      save() {
        this.pegawai.append("role_pegawai", this.form.role_pegawai);
        this.pegawai.append("nama_pegawai", this.form.nama_pegawai);
        this.pegawai.append("email_pegawai", this.form.email_pegawai);
        this.pegawai.append("tanggal_lahir_pegawai", this.form.tanggal_lahir_pegawai);
        this.pegawai.append("nomor_telepon_pegawai", this.form.nomor_telepon_pegawai);

        var url = this.$api + "/pegawai/create";
        this.$http.post(url, this.pegawai)
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
          role_pegawai: this.form.role_pegawai,
          nama_pegawai: this.form.nama_pegawai,
          email_pegawai: this.form.email_pegawai,
          tanggal_lahir_pegawai: this.form.tanggal_lahir_pegawai,
          nomor_telepon_pegawai: this.form.nomor_telepon_pegawai,
        };

        var url = this.$api + "/pegawai/update/" + this.editId;
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
        var url = this.$api + "/pegawai/updateStatus/" + this.deleteId;
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

      editHandler(item) {
        this.dialog = true;
        this.inputType = "Ubah";
        this.editId = item.id_pegawai;
        this.form.role_pegawai = item.role_pegawai;
        this.form.nama_pegawai = item.nama_pegawai;
        this.form.email_pegawai = item.email_pegawai;
        this.form.tanggal_lahir_pegawai = item.tanggal_lahir_pegawai;
        this.form.nomor_telepon_pegawai = item.nomor_telepon_pegawai;
      },

      deleteHandler(item) {
        this.form.status_pegawai  = item.status_pegawai;
        this.deleteId = item.id_pegawai;
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
          id_pegawai: null,
          role_pegawai: null,
          nama_pegawai: null,
          email_pegawai: null,
          status_pegawai: null,
          tanggal_lahir_pegawai: null,
          nomor_telepon_pegawai: null,
        };
      },
    },

    computed: {
      formTitle() {
        return this.inputType;
      },
    },

    mounted() {
      localStorage.setItem("menu", "Pegawai");
      this.readData();
    },
  };
</script>

<style>
  .v-alert__icon.v-icon {
    font-size: 17.5px;
  }

  .v-alert__content {
    font-size: 13.5px;
  }

  .v-btn--icon.v-size--small .v-icon{
    font-size: 17.5px;
  }
  
  .flex {
    display: flex;
    overflow: scroll;
    flex-wrap: nowrap;
  }

  .flex-item {
    flex: 0 0 auto;
  }

  .inline {
    overflow-x: scroll; 
    vertical-align: middle;
  }

  .inline-item {
    height: 96px;
    margin-right: -4px;
    display: inline-block;
    vertical-align: middle;
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

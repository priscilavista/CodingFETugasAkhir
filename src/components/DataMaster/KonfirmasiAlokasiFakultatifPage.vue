<template>
  <v-main class="list" style="margin: auto;">
    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    />

    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Alokasi Fakultatif</h3>
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Alokasi Fakultatif</h3>
    </div>

    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Alokasi Fakultatif</h3>
    </div>

    <v-alert
      v-model="alert"
      dismissible
      color="primary"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-bell"
      style="align:right; padding:5px 15px 5px 15px; text-align: left; margin-top:-5px"
    >
      Anda menerima <strong>{{ permintaanFakultatif }}</strong> permintaan alokasi fakultatif.
    </v-alert>

    <v-card fill-height class="flex-item mx-auto" elevation="5" style="margin-top: 2.5%">
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
        :items="fakultatifs"
        :search="search"
        style="padding: 10px 20px 20px 20px"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-menu offset-y style="float: left">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="cursor: pointer">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" color="primary" @click="confirmHandler(item)" style="margin-right: 15px;">
                      mdi-check
                    </v-icon>
                  </template>
                  <span>Terima Alokasi Fakultatif</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" @click="rejectHandler(item)" color="error">
                      mdi-close
                    </v-icon>
                  </template>
                  <span>Tolak Alokasi Fakultatif</span>
                </v-tooltip>
              </span>
            </template>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
          <v-card-title>
            <h3 style="font-size:18px; color:#ffffff">Konfirmasi Alokasi Fakultatif</h3>
            <v-spacer />
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="cancel" style="font-size: 28px" link color="error">mdi-close</v-icon>
              </template>
              <span>Tutup</span>
            </v-tooltip>
          </v-card-title>
        </v-card>

        <v-card-text style="padding-bottom:5px; padding-left:16px">
          <p style="font-size:16px; text-align:left; color:#000000" class="mt-3">
            Anda yakin ingin <strong>menyetujui</strong> permintaan alokasi fakultatif ini?
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="#E53935" text @click="updateStatus">Setuju</v-btn>
          <v-btn color="#1E88E5" text @click="dialogConfirm = false">Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogReject" persistent max-width="400px">
      <v-card>
        <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
          <v-card-title>
            <h3 style="font-size:18px; color:#ffffff">Konfirmasi Alokasi Fakultatif</h3>
            <v-spacer />
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" @click="cancel" style="font-size: 28px" link color="error">mdi-close</v-icon>
              </template>
              <span>Tutup</span>
            </v-tooltip>
          </v-card-title>
        </v-card>

        <v-card-text style="padding-bottom:5px; padding-left:16px">
          <p style="font-size:16px; text-align:left; color:#000000" class="mt-3">
            Anda yakin ingin <strong>menolak</strong> permintaan alokasi fakultatif ini?
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="#E53935" text @click="updateStatus">Tolak</v-btn>
          <v-btn color="#1E88E5" text @click="dialogReject = false">Batal</v-btn>
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
        itemId: "",
        today: "",
        minDate: "",
        alert: true,
        search: null,
        overlay: false,
        snackbar: false,
        fakultatifs: [],
        error_message: "",
        dialogReject: false,
        dialogConfirm: false,
        permintaanFakultatif: 0,
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
            href: '/konfirmasi-alokasi-fakultatif-page',
          },
        ],
        headers: [
          {
            text: "Tanggal Pengajuan",
            align: "start",
            sortable: true,
            value: "tanggal_pengajuan",
          },
          { text: "Tanggal Penambahan Alokasi", value: "tanggal_penambahan_alokasi" },
          { text: "Alokasi Tambahan", value: "alokasi_tambahan" },
          { text: "Konfirmasi", value: "actions", sortable: false },
        ],
        form: {
          id_pangkalan: null,
          alokasi_tambahan: null,
          tanggal_pengajuan: null,
          tanggal_penambahan_alokasi: null,
          status_persetujuan_pangkalan: null,
        },
      };
    },

    methods: {
      setDate() {
        this.today = new Date;
        console.log("today " + this.today);
        let day = this.today.getDate();
        console.log("day " + day);
        let month = this.today.getMonth();
        let nextMonth = month;
        let year = this.today.getFullYear();
        let nextYear = year;
        if(month!=11)
        {
          month = month + 1;
          nextMonth = nextMonth + 2;
          if(month<10)
          {
            month = "0" + month;
          }

          if(nextMonth<10)
          {
            nextMonth = "0" + nextMonth;
          }
        }
        else
        {
          month = 12;
          nextMonth = "0" + 1;
          nextYear = year + 1;
        }
        
        if(day < 10)
        {
          day = "0" + day;
        }
        
        this.today = year + "-" + month + "-" + day;
        this.minDate = nextYear + "-" + nextMonth + "-01";
        console.log("today " + this.today);
        console.log("minDate " + this.minDate);
      },
      
      readData() {
        this.overlay = true;

        var url = this.$api + "/alokasiFakultatif/postByPageDataPangkalan";
        this.$http.post(url, { id_pangkalan: localStorage.getItem('id') })
          .then((response) => {
            if(response.data.code == 200)
            {
              var res = response.data.data;
              res.forEach(element => {
                if(element.tanggal_penambahan_alokasi >= this.minDate)
                {
                  this.fakultatifs = [...this.fakultatifs, element];
                }
              });
              this.permintaanFakultatif = this.fakultatifs.length;

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

      //ubah data fakultatif
      updateStatus() {
        this.overlay = true;
        let statusPersetujuan = '';

        if(this.dialogConfirm === true)
        {
          statusPersetujuan = 'A';
        }
        else if(this.dialogReject === true)
        {
          statusPersetujuan = 'D';
        }

        if(statusPersetujuan !== '')
        {
          let newData = {
            alokasi_tambahan: this.form.alokasi_tambahan,
            Pangkalanid_pangkalan: this.form.id_pangkalan,
            tanggal_pengajuan: this.form.tanggal_pengajuan,
            status_persetujuan_pangkalan: statusPersetujuan,
            tanggal_penambahan_alokasi: this.form.tanggal_penambahan_alokasi,
          };

          var url = this.$api + "/alokasiFakultatif/update/" + this.itemId;
          this.$http.put(url, newData)
            .then((response) => {
              if(response.data.code === 200)
              {
                this.cancel();
                this.readData();
                this.resetForm();
                this.color = "green";
                this.snackbar = true;
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
      },

      confirmHandler(item) {
        this.handleSetData(item);
        this.dialogConfirm = true;
      },

      rejectHandler(item) {
        this.handleSetData(item);
        
        this.dialogReject = true;
      },

      handleSetData(item){
        this.itemId = item.id_alokasi_fakultatif;
        this.form.id_pangkalan = item.id_pangkalan;
        this.form.alokasi_tambahan = item.alokasi_tambahan;
        this.form.tanggal_pengajuan = item.tanggal_pengajuan;
        this.form.tanggal_penambahan_alokasi = item.tanggal_penambahan_alokasi;
        this.form.status_persetujuan_pangkalan = item.status_persetujuan_pangkalan;
      },

      cancel() {
        this.resetForm();
        this.dialogReject = false;
        this.dialogConfirm = false;
      },

      resetForm() {
        this.form = {
          id_pangkalan: null,
          alokasi_tambahan: null,
          tanggal_pengajuan: null,
          tanggal_penambahan_alokasi: null,
          status_persetujuan_pangkalan: null,
        };
      },
    },
    
    mounted() {
      localStorage.setItem("menu", "Alokasi Fakultatif");
      this.setDate();
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
  .v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn {
    margin-left: 0px;
  }
  .v-dialog>.v-card>.v-card__title {
    padding: 16px 24px;
  }
</style>

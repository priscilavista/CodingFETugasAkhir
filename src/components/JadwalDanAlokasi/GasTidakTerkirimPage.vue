<template>
  <v-main class="list" style="margin: auto;">

    <v-breadcrumbs
      :items="items"
      divider="/"
      style="margin-left:-25px; margin-top:-25px"
    />

    <div v-if="isWideScreen" style="margin-bottom: 5%">
      <h3 style="float:left">Gas Tidak Terkirim</h3>
    </div>

    <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
      <h3 style="float:left">Gas Tidak Terkirim</h3>
    </div>

    <div v-else style="margin-bottom: 17.5%">
      <h3 style="float:left">Gas Tidak Terkirim</h3>
    </div>

    <v-container style="padding: 0px 0px 12px 0px; margin-left:0px">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-card width="350px" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
            <v-card-title>
              <h3 style="font-size:20px; color:#ffffff">Harus Diproses</h3>
            </v-card-title>
          </v-card>
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
              :items="jadwalRequest"
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
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
        >
          <v-card width="350px" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
            <v-card-title>
              <h3 style="font-size:20px; color:#ffffff">Sudah Dikonfirmasi</h3>
            </v-card-title>
          </v-card>
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
              :headers="headers2"
              :items="jadwalConfirm"
              :search="search"
              style="padding: 10px 20px 20px 20px"
            >
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card>
        <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px;margin-bottom:20px">
          <v-card-title>
            <h3 style="font-size:18px; color:#ffffff">Konfirmasi Gas Tidak Terkirim</h3>
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
            Anda yakin ingin <strong>menyetujui</strong> permintaan gas tidak terkirim ini?
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
            <h3 style="font-size:18px; color:#ffffff">Konfirmasi Gas Tidak Terkirim</h3>
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
            Anda yakin ingin <strong>menolak</strong> permintaan gas tidak terkirim ini?
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
        jadwalRequest: [],
        jadwalConfirm: [],
        error_message: "",
        dialogReject: false,
        dialogConfirm: false,
        transaksi: new FormData(),
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
            text: "Gas Tidak Terkirim",
            href: '/gas-tidak-terkirim-page',
          },
        ],
        headers: [
          {
            text: "Tanggal Pengiriman",
            align: "start",
            sortable: true,
            value: "tanggal_pengambilan_gas",
          },
          { text: "Pangkalan", value: "nama_pangkalan" },
          { text: "Driver", value: "nama_driver" },
          { text: "Jumlah Tidak Terkirim", value: "gas_tidak_terkirim" },
          { text: "Jumlah Alokasi", value: "total_alokasi_penerimaan_gas" },
          { text: "Konfirmasi", value: "actions", sortable: false },
          { text: "Jenis", value: "jenis_alokasi_pengambilan_gas" },
        ],
        headers2: [
          {
            text: "Tanggal Pengiriman",
            align: "start",
            sortable: true,
            value: "tanggal_pengambilan_gas",
          },
          { text: "Pangkalan", value: "nama_pangkalan" },
          { text: "Driver", value: "nama_driver" },
          { text: "Jumlah Tidak Terkirim", value: "gas_tidak_terkirim" },
          { text: "Jumlah Alokasi", value: "total_alokasi_penerimaan_gas" },
          { text: "Jenis", value: "jenis_alokasi_pengambilan_gas" },
        ],
        form: {
            Pangkalanid_pangkalan : null,
            jumlah_pembelian : null,
            nama_pembeli : null,
            nomor_ktp_pembeli : null,
            kategori_pembeli : null,
            nomor_telepon_pembeli : null,
            jenis_alokasi_pengambilan_gas : null,
            Jadwal_Tetap_Pangkalanid_kitir_pangkalan: null,
            Jadwal_Pengambilan_Gasid_jadwal_pengambilan_gas: null,
            gas_tidak_terkirim: null,
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
        let year = this.today.getFullYear();
        if(month<10)
        {
            month = month + 1;
            month = "0" + month;
        }
        
        if(day < 10)
        {
          day = "0" + day;
        }
        
        this.today = year + "-" + month + "-" + day;
        console.log(this.today);
      },
      readJadwalReguler() {
        this.overlay = true;
        this.jadwalConfirm = [];
        this.jadwalRequest = [];

        var url = this.$api + "/jadwalPengirimanGas/getRequest";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code == 200)
            {
              var temp = response.data.data;
              var jadwal = [];

              for (let i = 0; i < temp.length; i++)
              {
                jadwal.push(
                {
                    id_driver: temp[i].id_pegawai,
                    nama_driver: temp[i].nama_pegawai,
                    nomor_ktp_pegawai: temp[i].nomor_ktp_pegawai,
                    nomor_telepon_pegawai: temp[i].nomor_telepon_pegawai,
                    tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                    total_alokasi_penerimaan_gas: parseInt(temp[i].alokasi_penerimaan_gas),
                    jenis_alokasi_pengambilan_gas: temp[i].jenis_alokasi_pengambilan_gas,
                    gas_tidak_terkirim: temp[i].gas_tidak_terkirim,
                    status_gas_tidak_terkirim: temp[i].status_gas_tidak_terkirim,
                    id_jadwal_pengiriman_gas: temp[i].id_jadwal_pengiriman_gas,
                    Jadwal_Tetap_Pangkalanid_kitir_pangkalan: temp[i].Jadwal_Tetap_Pangkalanid_kitir_pangkalan,
                    Jadwal_Pengambilan_Gasid_jadwal_pengambilan_gas: temp[i].Jadwal_Pengambilan_Gasid_jadwal_pengambilan_gas,
                    id_alokasi_fakultatif: '',
                    Pangkalanid_pangkalan: temp[i].Pangkalanid_pangkalan,
                    nama_pangkalan: temp[i].nama_pangkalan,
                    tanggal_pengajuan: '',
                    tanggal_penambahan_alokasi: '',
                    alokasi_tambahan: '',
                    status_persetujuan_pangkalan: '',
                },);
              }

              jadwal.forEach(element => {
                if(element.status_gas_tidak_terkirim === 'R')
                {
                  this.jadwalRequest = [...this.jadwalRequest, element];
                }
                else{
                  this.jadwalConfirm = [...this.jadwalConfirm, element];
                }
              });

              this.color = "green";
              this.snackbar = true;
              this.overlay = false;
              this.error_message = response.data.message;
              this.readJadwalFakultatif();
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

      readJadwalFakultatif() {
        this.overlay = true;

        var url = this.$api + "/alokasiFakultatif/getRequest";
        this.$http.get(url)
          .then((response) => {
            if(response.data.code == 200)
            {
              var temp = response.data.data;
              var jadwal = [];

              for (let i = 0; i < temp.length; i++)
              {
                jadwal.push(
                {
                    id_driver: temp[i].id_pegawai,
                    nama_driver: temp[i].nama_pegawai,
                    nomor_ktp_pegawai: temp[i].nomor_ktp_pegawai,
                    nomor_telepon_pegawai: temp[i].nomor_telepon_pegawai,
                    tanggal_pengambilan_gas: temp[i].tanggal_pengambilan_gas,
                    total_alokasi_penerimaan_gas: parseInt(temp[i].alokasi_tambahan),
                    jenis_alokasi_pengambilan_gas: temp[i].jenis_alokasi_pengambilan_gas,
                    gas_tidak_terkirim: temp[i].gas_tidak_terkirim,
                    status_gas_tidak_terkirim: temp[i].status_gas_tidak_terkirim,
                    Jadwal_Pengambilan_Gasid_jadwal_pengambilan_gas: temp[i].Jadwal_Pengambilan_Gasid_jadwal_pengambilan_gas,
                    id_alokasi_fakultatif: temp[i].id_alokasi_fakultatif,
                    Pangkalanid_pangkalan: temp[i].Pangkalanid_pangkalan,
                    nama_pangkalan: temp[i].nama_pangkalan,
                    tanggal_pengajuan: temp[i].tanggal_pengajuan,
                    tanggal_penambahan_alokasi: temp[i].tanggal_penambahan_alokasi,
                    alokasi_tambahan: temp[i].alokasi_tambahan,
                    status_persetujuan_pangkalan: temp[i].status_persetujuan_pangkalan,
                    id_jadwal_pengiriman_gas: '',
                    Jadwal_Tetap_Pangkalanid_kitir_pangkalan: '',
                },);
              }

              jadwal.forEach(element => {
                if(element.status_gas_tidak_terkirim === 'R')
                {
                  this.jadwalRequest = [...this.jadwalRequest, element];
                }
                else{
                  this.jadwalConfirm = [...this.jadwalConfirm, element];
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

      //ubah data fakultatif
      updateStatus() {
        if(this.dialogConfirm === true)
        {
          if(this.form.jenis_alokasi_pengambilan_gas == 'Reguler')
          {
            this.updateConfirmReguler();
          }
          else
          {
            this.updateConfirmFakultatif();
          }
        }
        else if(this.dialogReject === true)
        {
          if(this.form.jenis_alokasi_pengambilan_gas == 'Reguler')
          {
            this.updateRejectReguler();
          }
          else
          {
            this.updateRejectFakultatif();
          }
        }
      },

      addTransaksi()
      {
        this.transaksi.append("Pangkalanid_pangkalan", this.form.Pangkalanid_pangkalan);
        this.transaksi.append("nama_pembeli", this.form.nama_pembeli);
        this.transaksi.append("jumlah_pembelian", this.form.jumlah_pembelian);
        this.transaksi.append("kategori_pembeli", this.form.kategori_pembeli);
        this.transaksi.append("nomor_ktp_pembeli", this.form.nomor_ktp_pembeli);
        this.transaksi.append("tanggal_transaksi", this.today);
        this.transaksi.append("nomor_telepon_pembeli", this.form.nomor_telepon_pembeli);
        var url = this.$api + "/transaksi/create";
          this.$http.post(url, this.transaksi)
            .then((response) => {
              if(response.data.code === 200)
              {
                this.cancel();
                this.readJadwalReguler();
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
      },

      updateConfirmFakultatif()
      {
        //update status
        this.overlay = true;
        let newData = {
            gas_tidak_terkirim: this.form.gas_tidak_terkirim,
            status_gas_tidak_terkirim: 'C',
        };

        var url = this.$api + "/alokasiFakultatif/updateStatus/" + this.itemId;
        this.$http.put(url, newData)
            .then((response) => {
            if(response.data.code === 200)
            {
                this.color = "green";
                this.snackbar = true;
                this.error_message = response.data.message;
                //add transaksi
                this.addTransaksi();
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

      updateConfirmReguler()
      {
        //update status
        this.overlay = true;
        let newData = {
            Jadwal_Tetap_Pangkalanid_kitir_pangkalan: this.form.Jadwal_Tetap_Pangkalanid_kitir_pangkalan,
            Jadwal_Pengambilan_Gasid_jadwal_pengambilan_gas: this.form.Jadwal_Pengambilan_Gasid_jadwal_pengambilan_gas,
            gas_tidak_terkirim: this.form.gas_tidak_terkirim,
            status_gas_tidak_terkirim: 'C',
        };

        var url = this.$api + "/jadwalPengirimanGas/update/" + this.itemId;
        this.$http.put(url, newData)
            .then((response) => {
            if(response.data.code === 200)
            {
                this.color = "green";
                this.snackbar = true;
                this.error_message = response.data.message;
                //add transaksi
                this.addTransaksi();
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

      updateRejectFakultatif() {
        this.overlay = true;
        let newData = {
            gas_tidak_terkirim: 0,
            status_gas_tidak_terkirim: 'D',
        };

        var url = this.$api + "/alokasiFakultatif/updateStatus/" + this.itemId;
        this.$http.put(url, newData)
            .then((response) => {
            if(response.data.code === 200)
            {
                this.cancel();
                this.readJadwalReguler();
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
      },

      updateRejectReguler() {
        this.overlay = true;
        let newData = {
            Jadwal_Tetap_Pangkalanid_kitir_pangkalan: this.form.Jadwal_Tetap_Pangkalanid_kitir_pangkalan,
            Jadwal_Pengambilan_Gasid_jadwal_pengambilan_gas: this.form.Jadwal_Pengambilan_Gasid_jadwal_pengambilan_gas,
            gas_tidak_terkirim: 0,
            status_gas_tidak_terkirim: 'D',
        };

        var url = this.$api + "/jadwalPengirimanGas/update/" + this.itemId;
        this.$http.put(url, newData)
            .then((response) => {
            if(response.data.code === 200)
            {
                this.cancel();
                this.readJadwalReguler();
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
        if(item.jenis_alokasi_pengambilan_gas === 'Reguler')
        {
            this.itemId = item.id_jadwal_pengiriman_gas;
        }
        else
        {
            this.itemId = item.id_alokasi_fakultatif;
        }
        this.form.Pangkalanid_pangkalan = item.Pangkalanid_pangkalan;
        this.form.jumlah_pembelian = item.gas_tidak_terkirim;
        this.form.nama_pembeli = item.nama_driver;
        this.form.nomor_ktp_pembeli = item.nomor_ktp_pegawai;
        this.form.kategori_pembeli = 'Lainnya';
        this.form.nomor_telepon_pembeli = item.nomor_telepon_pegawai;
        this.form.jenis_alokasi_pengambilan_gas = item.jenis_alokasi_pengambilan_gas;
        this.form.Jadwal_Tetap_Pangkalanid_kitir_pangkalan = item.Jadwal_Tetap_Pangkalanid_kitir_pangkalan;
        this.form.Jadwal_Pengambilan_Gasid_jadwal_pengambilan_gas = item.Jadwal_Pengambilan_Gasid_jadwal_pengambilan_gas;
        this.form.gas_tidak_terkirim = item.gas_tidak_terkirim;
      },

      cancel() {
        this.resetForm();
        this.dialogReject = false;
        this.dialogConfirm = false;
      },

      resetForm() {
        this.form = {
            Pangkalanid_pangkalan : null,
            jumlah_pembelian : null,
            nama_pembeli : null,
            nomor_ktp_pembeli : null,
            kategori_pembeli : null,
            nomor_telepon_pembeli : null,
            jenis_alokasi_pengambilan_gas : null,
            Jadwal_Tetap_Pangkalanid_kitir_pangkalan: null,
            Jadwal_Pengambilan_Gasid_jadwal_pengambilan_gas: null,
            gas_tidak_terkirim: null,
        };
      },
    },
    
    mounted() {
      localStorage.setItem("menu", "Gas Tidak Terkirim");
      this.readJadwalReguler();
      this.setDate();
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

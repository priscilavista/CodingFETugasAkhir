<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
            :items="items"
            divider="/"
            style="margin-left:-25px; margin-top:-25px"
        />
        
        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
            <h3 style="float:left">Surat Kuasa Pengambilan Gas</h3>
            <v-spacer />
        </div>

        <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
            <h3 style="float:left">Surat Kuasa Pengambilan Gas</h3>
            <v-spacer />
        </div>

        <div v-else style="margin-bottom: 17.5%">
            <h3 style="float:left">Surat Kuasa Pengambilan Gas</h3>
            <v-spacer />
        </div>

        <v-card width="350px" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
            <v-card-title>
                <h3 style="font-size:20px; color:#ffffff">Isilah Data di Bawah Ini:</h3>
            </v-card-title>
        </v-card>

        <v-card style="border-radius: 0px 0px 4px 4px;width:350px;height:">
            <v-card-text>
                <v-container style="padding-left: 5px; padding-right: 5px; padding-bottom:47.5px">
                    <v-text-field
                        :rules="tanggalRules"
                        type="date"
                        v-model="form.tanggal_pengambilan_gas"
                        label="Tanggal Pengambilan Gas"
                        style="margin-top:-5px"
                    />

                    <v-select
                        :rules="sppbeRules"
                        v-model="form.id_sppbe"
                        :items="sppbe"
                        item-text="nama_sppbe"
                        item-value="id_sppbe"
                        label="SPPBE"
                        style="margin-top:-10px"
                    />

                    <v-text-field
                        :rules="armadaRules"
                        v-model="form.nomor_armada"
                        label="Nomor Armada"
                        style="margin-top:-10px"
                    />

                    <v-select
                        :rules="driverRules"
                        v-model="form.id_driver"
                        :items="driver"
                        item-text="nama_pegawai"
                        item-value="id_pegawai"
                        label="Driver"
                        style="margin-top:-10px"
                    />

                    <v-select
                        :rules="alokasiRules"
                        v-model="form.kuantitas_tabung"
                        :items="alokasi"
                        item-text="jumlah"
                        item-value="jumlah"
                        label="Kuantitas tabung yang diambil"
                        style="margin-top:-10px"
                    />

                    <v-btn small @click="prosesHandler" color="primary" dark style="float:left;margin-top:10px">Proses</v-btn>
                </v-container>
            </v-card-text>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="800px">
            <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                    <h3 style="font-size:20px; color:#ffffff">Pratinjau</h3>
                    <v-spacer />
                    <v-icon @click="close()" color="#ffffff" link>mdi-close</v-icon>
                </v-card-title>
            </v-card>

            <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%;overflow-x: hidden">
                <v-spacer />
                <v-btn small color="primary" dark style="float:right; margin-top: 3%;margin-right:3%" @click="exportPDF">Cetak</v-btn>
                <v-spacer />
                
                <span id="SuratKuasa">
                    <v-card-text style="margin-left:10px; margin-top: 3%">
                        <span style="float:left;">Kepada SPBE/SPPBE</span> <br/>
                        <span style="float:left;">PT {{ form.nama_sppbe }}</span> <br/><br/>
                        <span style="float:left;">Dengan hormat,</span> <br/><br/>
                        <span style="float:left;">Mohon bantuannya untuk pelaksanaan transaksi pengambilan LPG 3kg kami sebagai berikut:</span> <br/>
                        <span style="float:left;margin-left:48px">-</span> <span style="float:left;margin-left:17.5px">Tanggal Pengambilan</span> <span style="float:left;margin-left:109px">: {{form.tanggal_pengambilan_gas}}</span> <br/>
                        <span style="float:left;margin-left:48px">-</span> <span style="float:left;margin-left:17.5px">Nomor Armada</span> <span style="float:left;margin-left:150px">: {{form.nomor_armada}}</span> <br/>
                        <span style="float:left;margin-left:48px">-</span> <span style="float:left;margin-left:17.5px">Nama Pengemudi</span> <span style="float:left;margin-left:132px">: {{form.nama_driver}}</span> <br/>
                        <span style="float:left;margin-left:48px">-</span> <span style="float:left;margin-left:17.5px">Kuantitas Tabung yang Diambil</span> <span style="float:left;margin-left:50px">: {{form.kuantitas_tabung}}</span> <br/><br/>
                        <span style="float:left;">Atas perhatiannya kami ucapkan terima kasih.</span> <br/><br/><br/>
                        <span style="float:left;">Wonosari,</span> <br/>
                        <span style="float:left;">PT Satria Permana Jaya</span> <br/>
                    </v-card-text>
                </span>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>

        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64" />
        </v-overlay>
    </v-main>
</template>

<script>
    import html2PDF from "jspdf-html2canvas";

    export default {
        name: "SuratKuasaPage",

        watch: {
            $route: {
                immediate: true,

                handler() {
                    document.title = "Surat Kuasa Pengambilan Gas";
                },
            },
        },

        data() {
            return {
                color: '',
                sppbe: [],
                driver: [],
                dialog: false,
                overlay: false,
                snackbar: false,
                error_message: "",
                isWideScreen: window.innerWidth >= 1000,
                sppbeRules: [(v) => !!v || "SPPBE is Required"],
                driverRules: [(v) => !!v || "Driver is Required"],
                tanggalRules: [(v) => !!v || "Tanggal is Required"],
                armadaRules: [(v) => !!v || "Nomor Armada is Required"],
                alokasiRules: [(v) => !!v || "Jumlah Alokasi is Required"],
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                alokasi: [
                    {
                        jumlah: 360
                    },
                    {
                        jumlah: 560
                    },
                ],
                items: [
                    { 
                        text: "Dashboard",
                        disabled: false,
                        href: '/dashboard-page',
                    },
                    { 
                        text: "Surat Kuasa Pengambilan Gas",
                        disabled: true,
                        href: '/surat-kuasa-pengambilan-gas-page',
                    },
                ],
                form: {
                    id_sppbe: null,
                    nama_sppbe: null,
                    tanggal_pengambilan_gas: null,
                    nomor_armada: 'AB 8797 JC',
                    id_driver: null,
                    nama_driver: null,
                    kuantitas_tabung: null,
                },
            }
        },

        methods: {
            close() {
                this.resetForm();
                this.dialog = false;
            },

            readDataDriver() {
                this.overlay = true;
                var url = this.$api + "/pegawai/getDriver";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            this.driver = response.data.data;
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

            readDataSPPBE() {
                var url = this.$api + "/sppbe/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            this.sppbe = response.data.data;
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

            prosesHandler() {
                if(this.checkForm() === 0)
                {
                    this.form.nama_driver = this.getNamaDriver(this.form.id_driver);
                    this.form.nama_sppbe = this.getNamaSPPBE(this.form.id_sppbe);
                    this.dialog=true;
                }
                else
                {
                    this.color = "red";
                    this.snackbar = true;
                    this.error_message = 'Data Tidak Lengkap!!';
                }
            },

            checkForm() {
                if(this.form.tanggal_pengambilan_gas === null)
                {
                    return 1;
                }
                else
                {
                    if(this.form.id_sppbe === null)
                    {
                        return 1;
                    }
                    else
                    {
                        if(this.form.nomor_armada === null)
                        {
                            return 1;
                        }
                        else
                        {
                            if(this.form.id_driver === null)
                            {
                                return 1;
                            }
                            else
                            {
                                if(this.form.kuantitas_tabung === null)
                                {
                                    return 1;
                                }
                                else
                                {
                                    return 0;
                                }
                            }
                        }
                    }
                }
            },

            getNamaSPPBE(id_sppbe) {
                for(let i = 0; i < this.sppbe.length; i++)
                {
                    if(id_sppbe === this.sppbe[i].id_sppbe)
                    {
                        return this.sppbe[i].nama_sppbe;
                    }
                }
            },

            getNamaDriver(id_driver) {
                for(let i = 0; i < this.driver.length; i++)
                {
                    if(id_driver === this.driver[i].id_pegawai)
                    {
                        return this.driver[i].nama_pegawai;
                    }
                }
            },

            exportPDF() {
                var report;
                var reportName = "";

                report = document.getElementById("SuratKuasa");
                reportName = "Surat Kuasa_" + this.form.nama_driver;

                html2PDF(report, {
                    jsPDF: {
                        format: "a4",
                    },
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: -2.5,
                    },
                    html2canvas: {
                        scrollX: 0,
                        scrollY: 0,
                    },

                    imageType: "image/jpeg",
                    output: reportName + ".pdf",
                });

                this.close();
            },

            resetForm() {
                this.form = {
                    id_sppbe: null,
                    id_driver: null,
                    nama_sppbe: null,
                    nama_driver: null,
                    nomor_armada: null,
                    kuantitas_tabung: null,
                    tanggal_pengambilan_gas: null,
                };
            },
        },

        mounted() {
            this.readDataDriver();
            this.readDataSPPBE();
        }
    }
</script>

<style>
    .v-application p {
        padding-bottom: 0px !important;
    }
</style>
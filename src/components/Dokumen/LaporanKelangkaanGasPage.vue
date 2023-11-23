<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
            :items="items"
            divider="/"
            style="margin-left:-25px; margin-top:-25px"
        />
        
        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
            <h3 style="float:left">Laporan Kelangkaan Gas</h3>
            <v-spacer />
        </div>

        <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
            <h3 style="float:left">Laporan Kelangkaan Gas</h3>
            <v-spacer />
        </div>

        <div v-else style="margin-bottom: 17.5%">
            <h3 style="float:left">Laporan Kelangkaan Gas</h3>
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
                    <v-select
                        label="Bulan"
                        :items="bulan"
                        :rules="bulanRules"
                        item-value="id_bulan"
                        item-text="nama_bulan"
                        v-model="form.nomor_bulan"
                        style="margin-top:-12.5px"
                    />

                    <v-select
                        label="Tahun"
                        :items="tahun"
                        :rules="tahunRules"
                        v-model="form.tahun"
                        item-text="nama_tahun"
                        item-value="nama_tahun"
                        style="margin-top:-10px"
                    />
                    
                    <v-btn small @click="prosesHandler" color="primary" dark style="float:left;margin-top:10px">Proses</v-btn>
                </v-container>
            </v-card-text>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                    <h3 style="font-size:20px; color:#ffffff">Pratinjau</h3>
                    <v-spacer />
                    <v-icon @click="close()" color="#ffffff" link>mdi-close</v-icon>
                </v-card-title>
            </v-card>

            <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%;overflow-x: hidden">
                <span>
                    <v-spacer />
                    <v-btn small color="primary" dark style="float:right; margin-top: 3%;margin-right:3%" @click="cetak">Cetak</v-btn>
                    <v-spacer />

                    <span id="LaporanKelangkaanGas">
                        <v-card-text style="padding:30px; margin-top: 3%">
                            <h2 style="margin-top:7.5px;padding-bottom:40px">Laporan Kelangkaan Gas Periode {{ form.bulan }} Tahun {{ form.tahun }}</h2>
                            
                            <v-row no-gutters>
                                <v-col
                                    cols="6"
                                    md="1"
                                >
                                    <v-card
                                        tile
                                        outlined
                                        class="pa-2"
                                        style="text-align:center;"
                                    >
                                        <strong>No</strong>
                                    </v-card>
                                </v-col>

                                <v-col
                                    md="2"
                                    cols="6"
                                >
                                    <v-card
                                        tile
                                        outlined
                                        class="pa-2"
                                        style="text-align:center;"
                                    >
                                        <strong>Kecamatan</strong>
                                    </v-card>
                                </v-col>

                                <v-col
                                    md="2"
                                    cols="6"
                                >
                                    <v-card
                                        tile
                                        outlined
                                        class="pa-2"
                                        style="text-align:center;"
                                    >
                                        <strong>Kelurahan</strong>
                                    </v-card>
                                </v-col>

                                <v-col
                                    cols="6"
                                    md="3"
                                >
                                    <v-card
                                        class="pa-2"
                                        outlined
                                        tile
                                        style="text-align:center;"
                                    >
                                        <strong>Pangkalan</strong>
                                    </v-card>
                                </v-col>

                                <v-col
                                    cols="6"
                                    md="2"
                                >
                                    <v-card
                                        class="pa-2"
                                        outlined
                                        tile
                                        style="text-align:center;"
                                    >
                                        <strong>Jumlah Permintaan</strong>
                                    </v-card>
                                </v-col>

                                <v-col
                                    cols="6"
                                    md="2"
                                >
                                    <v-card
                                        class="pa-2"
                                        outlined
                                        tile
                                        style="text-align:center;"
                                    >
                                        <strong>Presentase</strong>
                                    </v-card>
                                </v-col>
                            </v-row>

                            <v-row no-gutters
                                v-for="item in kelangkaan"
                                :key="item.id_kelangkaan_gas"
                            >
                                <v-col
                                    cols="6"
                                    md="1"
                                >
                                    <v-card
                                        class="pa-2"
                                        outlined
                                        tile
                                        style="text-align:center;"
                                    >
                                        <span>{{item.no}}</span>
                                    </v-card>
                                </v-col>

                                <v-col
                                    cols="6"
                                    md="2"
                                >
                                    <v-card
                                        class="pa-2"
                                        outlined
                                        tile
                                        style="text-align:center;"
                                    >
                                        <span>{{item.kecamatan}}</span>
                                    </v-card>
                                </v-col>

                                <v-col
                                    cols="6"
                                    md="2"
                                >
                                    <v-card
                                        class="pa-2"
                                        outlined
                                        tile
                                        style="text-align:center;"
                                    >
                                        <span>{{item.kelurahan}}</span>
                                    </v-card>
                                </v-col>

                                <v-col
                                    cols="6"
                                    md="3"
                                >
                                    <v-card
                                        class="pa-2"
                                        outlined
                                        tile
                                        style="text-align:left;"
                                    >
                                        <span style="margin-left:5px">{{item.nama_pangkalan}}</span>
                                    </v-card>
                                </v-col>

                                <v-col
                                    cols="6"
                                    md="2"
                                >
                                    <v-card
                                        class="pa-2"
                                        outlined
                                        tile
                                        style="text-align:center;"
                                    >
                                        <span style="margin-left:5px">{{item.jumlah_permintaan}}</span>
                                    </v-card>
                                </v-col>

                                <v-col
                                    cols="6"
                                    md="2"
                                >
                                    <v-card
                                        class="pa-2"
                                        outlined
                                        tile
                                        style="text-align:center;"
                                    >
                                        <span style="margin-left:5px">{{item.presentase}}%</span>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </span>
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
        name: "LaporanKelangkaanGasPage",

        watch: {
            $route: {
                immediate: true,

                handler() {
                    document.title = "Laporan Kelangkaan Gas";
                },
            },
        },

        data() {
            return {
                bulan: [],
                tahun: [],
                color: '',
                dialog: false,
                overlay: false,
                kelangkaan: [],
                snackbar: false,
                error_message: "",
                isWideScreen: window.innerWidth >= 1000,
                bulanRules: [(v) => !!v || "Bulan is Required"],
                tahunRules: [(v) => !!v || "Tahun is Required"],
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                items: [
                    { 
                        disabled: false,
                        text: "Dashboard",
                        href: '/dashboard-page',
                    },
                    { 
                        disabled: true,
                        text: "Laporan Kelangkaan Gas",
                        href: '/laporan-kelangkaan-gas-page',
                    },
                ],
                form: {
                    bulan: null,
                    tahun: null,
                    nomor_bulan: null,
                },
            }
        },

        methods: {
            close() {
                this.resetForm();
                this.dialog = false;
            },

            readDataBulan() {
                this.overlay = true;
                var url = this.$api + "/bulan/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            this.bulan = response.data.data;
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

            readDataTahun() {
                var url = this.$api + "/tahun/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            this.tahun= response.data.data;
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
                    this.overlay = true;
                    
                    this.form.bulan = this.getNamaBulan(this.form.nomor_bulan);
                    this.getDataReport();
                }
                else
                {
                    this.color = "red";
                    this.snackbar = true;
                    this.error_message = 'Data Tidak Lengkap!!';
                }
            },

            checkForm() {
                if(this.form.tahun === null)
                {
                    return 1;
                }
                
                if(this.form.nomor_bulan === null)
                {
                    return 1;
                }
                
                return 0;
            },

            getDataReport(){
                var url = this.$api + "/kelangkaanGas/getReport";
                var body = { 'bulan': this.form.nomor_bulan, 'tahun': this.form.tahun }
                this.$http.post(url, body)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            this.kelangkaan = [];
                            let temp = response.data.data;

                            for(let i = 0; i < temp.length; i++)
                            {
                                this.kelangkaan.push(
                                    {
                                        presentase: 50,
                                        no: parseInt(i) + parseInt(1),
                                        kecamatan: temp[i].nama_kecamatan, 
                                        kelurahan: temp[i].nama_kelurahan,
                                        nama_pangkalan: temp[i].nama_pangkalan,
                                        jumlah_permintaan: temp[i].jumlah_permintaan, 
                                        id_kelangkaan_gas: temp[i].id_kelangkaan_gas,
                                    }
                                )
                            }

                            this.overlay = false;
                            this.dialog=true;
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
                        this.overlay = false;
                        console.log(error)

                        if(error.request.status === 404)
                        {
                            this.color = "red";
                            this.kelangkaan = [];
                            this.snackbar = true;
                            this.error_message = 'Data Kelangkaan Gas Tidak Ditemukan';
                        }
                    });
            },

            getNamaBulan(nomor_bulan) {
                for(let i = 0; i < this.bulan.length; i++)
                {
                    if(nomor_bulan === this.bulan[i].id_bulan)
                    {
                        return this.bulan[i].nama_bulan;
                    }
                }
            },

            cetak() {
                var report;
                var reportName = "";
                this.overlay = true;

                report = document.getElementById("LaporanKelangkaanGas");
                reportName = "Laporan Kelangkaan Gas_" + this.form.bulan + "_" + this.form.tahun;

                html2PDF(report, {
                    imageType: "image/jpeg",
                    jsPDF: { format: "a4", },
                    output: reportName + ".pdf",
                    html2canvas: { scrollX: 0, scrollY: 0, },
                    margin: { top: 0, right: 0, bottom: 0, left: -2.5, },
                });

                this.close();
                this.overlay = false;
            },

            resetForm() {
                this.form = {
                    bulan: null,
                    tahun: null,
                    nomor_bulan: null,
                };
            },
        },

        mounted() {
            this.readDataBulan();
            this.readDataTahun();
        }
    }
</script>

<style>
    .theme--light.v-sheet--outlined {
        border: thin solid #000000;
    }
</style>
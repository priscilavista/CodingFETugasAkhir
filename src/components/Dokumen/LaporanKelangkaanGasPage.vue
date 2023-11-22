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
                        :rules="bulanRules"
                        v-model="form.nomor_bulan"
                        :items="bulan"
                        item-text="nama_bulan"
                        item-value="id_bulan"
                        label="Bulan"
                        style="margin-top:-12.5px"
                    />

                    <v-select
                        :rules="tahunRules"
                        v-model="form.tahun"
                        :items="tahun"
                        item-text="nama_tahun"
                        item-value="nama_tahun"
                        label="Tahun"
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
                <span id="Laporan">
                    <v-spacer />
                    <v-btn small color="primary" dark style="float:right; margin-top: 3%;margin-right:3%" @click="cetak">Cetak</v-btn>
                    <v-spacer />

                    <v-card-text style="padding:30px; margin-top: 3%">
                        <h2 style="margin-top:7.5px;padding-bottom:40px">Laporan Kelangkaan Gas Periode {{ form.bulan }} Tahun {{ form.tahun }}</h2>
                        
                        <v-row no-gutters>
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
                                    <strong>No</strong>
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
                                    <strong>Kecamatan</strong>
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
                snackbar: false,
                error_message: "",
                isWideScreen: window.innerWidth >= 1000,
                bulanRules: [(v) => !!v || "Bulan is Required"],
                tahunRules: [(v) => !!v || "Tahun is Required"],
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                items: [
                    { 
                        text: "Dashboard",
                        disabled: false,
                        href: '/dashboard-page',
                    },
                    { 
                        text: "Laporan Kelangkaan Gas",
                        disabled: true,
                        href: '/laporan-kelangkaan-gas-page',
                    },
                ],
                form: {
                    nomor_bulan: null,
                    bulan: null,
                    tahun: null,
                },
                kelangkaan: [
                    { no: 1, id_kelangkaan_gas: 1, kecamatan: 'Playen', kelurahan: 'Getas', nama_pangkalan: 'A', jumlah_permintaan: 50, presentase: 50 },
                    { no: 2, id_kelangkaan_gas: 2, kecamatan: 'Wonosari', kelurahan: 'Wonosari', nama_pangkalan: 'B', jumlah_permintaan: 60, presentase: 60 },
                    { no: 3, id_kelangkaan_gas: 3, kecamatan: 'Patuk', kelurahan: 'Salam', nama_pangkalan: 'C', jumlah_permintaan: 70, presentase: 70 },
                    { no: 4, id_kelangkaan_gas: 4, kecamatan: 'Gendangsari', kelurahan: 'Tegalrejo', nama_pangkalan: 'D', jumlah_permintaan: 80, presentase: 80 },
                    { no: 5, id_kelangkaan_gas: 5, kecamatan: 'Ngawen', kelurahan: 'Tancep', nama_pangkalan: 'E', jumlah_permintaan: 90, presentase: 90 },
                ],
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
                    this.form.bulan = this.getNamaBulan(this.form.nomor_bulan);
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
                if(this.form.nomor_bulan === null)
                {
                    return 1;
                }
                else
                {
                    if(this.form.tahun === null)
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
                }
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

            },

            resetForm() {
                this.form = {
                    nomor_bulan: null,
                    bulan: null,
                    tahun: null,
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
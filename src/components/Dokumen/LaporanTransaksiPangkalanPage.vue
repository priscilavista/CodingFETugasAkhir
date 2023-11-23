<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
            :items="items"
            divider="/"
            style="margin-left:-25px; margin-top:-25px"
        />
        
        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
            <h3 style="float:left">Laporan Transaksi Pangkalan</h3>
            <v-spacer />
        </div>

        <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
            <h3 style="float:left">Laporan Transaksi Pangkalan</h3>
            <v-spacer />
        </div>

        <div v-else style="margin-bottom: 17.5%">
            <h3 style="float:left">Laporan Transaksi Pangkalan</h3>
            <v-spacer />
        </div>

        <v-card width="350px" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
            <v-card-title>
                <h3 style="font-size:20px; color:#ffffff">Isilah Data di Bawah Ini:</h3>
            </v-card-title>
        </v-card>
        
        <v-card style="border-radius: 0px 0px 4px 4px;width:350px;height:">
            <v-card-text>
                <v-container v-if="isWideScreen" style="padding-left: 5px; padding-right: 5px; padding-bottom:30px">
                    <v-row style="margin-top:-30px">
                        <v-col 
                            cols="12"
                            md="7"
                        >
                            <v-select
                                :rules="bulanRules"
                                v-model="form.nomor_bulan"
                                :items="bulan"
                                item-text="nama_bulan"
                                item-value="id_bulan"
                                label="Bulan"
                            />
                        </v-col>
                        
                        <v-col
                            cols="6"
                            md="5"
                        >
                            <v-select
                                :rules="tahunRules"
                                v-model="form.tahun_transaksi"
                                :items="tahun"
                                item-text="nama_tahun"
                                item-value="nama_tahun"
                                label="Tahun"
                            />
                        </v-col>
                    </v-row>
                    
                    <v-select
                        :rules="pangkalanRules"
                        v-model="form.id_pangkalan"
                        :items="pangkalan"
                        item-text="nama_pangkalan"
                        item-value="id_pangkalan"
                        label="Pangkalan"
                        style="margin-top:-25px"
                    />

                    <v-btn small @click="prosesHandler" color="primary" dark style="float:left;" >Proses</v-btn>
                </v-container>

                <v-container v-else style="padding-left: 5px; padding-right: 5px; padding-bottom:50px">
                    <v-select
                        v-model="form.nomor_bulan"
                        :items="bulan"
                        item-text="bulan_transaksi"
                        item-value="nomor_bulan"
                        label="Bulan"
                        style="margin-top:-12.5px"
                    />

                    <v-select
                        v-model="form.tahun_transaksi"
                        :items="tahun"
                        item-text="tahun_transaksi"
                        item-value="tahun_transaksi"
                        label="Tahun"
                        style="width:50%"
                    />

                    <v-select
                        v-model="form.id_pangkalan"
                        :items="pangkalan"
                        item-text="nama_pangkalan"
                        item-value="id_pangkalan"
                        label="Pangkalan"
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
                        <h2 style="margin-top:7.5px;padding-bottom:40px">Laporan Transaksi Pangkalan Periode {{ form.bulan_transaksi }} Tahun {{ form.tahun_transaksi }}</h2>
                        <span style="float:left;">Nama Pangkalan</span> <span style="float:left;margin-left:40px">: </span> <span style="float:left;margin-left:3px"> {{form.nama_pangkalan}}</span> <br/>
                        <span style="float:left;">Alamat Pangkalan</span> <span style="float:left;margin-left:34px">: </span> <span style="float:left;margin-left:3px"> {{form.alamat_pangkalan}}</span> <br/><br/>
                        
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
                                    <strong>Tanggal Pembelian</strong>
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
                                    <strong>Jumlah Pembelian</strong>
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
                                    <strong>Nama Pembeli</strong>
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
                                    <strong>KTP Pembeli</strong>
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
                                    <strong>Kategori</strong>
                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row no-gutters
                            v-for="item in transaksi"
                            :key="item.id_transaksi"
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
                                    <span>{{item.tanggal_pembelian}}</span>
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
                                    <span>{{item.jumlah_pembelian}}</span>
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
                                    <span style="margin-left:5px">{{item.nama_pembeli}}</span>
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
                                    style="text-align:left;"
                                >
                                    <span style="margin-left:5px">{{item.ktp_pembeli}}</span>
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
                                    style="text-align:left;"
                                >
                                    <span style="margin-left:5px">{{item.kategori}}</span>
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
        name: "LaporanTransaksiPangkalanPage",

        watch: {
            $route: {
                immediate: true,

                handler() {
                    document.title = "Laporan Transaksi Pangkalan";
                },
            },
        },

        data() {
            return {
                bulan: [],
                tahun: [],
                color: '',
                pangkalan: [],
                dialog: false,
                overlay: false,
                snackbar: false,
                error_message: "",
                isWideScreen: window.innerWidth >= 1000,
                bulanRules: [(v) => !!v || "Bulan is Required"],
                tahunRules: [(v) => !!v || "Tahun is Required"],
                pangkalanRules: [(v) => !!v || "Pangkalan is Required"],
                isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
                items: [
                    { 
                        text: "Dashboard",
                        disabled: false,
                        href: '/dashboard-page',
                    },
                    { 
                        text: "Laporan Transaksi Pangkalan",
                        disabled: true,
                        href: '/laporan-transaksi-pangkalan-page',
                    },
                ],
                form: {
                    bulan_transaksi: null,
                    nomor_bulan: null,
                    tahun_transaksi: null,
                    id_pangkalan: null,
                    nama_pangkalan: null,
                    alamat_pangkalan: null,
                },
                transaksi: [
                    { no: 1, id_transaksi: 1, tanggal_pembelian: '01/10/2023', jumlah_pembelian: 1, nama_pembeli: 'A', ktp_pembeli: '111', kategori: 'Rumah Tangga' },
                    { no: 2, id_transaksi: 2, tanggal_pembelian: '02/10/2023', jumlah_pembelian: 2, nama_pembeli: 'B', ktp_pembeli: '222', kategori: 'Usaha Mikro' },
                    { no: 3, id_transaksi: 3, tanggal_pembelian: '03/10/2023', jumlah_pembelian: 3, nama_pembeli: 'C', ktp_pembeli: '333', kategori: 'Lainnya' },
                    { no: 4, id_transaksi: 4, tanggal_pembelian: '04/10/2023', jumlah_pembelian: 4, nama_pembeli: 'D', ktp_pembeli: '444', kategori: 'Rumah Tangga' },
                    { no: 5, id_transaksi: 5, tanggal_pembelian: '05/10/2023', jumlah_pembelian: 5, nama_pembeli: 'E', ktp_pembeli: '555', kategori: 'Usaha Mikro' },
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

            readDataPangkalan() {
                var url = this.$api + "/pangkalan/getAll";
                this.$http.get(url)
                    .then((response) => {
                        if(response.data.code === 200)
                        {
                            this.pangkalan = response.data.data;
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
                    this.setDataPangkalan(this.form.id_pangkalan);
                    this.form.bulan_transaksi = this.getNamaBulan(this.form.nomor_bulan);
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
                if(this.form.tahun === null)
                {
                    return 1;
                }

                if(this.form.nomor_bulan === null)
                {
                    return 1;
                }
                
                if(this.form.id_pangkalan === null)
                {
                    return 1;
                }
                
                return 0;
            },

            setDataPangkalan(id_pangkalan){
                for(let i = 0; i < this.pangkalan.length; i++)
                {
                    if(id_pangkalan === this.pangkalan[i].id_pangkalan)
                    {
                        this.form.nama_pangkalan = this.pangkalan[i].nama_pangkalan;
                        this.form.alamat_pangkalan = this.pangkalan[i].alamat_pangkalan;
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
                    id_pangkalan: null,
                    nama_pangkalan: null,
                    bulan_transaksi: null,
                    tahun_transaksi: null,
                    alamat_pangkalan: null,
                };
            },
        },

        mounted() {
            this.readDataBulan();
            this.readDataTahun();
            this.readDataPangkalan();
        }
    }
</script>

<style>
    .v-application p {
        padding-bottom: 0px !important;
    }

    .theme--light.v-sheet--outlined {
        border: thin solid #000000;
    }
</style>
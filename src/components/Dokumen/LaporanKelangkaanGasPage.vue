<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
        :items="items"
        divider="/"
        style="margin-left:-25px; margin-top:-25px"
        ></v-breadcrumbs>
        <!-- <h5 class="flex-item" style="font-size: 30px; margin-top: 40px">Data transaksi</h5> -->
        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
        <h3 style="float:left">Laporan Kelangkaan Gas</h3>
        <v-spacer></v-spacer>
        </div>
        <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
        <h3 style="float:left">Laporan Kelangkaan Gas</h3>
        <v-spacer></v-spacer>
        </div>
        <div v-else style="margin-bottom: 17.5%">
        <h3 style="float:left">Laporan Kelangkaan Gas</h3>
        <v-spacer></v-spacer>
        </div>

        <v-card width="350px" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
            <v-card-title>
                <!-- <v-spacer></v-spacer> -->
                <h3 style="font-size:20px; color:#ffffff">Isilah data di bawah ini:</h3>
            </v-card-title>
            </v-card>
            <v-card style="border-radius: 0px 0px 4px 4px;width:350px;height:">
            <v-card-text>
                <!-- <v-container v-if="isWideScreen" style="padding-left: 5px; padding-right: 5px; padding-bottom:30px">
                <v-row style="margin-top:-30px">
                    <v-col 
                    cols="12"
                    md="7">
                        <v-select
                            v-model="form.id_sppbe"
                            :items="sppbe"
                            item-text="nama_sppbe"
                            item-value="id_sppbe"
                            label="SPPBE"
                        ></v-select>
                    </v-col>
                    <v-col
                    cols="6"
                    md="5">
                        <v-text-field
                            v-model="form_filter.tahun_transaksi"
                            label="Tahun"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-select
                    v-model="form_filter.pangkalan_transaksi"
                    :items="pangkalan"
                    item-text="nama_pangkalan"
                    item-value="id_pangkalan"
                    label="Pangkalan"
                    style="margin-top:-25px"
                ></v-select>
                
                <v-btn small color="primary" dark style="float:left;" >Filter</v-btn>
                </v-container> -->
                <v-container style="padding-left: 5px; padding-right: 5px; padding-bottom:47.5px">
                    <v-select
                        v-model="form.nomor_bulan"
                        :items="bulan"
                        item-text="bulan"
                        item-value="nomor_bulan"
                        label="Bulan"
                        style="margin-top:-12.5px"
                    ></v-select>
                    <v-select
                        v-model="form.tahun"
                        :items="tahun"
                        item-text="tahun"
                        item-value="tahun"
                        label="Tahun"
                        style="width:50%; margin-top:-10px"
                    ></v-select>
                    <!-- <v-text-field
                        v-model="form.tahun_transaksi"
                        label="Tahun"
                        style="width:50%"
                    ></v-text-field> -->
                    <!-- <v-select
                        v-model="form.id_driver"
                        :items="driver"
                        item-text="nama_driver"
                        item-value="id_driver"
                        label="Driver"
                        style="margin-top:-10px"
                    ></v-select>
                    <v-select
                        v-model="form.kuantitas_tabung"
                        :items="alokasi"
                        item-text="jumlah_alokasi"
                        item-value="jumlah_alokasi"
                        label="Kuantitas tabung yang diambil"
                        style="margin-top:-10px"
                    ></v-select> -->

                    <v-btn small @click="prosesHandler" color="primary" dark style="float:left;margin-top:10px">Proses</v-btn>
                </v-container>
            </v-card-text>
        
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="1000px">
            <v-card height="20%" style="background: #196b4d; border-radius: 4px 4px 0px 0px">
                <v-card-title>
                <!-- <v-spacer></v-spacer> -->
                <h3 style="font-size:20px; color:#ffffff">Pratinjau</h3>
                <v-spacer></v-spacer>
                <v-icon @click="close()" color="#ffffff" link>mdi-close</v-icon>
                </v-card-title>
            </v-card>
            <v-card style="border-radius: 0px 0px 4px 4px; padding-bottom: 6.5%;overflow-x: hidden">
                <span id="Laporan">
                    <v-spacer></v-spacer>
                    <v-btn small color="primary" dark style="float:right; margin-top: 3%;margin-right:3%" @click="cetak">Cetak</v-btn>
                    <v-spacer></v-spacer>

                    <v-card-text style="padding:30px; margin-top: 3%">
                        <h2 style="margin-top:7.5px;padding-bottom:40px">Laporan Kelangkaan Gas Periode {{ form.bulan }} Tahun {{ form.tahun }}</h2>
                        <!-- <span style="float:left;">Nama Pangkalan</span> <span style="float:left;margin-left:40px">: </span> <span style="float:left;margin-left:3px"> {{form.nama_pangkalan}}</span> <br/>
                        <span style="float:left;">Alamat Pangkalan</span> <span style="float:left;margin-left:34px">: </span> <span style="float:left;margin-left:3px"> {{form.alamat_pangkalan}}</span> <br/><br/> -->
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
            isWideScreen: window.innerWidth >= 1000,
            isMediumScreen: window.innerWidth>= 650 && window.innerWidth < 1000,
            dialog: false,
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
            bulan: [
                { bulan: "Januari", nomor_bulan: '1' },
                { bulan: "Februari", nomor_bulan: '2' },
                { bulan: "Maret", nomor_bulan: '3' },
                { bulan: "April", nomor_bulan: '4' },
                { bulan: "Mei", nomor_bulan: '5' },
                { bulan: "Juni", nomor_bulan: '6' },
                { bulan: "Juli", nomor_bulan: '7' },
                { bulan: "Agustus", nomor_bulan: '8' },
                { bulan: "September", nomor_bulan: '9' },
                { bulan: "Oktober", nomor_bulan: '10' },
                { bulan: "November", nomor_bulan: '11' },
                { bulan: "Desember", nomor_bulan: '12' },
            ],
            tahun: [
                { tahun: '2015'},
                { tahun: '2016'},
                { tahun: '2017'},
                { tahun: '2018'},
                { tahun: '2019'},
                { tahun: '2020'},
                { tahun: '2021'},
                { tahun: '2022'},
                { tahun: '2023'},
            ],
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
            this.dialog = false;
        },
        prosesHandler() {
            this.form.bulan = this.getNamaBulan(this.form.nomor_bulan);
            this.dialog=true;
        },
        getNamaBulan(bulan) {
            switch (bulan) {
                case '1':
                    return "Januari";
                case '2':
                    return "Februari";
                case '3':
                    return "Maret";
                case '4':
                    return "April";
                case '5':
                    return "Mei";
                case '6':
                    return "Juni";
                case '7':
                    return "Juli";
                case '8':
                    return "Agustus";
                case '9':
                    return "September";
                case '10':
                    return "Oktober";
                case '11':
                    return "November";
                case '12':
                    return "Desember";
                }
        }
    },
}
</script>

<style>
    .theme--light.v-sheet--outlined {
        border: thin solid #000000;
    }
</style>
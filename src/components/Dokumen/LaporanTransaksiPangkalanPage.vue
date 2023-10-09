<template>
    <v-main class="list" style="margin: auto;">
        <v-breadcrumbs
        :items="items"
        divider="/"
        style="margin-left:-25px; margin-top:-25px"
        ></v-breadcrumbs>
        <!-- <h5 class="flex-item" style="font-size: 30px; margin-top: 40px">Data transaksi</h5> -->
        <div v-if="isWideScreen" style="margin-bottom: 5.5%">
        <h3 style="float:left">Laporan Transaksi Pangkalan</h3>
        <v-spacer></v-spacer>
        </div>
        <div v-else-if="isMediumScreen" style="margin-bottom: 12.5%">
        <h3 style="float:left">Laporan Transaksi Pangkalan</h3>
        <v-spacer></v-spacer>
        </div>
        <div v-else style="margin-bottom: 17.5%">
        <h3 style="float:left">Laporan Transaksi Pangkalan</h3>
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
                <v-container v-if="isWideScreen" style="padding-left: 5px; padding-right: 5px; padding-bottom:30px">
                    <v-row style="margin-top:-30px">
                        <v-col 
                        cols="12"
                        md="7">
                            <v-select
                                v-model="form.nomor_bulan"
                                :items="bulan"
                                item-text="bulan_transaksi"
                                item-value="nomor_bulan"
                                label="Bulan"
                            ></v-select>
                        </v-col>
                        <v-col
                        cols="6"
                        md="5">
                            <v-select
                                v-model="form.tahun_transaksi"
                                :items="tahun"
                                item-text="tahun_transaksi"
                                item-value="tahun_transaksi"
                                label="Tahun"
                            ></v-select>
                            <!-- <v-text-field
                                v-model="form_filter.tahun_transaksi"
                                label="Tahun"
                            ></v-text-field> -->
                        </v-col>
                    </v-row>
                        <!-- <v-select
                            v-model="form.bulan_transaksi"
                            :items="bulan"
                            item-text="bulan_transaksi"
                            item-value="bulan_transaksi"
                            label="Bulan"
                            style="width:50%"
                        ></v-select> -->
                        <!-- <v-text-field
                            v-model="form.tahun_transaksi"
                            label="Tahun"
                        ></v-text-field> -->
                        <v-select
                            v-model="form.id_pangkalan"
                            :items="pangkalan"
                            item-text="nama_pangkalan"
                            item-value="id_pangkalan"
                            label="Pangkalan"
                            style="margin-top:-25px"
                        ></v-select>
                        <v-card-action>
                            <v-btn small @click="prosesHandler" color="primary" dark style="float:left;" >Proses</v-btn>
                        </v-card-action>
                    </v-container>
                    <v-container v-else style="padding-left: 5px; padding-right: 5px; padding-bottom:50px">
                        <v-select
                            v-model="form.nomor_bulan"
                            :items="bulan"
                            item-text="bulan_transaksi"
                            item-value="nomor_bulan"
                            label="Bulan"
                            style="margin-top:-12.5px"
                        ></v-select>
                        <v-select
                            v-model="form.tahun_transaksi"
                            :items="tahun"
                            item-text="tahun_transaksi"
                            item-value="tahun_transaksi"
                            label="Tahun"
                            style="width:50%"
                        ></v-select>
                        <!-- <v-text-field
                            v-model="form.tahun_transaksi"
                            label="Tahun"
                            style="width:50%"
                        ></v-text-field> -->
                        <v-select
                            v-model="form.id_pangkalan"
                            :items="pangkalan"
                            item-text="nama_pangkalan"
                            item-value="id_pangkalan"
                            label="Pangkalan"
                        ></v-select>
                    <v-card-action>
                        <v-btn small @click="prosesHandler" color="primary" dark style="float:left;margin-top:10px">Proses</v-btn>
                    </v-card-action>
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
                    <v-card-action>
                        <v-spacer></v-spacer>
                        <v-btn small color="primary" dark style="float:right; margin-top: 3%;margin-right:3%" @click="cetak">Cetak</v-btn>
                        
                        <v-spacer></v-spacer>
                    </v-card-action>
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
                    text: "Laporan Transaksi Pangkalan",
                    disabled: true,
                    href: '/laporan-transaksi-pangkalan-page',
                },
            ],
            bulan: [
                { bulan_transaksi: "Januari", nomor_bulan: 1 },
                { bulan_transaksi: "Februari", nomor_bulan: 2 },
                { bulan_transaksi: "Maret", nomor_bulan: 3 },
                { bulan_transaksi: "April", nomor_bulan: 4 },
                { bulan_transaksi: "Mei", nomor_bulan: 5 },
                { bulan_transaksi: "Juni", nomor_bulan: 6 },
                { bulan_transaksi: "Juli", nomor_bulan: 7 },
                { bulan_transaksi: "Agustus", nomor_bulan: 8 },
                { bulan_transaksi: "September", nomor_bulan: 9 },
                { bulan_transaksi: "Oktober", nomor_bulan: 10 },
                { bulan_transaksi: "November", nomor_bulan: 11 },
                { bulan_transaksi: "Desember", nomor_bulan: 12 },
            ],
            tahun: [
                { tahun_transaksi: '2015'},
                { tahun_transaksi: '2016'},
                { tahun_transaksi: '2017'},
                { tahun_transaksi: '2018'},
                { tahun_transaksi: '2019'},
                { tahun_transaksi: '2020'},
                { tahun_transaksi: '2021'},
                { tahun_transaksi: '2022'},
                { tahun_transaksi: '2023'},
            ],
            form: {
                bulan_transaksi: "September",
                nomor_bulan: 9,
                tahun_transaksi: '2023',
                id_pangkalan: null,
                nama_pangkalan: 'Sutrisno',
                alamat_pangkalan: 'Wonosari, Gunung Kidul, Yogyakarta',
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
            this.dialog = false;
        },
        prosesHandler() {
            this.dialog=true;
        }
    },
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